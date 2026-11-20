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

export default async function NosotrosPage() {
  const { content, company } = await getSiteConfig();
  const n = content.nosotros;

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-white, #FFFFFF)",
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[76px]"
    >
      {/* 1. HEADER EDITORIAL (#F7F6F2) */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 tr-divider-b"
      >
        <div className="tr-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <SectionLabel label={n.eyebrow} />
            <h1
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-page font-bold leading-tight tracking-tight"
            >
              {n.title}{" "}
              <span style={{ color: "var(--color-brand-orange, #E8490F)" }}>
                {n.titleHighlight}
              </span>
            </h1>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-base leading-relaxed"
          >
            {n.description}
          </p>
        </div>
      </section>

      {/* 2. ESPECIALIZACIÓN EN TERRENO */}
      <section
        style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
        className="tr-section tr-divider-b"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden tr-card bg-[#ECEAE3]">
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
              backgroundColor: "var(--color-surface-cream, #F7F6F2)",
              borderLeft: "4px solid var(--color-brand-orange, #E8490F)",
            }}
            className="lg:col-span-6 tr-card p-6 sm:p-10 md:p-12"
          >
            <p
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-5"
            >
              {n.coreQuote}
            </p>
            <p
              style={{ color: "var(--color-ink-mid, #57534E)" }}
              className="leading-relaxed text-base"
            >
              {n.coreDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE CORPORATIVO */}
      <Timeline data={content.timeline} />

      {/* 4. GARANTÍAS Y CERTIFICACIONES */}
      <section className="tr-section px-4 sm:px-6 md:px-12 tr-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 mb-10 tr-divider-b">
          <div className="lg:col-span-7">
            <SectionLabel label={n.guaranteesEyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {n.guaranteesTitle}
            </h2>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-base"
          >
            {n.guaranteesDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#D6D3CD] divide-y md:divide-y-0 md:divide-x divide-[#D6D3CD]">
          {n.guarantees.map((item, idx) => (
            <article
              key={item.id}
              style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
              className="tr-card-pad flex flex-col justify-between"
            >
              <span
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="font-mono text-sm font-semibold block mb-6 tabular-nums"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-display text-xl font-bold mb-2.5"
                >
                  {item.title}
                </h3>
                <p
                  style={{ color: "var(--color-ink-mid, #57534E)" }}
                  className="text-sm leading-relaxed"
                >
                  {item.description}
                </p>
              </div>
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
