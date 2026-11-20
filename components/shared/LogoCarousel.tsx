import Image from "next/image";
import { DEFAULT_SITE_CONFIG } from "@/lib/default-site-config";
import type { LogoItem } from "@/lib/types/cms";

interface LogoCarouselProps {
  speed?: number;
  title?: string;
  logos?: LogoItem[];
  surface?: "white" | "cream";
}

export function LogoCarousel({
  speed = 40,
  title = DEFAULT_SITE_CONFIG.content.logosTitle,
  logos = DEFAULT_SITE_CONFIG.content.logos,
  surface = "cream",
}: LogoCarouselProps) {
  if (!logos || logos.length === 0) return null;
  const items = [...logos, ...logos, ...logos];

  return (
    <section
      style={{
        backgroundColor:
          surface === "white"
            ? "var(--color-surface-white, #FFFFFF)"
            : "var(--color-surface-cream, #F5F3EE)",
      }}
      className="tr-divider-y py-14 overflow-hidden"
      aria-label="Clientes y empresas con las que trabajamos"
    >
      <div className="tr-container px-4 sm:px-6 md:px-12">
        <p
          style={{ color: "var(--color-ink-mid, #52525B)" }}
          className="text-center text-xs font-mono font-semibold uppercase tracking-[0.2em] mb-8"
        >
          {title}
        </p>
      </div>

      <div
        className="relative flex"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center w-max animate-marquee-triple"
          style={{
            animationDuration: `${speed}s`,
            gap: "6rem",
          }}
        >
          {items.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="relative shrink-0 grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={52}
                sizes="130px"
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoCarousel;
