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
      style={{
        backgroundColor: "var(--color-surface-cream, #F7F6F2)",
      }}
      className="w-full tr-divider-t py-14 md:py-16 px-4 sm:px-6 md:px-12"
    >
      <div className="tr-container">
        <div
          style={{
            backgroundColor: "var(--color-surface-dark, #141413)",
            borderLeft: "4px solid var(--color-brand-orange, #E8490F)",
            borderRadius: "var(--tr-card-radius, 0px)",
          }}
          className="p-7 sm:p-10 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-white"
        >
          <div className="max-w-2xl">
            <p
              style={{ color: "var(--color-brand-orange, #E8490F)" }}
              className="text-xs font-mono font-semibold uppercase tracking-[0.14em] mb-3"
            >
              {data.badge}
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 font-display">
              {isHogar ? data.hogarTitle : data.empresasTitle}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {isHogar ? data.hogarDescription : data.empresasDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 shrink-0">
            <a
              href={`tel:${company.phoneClean}`}
              style={{
                backgroundColor: "var(--color-brand-orange, #E8490F)",
                borderRadius: "var(--tr-btn-radius, 0px)",
              }}
              className="flex items-center justify-center px-6 py-4 text-white font-semibold tracking-wide uppercase text-xs hover:opacity-90 transition-opacity duration-150 text-center"
            >
              {data.callLabelPrefix} · {company.phoneDisplay}
            </a>

            <Link
              href={
                isHogar
                  ? "/contacto?modo=hogar&urgencia=true"
                  : "/contacto?urgencia=true"
              }
              style={{
                borderRadius: "var(--tr-btn-radius, 0px)",
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 border border-white/30 text-white hover:bg-white hover:text-[#141413] font-semibold tracking-wide uppercase text-xs transition-colors duration-150 text-center"
            >
              <span>{data.reportLabel}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmergencyCTA;
