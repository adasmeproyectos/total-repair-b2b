/**
 * components/ui/EmergencyCTA.tsx — Paleta v2
 * variant "empresas": fondo zinc-900 oscuro (sección de urgencia = contraste máximo)
 * variant "hogar": fondo naranja (acento marca)
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";

interface EmergencyCTAProps {
  variant: "empresas" | "hogar";
}

export function EmergencyCTA({ variant }: EmergencyCTAProps) {
  if (variant === "empresas") {
    return (
      <section className="py-24 px-6 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-start gap-6">
            <div className="shrink-0 w-16 h-16 border border-[#E85B0C]/40 bg-[#E85B0C]/10 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 rounded-full bg-[#E85B0C]"
              />
            </div>
            <div>
              <span className="inline-block border border-[#E85B0C]/40 text-[#E85B0C] bg-[#E85B0C]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3">
                Unidad de Reacción Inmediata · 24/7
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Siniestros y Emergencias Corporativas
              </h2>
              <p className="text-zinc-400 font-light max-w-md">
                Inundaciones, incendios, daños sísmicos. Coordinación directa
                con aseguradoras. Respuesta en menos de 2 horas.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`tel:${COMPANY.phone}`}
              className="px-8 py-4 bg-[#E85B0C] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#C4470A] transition-colors text-center"
            >
              Llamar Ahora
            </a>
            <Link
              href="/contacto"
              className="px-8 py-4 border border-zinc-700 text-white font-bold text-sm uppercase tracking-widest hover:border-[#E85B0C] transition-colors text-center"
            >
              Formulario URI
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-[#E85B0C]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              ¿Emergencia en el Hogar?
            </h2>
            <p className="text-orange-100 text-sm font-light mt-1">
              Gasfitería, electricidad o daños urgentes. Atención inmediata.
            </p>
          </div>
        </div>
        <a
          href={`tel:${COMPANY.phone}`}
          className="shrink-0 px-8 py-4 bg-white text-[#E85B0C] font-bold text-sm uppercase tracking-widest hover:bg-orange-50 transition-colors"
        >
          {COMPANY.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
