import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Seguridad: Bloquear Source Maps en producción (Manifiesto §1.1) ──────────
  productionBrowserSourceMaps: false,

  // ── Compresión automática ────────────────────────────────────────────────────
  compress: true,

  // ── Optimización de Imágenes ─────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },

  // ── Headers de Seguridad ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
              "frame-src 'self' https://challenges.cloudflare.com https://maps.google.com https://www.google.com",
              "frame-ancestors 'self'",
              "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com",
              "font-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://us.i.posthog.com https://api.resend.com",
              "worker-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ── Redirects: Preservar SEO de proyectos anteriores ─────────────────────────
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "total-repair-empresas.vercel.app" }],
        destination: "https://www.totalrepair.cl/empresas",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "total-construye-hogar.vercel.app" }],
        destination: "https://www.totalrepair.cl/hogar",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "total-repair-b2b.vercel.app" }],
        destination: "https://www.totalrepair.cl/empresas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
