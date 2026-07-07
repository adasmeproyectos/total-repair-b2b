/**
 * lib/metadata.ts
 * Generador centralizado de metadata SEO para cada ruta.
 * Usar en el export const metadata de cada page.tsx (server component).
 */

import type { Metadata } from "next";

const BASE_URL = "https://totalrepair.cl";
const DEFAULT_OG_IMAGE = "/og-default.jpg";

interface MetaOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: MetaOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title: `${title} | Total Repair Ltda.`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: `${title} | Total Repair Ltda.`,
      description,
      url,
      siteName: "Total Repair Ltda.",
      locale: "es_CL",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — Total Repair Ltda.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Total Repair Ltda.`,
      description,
      images: [ogImage],
    },
  };
}

/** Schemas de structured data (JSON-LD) */
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Total Repair Ltda.",
  description:
    "Soluciones integrales de construcción, remodelación y reparación para empresas y hogares.",
  url: BASE_URL,
  telephone: "+56999195521",
  email: "contacto@totalrepair.cl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Villasana 1398",
    addressLocality: "Quinta Normal",
    addressRegion: "Región Metropolitana",
    postalCode: "8550000",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.4444,
    longitude: -70.7001,
  },
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "$$",
  areaServed: "Región Metropolitana, Chile",
};
