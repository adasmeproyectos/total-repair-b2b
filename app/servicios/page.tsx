import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Catálogo Técnico de Servicios y Siniestros",
  description:
    "Especialidades de construcción B2B, carpintería industrial, pintura de alta gama, electricidad certificada SEC, redes de datos y manejo de emergencias 24/7 en Chile.",
  path: "/servicios",
});

const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    carpentery: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.5 14.5l-8.5-8.5L2 16l8.5 8.5L20.5 14.5z" />
        <path d="M12 2l4 4-4 4-4-4 4-4z" />
      </svg>
    ),
    paint: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 11l-4.5 4.5m0 0L7 11l4.5-4.5L16 11z" />
        <path d="M19 19c2 2 4 1 4-1a5 5 0 00-5-5H6a5 5 0 00-5 5c0 2 2 3 4 1" />
      </svg>
    ),
    sec: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    data: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        <path d="M7 6v12M11 6v12M15 6v12M19 6v12" />
      </svg>
    ),
  };
  return (
    <div className="w-8 h-8 text-zinc-500 group-hover:text-[#FF5000] transition-colors duration-200">
      {icons[name] || icons.data}
    </div>
  );
};

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
        color: "var(--color-ink-anthracite, #0F172A)",
      }}
      className="min-h-screen overflow-x-hidden pt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claimsFaqJsonLd) }}
      />

      {/* 1. HERO DIVIDIDO */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
        className="relative tr-divider-b"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-7">
            <SectionLabel label={s.eyebrow} />
            <h1
              style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
              className="tr-heading-page font-black leading-[1.08] mb-6 tracking-tight font-display uppercase"
            >
              {s.title}{" "}
              <span
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="block sm:inline"
              >
                {s.titleHighlight}
              </span>
            </h1>
            <p
              style={{ color: "var(--color-ink-mid, #52525B)" }}
              className="text-base sm:text-lg font-light leading-relaxed max-w-xl"
            >
              {s.description}
            </p>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden tr-card bg-zinc-100">
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

      {/* 2. GRID TÉCNICO DE ESPECIALIDADES */}
      <section className="tr-section tr-container px-4 sm:px-6 md:px-12">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <SectionLabel label={s.specEyebrow} className="justify-center" />
          <h2
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
            className="font-display tr-heading-section font-black mb-3 tracking-tight uppercase"
          >
            {s.specTitle}
          </h2>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="font-light"
          >
            {s.specDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 tr-grid">
          {s.specialities.map((spec) => (
            <article
              key={spec.id}
              style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
              className="group tr-card tr-card-pad flex flex-col justify-between min-h-[220px] transition-colors duration-200 hover:border-[#FF5000]"
            >
              <div className="flex justify-between items-start mb-6">
                <Icon name={spec.icon} />
              </div>
              <div>
                <h3
                  style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                  className="text-lg font-bold leading-snug tracking-tight group-hover:text-[#FF5000] transition-colors duration-200 mb-2"
                >
                  {spec.name}
                </h3>
                <p
                  style={{ color: "var(--color-ink-mid, #52525B)" }}
                  className="text-sm leading-relaxed font-light"
                >
                  {spec.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. SINIESTROS EXPANDIBLES */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
        className="tr-section tr-divider-t"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12">
          <div className="mb-12">
            <span
              style={{ color: "var(--color-brand-orange, #FF5000)" }}
              className="inline-block bg-[#FF5000]/10 border border-[#FF5000]/30 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-4"
            >
              {s.claimsBadge}
            </span>
            <h2
              style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
              className="font-display tr-heading-section font-black mb-3 tracking-tight uppercase"
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
                <summary className="p-6 sm:p-8 md:p-10 flex items-center justify-between gap-4 sm:gap-6 cursor-pointer list-none hover:bg-[#F8FAFC] transition-colors duration-200">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      style={{ color: "var(--color-brand-orange, #FF5000)" }}
                      className="font-mono font-bold text-base sm:text-lg"
                    >
                      {claim.code}
                    </span>
                    <h3
                      style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                      className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#FF5000] transition-colors duration-200"
                    >
                      {claim.title}
                    </h3>
                  </div>
                  <div className="text-zinc-500 group-open:rotate-180 group-open:text-[#FF5000] w-6 h-6 shrink-0 transition-transform duration-200">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div
                  style={{
                    backgroundColor: "var(--color-surface-cream, #F8FAFC)",
                    color: "var(--color-ink-mid, #52525B)",
                  }}
                  className="px-6 sm:px-8 md:px-20 pb-8 sm:pb-10 pt-2 tr-divider-t leading-relaxed font-light"
                >
                  <p className="max-w-4xl pt-4 text-sm sm:text-base">
                    {claim.description}
                  </p>
                  <Link
                    href="/contacto?urgencia=true"
                    style={{ color: "var(--color-brand-orange, #FF5000)" }}
                    className="text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2 mt-6 hover:underline w-fit transition-colors duration-200"
                  >
                    Solicitar Asistencia Técnica <span className="text-lg">→</span>
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
