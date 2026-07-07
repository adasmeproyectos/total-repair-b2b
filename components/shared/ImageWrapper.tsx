"use client";

/**
 * components/shared/ImageWrapper.tsx
 * Wrapper anti-marca de agua (Manifiesto Nano Banana 2).
 *
 * ESTRATEGIA:
 *  - overflow-hidden en el contenedor → recorta bordes de imagen
 *  - scale-105 base en la imagen → desplaza marcas de agua de bordes
 *  - scale-110 en hover (opcional) → efecto Ken Burns
 *
 * Usar como contenedor de TODOS los componentes next/image del proyecto.
 */

import { cn } from "@/lib/utils";

interface ImageWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Activa escala 1.1 al hover — efecto Ken Burns */
  hoverScale?: boolean;
  /** Relación de aspecto CSS, ej: 'aspect-video', 'aspect-square' */
  aspectRatio?: string;
  /** Posición relativa (necesaria para next/image fill) */
  fillMode?: boolean;
}

export function ImageWrapper({
  children,
  className,
  hoverScale = false,
  aspectRatio,
  fillMode = false,
}: ImageWrapperProps) {
  return (
    <div
      className={cn(
        "overflow-hidden",
        fillMode ? "relative" : "",
        aspectRatio ?? "",
        hoverScale && "[&_img]:hover:scale-110 [&_img]:transition-transform [&_img]:duration-700",
        className
      )}
    >
      {children}
    </div>
  );
}
