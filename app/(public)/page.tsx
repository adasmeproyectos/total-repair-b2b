import Image from "next/image";
import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ProjectSpotlight } from "@/components/ui/ProjectSpotlight";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getPublishedProjects, getSiteConfig } from "@/lib/site-data";
import type { HomeSectionKey } from "@/lib/types/cms";

export const metadata = buildMetadata({
  title:
    "Total Repair | Construcción, Remodelación y Gestión de Siniestros en Chile",
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

  const showcaseProjects = (() => {
    const featured = publishedProjects.filter((p) => p.is_featured);
    if (featured.length >= 3) return featured.slice(0, 3);
    const merged = [...featured];
    for (const p of publishedProjects) {
      if (merged.length >= 3) break;
      if (!merged.some((m) => m.id === p.id)) merged.push(p);
    }
    return merged;
  })();

  const compactMilestones = (() => {
    const items = content.timeline.items;
    if (items.length <= 4) return items;
    const picked = items.filter((i) => i.isHighlight);
    if (picked.length >= 4) return picked.slice(0, 4);
    return [items[0], ...picked, items[items.length - 1]]
      .filter(
        (item, index, arr) =>
          item && arr.findIndex((x) => x.id === item.id) === index
      )
      .slice(0, 4);
  })();

  const sectionOrder: HomeSectionKey[] =
    home.sectionsOrder?.length > 0
      ? home.sectionsOrder
      : ["hero", "logos", "timeline", "spotlight", "cta", "emergency"];

  const isVisible = (key: HomeSectionKey) =>
    home.sectionsVisible?.[key] !== false;

  const intentions = [
    {
      num: "01",
      tag: "Atención 24/7",
      title: "Emergencias y Siniestros",
      description:
        "Inundaciones, incendios o daño estructural en recintos operativos y viviendas, con informes técnicos directos para liquidadores y aseguradoras.",
      cta: "Reportar urgencia ahora",
      href: "/contacto?urgencia=true",
      accent: true,
    },
    {
      num: "02",
      tag: "Sector Corporativo",
      title: home.ctaEmpresasLabel,
      description:
        "Habilitación comercial en malls, oficinas, clínicas e instituciones educativas garantizando continuidad operacional sin detener faenas ni atención al público.",
      cta: "Ver soluciones B2B",
      href: "/empresas",
      accent: false,
    },
    {
      num: "03",
      tag: "Viviendas",
      title: home.ctaHogarLabel,
      description:
        "Remodelación integral de cocinas y baños, gasfitería, redes sanitarias y electricidad certificada SEC con garantía contractual escrita.",
      cta: "Ver servicios para hogar",
      href: "/hogar",
      accent: false,
    },
  ];

  const renderSection = (key: HomeSectionKey) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case "hero":
        return (
          <div key="hero">
            {/* ── 1. HERO EDITORIAL ARQUITECTÓNICO (#F7F6F2) ── */}
            <section
              style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
              className="tr-divider-b"
            >
              <div className="tr-container px-4 sm:px-6 md:px-12 pt-12 sm:pt-16 pb-10 sm:pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-12">
                  <div className="lg:col-span-7">
                    <SectionLabel label={home.badge} />
                    <h1
                      style={{ color: "var(--color-ink-anthracite, #141413)" }}
                      className="font-display tr-heading-hero font-bold leading-[1.02] tracking-tight"
                    >
                      {home.titlePrefix} {home.titleHighlight}.{" "}
                      <span className="block font-medium text-[#57534E] text-[0.58em] leading-[1.2] mt-2">
                        {home.subtitle}
                      </span>
                    </h1>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <p
                      style={{ color: "var(--color-ink-mid, #57534E)" }}
                      className="text-base sm:text-lg leading-relaxed"
                    >
                      {home.descriptionPrefix}{" "}
                      <strong
                        style={{ color: "var(--color-ink-anthracite, #141413)" }}
                        className="font-semibold"
                      >
                        {home.descriptionBold}
                      </strong>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/contacto"
                        style={{
                          backgroundColor: "var(--color-brand-orange, #E8490F)",
                          borderRadius: "var(--tr-btn-radius, 0px)",
                        }}
                        className="text-white px-7 py-3.5 uppercase tracking-wider text-xs font-semibold hover:opacity-90 transition-opacity text-center"
                      >
                        {home.ctaPrimaryLabel}
                      </Link>

                      <Link
                        href="/contacto?urgencia=true"
                        style={{
                          borderRadius: "var(--tr-btn-radius, 0px)",
                          borderColor: "var(--color-ink-anthracite, #141413)",
                          color: "var(--color-ink-anthracite, #141413)",
                        }}
                        className="border px-6 py-3.5 uppercase tracking-wider text-xs font-semibold hover:bg-[#141413] hover:text-white transition-colors text-center"
                      >
                        Emergencia 24/7
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Placa fotográfica panorámica limpia (sin texto encima) */}
                <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden tr-card bg-[#ECEAE3]">
                  <Image
                    src="/img/fotos/hero-corporativo.jpg"
                    alt="Obra corporativa y habilitación B2B — Total Repair Ltda."
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover origin-top-left scale-[1.08]"
                  />
                </div>

                {/* Registro de 4 métricas en grilla suiza */}
                <div className="grid grid-cols-2 md:grid-cols-4 border border-t-0 border-[#D6D3CD] bg-white divide-x divide-y md:divide-y-0 divide-[#D6D3CD]">
                  {[
                    {
                      value: company.yearsExperience,
                      label: "Años de trayectoria en Chile",
                    },
                    {
                      value: company.projectsDelivered,
                      label: "Obras civiles y comerciales",
                    },
                    {
                      value: "24 / 7",
                      label: "Unidad de Siniestros URI",
                    },
                    {
                      value: "SEC · ACHS",
                      label: "Certificación y seguridad",
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 sm:p-6">
                      <p
                        style={{ color: "var(--color-ink-anthracite, #141413)" }}
                        className="font-display text-2xl sm:text-3xl font-bold leading-none tabular-nums"
                      >
                        {stat.value}
                      </p>
                      <p
                        style={{ color: "var(--color-ink-mid, #57534E)" }}
                        className="text-xs font-mono mt-2"
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 2. DIRECTORIO NUMERADO DE INTENCIONES (FILAS EDITORIALES) ── */}
            <section
              style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
              className="tr-section px-4 sm:px-6 md:px-12 tr-divider-b"
            >
              <div className="tr-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 tr-divider-b">
                  <div>
                    <SectionLabel label="Áreas de servicio" />
                    <h2
                      style={{ color: "var(--color-ink-anthracite, #141413)" }}
                      className="font-display tr-heading-section font-bold tracking-tight"
                    >
                      ¿En qué te ayudamos hoy?
                    </h2>
                  </div>
                  <Link
                    href="/proyectos"
                    style={{ color: "var(--color-ink-anthracite, #141413)" }}
                    className="text-xs font-mono uppercase tracking-wider hover:text-[#E8490F] transition-colors"
                  >
                    Explorar portafolio completo →
                  </Link>
                </div>

                <div className="divide-y divide-[#D6D3CD]">
                  {intentions.map((item) => (
                    <Link
                      key={item.num}
                      href={item.href}
                      className="group py-7 sm:py-9 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center hover:bg-[#F7F6F2]/70 transition-colors px-2 -mx-2"
                    >
                      <div className="md:col-span-2 flex items-center gap-3">
                        <span
                          style={{
                            color: item.accent
                              ? "var(--color-brand-orange, #E8490F)"
                              : "var(--color-ink-mid, #57534E)",
                          }}
                          className="font-mono text-sm font-semibold tabular-nums"
                        >
                          {item.num}
                        </span>
                        <span
                          style={{ color: "var(--color-ink-mid, #57534E)" }}
                          className="text-xs font-mono uppercase tracking-wider"
                        >
                          {item.tag}
                        </span>
                      </div>

                      <h3
                        style={{ color: "var(--color-ink-anthracite, #141413)" }}
                        className="md:col-span-4 font-display text-2xl font-bold tracking-tight group-hover:text-[#E8490F] transition-colors"
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{ color: "var(--color-ink-mid, #57534E)" }}
                        className="md:col-span-4 text-sm sm:text-base leading-relaxed"
                      >
                        {item.description}
                      </p>

                      <div className="md:col-span-2 md:text-right">
                        <span
                          style={{
                            color: item.accent
                              ? "var(--color-brand-orange, #E8490F)"
                              : "var(--color-ink-anthracite, #141413)",
                          }}
                          className="text-xs font-mono font-semibold uppercase tracking-wider group-hover:text-[#E8490F] transition-colors"
                        >
                          {item.cta} →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case "logos":
        return (
          <LogoCarousel
            key="logos"
            title={content.logosTitle}
            logos={content.logos}
            surface="white"
          />
        );

      case "spotlight":
        return (
          <div key="spotlight">
            {/* Portafolio visual asimétrico con pies de foto limpios */}
            {showcaseProjects.length > 0 && (
              <section
                style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
                className="tr-section px-4 sm:px-6 md:px-12 tr-divider-b"
              >
                <div className="tr-container">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 tr-divider-b">
                    <div>
                      <SectionLabel label="Registro de obras" />
                      <h2
                        style={{ color: "var(--color-ink-anthracite, #141413)" }}
                        className="font-display tr-heading-section font-bold tracking-tight"
                      >
                        Obras recientes
                      </h2>
                    </div>
                    <Link
                      href="/proyectos"
                      style={{
                        backgroundColor: "var(--color-ink-anthracite, #141413)",
                        borderRadius: "var(--tr-btn-radius, 0px)",
                      }}
                      className="text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#E8490F] transition-colors w-fit"
                    >
                      Ver portafolio completo →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 tr-grid">
                    {/* Obra protagonista (izquierda grande, foto limpia + pie debajo) */}
                    {showcaseProjects[0] && (
                      <Link
                        href="/proyectos"
                        className="lg:col-span-7 group bg-white tr-card overflow-hidden hover:border-[#E8490F] transition-colors flex flex-col"
                      >
                        <div className="relative min-h-[280px] sm:min-h-[360px] flex-1 overflow-hidden bg-[#ECEAE3] tr-divider-b">
                          <Image
                            src={
                              showcaseProjects[0].cover_image_url ||
                              "/img/fotos/hero-corporativo.jpg"
                            }
                            alt={showcaseProjects[0].title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover origin-top-left scale-[1.08] group-hover:scale-[1.11] transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p
                              style={{ color: "var(--color-brand-orange, #E8490F)" }}
                              className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
                            >
                              {showcaseProjects[0].category} ·{" "}
                              {showcaseProjects[0].location}
                            </p>
                            <h3
                              style={{
                                color: "var(--color-ink-anthracite, #141413)",
                              }}
                              className="font-display text-xl sm:text-2xl font-bold group-hover:text-[#E8490F] transition-colors"
                            >
                              {showcaseProjects[0].title}
                            </h3>
                          </div>
                          <span className="text-xs font-mono text-[#57534E] shrink-0">
                            Ver obra →
                          </span>
                        </div>
                      </Link>
                    )}

                    {/* 2 Obras apiladas a la derecha */}
                    <div className="lg:col-span-5 flex flex-col tr-grid">
                      {showcaseProjects.slice(1, 3).map((proj) => (
                        <Link
                          key={proj.id}
                          href="/proyectos"
                          className="group flex-1 bg-white tr-card overflow-hidden hover:border-[#E8490F] transition-colors grid grid-cols-1 sm:grid-cols-12"
                        >
                          <div className="sm:col-span-5 relative h-44 sm:h-auto overflow-hidden bg-[#ECEAE3]">
                            <Image
                              src={
                                proj.cover_image_url ||
                                "/img/fotos/remodelacion-interior.jpg"
                              }
                              alt={proj.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 220px"
                              className="object-cover origin-top-left scale-[1.08]"
                            />
                          </div>
                          <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                            <div>
                              <p
                                style={{
                                  color: "var(--color-brand-orange, #E8490F)",
                                }}
                                className="text-[11px] font-mono font-semibold uppercase tracking-wider mb-1"
                              >
                                {proj.location} · {proj.category}
                              </p>
                              <h3
                                style={{
                                  color: "var(--color-ink-anthracite, #141413)",
                                }}
                                className="font-display font-bold text-lg leading-snug group-hover:text-[#E8490F] transition-colors"
                              >
                                {proj.title}
                              </h3>
                            </div>
                            <span className="text-xs font-mono text-[#57534E] mt-3 inline-block">
                              Ver galería →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <ProjectSpotlight data={content.spotlight} />
          </div>
        );

      case "timeline":
        return (
          <section
            key="timeline"
            style={{ backgroundColor: "var(--color-surface-dark, #141413)" }}
            className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 text-white"
          >
            <div className="tr-container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-white/15">
                <div>
                  <SectionLabel label={content.timeline.eyebrow} dark />
                  <h2 className="font-display tr-heading-section font-bold text-white tracking-tight">
                    {content.timeline.titlePrefix}{" "}
                    {content.timeline.titleHighlight}{" "}
                    {content.timeline.titleSuffix}
                  </h2>
                </div>
                <Link
                  href="/nosotros"
                  style={{ color: "var(--color-brand-orange, #E8490F)" }}
                  className="text-xs font-mono font-semibold uppercase tracking-wider hover:underline shrink-0"
                >
                  Conocer historia completa →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {compactMilestones.map((m) => (
                  <div
                    key={m.id}
                    className="border-t-2 border-white/25 pt-5 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        style={{ color: "var(--color-brand-orange, #E8490F)" }}
                        className="font-mono font-semibold text-sm tracking-wider block mb-2 tabular-nums"
                      >
                        {m.year}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section
            key="cta"
            style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
            className="tr-section px-4 sm:px-6 md:px-12"
          >
            <div className="tr-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <SectionLabel label={home.finalCtaEyebrow} />
                <h2
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-display tr-heading-section font-bold tracking-tight mt-2"
                >
                  {home.finalCtaTitle}{" "}
                  <span style={{ color: "var(--color-brand-orange, #E8490F)" }}>
                    {home.finalCtaHighlight}
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <p
                  style={{ color: "var(--color-ink-mid, #57534E)" }}
                  className="text-base leading-relaxed"
                >
                  {home.finalCtaDescription}
                </p>
                <Link
                  href="/contacto"
                  style={{
                    backgroundColor: "var(--color-brand-orange, #E8490F)",
                    borderRadius: "var(--tr-btn-radius, 0px)",
                  }}
                  className="inline-block w-full sm:w-auto text-white px-9 py-4 font-semibold uppercase tracking-wider text-xs hover:opacity-90 transition-opacity duration-150 text-center"
                >
                  {home.finalCtaButtonLabel}
                </Link>
              </div>
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
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[76px]"
    >
      {sectionOrder.map((key) => renderSection(key))}
    </div>
  );
}
