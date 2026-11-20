import { NextResponse } from "next/server";
import {
  checkRateLimit,
  clearRateLimitKey,
  getClientIp,
  isAllowedOrigin,
  isRateLimited,
} from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "Origen no autorizado." },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 1024) {
    return NextResponse.json(
      { error: "Solicitud demasiado grande." },
      { status: 413, headers: { "Cache-Control": "no-store" } }
    );
  }

  const ip = getClientIp(request);
  const limitState = isRateLimited("portal-auth", ip, MAX_ATTEMPTS, WINDOW_MS);
  if (!limitState.allowed) {
    return NextResponse.json(
      {
        error:
          "Demasiados intentos fallidos. Espera unos minutos e intenta nuevamente.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitState.retryAfterSec),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 1024) {
      return NextResponse.json(
        { error: "Solicitud demasiado grande." },
        { status: 413, headers: { "Cache-Control": "no-store" } }
      );
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Formato inválido." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const password =
    body && typeof body === "object" && "password" in body
      ? (body as { password?: unknown }).password
      : null;

  if (typeof password !== "string" || password.length < 1 || password.length > 128) {
    return NextResponse.json(
      { error: "Escribe tu contraseña para entrar." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const adminEmail = (
    process.env.ADMIN_ACCOUNT_EMAIL || "admin@totalrepair.cl"
  ).toLowerCase();

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password,
    });

    if (authError || !data.user?.email) {
      await sleep(600);
      checkRateLimit("portal-auth", ip, MAX_ATTEMPTS, WINDOW_MS);
      return NextResponse.json(
        {
          error:
            "Contraseña incorrecta. Revisa si tienes activadas las mayúsculas e intenta nuevamente.",
        },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("email", data.user.email.toLowerCase())
      .eq("is_active", true)
      .maybeSingle();

    if (!adminRow) {
      await supabase.auth.signOut().catch(() => undefined);
      await sleep(600);
      checkRateLimit("portal-auth", ip, MAX_ATTEMPTS, WINDOW_MS);
      return NextResponse.json(
        {
          error:
            "Contraseña incorrecta. Revisa si tienes activadas las mayúsculas e intenta nuevamente.",
        },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    clearRateLimitKey("portal-auth", ip);
    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "No se pudo validar el acceso. Intenta nuevamente." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
