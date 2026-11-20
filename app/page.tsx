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

  const renderSection = (key: HomeSectionKey) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case "hero":
        return (
          <div key="hero">
            {/* ── 1. HERO CINEMATOGRÁFICO OSCURO (#141413) ── */}
            <section
              style={{
                backgroundColor: "var(--color-surface-dark, #141413)",
              }}
              className="relative overflow-hidden text-white tr-blueprint-grid"
            >
              {/* Fondo fotográfico con scrim oscuro para legibilidad */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                  src="/img/fotos/hero-corporativo.jpg"
                  alt="Obra corporativa Total Repair"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover opacity-25 origin-top-left scale-[1.08]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(20,20,19,0.96) 0%, rgba(20,20,19,0.86) 55%, rgba(20,20,19,0.65) 100%)",
                  }}
                />
              </div>

              <div className="relative z-10 tr-container px-4 sm:px-6 md:px-12 pt-14 sm:pt-20 pb-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#FF5000]/40 bg-[#FF5000]/15 text-[#FF5000] text-xs font-mono font-bold uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#FF5000]" />
                    <span>{home.badge}</span>
                  </div>

                  <h1 className="font-display font-black tracking-tight leading-[0.96] uppercase">
                    <span className="block tr-heading-hero text-white">
                      {home.titlePrefix}{" "}
                      <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                        {home.titleHighlight}
                      </span>
                    </span>
                  </h1>

                  <p className="text-xl sm:text-2xl font-bold text-zinc-100 leading-snug max-w-2xl">
                    {home.subtitle}
                  </p>

                  <p className="text-base sm:text-lg text-zinc-300 font-light max-w-xl leading-relaxed">
                    {home.descriptionPrefix}{" "}
                    <strong className="text-white font-semibold">
                      {home.descriptionBold}
                    </strong>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                    <Link
                      href="/contacto"
                      style={{
                        backgroundColor: "var(--color-brand-orange, #FF5000)",
                        borderRadius: "var(--tr-btn-radius, 2px)",
                      }}
                      className="text-white px-8 py-4 uppercase tracking-widest text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity text-center shadow-lg"
                    >
                      {home.ctaPrimaryLabel}
                    </Link>

                    <Link
                      href="/contacto?urgencia=true"
                      style={{
                        borderRadius: "var(--tr-btn-radius, 2px)",
                      }}
                      className="border border-white/35 bg-white/10 hover:bg-white hover:text-[#141413] text-white px-7 py-4 uppercase tracking-widest text-xs sm:text-sm font-bold transition-colors text-center"
                    >
                      🚨 Emergencia 24/7
                    </Link>
                  </div>
                </div>

                {/* Fotografía destacada enmarcada (Desktop) */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
                    <Image
                      src="/img/fotos/hero-corporativo.jpg"
                      alt="Construcción y Remodelación B2B Total Repair"
                      fill
                      priority
                      sizes="42vw"
                      className="object-cover origin-top-left scale-[1.08]"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5">
                      <p className="text-[11px] font-mono uppercase tracking-widest text-[#FF5000] font-bold">
                        Obras Civiles & Siniestros
                      </p>
                      <p className="text-white font-bold text-sm mt-0.5">
                        Continuidad operacional garantizada en espacios activos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra inferior de 4 métricas de confianza */}
              <div className="relative z-10 border-t border-white/15 bg-black/35">
                <div className="tr-container px-4 sm:px-6 md:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: company.yearsExperience, label: "Años de Trayectoria" },
                    { value: company.projectsDelivered, label: "Obras Ejecutadas" },
                    { value: "24 / 7", label: "Unidad Siniestros URI" },
                    { value: "SEC / ACHS", label: "Normativa Certificada" },
                  ].map((stat) => (
                    <div key={stat.label} className="border-l-2 border-[#FF5000] pl-3.5">
                      <p
                        style={{ color: "var(--color-brand-orange, #FF5000)" }}
                        className="font-display text-2xl sm:text-3xl font-black leading-none"
                      >
                        {stat.value}
                      </p>
                      <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-zinc-300 mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 2. SELECTOR DE 3 INTENCIONES ("¿EN QUÉ TE AYUDAMOS HOY?") ── */}
            <section
              style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
              className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 tr-divider-b"
            >
              <div className="tr-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                  <div>
                    <SectionLabel label="Elige tu camino" />
                    <h2
                      style={{ color: "var(--color-ink-anthracite, #141413)" }}
                      className="font-display tr-heading-section font-black uppercase tracking-tight"
                    >
                      ¿En qué te ayudamos{" "}
                      <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                        hoy?
                      </span>
                    </h2>
                  </div>
                  <Link
                    href="/proyectos"
                    style={{ color: "var(--color-brand-orange, #FF5000)" }}
                    className="text-xs sm:text-sm font-bold uppercase tracking-widest hover:underline"
                  >
                    Explorar portafolio de fotos →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 tr-grid">
                  {/* Intención 1: Emergencias 24/7 */}
                  <Link
                    href="/contacto?urgencia=true"
                    style={{
                      backgroundColor: "var(--color-surface-dark, #141413)",
                      borderRadius: "var(--tr-card-radius, 4px)",
                      borderTop: "4px solid var(--color-brand-orange, #FF5000)",
                    }}
                    className="group overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 text-white"
                  >
                    <div className="relative h-44 overflow-hidden bg-black/50">
                      <Image
                        src="/img/fotos/dano-incendio.jpg"
                        alt="Emergencias y siniestros 24/7"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover origin-top-left scale-[1.08] opacity-75 group-hover:scale-[1.12] transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-[#FF5000] text-white text-[11px] font-mono font-bold uppercase px-2.5 py-1">
                        🚨 Atención 24/7
                      </span>
                    </div>
                    <div className="tr-card-pad flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                          Emergencias y Siniestros
                        </h3>
                        <p className="text-sm text-zinc-300 font-light">
                          Inundaciones, incendios o daño estructural con informes para aseguradoras.
                        </p>
                      </div>
                      <span className="text-[#FF5000] text-xs font-bold uppercase tracking-widest">
                        Reportar urgencia ahora →
                      </span>
                    </div>
                  </Link>

                  {/* Intención 2: Empresas B2B */}
                  <Link
                    href="/empresas"
                    style={{
                      backgroundColor: "var(--color-surface-white, #FFFFFF)",
                    }}
                    className="group tr-card overflow-hidden flex flex-col justify-between hover:border-[#FF5000] transition-all duration-200"
                  >
                    <div className="relative h-44 overflow-hidden bg-zinc-100 tr-divider-b">
                      <Image
                        src="/img/fotos/arquitectura-B2B.jpg"
                        alt="División Empresas y Retail B2B"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover origin-top-left scale-[1.08] group-hover:scale-[1.12] transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-[#141413] text-white text-[11px] font-mono font-bold uppercase px-2.5 py-1">
                        Sector Corporativo
                      </span>
                    </div>
                    <div className="tr-card-pad flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3
                          style={{ color: "var(--color-ink-anthracite, #141413)" }}
                          className="font-display text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#FF5000] transition-colors"
                        >
                          {home.ctaEmpresasLabel}
                        </h3>
                        <p
                          style={{ color: "var(--color-ink-mid, #52525B)" }}
                          className="text-sm font-light"
                        >
                          Habilitación de oficinas, retail, clínicas y mantención preventiva sin detener operaciones.
                        </p>
                      </div>
                      <span
                        style={{ color: "var(--color-brand-orange, #FF5000)" }}
                        className="text-xs font-bold uppercase tracking-widest"
                      >
                        Ver soluciones B2B →
                      </span>
                    </div>
                  </Link>

                  {/* Intención 3: Hogar */}
                  <Link
                    href="/hogar"
                    style={{
                      backgroundColor: "var(--color-surface-white, #FFFFFF)",
                    }}
                    className="group tr-card overflow-hidden flex flex-col justify-between hover:border-[#FF5000] transition-all duration-200"
                  >
                    <div className="relative h-44 overflow-hidden bg-zinc-100 tr-divider-b">
                      <Image
                        src="/img/fotos/hero-hogar.jpg"
                        alt="División Hogar y Remodelaciones"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover origin-top-left scale-[1.08] group-hover:scale-[1.12] transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-[#141413] text-white text-[11px] font-mono font-bold uppercase px-2.5 py-1">
                        Viviendas
                      </span>
                    </div>
                    <div className="tr-card-pad flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3
                          style={{ color: "var(--color-ink-anthracite, #141413)" }}
                          className="font-display text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#FF5000] transition-colors"
                        >
                          {home.ctaHogarLabel}
                        </h3>
                        <p
                          style={{ color: "var(--color-ink-mid, #52525B)" }}
                          className="text-sm font-light"
                        >
                          Cocinas, baños, gasfitería, electricidad certificada SEC y arreglos con garantía escrita.
                        </p>
                      </div>
                      <span
                        style={{ color: "var(--color-brand-orange, #FF5000)" }}
                        className="text-xs font-bold uppercase tracking-widest"
                      >
                        Ver servicios para hogar →
                      </span>
                    </div>
                  </Link>
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
            {/* Portafolio visual asimétrico con proyectos reales de Supabase */}
            {showcaseProjects.length > 0 && (
              <section
                style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
                className="tr-section px-4 sm:px-6 md:px-12 tr-divider-b"
              >
                <div className="tr-container">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                      <SectionLabel label="Galería Real de Trabajos" />
                      <h2
                        style={{ color: "var(--color-ink-anthracite, #141413)" }}
                        className="font-display tr-heading-section font-black uppercase"
                      >
                        Obras{" "}
                        <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                          Recientes
                        </span>
                      </h2>
                    </div>
                    <Link
                      href="/proyectos"
                      style={{
                        backgroundColor: "var(--color-ink-anthracite, #141413)",
                        borderRadius: "var(--tr-btn-radius, 2px)",
                      }}
                      className="text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#FF5000] transition-colors w-fit"
                    >
                      Ver galería completa →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 tr-grid">
                    {/* Obra protagonista (izquierda grande) */}
                    {showcaseProjects[0] && (
                      <Link
                        href="/proyectos"
                        className="lg:col-span-7 group relative min-h-[340px] sm:min-h-[420px] overflow-hidden tr-card bg-zinc-900 block"
                      >
                        <Image
                          src={
                            showcaseProjects[0].cover_image_url ||
                            "/img/fotos/hero-corporativo.jpg"
                          }
                          alt={showcaseProjects[0].title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover origin-top-left scale-[1.08] group-hover:scale-[1.12] transition-transform duration-300 opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                          <span className="inline-block bg-[#FF5000] text-white text-[11px] font-mono font-bold uppercase px-2.5 py-1 mb-3">
                            {showcaseProjects[0].category} · {showcaseProjects[0].location}
                          </span>
                          <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                            {showcaseProjects[0].title}
                          </h3>
                        </div>
                      </Link>
                    )}

                    {/* 2 Obras apiladas a la derecha */}
                    <div className="lg:col-span-5 flex flex-col tr-grid">
                      {showcaseProjects.slice(1, 3).map((proj) => (
                        <Link
                          key={proj.id}
                          href="/proyectos"
                          style={{
                            backgroundColor: "var(--color-surface-cream, #F5F3EE)",
                          }}
                          className="group flex-1 tr-card overflow-hidden hover:border-[#FF5000] transition-colors grid grid-cols-1 sm:grid-cols-12"
                        >
                          <div className="sm:col-span-5 relative h-44 sm:h-auto overflow-hidden bg-zinc-200">
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
                          <div className="sm:col-span-7 p-5 flex flex-col justify-center">
                            <p
                              style={{ color: "var(--color-brand-orange, #FF5000)" }}
                              className="text-[11px] font-mono font-bold uppercase tracking-wider mb-1"
                            >
                              {proj.location}
                            </p>
                            <h3
                              style={{ color: "var(--color-ink-anthracite, #141413)" }}
                              className="font-display font-bold text-lg leading-snug group-hover:text-[#FF5000] transition-colors"
                            >
                              {proj.title}
                            </h3>
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
            className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 text-white tr-blueprint-grid"
          >
            <div className="tr-container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <SectionLabel label={content.timeline.eyebrow} dark />
                  <h2 className="font-display tr-heading-section font-black uppercase text-white">
                    {content.timeline.titlePrefix}{" "}
                    <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                      {content.timeline.titleHighlight}
                    </span>{" "}
                    {content.timeline.titleSuffix}
                  </h2>
                </div>
                <Link
                  href="/nosotros"
                  style={{ color: "var(--color-brand-orange, #FF5000)" }}
                  className="text-xs sm:text-sm font-bold uppercase tracking-widest hover:underline shrink-0"
                >
                  Conocer historia completa →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {compactMilestones.map((m) => (
                  <div
                    key={m.id}
                    className="border border-white/15 bg-white/5 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        style={{ color: "var(--color-brand-orange, #FF5000)" }}
                        className="font-mono font-bold text-sm tracking-widest block mb-2"
                      >
                        {m.year}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-zinc-300 font-light line-clamp-3">
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
            className="tr-section px-4 sm:px-6 md:px-12 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <SectionLabel
                label={home.finalCtaEyebrow}
                className="justify-center"
              />
              <h2
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
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
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[72px] sm:pt-[104px]"
    >
      {sectionOrder.map((key) => renderSection(key))}
    </div>
  );
}
