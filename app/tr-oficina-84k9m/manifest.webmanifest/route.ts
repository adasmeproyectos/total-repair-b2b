import { NextResponse } from "next/server";
import { PORTAL_BASE_PATH } from "@/lib/portal-config";

export async function GET() {
  const manifest = {
    name: "TR Gestión",
    short_name: "TR Gestión",
    description: "Herramienta interna de administración Total Repair Ltda.",
    start_url: PORTAL_BASE_PATH,
    scope: PORTAL_BASE_PATH,
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFFFFF",
    theme_color: "#E8490F",
    lang: "es-CL",
    icons: [
      {
        src: "/img/logos/logo.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "private, no-store, max-age=0",
    },
  });
}
