import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Total Repair Ltda.",
    short_name: "Total Repair",
    description:
      "Construcción, habilitación corporativa B2B, remodelación residencial y atención de siniestros 24/7 en Chile.",
    start_url: "/",
    scope: "/",
    display: "browser",
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
}
