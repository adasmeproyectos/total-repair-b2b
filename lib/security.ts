/**
 * lib/security.ts
 * Utilidades defensivas compartidas: sanitización XSS/JSON-LD/HTML,
 * prevención de CRLF/Email Header Injection, validación de origen y rate-limiting.
 */

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Elimina saltos de línea y caracteres nulos para evitar CRLF / Email Header Injection
 * en asuntos, direcciones y encabezados SMTP/Resend.
 */
export function stripHeaderNewlines(input: string): string {
  return input.replace(/[\r\n\0]+/g, " ").trim();
}

/**
 * Serializa JSON-LD escapando `<`, `>`, `&` como secuencias Unicode
 * para impedir cierre prematuro de etiquetas <script> (XSS en JSON-LD).
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * Valida URLs permitidas (relativas o http/https/mailto/tel).
 * Bloquea esquemas peligrosos como javascript:, data:, vbscript:.
 */
export function isSafeUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;
  try {
    const parsed = new URL(trimmed);
    return (
      parsed.protocol === "https:" ||
      parsed.protocol === "http:" ||
      parsed.protocol === "mailto:" ||
      parsed.protocol === "tel:"
    );
  } catch {
    return false;
  }
}

export function getClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.split(",")[0].trim().slice(0, 64);

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.split(",")[0].trim().slice(0, 64);

  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 64);

  return "unknown";
}

/**
 * Verifica que las peticiones mutables (POST) vengan del propio dominio
 * (totalrepair.cl, preview *.vercel.app o localhost en desarrollo) y rechaza
 * envíos cross-origin falsificados (CSRF).
 */
export function isAllowedOrigin(request: Request): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) {
    // Peticiones same-origin sin header Origin o herramientas internas deben tener Sec-Fetch-Site compatible si está presente
    const secFetchSite = request.headers.get("sec-fetch-site");
    if (secFetchSite && secFetchSite === "cross-site") {
      return false;
    }
    return true;
  }

  let originUrl: URL;
  try {
    originUrl = new URL(originHeader);
  } catch {
    return false;
  }

  if (
    originUrl.protocol !== "https:" &&
    originUrl.protocol !== "http:"
  ) {
    return false;
  }

  const originHost = originUrl.host.toLowerCase();
  const originHostname = originUrl.hostname.toLowerCase();

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim().toLowerCase();
  const directHost = request.headers.get("host")?.split(",")[0]?.trim().toLowerCase();

  if (forwardedHost && originHost === forwardedHost) return true;
  if (directHost && originHost === directHost) return true;

  if (
    originHostname === "totalrepair.cl" ||
    originHostname === "www.totalrepair.cl" ||
    originHostname.endsWith(".totalrepair.cl")
  ) {
    return true;
  }

  if (originHostname.endsWith(".vercel.app")) {
    return true;
  }

  if (originHostname === "localhost" || originHostname === "127.0.0.1") {
    return true;
  }

  return false;
}

interface RateBucketEntry {
  timestamps: number[];
}

const rateBuckets = new Map<string, Map<string, RateBucketEntry>>();

function getBucketMap(bucket: string): Map<string, RateBucketEntry> {
  let map = rateBuckets.get(bucket);
  if (!map) {
    map = new Map();
    rateBuckets.set(bucket, map);
  }
  return map;
}

export function isRateLimited(
  bucket: string,
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number; remaining: number } {
  const now = Date.now();
  const map = getBucketMap(bucket);
  const entry = map.get(key);
  if (!entry) {
    return { allowed: true, retryAfterSec: 0, remaining: maxRequests };
  }

  const recent = entry.timestamps.filter((t) => now - t < windowMs);
  entry.timestamps = recent;

  if (recent.length >= maxRequests) {
    const oldest = recent[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return { allowed: false, retryAfterSec, remaining: 0 };
  }

  return {
    allowed: true,
    retryAfterSec: 0,
    remaining: Math.max(0, maxRequests - recent.length),
  };
}

export function checkRateLimit(
  bucket: string,
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number; remaining: number } {
  const now = Date.now();
  const map = getBucketMap(bucket);

  // Limpieza oportunista para evitar crecimiento ilimitado de memoria
  if (map.size > 500) {
    for (const [k, entry] of map.entries()) {
      const fresh = entry.timestamps.filter((t) => now - t < windowMs);
      if (fresh.length === 0) {
        map.delete(k);
      } else {
        entry.timestamps = fresh;
      }
    }
  }

  const entry = map.get(key) ?? { timestamps: [] };
  const recent = entry.timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    const oldest = recent[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    entry.timestamps = recent;
    map.set(key, entry);
    return { allowed: false, retryAfterSec, remaining: 0 };
  }

  recent.push(now);
  entry.timestamps = recent;
  map.set(key, entry);

  return {
    allowed: true,
    retryAfterSec: 0,
    remaining: Math.max(0, maxRequests - recent.length),
  };
}

export function clearRateLimitKey(bucket: string, key: string): void {
  const map = rateBuckets.get(bucket);
  if (map) {
    map.delete(key);
  }
}
