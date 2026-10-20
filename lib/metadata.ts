/**
 * lib/metadata.ts
 * Generador centralizado de metadata SEO y GEO (Generative Engine Optimization) para cada ruta.
 * Usar en el export const metadata de cada page.tsx o layout.tsx (Server Component).
 */

import type { Metadata } from "next";
import { COMPANY } from "./constants";

export const BASE_URL = "https://www.totalrepair.cl";
const DEFAULT_OG_IMAGE = "/img/logos/banner.png";

interface MetaOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords,
}: MetaOptions): Metadata {
  const canonicalPath = path === "/" ? "" : path;
  const url = `${BASE_URL}${canonicalPath}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    authors: [{ name: COMPANY.author, url: COMPANY.linkedin }],
    creator: COMPANY.author,
    publisher: COMPANY.legalName,
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: `${title} | ${COMPANY.legalName}`,
      description,
      url,
      siteName: COMPANY.legalName,
      locale: "es_CL",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${COMPANY.legalName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY.legalName}`,
      description,
      images: [ogImage],
    },
  };
}

/** Schemas de structured data (JSON-LD) para GEO y Motores de Búsqueda Agénticos */
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: COMPANY.shortName,
  legalName: COMPANY.legalName,
  description:
    "Empresa chilena fundada el 4 de agosto de 2004 con más de 22 años de experiencia en construcción, habilitación comercial B2B, remodelación corporativa, reparación de siniestros (Unidad de Reacción Inmediata 24/7) y servicios residenciales certificados SEC.",
  url: BASE_URL,
  logo: `${BASE_URL}/img/logos/logo.png`,
  image: `${BASE_URL}/img/logos/banner.png`,
  telephone: "+56999195521",
  email: COMPANY.email,
  foundingDate: COMPANY.foundingDate,
  founder: {
    "@type": "Person",
    name: COMPANY.founder,
    jobTitle: "Fundadora y Propietaria",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Villasana 1398",
    addressLocality: "Quinta Normal",
    addressRegion: "Región Metropolitana",
    postalCode: "8500000",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.4444,
    longitude: -70.7001,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      description: "Unidad de Reacción Inmediata (URI) Siniestros y Emergencias 24/7",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+56999195521",
      contactType: "emergency",
      areaServed: "CL",
      availableLanguage: "Spanish",
    },
    {
      "@type": "ContactPoint",
      telephone: "+56999195521",
      email: COMPANY.email,
      contactType: "customer service",
      areaServed: "CL",
      availableLanguage: "Spanish",
    },
  ],
  priceRange: "$$$",
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Región Metropolitana de Santiago",
    },
    {
      "@type": "Country",
      name: "Chile",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "128",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Construcción, Remodelación B2B y Gestión de Siniestros",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Habilitación Comercial y Remodelación Corporativa B2B",
          description:
            "Ejecución integral de obras civiles, habilitación de oficinas, clínicas, centros educativos y locales en centros comerciales en espacios ocupados garantizando continuidad operacional.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Unidad de Reacción Inmediata (URI) 24/7 — Gestión de Siniestros",
          description:
            "Atención de emergencias corporativas en menos de 2 horas por inundaciones, incendios, daños sísmicos o estructurales, con coordinación directa ante compañías aseguradoras.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mantenimiento Industrial y Corporativo",
          description:
            "Contratos de mantención preventiva y correctiva de cubiertas, techumbres, redes sanitarias, electricidad certificada SEC y pintura de alto tráfico.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "División Hogar — Total Construye",
          description:
            "Remodelación integral de cocinas y baños, gasfitería de redes de agua y gas, e instalaciones eléctricas residenciales certificadas SEC con garantía.",
        },
      },
    ],
  },
};
