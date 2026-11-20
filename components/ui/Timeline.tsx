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
        {/* Header */}
        <div className="text-center mb-20">
          <SectionLabel label={data.eyebrow} className="justify-center" />
          <h2
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
            className="font-display tr-heading-section font-black tracking-tight mt-4 uppercase"
          >
            {data.titlePrefix}{" "}
            <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
              {data.titleHighlight}
            </span>{" "}
            {data.titleSuffix}
          </h2>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="mt-4 font-light max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            {data.description}
          </p>
        </div>

        {/* Alternating 2-Column Light-Mode Corporate Timeline */}
        <div className="relative">
          <div
            style={{ backgroundColor: "var(--color-divider, #E4E4E7)" }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            aria-hidden="true"
          />

          {data.items.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={milestone.id} className="relative mb-8 last:mb-0">
                <div
                  style={{
                    backgroundColor: milestone.isHighlight
                      ? "var(--color-brand-orange, #FF5000)"
                      : "#A1A1AA",
                  }}
                  className="hidden md:block absolute left-1/2 top-8 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 z-10"
                  aria-hidden="true"
                />

                <div
                  className={[
                    "pl-6 border-l-2 border-zinc-200 py-2",
                    isEven
                      ? "md:border-l-0 md:pl-0 md:w-1/2 md:ml-0 md:pr-12 md:text-right"
                      : "md:border-l-0 md:pl-12 md:w-1/2 md:ml-auto md:text-left",
                  ].join(" ")}
                >
                  <div
                    style={{
                      backgroundColor: "var(--color-surface-cream, #F8FAFC)",
                      ...(milestone.isHighlight
                        ? isEven
                          ? { borderRight: "4px solid var(--color-brand-orange, #FF5000)" }
                          : { borderLeft: "4px solid var(--color-brand-orange, #FF5000)" }
                        : {}),
                    }}
                    className="tr-card tr-card-pad hover:shadow-md transition-shadow duration-200"
                  >
                    <span
                      style={{ color: "var(--color-brand-orange, #FF5000)" }}
                      className="font-mono font-bold tracking-widest text-sm mb-2 block"
                    >
                      {milestone.year}
                    </span>
                    <h3
                      style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                      className="font-display text-xl xl:text-2xl font-bold mb-3"
                    >
                      {milestone.title}
                    </h3>
                    <p
                      style={{ color: "var(--color-ink-mid, #52525B)" }}
                      className="font-light leading-relaxed text-sm xl:text-base"
                    >
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
