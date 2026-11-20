import { ContactoClient } from "@/components/contact/ContactoClient";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Contacto y Solicitud de Presupuesto",
  description:
    "Solicita tu presupuesto de construcción, remodelación B2B u hogar, o reporta un siniestro 24/7 con Total Repair Ltda.",
  path: "/contacto",
});

export default async function ContactoPage() {
  const { company, content } = await getSiteConfig();
  return <ContactoClient company={company} content={content.contacto} />;
}
