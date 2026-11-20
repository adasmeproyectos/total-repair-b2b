import Link from "next/link";
import { DEFAULT_SITE_CONFIG } from "@/lib/default-site-config";
import type { SiteCompany, SiteContent } from "@/lib/types/cms";

interface EmergencyCTAProps {
  variant?: "empresas" | "hogar";
  company?: SiteCompany;
  data?: SiteContent["emergency"];
}

export function EmergencyCTA({
  variant = "empresas",
  company = DEFAULT_SITE_CONFIG.company,
  data = DEFAULT_SITE_CONFIG.content.emergency,
}: EmergencyCTAProps) {
  const isHogar = variant === "hogar";

  return (
    <section
      style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
      className="w-full tr-divider-t py-14 md:py-20 px-4 sm:px-6 md:px-12"
    >
      <div className="tr-container">
        <div
          style={{
            backgroundColor: "var(--color-surface-dark, #141413)",
            borderLeft: "5px solid var(--color-brand-orange, #FF5000)",
            borderRadius: "var(--tr-card-radius, 4px)",
          }}
          className="tr-blueprint-grid p-7 sm:p-10 md:p-12 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-white"
        >
          <div className="max-w-2xl">
            <div
              style={{ color: "var(--color-brand-orange, #FF5000)" }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5000]/15 border border-[#FF5000]/40 text-xs font-mono font-bold uppercase tracking-widest mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span
                  style={{ backgroundColor: "var(--color-brand-orange, #FF5000)" }}
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                />
                <span
                  style={{ backgroundColor: "var(--color-brand-orange, #FF5000)" }}
                  className="relative inline-flex rounded-full h-2 w-2"
                />
              </span>
              {data.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3 font-display uppercase">
              {isHogar ? data.hogarTitle : data.empresasTitle}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              {isHogar ? data.hogarDescription : data.empresasDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 shrink-0">
            <a
              href={`tel:${company.phoneClean}`}
              style={{
                backgroundColor: "var(--color-brand-orange, #FF5000)",
                borderRadius: "var(--tr-btn-radius, 2px)",
              }}
              className="flex items-center justify-center gap-3 px-7 py-4 text-white font-bold tracking-wider uppercase text-xs sm:text-sm hover:opacity-90 transition-opacity duration-200 text-center shadow-lg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>
                {data.callLabelPrefix} ({company.phoneDisplay})
              </span>
            </a>

            <Link
              href={
                isHogar
                  ? "/contacto?modo=hogar&urgencia=true"
                  : "/contacto?urgencia=true"
              }
              style={{
                borderRadius: "var(--tr-btn-radius, 2px)",
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white hover:text-[#141413] border border-white/30 text-white font-bold tracking-wider uppercase text-xs sm:text-sm transition-colors duration-200 group text-center"
            >
              <span>{data.reportLabel}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmergencyCTA;
