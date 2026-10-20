import Image from "next/image";
import { LOGOS } from "@/lib/constants";

export function LogoCarousel() {
  return (
    <section
      aria-label="Grandes empresas e instituciones que confían en Total Repair"
      className="w-full py-12 bg-[#F8FAFC] border-y border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-8 font-semibold">
          Empresas e Instituciones que han confiado en nuestra capacidad técnica
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="relative w-32 h-14 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoCarousel;
