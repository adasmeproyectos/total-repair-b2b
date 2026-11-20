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
        color: "var(--color-ink-anthracite, #0F172A)",
      }}
      className="min-h-screen overflow-x-hidden pt-20"
    >
      {/* ── HEADER ───────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 tr-divider-b"
      >
        <div className="tr-container">
          <SectionLabel label={p.eyebrow} />
          <h1
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
            className="font-display tr-heading-page font-black tracking-tight mb-6 uppercase"
          >
            {p.title}{" "}
            <span
              style={{ color: "var(--color-brand-orange, #FF5000)" }}
              className="block sm:inline"
            >
              {p.titleHighlight}
            </span>
          </h1>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="text-base sm:text-lg max-w-2xl font-light leading-relaxed"
          >
            {p.description}
          </p>
        </div>
      </section>

      {/* ── GALERÍA DINÁMICA DE PROYECTOS ─────────────────────────────────── */}
      <section className="tr-section px-4 sm:px-6 md:px-12 tr-container">
        <ProjectsGallery projects={projects} />

        {/* CTA Solicitar presupuesto */}
        <div className="mt-20 text-center tr-divider-t pt-16">
          <SectionLabel label={p.ctaEyebrow} className="justify-center" />
          <h2
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
            className="font-display tr-heading-section font-black mb-4 uppercase"
          >
            {p.ctaTitle}
          </h2>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="max-w-lg mx-auto mb-8 font-light leading-relaxed"
          >
            {p.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              style={{
                backgroundColor: "var(--color-brand-orange, #FF5000)",
                borderRadius: "var(--tr-btn-radius, 2px)",
              }}
              className="text-white px-10 py-4 font-bold uppercase tracking-widest text-xs sm:text-sm hover:opacity-90 transition-opacity duration-200"
            >
              {p.ctaPrimary}
            </Link>
            <Link
              href="/servicios"
              style={{
                backgroundColor: "var(--color-surface-cream, #F8FAFC)",
                color: "var(--color-ink-anthracite, #0F172A)",
                borderRadius: "var(--tr-btn-radius, 2px)",
              }}
              className="border border-zinc-300 px-10 py-4 font-bold uppercase tracking-widest text-xs sm:text-sm hover:border-[#FF5000] hover:text-[#FF5000] transition-colors duration-200"
            >
              {p.ctaSecondary}
            </Link>
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
