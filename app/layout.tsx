import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { LOCAL_BUSINESS_SCHEMA } from "@/lib/metadata";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Total Repair | Construcción y Remodelación en Chile",
    template: "%s | Total Repair Ltda.",
  },
  description:
    "Soluciones integrales de construcción, remodelación y reparación para empresas y hogares. 20 años de experiencia en Chile. Atención 24/7.",
  metadataBase: new URL("https://totalrepair.cl"),
  robots: "index, follow",
  openGraph: {
    siteName: "Total Repair Ltda.",
    locale: "es_CL",
    type: "website",
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
        {/* JSON-LD Structured Data — Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
      </head>
      <body
        className={`${barlowCondensed.variable} ${inter.variable} font-sans antialiased`}
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