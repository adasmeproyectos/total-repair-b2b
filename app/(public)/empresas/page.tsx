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
      className="min-h-screen overflow-x-hidden pt-[76px]"
    >
      {/* ── HERO ARQUITECTÓNICO (#F7F6F2) ─────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
        className="tr-divider-b"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-7">
            <SectionLabel label={e.eyebrow} />
            <h1
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-page font-bold leading-[1.05] mb-6 tracking-tight"
            >
              {e.titleLine1}{" "}
              <span
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="block sm:inline"
              >
                {e.titleHighlight}
              </span>
            </h1>
            <p
              style={{ color: "var(--color-ink-mid, #57534E)" }}
              className="text-base sm:text-lg mb-8 max-w-xl leading-relaxed"
            >
              {e.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contacto"
                style={{
                  backgroundColor: "var(--color-brand-orange, #E8490F)",
                  borderRadius: "var(--tr-btn-radius, 0px)",
                }}
                className="text-white px-7 py-4 text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 text-center"
              >
                {e.ctaPrimary}
              </Link>
              <Link
                href="/servicios"
                style={{
                  borderRadius: "var(--tr-btn-radius, 0px)",
                  borderColor: "var(--color-ink-anthracite, #141413)",
                  color: "var(--color-ink-anthracite, #141413)",
                }}
                className="border px-7 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-[#141413] hover:text-white transition-colors duration-150 text-center"
              >
                {e.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden tr-card bg-[#ECEAE3]">
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
        surface="white"
      />

      {/* ── SOLUCIONES CORPORATIVAS ──────────────────────────────── */}
      <section className="tr-section tr-container px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 mb-12 tr-divider-b">
          <div className="lg:col-span-7">
            <SectionLabel label={e.bentoEyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {e.bentoTitle}
            </h2>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-sm sm:text-base leading-relaxed"
          >
            {e.bentoDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 tr-grid">
          <article
            style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
            className="lg:col-span-2 tr-card overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#ECEAE3] tr-divider-b">
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
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="text-xs font-mono font-semibold uppercase tracking-wider mb-3 block"
              >
                01 · {e.featuredLabel}
              </span>
              <h3
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="font-display text-2xl sm:text-3xl font-bold mb-3"
              >
                {e.featuredTitle}
              </h3>
              <p
                style={{ color: "var(--color-ink-mid, #57534E)" }}
                className="max-w-2xl leading-relaxed text-sm sm:text-base"
              >
                {e.featuredDescription}
              </p>
            </div>
          </article>

          <div className="flex flex-col tr-grid">
            <article
              style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
              className="flex-1 tr-card tr-card-pad flex flex-col justify-between"
            >
              <span
                style={{ color: "var(--color-ink-mid, #57534E)" }}
                className="text-xs font-mono font-semibold uppercase tracking-wider mb-6 block"
              >
                02 · Continuidad Operativa
              </span>
              <div>
                <h3
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-display text-xl font-bold mb-2"
                >
                  {e.maintTitle}
                </h3>
                <p
                  style={{ color: "var(--color-ink-mid, #57534E)" }}
                  className="text-sm leading-relaxed"
                >
                  {e.maintDescription}
                </p>
              </div>
            </article>

            <article
              style={{
                backgroundColor: "var(--color-surface-dark, #141413)",
                borderLeft: "4px solid var(--color-brand-orange, #E8490F)",
                borderRadius: "var(--tr-card-radius, 0px)",
              }}
              className="flex-1 tr-card-pad flex flex-col justify-between text-white"
            >
              <div>
                <span
                  style={{ color: "var(--color-brand-orange, #E8490F)" }}
                  className="block text-xs font-mono font-semibold uppercase tracking-wider mb-4"
                >
                  03 · {e.claimsBadge}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {e.claimsTitle}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {e.claimsDescription}
                </p>
              </div>
              <Link
                href="/contacto?urgencia=true"
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="mt-6 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 hover:underline"
              >
                {e.claimsCta} →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── GESTIÓN DE SINIESTROS ─────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
        className="tr-section tr-divider-t"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12">
          <div className="pb-8 mb-10 tr-divider-b">
            <SectionLabel label={e.uriEyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {e.uriTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 tr-grid">
            {e.uriItems.map((claim) => (
              <article
                key={claim.id}
                style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
                className="tr-card overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden bg-[#ECEAE3] tr-divider-b">
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
                    style={{ color: "var(--color-brand-orange, #E8490F)" }}
                    className="text-xs font-mono font-semibold mb-2 block"
                  >
                    PROTOCOLO {claim.code}
                  </span>
                  <h3
                    style={{ color: "var(--color-ink-anthracite, #141413)" }}
                    className="font-display text-xl font-bold mb-2.5"
                  >
                    {claim.title}
                  </h3>
                  <p
                    style={{ color: "var(--color-ink-mid, #57534E)" }}
                    className="text-sm leading-relaxed"
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
