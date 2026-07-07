"use client";

/**
 * components/shared/LogoCarousel.tsx
 *
 * REGLA DEFINITIVA (Directiva arquitectónica v2):
 *  - El carrusel NO SE DETIENE bajo ninguna circunstancia en hover.
 *  - El hover solo activa el color corporativo del logo (grayscale → color).
 *  - El gap debe ser amplio (gap-24 mínimo) para evitar sobreposición en cualquier resolución.
 *  - Paleta actualizada a fondo blanco/crema (--color-surface-concrete).
 */

import Image from "next/image";
import { LOGOS } from "@/lib/constants";

interface LogoCarouselProps {
  /** Duración del loop en segundos (default: 40) */
  speed?: number;
}

export function LogoCarousel({ speed = 40 }: LogoCarouselProps) {
  // Duplicar logos para loop infinito sin salto visual
  const items = [...LOGOS, ...LOGOS];

  return (
    <section
      className="border-y border-zinc-200 bg-zinc-50 py-14 overflow-hidden"
      aria-label="Clientes y empresas con las que trabajamos"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-8">
        Empresas que confían en nosotros
      </p>

      {/* Contenedor con mask-image fade en bordes */}
      <div
        className="relative flex"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/*
          CRÍTICO: NO hay onMouseEnter/onMouseLeave aquí.
          El track anima de forma continua e indefinida sin interrupción.
          El hover solo afecta al ITEM individual (color reveal).
        */}
        <div
          className="flex items-center w-max animate-marquee"
          style={{
            animationDuration: `${speed}s`,
            gap: "6rem", /* gap fijo 96px — evita sobreposición en cualquier resolución */
          }}
        >
          {items.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="relative shrink-0 grayscale opacity-35 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
              /* El cursor-default refuerza que no es clickeable — no genera expectativa de pausa */
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={52}
                className={`${logo.height} w-auto object-contain`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
