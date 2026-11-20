import Image from "next/image";
import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "División Empresas e Instituciones B2B",
  description:
    "Habilitación comercial, remodelaciones corporativas y gestión de siniestros 24/7 para empresas, centros comerciales, clínicas y aseguradoras. Más de 22 años de experiencia en Chile.",
  path: "/empresas",
});

export default async function EmpresasPage() {
  const { content, company } = await getSiteConfig();
  const e = content.empresas;

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-white, #FFFFFF)",
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[72px] sm:pt-[104px]"
    >
      {/* ── HERO EDITORIAL OSCURO (#141413) ─────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-surface-dark, #141413)" }}
        className="relative text-white tr-blueprint-grid border-b border-white/10"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-7">
            <SectionLabel label={e.eyebrow} dark />
            <h1 className="font-display tr-heading-page font-black text-white leading-[1.05] mb-6 tracking-tight uppercase">
              {e.titleLine1}{" "}
              <span
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="block sm:inline"
              >
                {e.titleHighlight}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-8 sm:mb-10 max-w-xl font-light leading-relaxed">
              {e.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
              <Link
                href="/contacto"
                style={{
                  backgroundColor: "var(--color-brand-orange, #FF5000)",
                  borderRadius: "var(--tr-btn-radius, 2px)",
                }}
                className="text-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity duration-200 text-center"
              >
                {e.ctaPrimary}
              </Link>
              <Link
                href="/servicios"
                style={{ borderRadius: "var(--tr-btn-radius, 2px)" }}
                className="border border-white/30 bg-white/10 hover:bg-white hover:text-[#141413] text-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-200 text-center"
              >
                {e.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
            <Image
              src={e.heroImage || "/img/fotos/hero-corporativo.jpg"}
              alt="Oficina Corporativa en Construcción — Total Repair Ltda."
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover origin-top-left scale-[1.08]"
              priority
            />
          </div>
        </div>
      </section>

      <LogoCarousel
        title={content.logosTitle}
        logos={content.logos}
        surface="cream"
      />

      {/* ── BENTO GRID SERVICIOS ───────────────────────────────────── */}
      <section className="tr-section tr-container px-4 sm:px-6 md:px-12">
        <div className="mb-14">
          <SectionLabel label={e.bentoEyebrow} />
          <h2
            style={{ color: "var(--color-ink-anthracite, #141413)" }}
            className="font-display tr-heading-section font-black mb-3 tracking-tight uppercase"
          >
            {e.bentoTitle}
          </h2>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="max-w-2xl font-light"
          >
            {e.bentoDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 tr-grid">
          <article
            style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
            className="lg:col-span-2 tr-card overflow-hidden flex flex-col justify-between hover:border-[#FF5000] transition-colors duration-200"
          >
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-100 tr-divider-b">
              <Image
                src={e.featuredImage || "/img/fotos/arquitectura-B2B.jpg"}
                alt={e.featuredTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover origin-top-left scale-[1.08]"
              />
            </div>
            <div className="p-6 sm:p-10">
              <span
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="text-xs font-mono font-bold uppercase tracking-widest mb-3 block"
              >
                {e.featuredLabel}
              </span>
              <h3
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="font-display text-2xl sm:text-3xl font-bold mb-3"
              >
                {e.featuredTitle}
              </h3>
              <p
                style={{ color: "var(--color-ink-mid, #52525B)" }}
                className="max-w-2xl font-light leading-relaxed text-sm sm:text-base"
              >
                {e.featuredDescription}
              </p>
            </div>
          </article>

          <div className="flex flex-col tr-grid">
            <article
              style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
              className="flex-1 tr-card tr-card-pad flex flex-col justify-between hover:border-[#FF5000] transition-colors duration-200"
            >
              <div
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="w-12 h-12 bg-white border border-zinc-200 flex items-center justify-center mb-6"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-display text-xl font-bold mb-2"
                >
                  {e.maintTitle}
                </h3>
                <p
                  style={{ color: "var(--color-ink-mid, #52525B)" }}
                  className="text-sm leading-relaxed font-light"
                >
                  {e.maintDescription}
                </p>
              </div>
            </article>

            <article
              style={{
                backgroundColor: "var(--color-surface-dark, #141413)",
                borderLeft: "4px solid var(--color-brand-orange, #FF5000)",
                borderRadius: "var(--tr-card-radius, 4px)",
              }}
              className="flex-1 tr-card-pad flex flex-col justify-between text-white"
            >
              <div>
                <span
                  style={{ color: "var(--color-brand-orange, #FF5000)" }}
                  className="inline-block bg-[#FF5000]/15 border border-[#FF5000]/40 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-5"
                >
                  {e.claimsBadge}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {e.claimsTitle}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {e.claimsDescription}
                </p>
              </div>
              <Link
                href="/contacto?urgencia=true"
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="mt-6 text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:underline transition-colors duration-200"
              >
                {e.claimsCta} <span className="text-lg">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── GESTIÓN DE SINIESTROS ─────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
        className="tr-section tr-divider-t"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12">
          <div className="mb-12">
            <SectionLabel label={e.uriEyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-black tracking-tight uppercase"
            >
              {e.uriTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 tr-grid">
            {e.uriItems.map((claim) => (
              <article
                key={claim.id}
                style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
                className="group tr-card overflow-hidden hover:border-[#FF5000] transition-all duration-200"
              >
                <div className="relative h-52 overflow-hidden bg-zinc-100 tr-divider-b">
                  <Image
                    src={claim.image}
                    alt={claim.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover origin-top-left scale-[1.08]"
                  />
                </div>
                <div className="tr-card-pad">
                  <span
                    style={{ color: "var(--color-brand-orange, #FF5000)" }}
                    className="text-xs font-mono font-bold mb-2 block"
                  >
                    PROTOCOLO {claim.code}
                  </span>
                  <h3
                    style={{ color: "var(--color-ink-anthracite, #141413)" }}
                    className="text-xl font-bold mb-3"
                  >
                    {claim.title}
                  </h3>
                  <p
                    style={{ color: "var(--color-ink-mid, #52525B)" }}
                    className="text-sm leading-relaxed font-light"
                  >
                    {claim.description}
                  </p>
                </div>
              </article>
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
