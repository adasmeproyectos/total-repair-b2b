import Image from "next/image";
import { LOGOS } from "@/lib/constants";

interface LogoCarouselProps {
  speed?: number;
}

export function LogoCarousel({ speed = 40 }: LogoCarouselProps) {
  const items = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      className="border-y border-zinc-200 bg-[#F8FAFC] py-14 overflow-hidden"
      aria-label="Clientes y empresas con las que trabajamos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <p className="text-center text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-8">
          Empresas e Instituciones que confían en nosotros
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
              key={`${logo.alt}-${index}`}
              className="relative shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={52}
                sizes="130px"
                className={`${logo.height} w-auto object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoCarousel;
