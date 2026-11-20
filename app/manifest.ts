import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Total Repair — Administración",
    short_name: "TR Admin",
    description:
      "Aplicación web autoadministrable de Total Repair Ltda. para gestionar proyectos, textos, diseño y solicitudes.",
    start_url: "/admin",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFFFFF",
    theme_color: "#FF5000",
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
}
