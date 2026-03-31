import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Total Repair | División Empresas",
  description: "Servicios integrales de construcción y remodelación para empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      {/* Aplicamos la fuente base (Jakarta) a todo el body */}
      <body className={`${outfit.variable} ${jakarta.variable} font-sans bg-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}