import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Timeline } from "@/components/ui/Timeline";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Nosotros y Filosofía Corporativa",
  description:
    "Conoce la historia de Total Repair Ltda., fundada el 4 de agosto de 2004 por Patricia Cecilia Gallardo. Más de 22 años liderando obras críticas, remodelaciones y respuesta a siniestros en Chile.",
  path: "/nosotros",
});

function GuaranteeIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
  }
}

export default async function NosotrosPage() {
  const { content, company } = await getSiteConfig();
  const n = content.nosotros;

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-white, #FFFFFF)",
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[72px] sm:pt-[104px]"
    >
      {/* 1. HEADER OSCURO */}
      <section
        style={{ backgroundColor: "var(--color-surface-dark, #141413)" }}
        className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 text-center text-white tr-blueprint-grid"
      >
        <div className="max-w-5xl mx-auto">
          <SectionLabel label={n.eyebrow} className="justify-center" dark />
          <h1 className="font-display tr-heading-page font-black text-white leading-tight mb-6 tracking-tight uppercase">
            {n.title} <br className="hidden sm:inline" />{" "}
            <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
              {n.titleHighlight}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
            {n.description}
          </p>
        </div>
      </section>

      {/* 2. CORE SPECIALIZATION */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
        className="tr-section tr-divider-y"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden tr-card bg-zinc-100">
            <Image
              src={n.coreImage || "/img/fotos/historia-27f.jpg"}
              alt="Ingeniería bajo presión en terreno — Total Repair Ltda."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover origin-top-left scale-[1.08]"
              priority
            />
          </div>

          <div
            style={{
              backgroundColor: "var(--color-surface-white, #FFFFFF)",
              borderLeft: "4px solid var(--color-brand-orange, #FF5000)",
            }}
            className="lg:col-span-6 tr-card p-6 sm:p-10 md:p-12"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              opacity="0.2"
              style={{ color: "var(--color-brand-orange, #FF5000)" }}
              className="w-12 h-12 sm:w-14 sm:h-14 mb-5"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-5"
            >
              {n.coreQuote}
            </p>
            <p
              style={{ color: "var(--color-ink-mid, #52525B)" }}
              className="leading-relaxed font-light text-base sm:text-lg"
            >
              {n.coreDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE CORPORATIVO */}
      <Timeline data={content.timeline} />

      {/* 4. GARANTÍAS */}
      <section className="tr-section px-4 sm:px-6 md:px-12 tr-container">
        <div className="mb-14 text-center">
          <SectionLabel label={n.guaranteesEyebrow} className="justify-center" />
          <h2
            style={{ color: "var(--color-ink-anthracite, #141413)" }}
            className="font-display tr-heading-section font-black mb-3 tracking-tight uppercase"
          >
            {n.guaranteesTitle}
          </h2>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="font-light text-base sm:text-lg"
          >
            {n.guaranteesDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 tr-grid">
          {n.guarantees.map((item) => (
            <article
              key={item.id}
              style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
              className="tr-card tr-card-pad transition-colors duration-200 hover:border-[#FF5000]"
            >
              <div
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="w-14 h-14 bg-white border border-zinc-200 shadow-2xs flex items-center justify-center mb-6"
              >
                <GuaranteeIcon kind={item.icon} />
              </div>
              <h3
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="font-display text-xl font-bold mb-3"
              >
                {item.title}
              </h3>
              <p
                style={{ color: "var(--color-ink-mid, #52525B)" }}
                className="text-sm leading-relaxed font-light"
              >
                {item.description}
              </p>
            </article>
          ))}
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
