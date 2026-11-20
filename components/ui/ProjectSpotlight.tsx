import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ImageWrapper } from "@/components/shared/ImageWrapper";
import { DEFAULT_SITE_CONFIG } from "@/lib/default-site-config";
import type { SiteContent } from "@/lib/types/cms";

interface ProjectSpotlightProps {
  data?: SiteContent["spotlight"];
}

export function ProjectSpotlight({
  data = DEFAULT_SITE_CONFIG.content.spotlight,
}: ProjectSpotlightProps) {
  return (
    <section
      style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
      className="tr-section px-4 sm:px-6 md:px-12 tr-divider-b"
    >
      <div className="tr-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 mb-14 tr-divider-b">
          <div className="lg:col-span-7">
            <SectionLabel label={data.eyebrow} />
            <h2
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display tr-heading-section font-bold tracking-tight"
            >
              {data.titlePrefix}{" "}
              <span style={{ color: "var(--color-brand-orange, #E8490F)" }}>
                {data.titleHighlight}
              </span>
            </h2>
          </div>
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="lg:col-span-5 text-sm sm:text-base leading-relaxed"
          >
            {data.description}
          </p>
        </div>

        <div className="divide-y divide-[#D6D3CD]">
          {data.items.map((project, index) => {
            const isRight = project.align === "right";
            const indexNum = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                className={`py-12 first:pt-0 last:pb-0 flex flex-col ${
                  isRight ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 md:gap-12 lg:gap-16 items-center`}
              >
                <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden tr-card bg-[#ECEAE3]">
                  <ImageWrapper className="w-full h-full" overlayOpacity="none">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </ImageWrapper>
                </div>

                <div className="w-full md:w-1/2">
                  <p className="font-mono text-xs tracking-[0.12em] uppercase mb-3 flex items-center gap-3">
                    <span
                      style={{ color: "var(--color-brand-orange, #E8490F)" }}
                      className="font-semibold"
                    >
                      {indexNum}
                    </span>
                    <span style={{ color: "var(--color-ink-mid, #57534E)" }}>
                      {project.subtitle}
                    </span>
                  </p>
                  <h3
                    style={{ color: "var(--color-ink-anthracite, #141413)" }}
                    className="font-display text-2xl sm:text-3xl font-bold mb-4 tracking-tight leading-tight"
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{ color: "var(--color-ink-mid, #57534E)" }}
                    className="leading-relaxed mb-6 text-base"
                  >
                    {project.description}
                  </p>

                  {project.badges.length > 0 && (
                    <p
                      style={{ color: "var(--color-ink-mid, #57534E)" }}
                      className="pt-4 tr-divider-t text-xs font-mono uppercase tracking-wider"
                    >
                      {project.badges.join("  ·  ")}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectSpotlight;
