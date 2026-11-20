import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { getPublishedProjects, getSiteConfig } from "@/lib/site-data";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "División Hogar — Total Construye",
  description:
    "Remodelación integral de cocinas, baños, gasfitería, electricidad certificada SEC y reparación de siniestros domiciliarios en Santiago.",
  path: "/hogar",
});

function HogarIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "plumbing":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M12 2a3 3 0 013 3v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-1v7a2 2 0 01-2 2H8a2 2 0 01-2-2V11H5a1 1 0 01-1-1V7a1 1 0 011-1h2V5a3 3 0 013-3h2z" />
        </svg>
      );
    case "electric":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "remodel":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M20 19.5v.5a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8.5L20 7.5v12zM14 2v6h6" />
        </svg>
      );
  }
}

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
        color: "var(--color-ink-anthracite, #0F172A)",
      }}
      className="min-h-screen overflow-x-hidden pt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO RESIDENCIAL ─────────────────────────────────────── */}
      <section className="relative tr-divider-b">
        <div className="tr-container px-4 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 tr-grid items-center">
          <div className="lg:col-span-7">
            <SectionLabel label={h.eyebrow} />
            <h1
              style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
              className="font-display tr-heading-page font-black leading-[1.08] mb-6 tracking-tight uppercase"
            >
              {h.title}{" "}
              <span
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="block sm:inline"
              >
                {h.titleHighlight}
              </span>
            </h1>
            <p
              style={{ color: "var(--color-ink-mid, #52525B)" }}
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl font-light leading-relaxed"
            >
              {h.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
              <Link
                href="/contacto?modo=hogar"
                style={{
                  backgroundColor: "var(--color-brand-orange, #FF5000)",
                  borderRadius: "var(--tr-btn-radius, 2px)",
                }}
                className="text-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity duration-200 text-center"
              >
                {h.ctaPrimary}
              </Link>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderRadius: "var(--tr-btn-radius, 2px)" }}
                className="border border-emerald-600 bg-emerald-50/50 text-emerald-700 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-colors duration-200 text-center"
              >
                {h.ctaWhatsapp}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden tr-card bg-zinc-100">
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

      {/* ── STATS HOGAR ───────────────────────────────────────────── */}
      <div
        style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
        className="tr-divider-b py-10"
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {h.stats.map((stat) => (
            <div key={stat.label} className="py-2">
              <p
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="text-3xl md:text-4xl font-black font-display"
              >
                {stat.value}
              </p>
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICIOS RESIDENCIALES ──────────────────────────────── */}
      <section className="tr-section tr-container px-4 sm:px-6 md:px-12">
        <div className="mb-14">
          <SectionLabel label={h.servicesEyebrow} />
          <h2
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
            className="font-display tr-heading-section font-black mb-3 tracking-tight uppercase"
          >
            {h.servicesTitle}
          </h2>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="max-w-xl font-light"
          >
            {h.servicesDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 tr-grid">
          {h.services.map((service) => (
            <article
              key={service.id}
              style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
              className="group flex flex-col sm:flex-row gap-6 tr-card tr-card-pad hover:border-[#FF5000] transition-colors duration-200"
            >
              <div className="relative w-full sm:w-28 h-44 sm:h-28 shrink-0 overflow-hidden bg-zinc-100 border border-zinc-200">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover origin-top-left scale-[1.08]"
                />
              </div>
              <div>
                <div
                  style={{ color: "var(--color-brand-orange, #FF5000)" }}
                  className="mb-3"
                >
                  <HogarIcon kind={service.icon} />
                </div>
                <h3
                  style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                  className="text-xl font-bold mb-2 group-hover:text-[#FF5000] transition-colors duration-200"
                >
                  {service.title}
                </h3>
                <p
                  style={{ color: "var(--color-ink-mid, #52525B)" }}
                  className="text-sm leading-relaxed font-light"
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
          style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
          className="tr-section tr-divider-y"
        >
          <div className="tr-container px-4 sm:px-6 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <SectionLabel label={h.portfolioEyebrow} />
                <h2
                  style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                  className="font-display tr-heading-section font-black tracking-tight uppercase"
                >
                  {h.portfolioTitle}
                </h2>
              </div>
              <Link
                href="/proyectos"
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="text-xs sm:text-sm font-bold uppercase tracking-widest hover:underline"
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
                  className="group tr-card overflow-hidden hover:border-[#FF5000] transition-all duration-200 block"
                >
                  <div className="relative h-56 overflow-hidden bg-zinc-100 tr-divider-b">
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
                      style={{ color: "var(--color-brand-orange, #FF5000)" }}
                      className="text-xs font-mono font-bold uppercase tracking-wider mb-1.5"
                    >
                      {project.location}
                    </p>
                    <h3
                      style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                      className="font-bold text-lg group-hover:text-[#FF5000] transition-colors duration-200"
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
        <div className="mb-14 text-center">
          <SectionLabel label={h.faqsEyebrow} className="justify-center" />
          <h2
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
            className="font-display tr-heading-section font-black tracking-tight uppercase"
          >
            {h.faqsTitle}
          </h2>
        </div>
        <div className="space-y-3">
          {h.faqs.map((faq, idx) => (
            <details
              key={faq.id}
              open={idx === 0}
              style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
              className="group tr-card open:border-[#FF5000]/50 transition-colors duration-200"
            >
              <summary className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer list-none">
                <span
                  style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                  className="font-bold pr-4 text-sm sm:text-base"
                >
                  {faq.q}
                </span>
                <span className="text-zinc-500 group-open:rotate-180 group-open:text-[#FF5000] transition-transform duration-200 shrink-0">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div
                style={{ color: "var(--color-ink-mid, #52525B)" }}
                className="px-5 sm:px-6 pb-6 text-sm sm:text-base font-light leading-relaxed tr-divider-t pt-4 bg-white"
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
