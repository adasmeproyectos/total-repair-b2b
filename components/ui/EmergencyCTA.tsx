import Link from "next/link";
import { COMPANY } from "@/lib/constants";

interface EmergencyCTAProps {
  variant?: "empresas" | "hogar";
}

export function EmergencyCTA({ variant = "empresas" }: EmergencyCTAProps) {
  const isHogar = variant === "hogar";

  return (
    <section className="w-full bg-[#F8FAFC] border-t border-zinc-200 py-16 md:py-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-zinc-200 border-l-4 border-l-[#FF5000] p-6 sm:p-10 md:p-12 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Bloque Izquierdo: Mensaje de Urgencia */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5000]/10 border border-[#FF5000]/30 text-[#FF5000] text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5000] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5000]" />
              </span>
              Unidad de Reacción Inmediata 24/7
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight mb-3 font-display uppercase">
              {isHogar
                ? "¿Emergencia en tu Hogar o Siniestro Domiciliario?"
                : "¿Siniestro Activo o Emergencia Estructural?"}
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              {isHogar
                ? "Atendemos filtraciones graves, cortocircuitos, daños por incendio o sismos en viviendas. Emitimos informes y presupuestos técnicos válidos para tu compañía de seguros."
                : "Desplegamos cuadrillas de contención, extracción de agua, apuntalamiento y mitigación en tiempo récord para detener el daño progresivo y asegurar la continuidad operacional."}
            </p>
          </div>

          {/* Bloque Derecho: Acciones Directas */}
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 shrink-0">
            <a
              href={`tel:${COMPANY.phoneClean}`}
              className="flex items-center justify-center gap-3 px-7 py-4 bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold tracking-wider uppercase text-xs sm:text-sm transition-colors duration-200 text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>Llamar ({COMPANY.phoneDisplay})</span>
            </a>

            <Link
              href={
                isHogar
                  ? "/contacto?modo=hogar&urgencia=true"
                  : "/contacto?urgencia=true"
              }
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[#0F172A] hover:bg-zinc-800 text-white font-bold tracking-wider uppercase text-xs sm:text-sm transition-colors duration-200 group text-center"
            >
              <span>Reportar Siniestro</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmergencyCTA;
