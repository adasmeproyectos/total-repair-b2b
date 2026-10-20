import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { LOCAL_BUSINESS_SCHEMA } from "@/lib/metadata";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Total Repair Ltda. | Construcción, Remodelación Corporativa y Siniestros en Chile",
    template: "%s | Total Repair Ltda.",
  },
  description:
    "Soluciones integrales de construcción, habilitación comercial B2B, remodelación corporativa y reparación de siniestros 24/7 para empresas y hogares. Más de 22 años de experiencia en Chile.",
  metadataBase: new URL("https://www.totalrepair.cl"),
  authors: [{ name: "Javier Adasme", url: "https://www.linkedin.com/in/javieradasme/" }],
  creator: "Javier Adasme",
  publisher: "Total Repair Ltda.",
  keywords: [
    "Total Repair Ltda.",
    "Construcción Chile",
    "Remodelación Corporativa B2B",
    "Habilitación Comercial",
    "Mantenimiento Corporativo",
    "Reparación de Siniestros 24/7",
    "Obras Civiles y Comerciales",
    "Continuidad Operacional",
    "Electricidad y Gasfitería SEC",
  ],
  robots: {
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/img/logos/logo.png", type: "image/png" },
    ],
    apple: "/img/logos/logo.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Total Repair Ltda. | Construcción, Remodelación B2B y Siniestros en Chile",
    description:
      "Soluciones integrales de construcción, remodelación corporativa y atención de siniestros 24/7 para empresas y hogares. Más de 22 años de trayectoria en Chile.",
    url: "https://www.totalrepair.cl",
    siteName: "Total Repair Ltda.",
    images: [{ url: "/img/logos/banner.png", width: 1200, height: 630, alt: "Total Repair Ltda." }],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Total Repair Ltda. | Construcción, Remodelación B2B y Siniestros en Chile",
    description:
      "Soluciones integrales de construcción, remodelación corporativa y atención de siniestros 24/7 en Chile.",
    images: ["/img/logos/banner.png"],
  },
  verification: {
    google: "UaGe-1nxh97KJ0Cmj6R1kpXPsQBc6s5qpdjlDSZWGHE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data — Local Business & HomeAndConstructionBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} font-sans antialiased`}
      >
        {/* ── Global Navigation ───────────────────────────────────── */}
        <Navbar />

        {/* ── Page Content ────────────────────────────────────────── */}
        <main>{children}</main>

        {/* ── Global Footer ───────────────────────────────────────── */}
        <Footer />

        {/* ── WhatsApp FAB (global, con delay de aparición) ───────── */}
        <WhatsAppFAB />
      </body>
    </html>
  );
}
