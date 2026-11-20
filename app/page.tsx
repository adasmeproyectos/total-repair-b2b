import Image from "next/image";
import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Timeline } from "@/components/ui/Timeline";
import { ProjectSpotlight } from "@/components/ui/ProjectSpotlight";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getPublishedProjects, getSiteConfig } from "@/lib/site-data";
import type { HomeSectionKey } from "@/lib/types/cms";

export const metadata = buildMetadata({
  title: "Total Repair | Construcción, Remodelación y Gestión de Siniestros en Chile",
  description:
    "Empresa constructora y contratista general con más de 22 años de experiencia en Chile. Especialistas en reconstrucción de siniestros 24/7, habilitación corporativa B2B y remodelación residencial.",
  path: "/",
});

export default async function Home() {
  const [siteConfig, publishedProjects] = await Promise.all([
    getSiteConfig(),
    getPublishedProjects(),
  ]);

  const { content, company } = siteConfig;
  const home = content.home;
  const featuredProjects = publishedProjects
    .filter((p) => p.is_featured)
    .slice(0, 3);

  const sectionOrder: HomeSectionKey[] =
    home.sectionsOrder?.length > 0
      ? home.sectionsOrder
      : ["hero", "logos", "timeline", "spotlight", "cta", "emergency"];

  const isVisible = (key: HomeSectionKey) =>
    home.sectionsVisible?.[key] !== false;

  const renderSection = (key: HomeSectionKey) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case "hero":
        return (
          <section
            key="hero"
            style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
            className="relative min-h-[82vh] flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
          >
            <div className="relative z-10 max-w-6xl w-full text-center">
              <div className="flex justify-center mb-6 sm:mb-8">
                <span
                  style={{
                    color: "var(--color-brand-orange, #FF5000)",
                    borderRadius: "var(--tr-btn-radius, 2px)",
                  }}
                  className="px-4 py-2 border border-[#FF5000]/30 bg-[#FF5000]/5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest"
                >
                  {home.badge}
                </span>
              </div>

              <h1 className="font-display font-black tracking-tight leading-none mb-6">
                <span className="block tr-heading-hero leading-none">
                  <span style={{ color: "var(--color-ink-anthracite, #0F172A)" }}>
                    {home.titlePrefix}
                  </span>{" "}
                  <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                    {home.titleHighlight}
                  </span>
                </span>
              </h1>

              <div className="mb-10 sm:mb-12">
                <p
                  style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                >
                  {home.subtitle}
                </p>
                <p
                  style={{ color: "var(--color-ink-mid, #52525B)" }}
                  className="text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
                >
                  {home.descriptionPrefix}{" "}
                  <strong
                    style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                    className="font-semibold"
                  >
                    {home.descriptionBold}
                  </strong>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4">
                <Link
                  href="/contacto"
                  style={{
                    backgroundColor: "var(--color-brand-orange, #FF5000)",
                    borderRadius: "var(--tr-btn-radius, 2px)",
                  }}
                  className="w-full sm:w-auto text-white px-8 py-4 uppercase tracking-widest text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity duration-200 text-center"
                >
                  {home.ctaPrimaryLabel}
                </Link>
                <Link
                  href="/empresas"
                  style={{
                    backgroundColor: "var(--color-ink-anthracite, #0F172A)",
                    borderRadius: "var(--tr-btn-radius, 2px)",
                  }}
                  className="w-full sm:w-auto text-white px-8 py-4 uppercase tracking-widest text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity duration-200 text-center"
                >
                  {home.ctaEmpresasLabel}
                </Link>
                <Link
                  href="/hogar"
                  style={{
                    backgroundColor: "var(--color-surface-cream, #F8FAFC)",
                    color: "var(--color-ink-anthracite, #0F172A)",
                    borderRadius: "var(--tr-btn-radius, 2px)",
                  }}
                  className="w-full sm:w-auto border border-zinc-300 px-8 py-4 uppercase tracking-widest text-xs sm:text-sm font-bold hover:border-[#FF5000] hover:text-[#FF5000] transition-colors duration-200 text-center"
                >
                  {home.ctaHogarLabel}
                </Link>
              </div>
            </div>
          </section>
        );

      case "logos":
        return (
          <LogoCarousel
            key="logos"
            title={content.logosTitle}
            logos={content.logos}
          />
        );

      case "timeline":
        return <Timeline key="timeline" data={content.timeline} />;

      case "spotlight":
        return (
          <div key="spotlight">
            <ProjectSpotlight data={content.spotlight} />
            {featuredProjects.length > 0 && (
              <section
                style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
                className="py-16 px-4 sm:px-6 md:px-12 tr-divider-b"
              >
                <div className="tr-container">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                      <SectionLabel label="Portafolio Destacado" />
                      <h2
                        style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                        className="font-display text-2xl sm:text-3xl font-black uppercase"
                      >
                        Obras Recientes
                      </h2>
                    </div>
                    <Link
                      href="/proyectos"
                      style={{ color: "var(--color-brand-orange, #FF5000)" }}
                      className="text-xs sm:text-sm font-bold uppercase tracking-widest hover:underline"
                    >
                      Ver todos los proyectos →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 tr-grid">
                    {featuredProjects.map((proj) => (
                      <Link
                        key={proj.id}
                        href="/proyectos"
                        style={{
                          backgroundColor: "var(--color-surface-cream, #F8FAFC)",
                        }}
                        className="group tr-card overflow-hidden hover:border-[#FF5000] transition-colors duration-200 block"
                      >
                        <div className="relative h-48 overflow-hidden bg-zinc-100 tr-divider-b">
                          <Image
                            src={
                              proj.cover_image_url ||
                              "/img/fotos/hero-corporativo.jpg"
                            }
                            alt={proj.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover origin-top-left scale-[1.08]"
                          />
                        </div>
                        <div className="tr-card-pad">
                          <p
                            style={{ color: "var(--color-brand-orange, #FF5000)" }}
                            className="text-xs font-mono font-bold uppercase tracking-wider mb-1.5"
                          >
                            {proj.location}
                          </p>
                          <h3
                            style={{
                              color: "var(--color-ink-anthracite, #0F172A)",
                            }}
                            className="font-bold text-lg group-hover:text-[#FF5000] transition-colors"
                          >
                            {proj.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        );

      case "cta":
        return (
          <section
            key="cta"
            style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
            className="tr-section px-4 sm:px-6 md:px-12 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <SectionLabel
                label={home.finalCtaEyebrow}
                className="justify-center"
              />
              <h2
                style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                className="font-display tr-heading-section font-black tracking-tight mb-6 mt-4 uppercase"
              >
                {home.finalCtaTitle}{" "}
                <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                  {home.finalCtaHighlight}
                </span>
              </h2>
              <p
                style={{ color: "var(--color-ink-mid, #52525B)" }}
                className="font-light mb-10 max-w-lg mx-auto text-base sm:text-lg leading-relaxed"
              >
                {home.finalCtaDescription}
              </p>
              <Link
                href="/contacto"
                style={{
                  backgroundColor: "var(--color-brand-orange, #FF5000)",
                  borderRadius: "var(--tr-btn-radius, 2px)",
                }}
                className="inline-block w-full sm:w-auto text-white px-10 py-5 font-bold uppercase tracking-widest text-xs sm:text-sm hover:opacity-90 transition-opacity duration-200"
              >
                {home.finalCtaButtonLabel}
              </Link>
            </div>
          </section>
        );

      case "emergency":
        return (
          <EmergencyCTA
            key="emergency"
            variant="empresas"
            company={company}
            data={content.emergency}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-white, #FFFFFF)",
        color: "var(--color-ink-anthracite, #0F172A)",
      }}
      className="min-h-screen overflow-x-hidden pt-20"
    >
      {sectionOrder.map((key) => renderSection(key))}
    </div>
  );
}
