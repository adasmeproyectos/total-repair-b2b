import type { Metadata, Viewport } from "next";
import {
  Outfit,
  Barlow_Condensed,
  Montserrat,
  Playfair_Display,
  Inter,
  Plus_Jakarta_Sans,
  DM_Sans,
  Roboto,
  Lato,
} from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { LOCAL_BUSINESS_SCHEMA } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-data";
import { themeToStyleString } from "@/lib/theme-css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FF5000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default:
      "Total Repair Ltda. | Construcción, Remodelación Corporativa y Siniestros en Chile",
    template: "%s | Total Repair Ltda.",
  },
  description:
    "Soluciones integrales de construcción, habilitación comercial B2B, remodelación corporativa y reparación de siniestros 24/7 para empresas y hogares. Más de 22 años de experiencia en Chile.",
  metadataBase: new URL("https://www.totalrepair.cl"),
  authors: [
    { name: "Javier Adasme", url: "https://www.linkedin.com/in/javieradasme/" },
  ],
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TR Admin",
  },
  openGraph: {
    title:
      "Total Repair Ltda. | Construcción, Remodelación B2B y Siniestros en Chile",
    description:
      "Soluciones integrales de construcción, remodelación corporativa y atención de siniestros 24/7 para empresas y hogares. Más de 22 años de trayectoria en Chile.",
    url: "https://www.totalrepair.cl",
    siteName: "Total Repair Ltda.",
    images: [
      {
        url: "/img/logos/banner.png",
        width: 1200,
        height: 630,
        alt: "Total Repair Ltda.",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Total Repair Ltda. | Construcción, Remodelación B2B y Siniestros en Chile",
    description:
      "Soluciones integrales de construcción, remodelación corporativa y atención de siniestros 24/7 en Chile.",
    images: ["/img/logos/banner.png"],
  },
  verification: {
    google: "UaGe-1nxh97KJ0Cmj6R1kpXPsQBc6s5qpdjlDSZWGHE",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  const themeStyle = themeToStyleString(siteConfig.theme);

  const fontVars = [
    outfit.variable,
    barlow.variable,
    montserrat.variable,
    playfair.variable,
    inter.variable,
    plusJakartaSans.variable,
    dmSans.variable,
    roboto.variable,
    lato.variable,
  ].join(" ");

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <style
          id="tr-theme-vars"
          dangerouslySetInnerHTML={{ __html: themeStyle }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
      </head>
      <body className={`${fontVars} font-sans antialiased`}>
        <SiteChrome
          company={siteConfig.company}
          initialTheme={siteConfig.theme}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
