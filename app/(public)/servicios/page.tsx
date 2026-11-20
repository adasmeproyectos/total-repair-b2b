import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { safeJsonLd } from "@/lib/security";
import { getSiteConfig } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Catálogo Técnico de Servicios y Siniestros",
  description:
    "Especialidades de construcción B2B, carpintería industrial, pintura de alta gama, electricidad certificada SEC, redes de datos y manejo de emergencias 24/7 en Chile.",
  path: "/servicios",
});

export default async function ServiciosPage() {
  const { content, company } = await getSiteConfig();
  const s = content.servicios;

  const claimsFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.claims.map((c) => ({
      "@type": "Question",
      name: `¿En qué consiste el servicio de ${c.title} de Total Repair Ltda.?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: c.description,
      },
    })),
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-white, #FFFFFF)",
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[76px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(claimsFaqJsonLd) }}
      />

      {/* 1. HERO EDITORIAL (#F7F6F2) */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
        className="tr-divider-b"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-7">
            <SectionLabel label={s.eyebrow} />
            <h1
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="tr-heading-page font-bold leading-[1.06] mb-6 tracking-tight font-display"
            >
              {s.title}{" "}
              <span
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="block sm:inline"
              >
                {s.titleHighlight}
              </span>
            </h1>
            <p
              style={{ color: "var(--color-ink-mid, #57534E)" }}
              className="text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              {s.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contacto"
                style={{
                  backgroundColor: "var(--color-brand-orange, #E8490F)",
                  borderRadius: "var(--tr-btn-radius, 0px)",
                }}
                className="text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-wider hover:opacity-90"
              >
                Cotizar Servicio
              </Link>
              <Link
                href="/contacto?urgencia=true"
                style={{
                  borderRadius: "var(--tr-btn-radius, 0px)",
                  borderColor: "var(--color-ink-anthracite, #141413)",
                  color: "var(--color-ink-anthracite, #141413)",
                }}
                className="border px-7 py-3.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#141413] hover:text-white transition-colors"
              >
                Siniestro 24/7
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden tr-card bg-[#ECEAE3]">
            <Image
              src={s.heroImage || "/img/fotos/arquitectura-B2B.jpg"}
              alt="Arquitectura e Ingeniería Industrial B2B — Total Repair Ltda."
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover origin-top-left scale-[1.08]"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. GRILLA SUIZA DE ESPECIALIDADES (SIN CAJAS DE ICONOS) */}
      <section className="tr-section tr-container px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 mb-10 tr-divider-b">
          <div className="lg:col-span-7">
            <SectionLabel label={s.specEyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {s.specTitle}
            </h2>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-sm sm:text-base leading-relaxed"
          >
            {s.specDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#D6D3CD] divide-y sm:divide-y-0 sm:divide-x divide-[#D6D3CD]">
          {s.specialities.map((spec, index) => (
            <article
              key={spec.id}
              style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
              className="tr-card-pad flex flex-col justify-between min-h-[220px]"
            >
              <span
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="font-mono text-sm font-semibold mb-8 block tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-display text-lg font-bold leading-snug tracking-tight mb-2"
                >
                  {spec.name}
                </h3>
                <p
                  style={{ color: "var(--color-ink-mid, #57534E)" }}
                  className="text-sm leading-relaxed"
                >
                  {spec.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. PROTOCOLOS DE SINIESTROS */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
        className="tr-section tr-divider-t"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12">
          <div className="pb-8 mb-10 tr-divider-b">
            <SectionLabel label={s.claimsBadge} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {s.claimsTitle}
            </h2>
          </div>

          <div
            style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
            className="tr-card overflow-hidden"
          >
            {s.claims.map((claim, index) => (
              <details
                key={claim.id}
                open={index === 0}
                className="group tr-divider-b last:border-b-0"
              >
                <summary className="p-6 sm:p-8 flex items-center justify-between gap-4 cursor-pointer list-none hover:bg-[#F7F6F2]/70 transition-colors duration-150">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      style={{ color: "var(--color-brand-orange, #E8490F)" }}
                      className="font-mono font-semibold text-base tabular-nums"
                    >
                      {claim.code}
                    </span>
                    <h3
                      style={{ color: "var(--color-ink-anthracite, #141413)" }}
                      className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#E8490F] transition-colors"
                    >
                      {claim.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#57534E] group-open:text-[#E8490F] shrink-0">
                    + / -
                  </span>
                </summary>

                <div
                  style={{
                    backgroundColor: "var(--color-surface-cream, #F7F6F2)",
                    color: "var(--color-ink-mid, #57534E)",
                  }}
                  className="px-6 sm:px-8 md:px-16 pb-8 pt-4 tr-divider-t leading-relaxed"
                >
                  <p className="max-w-4xl text-sm sm:text-base">
                    {claim.description}
                  </p>
                  <Link
                    href="/contacto?urgencia=true"
                    style={{ color: "var(--color-brand-orange, #E8490F)" }}
                    className="text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 mt-5 hover:underline w-fit"
                  >
                    Solicitar Asistencia Técnica →
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <EmergencyCTA
        variant="empresas"
        company={company}
        data={content.emergency}
      />
    </div>
  );
}
