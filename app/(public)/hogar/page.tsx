import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { getPublishedProjects, getSiteConfig } from "@/lib/site-data";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { safeJsonLd } from "@/lib/security";

export const metadata = buildMetadata({
  title: "División Hogar — Total Construye",
  description:
    "Remodelación integral de cocinas, baños, gasfitería, electricidad certificada SEC y reparación de siniestros domiciliarios en Santiago.",
  path: "/hogar",
});

export default async function HogarPage() {
  const [siteConfig, publishedProjects] = await Promise.all([
    getSiteConfig(),
    getPublishedProjects(),
  ]);

  const { content, company } = siteConfig;
  const h = content.hogar;

  const hogarProjects = publishedProjects
    .filter((p) => p.division === "hogar")
    .slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: h.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-white, #FFFFFF)",
        color: "var(--color-ink-anthracite, #141413)",
      }}
      className="min-h-screen overflow-x-hidden pt-[76px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
      />

      {/* ── HERO RESIDENCIAL (#F7F6F2) ────────────────────── */}
      <section
        style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
        className="tr-divider-b"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-7">
            <SectionLabel label={h.eyebrow} />
            <h1
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-page font-bold leading-[1.06] mb-6 tracking-tight"
            >
              {h.title}{" "}
              <span
                style={{ color: "var(--color-brand-orange, #E8490F)" }}
                className="block sm:inline"
              >
                {h.titleHighlight}
              </span>
            </h1>
            <p
              style={{ color: "var(--color-ink-mid, #57534E)" }}
              className="text-base sm:text-lg mb-8 max-w-xl leading-relaxed"
            >
              {h.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contacto?modo=hogar"
                style={{
                  backgroundColor: "var(--color-brand-orange, #E8490F)",
                  borderRadius: "var(--tr-btn-radius, 0px)",
                }}
                className="text-white px-7 py-4 text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 text-center"
              >
                {h.ctaPrimary}
              </Link>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderRadius: "var(--tr-btn-radius, 0px)",
                  borderColor: "var(--color-ink-anthracite, #141413)",
                  color: "var(--color-ink-anthracite, #141413)",
                }}
                className="border px-7 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-[#141413] hover:text-white transition-colors duration-150 text-center"
              >
                {h.ctaWhatsapp}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden tr-card bg-[#ECEAE3]">
            <Image
              src={h.heroImage || "/img/fotos/hero-hogar.jpg"}
              alt="Remodelación de hogar moderno — Total Repair Ltda."
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover origin-top-left scale-[1.08]"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── STATS HOGAR EN GRILLA SUIZA ───────────────────────────── */}
      <div
        style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
        className="tr-divider-b"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D6D3CD]">
          {h.stats.map((stat) => (
            <div key={stat.label} className="py-7 sm:px-8 first:sm:pl-0">
              <p
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="text-3xl md:text-4xl font-bold font-display tabular-nums"
              >
                {stat.value}
              </p>
              <p
                style={{ color: "var(--color-ink-mid, #57534E)" }}
                className="text-xs font-mono uppercase tracking-wider mt-1.5"
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICIOS RESIDENCIALES ──────────────────────────────── */}
      <section className="tr-section tr-container px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 mb-12 tr-divider-b">
          <div className="lg:col-span-7">
            <SectionLabel label={h.servicesEyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {h.servicesTitle}
            </h2>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-sm sm:text-base leading-relaxed"
          >
            {h.servicesDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 tr-grid">
          {h.services.map((service, index) => (
            <article
              key={service.id}
              style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
              className="group flex flex-col sm:flex-row gap-6 tr-card tr-card-pad hover:border-[#E8490F] transition-colors duration-150"
            >
              <div className="relative w-full sm:w-32 h-44 sm:h-32 shrink-0 overflow-hidden bg-[#ECEAE3] border border-[#D6D3CD]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 128px"
                  className="object-cover origin-top-left scale-[1.08]"
                />
              </div>
              <div>
                <span
                  style={{ color: "var(--color-brand-orange, #E8490F)" }}
                  className="font-mono text-xs font-semibold block mb-2"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-display text-xl font-bold mb-2 group-hover:text-[#E8490F] transition-colors duration-150"
                >
                  {service.title}
                </h3>
                <p
                  style={{ color: "var(--color-ink-mid, #57534E)" }}
                  className="text-sm leading-relaxed"
                >
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── GALERÍA DE PROYECTOS HOGAR ───────────────────────────── */}
      {hogarProjects.length > 0 && (
        <section
          style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
          className="tr-section tr-divider-y"
        >
          <div className="tr-container px-4 sm:px-6 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 tr-divider-b">
              <div>
                <SectionLabel label={h.portfolioEyebrow} />
                <h2
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-display tr-heading-section font-bold tracking-tight"
                >
                  {h.portfolioTitle}
                </h2>
              </div>
              <Link
                href="/proyectos"
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="text-xs font-mono font-semibold uppercase tracking-wider hover:text-[#E8490F]"
              >
                Ver galería completa →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 tr-grid">
              {hogarProjects.map((project) => (
                <Link
                  key={project.id}
                  href="/proyectos"
                  style={{
                    backgroundColor: "var(--color-surface-white, #FFFFFF)",
                  }}
                  className="group tr-card overflow-hidden hover:border-[#E8490F] transition-colors duration-150 block"
                >
                  <div className="relative h-56 overflow-hidden bg-[#ECEAE3] tr-divider-b">
                    <Image
                      src={project.cover_image_url}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover origin-top-left scale-[1.08]"
                    />
                  </div>
                  <div className="tr-card-pad">
                    <p
                      style={{ color: "var(--color-brand-orange, #E8490F)" }}
                      className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
                    >
                      {project.location}
                    </p>
                    <h3
                      style={{ color: "var(--color-ink-anthracite, #141413)" }}
                      className="font-display font-bold text-lg group-hover:text-[#E8490F] transition-colors duration-150"
                    >
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="tr-section max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="pb-8 mb-8 tr-divider-b">
          <SectionLabel label={h.faqsEyebrow} />
          <h2
            style={{ color: "var(--color-ink-anthracite, #141413)" }}
            className="font-display tr-heading-section font-bold tracking-tight"
          >
            {h.faqsTitle}
          </h2>
        </div>
        <div className="divide-y divide-[#D6D3CD] border-y border-[#D6D3CD]">
          {h.faqs.map((faq, idx) => (
            <details
              key={faq.id}
              open={idx === 0}
              className="group transition-colors duration-150"
            >
              <summary className="w-full flex items-center justify-between py-5 sm:py-6 text-left cursor-pointer list-none">
                <span
                  style={{ color: "var(--color-ink-anthracite, #141413)" }}
                  className="font-semibold pr-4 text-base"
                >
                  {faq.q}
                </span>
                <span className="font-mono text-sm text-[#57534E] group-open:text-[#E8490F] shrink-0">
                  + / -
                </span>
              </summary>
              <div
                style={{ color: "var(--color-ink-mid, #57534E)" }}
                className="pb-6 text-sm sm:text-base leading-relaxed"
              >
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <EmergencyCTA
        variant="hogar"
        company={company}
        data={content.emergency}
      />
    </div>
  );
}
