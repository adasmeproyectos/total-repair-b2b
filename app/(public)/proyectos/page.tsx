import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getPublishedProjects, getSiteConfig } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Portafolio de Proyectos Ejecutados",
  description:
    "Galería de proyectos ejecutados por Total Repair Ltda.: remodelaciones comerciales, habilitaciones B2B, reconstrucción de siniestros y construcción residencial con más de 22 años de experiencia en Chile.",
  path: "/proyectos",
});

export default async function ProyectosPage() {
  const [siteConfig, projects] = await Promise.all([
    getSiteConfig(),
    getPublishedProjects(),
  ]);

  const { content, company } = siteConfig;
  const p = content.proyectos;

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-white, #FFFFFF)",
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[76px]"
    >
      {/* ── HEADER EDITORIAL (#F7F6F2) ────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
        className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 tr-divider-b"
      >
        <div className="tr-container grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <SectionLabel label={p.eyebrow} />
            <h1
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-page font-bold tracking-tight"
            >
              {p.title}{" "}
              <span
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="block sm:inline"
              >
                {p.titleHighlight}
              </span>
            </h1>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-base leading-relaxed"
          >
            {p.description}
          </p>
        </div>
      </section>

      {/* ── GALERÍA DINÁMICA DE PROYECTOS ─────────────────────────────────── */}
      <section className="tr-section px-4 sm:px-6 md:px-12 tr-container">
        <ProjectsGallery projects={projects} />

        {/* CTA Solicitar presupuesto */}
        <div className="mt-16 pt-12 tr-divider-t grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <SectionLabel label={p.ctaEyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold"
            >
              {p.ctaTitle}
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-5">
            <p
              style={{ color: "var(--color-ink-mid, #57534E)" }}
              className="leading-relaxed"
            >
              {p.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contacto"
                style={{
                  backgroundColor: "var(--color-brand-orange, #E8490F)",
                  borderRadius: "var(--tr-btn-radius, 0px)",
                }}
                className="text-white px-8 py-4 font-semibold uppercase tracking-wider text-xs hover:opacity-90 transition-opacity duration-150 text-center"
              >
                {p.ctaPrimary}
              </Link>
              <Link
                href="/servicios"
                style={{
                  borderColor: "var(--color-ink-anthracite, #141413)",
                  color: "var(--color-ink-anthracite, #141413)",
                  borderRadius: "var(--tr-btn-radius, 0px)",
                }}
                className="border px-8 py-4 font-semibold uppercase tracking-wider text-xs hover:bg-[#141413] hover:text-white transition-colors duration-150 text-center"
              >
                {p.ctaSecondary}
              </Link>
            </div>
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
