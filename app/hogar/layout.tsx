/**
 * app/hogar/layout.tsx
 * Segmento de metadata para /hogar (Server Component).
 * El page.tsx usa "use client" para el FAQ accordion con useState.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "División Hogar",
  description:
    "Gasfitería, electricidad certificada, remodelación interior y más para tu hogar. Total Construye — 20 años de experiencia en Chile.",
};

export default function HogarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
