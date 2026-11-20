import { SectionLabel } from "@/components/shared/SectionLabel";
import { DEFAULT_SITE_CONFIG } from "@/lib/default-site-config";
import type { SiteContent } from "@/lib/types/cms";

interface TimelineProps {
  data?: SiteContent["timeline"];
}

export function Timeline({
  data = DEFAULT_SITE_CONFIG.content.timeline,
}: TimelineProps) {
  return (
    <section
      style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
      className="tr-section px-4 sm:px-6 md:px-12 tr-divider-b overflow-hidden"
      id="historia"
    >
      <div className="tr-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 tr-divider-b">
          <div className="lg:col-span-7">
            <SectionLabel label={data.eyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {data.titlePrefix}{" "}
              <span style={{ color: "var(--color-brand-orange, #E8490F)" }}>
                {data.titleHighlight}
              </span>{" "}
              {data.titleSuffix}
            </h2>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-sm sm:text-base leading-relaxed"
          >
            {data.description}
          </p>
        </div>

        {/* Tabla cronológica editorial con filetes horizontales */}
        <div className="divide-y divide-[#D6D3CD]">
          {data.items.map((milestone) => (
            <div
              key={milestone.id}
              className="py-7 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-3 flex items-center gap-3">
                <span
                  style={{
                    color: milestone.isHighlight
                      ? "var(--color-brand-orange, #E8490F)"
                      : "var(--color-ink-anthracite, #141413)",
                  }}
                  className="font-mono font-semibold text-base sm:text-lg tabular-nums"
                >
                  {milestone.year}
                </span>
                {milestone.isHighlight && (
                  <span
                    style={{
                      backgroundColor: "var(--color-brand-orange, #E8490F)",
                    }}
                    className="w-1.5 h-1.5 inline-block"
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="md:col-span-4 font-display text-xl font-bold tracking-tight"
              >
                {milestone.title}
              </h3>

              <p
                style={{ color: "var(--color-ink-mid, #57534E)" }}
                className="md:col-span-5 text-sm sm:text-base leading-relaxed"
              >
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
