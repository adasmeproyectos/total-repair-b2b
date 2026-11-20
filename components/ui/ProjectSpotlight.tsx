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
      style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
      className="tr-section px-4 sm:px-6 md:px-12 tr-divider-b"
    >
      <div className="tr-container">
        <div className="text-center mb-20">
          <SectionLabel label={data.eyebrow} className="justify-center" />
          <h2
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
            className="font-display tr-heading-section font-black tracking-tight mt-4 uppercase"
          >
            {data.titlePrefix}{" "}
            <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
              {data.titleHighlight}
            </span>
          </h2>
          <p
            style={{ color: "var(--color-ink-mid, #52525B)" }}
            className="mt-4 font-light max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            {data.description}
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {data.items.map((project) => {
            const isRight = project.align === "right";

            return (
              <article
                key={project.id}
                className={`flex flex-col ${
                  isRight ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 md:gap-12 lg:gap-16 items-center`}
              >
                <div className="w-full md:w-1/2 relative aspect-[4/3] group overflow-hidden tr-card bg-zinc-100">
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
                  <span
                    style={{ color: "var(--color-brand-orange, #FF5000)" }}
                    className="font-mono font-bold tracking-widest text-xs uppercase mb-3 block"
                  >
                    {project.subtitle}
                  </span>
                  <h3
                    style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                    className="font-display text-2xl sm:text-3xl md:text-4xl font-black mb-5 tracking-tight leading-tight"
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{ color: "var(--color-ink-mid, #52525B)" }}
                    className="font-light leading-relaxed mb-6 text-base sm:text-lg"
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {project.badges.map((badge) => (
                      <span
                        key={badge}
                        style={{
                          backgroundColor: "var(--color-surface-white, #FFFFFF)",
                          borderRadius: "var(--tr-btn-radius, 2px)",
                        }}
                        className="px-3.5 py-1.5 border border-zinc-200 text-zinc-700 text-xs font-mono font-semibold tracking-wide"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
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
