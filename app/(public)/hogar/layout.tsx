import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "División Hogar y Remodelación Residencial",
  description:
    "Gasfitería, electricidad certificada SEC, remodelación de cocinas, baños y pintura para tu hogar. Total Construye — más de 22 años de experiencia con garantía en Chile.",
  path: "/hogar",
});

export default function HogarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
