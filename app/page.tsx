import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Timeline } from "@/components/ui/Timeline";
import { ProjectSpotlight } from "@/components/ui/ProjectSpotlight";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Total Repair | Construcción, Remodelación y Gestión de Siniestros en Chile",
  description:
    "Empresa constructora y contratista general con más de 22 años de experiencia en Chile. Especialistas en reconstrucción de siniestros 24/7, habilitación corporativa B2B y remodelación residencial.",
  path: "/",
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-hidden pt-20">
      {/* ── HERO — Light Theme Industrial ── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center py-20 px-6 md:px-12 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl w-full text-center">
          {/* Eyebrow badge */}
          <div className="flex justify-center mb-8">
            <span className="px-4 py-2 border border-[#FF5000]/30 bg-[#FF5000]/5 text-[#FF5000] text-xs font-mono font-bold uppercase tracking-widest">
              Más de 22 años de experiencia en Chile
            </span>
          </div>

          {/* H1 — Two-tone dominant brand name */}
          <h1 className="font-display font-black tracking-tight leading-none mb-6">
            <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-none">
              <span className="text-[#0F172A]">TOTAL</span>{" "}
              <span className="text-[#FF5000]">REPAIR</span>
            </span>
          </h1>

          {/* Subtitle & slogan */}
          <div className="mb-12">
            <p className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
              Construimos Confianza Desde 2004
            </p>
            <p className="text-lg md:text-xl text-zinc-600 font-light max-w-2xl mx-auto leading-relaxed">
              Cuando la continuidad de su operación es crítica,{" "}
              <strong className="text-[#0F172A] font-semibold">
                Total Repair responde.
              </strong>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link
              href="/contacto"
              className="w-full sm:w-auto bg-[#FF5000] text-white px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#CC4000] transition-colors duration-200"
            >
              Solicitar Presupuesto
            </Link>
            <Link
              href="/empresas"
              className="w-full sm:w-auto bg-[#0F172A] text-white px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-zinc-800 transition-colors duration-200"
            >
              División Empresas
            </Link>
            <Link
              href="/hogar"
              className="w-full sm:w-auto bg-zinc-100 text-[#0F172A] border border-zinc-300 px-8 py-4 uppercase tracking-widest text-sm font-bold hover:border-[#FF5000] hover:text-[#FF5000] transition-colors duration-200"
            >
              División Hogar
            </Link>
          </div>
        </div>
      </section>

      {/* ── CLIENTES ─── */}
      <LogoCarousel />

      {/* ── HISTORIA (TIMELINE) ── */}
      <Timeline />

      {/* ── PROYECTOS INSIGNIA (SPOTLIGHT) ── */}
      <ProjectSpotlight />

      {/* ── CTA FINAL ────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 text-center bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <SectionLabel label="¿Listo para comenzar?" className="justify-center" />
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-6 mt-6 uppercase">
            HABLEMOS DE SU
            <span className="text-[#FF5000]"> PROYECTO.</span>
          </h2>
          <p className="text-zinc-600 font-light mb-10 max-w-lg mx-auto leading-relaxed">
            Cuéntenos su requerimiento y un especialista técnico se comunicará dentro de las próximas 24 horas hábiles.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-[#FF5000] text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-[#CC4000] transition-colors duration-200"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
