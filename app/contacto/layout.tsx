import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contacto y Solicitud de Presupuesto 24/7",
  description:
    "Solicite presupuesto para remodelaciones corporativas, obras residenciales o active nuestra Unidad de Reacción Inmediata 24/7 para siniestros en Chile. Total Repair Ltda.",
  path: "/contacto",
});

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
