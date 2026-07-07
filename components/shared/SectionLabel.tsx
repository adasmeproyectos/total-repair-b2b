/**
 * components/shared/SectionLabel.tsx — Paleta v2
 * Eyebrow label adaptado a fondos claros (default) y oscuros (prop dark).
 */

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
  /** dark=true: texto blanco/gris claro para fondos oscuros (hero, CTA negros) */
  dark?: boolean;
  /** light=true: deprecated alias de dark=false, mantiene compatibilidad */
  light?: boolean;
}

export function SectionLabel({ label, className, dark = false, light }: SectionLabelProps) {
  // Si light está explícitamente pasado como false en contexto oscuro, tratar como dark
  const isDark = dark || light === false;

  return (
    <div className={cn("flex items-center gap-4 mb-6", className)}>
      <div className="h-0.5 w-12 shrink-0 bg-[#E85B0C]" />
      <span
        className={cn(
          "uppercase tracking-[0.2em] text-xs font-bold",
          isDark ? "text-zinc-400" : "text-zinc-500"
        )}
      >
        {label}
      </span>
    </div>
  );
}
