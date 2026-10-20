import Link from "next/link";
import { COMPANY } from "@/lib/constants";

interface EmergencyCTAProps {
  variant?: "empresas" | "hogar";
}

export function EmergencyCTA({ variant = "empresas" }: EmergencyCTAProps) {
  const isHogar = variant === "hogar";

  return (
    <section className="w-full bg-zinc-950 border-y border-zinc-800 relative overflow-hidden">
      {/* Indicador de Alerta Superior */}
      <div className="w-full h-1 bg-gradient-to-r from-[#FF5000] via-amber-500 to-[#FF5000]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 z-10 relative">
          {/* Bloque Izquierdo: Mensaje de Urgencia */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-mono uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Unidad de Reacción Inmediata 24/7
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 font-heading uppercase">
              {isHogar
                ? "¿Emergencia en tu Hogar o Siniestro Domiciliario?"
                : "¿Siniestro Activo o Emergencia Estructural?"}
            </h2>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
              {isHogar
                ? "Atendemos filtraciones graves, cortocircuitos, daños por incendio o sismos en viviendas. Emitimos informes y presupuestos técnicos válidos para tu compañía de seguros."
                : "Desplegamos cuadrillas de contención, extracción de agua, apuntalamiento y mitigación en tiempo récord para detener el daño progresivo y asegurar el recinto para el peritaje."}
            </p>
          </div>

          {/* Bloque Derecho: Acciones Directas */}
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 shrink-0">
            <a
              href={`tel:${COMPANY.phoneClean}`}
              className="flex items-center justify-center gap-3 px-8 py-5 bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold tracking-wider uppercase text-sm transition-colors duration-200 shadow-lg group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>Llamar Central ({COMPANY.phone})</span>
            </a>

            <Link
              href={
                isHogar
                  ? "/contacto?modo=hogar&urgencia=true"
                  : "/contacto?urgencia=true"
              }
              className="flex items-center justify-center gap-2 px-6 py-5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold tracking-wider uppercase text-sm transition-colors duration-200 group"
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

      {/* Marca de agua geométrica de fondo */}
      <div
        className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none select-none overflow-hidden flex justify-end"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-96 h-96 -mb-20 -mr-20 text-white"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      </div>
    </section>
  );
}

export default EmergencyCTA;
