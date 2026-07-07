"use client";

/**
 * app/page.tsx — Home Bifurcadora — Paleta v2 (Blanco / Naranjo Industrial)
 * Fondo blanco con secciones alternas en crema/concreto.
 * Hero oscuro intencional solo para el full-bleed inicial.
 */

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { COMPANY } from "@/lib/constants";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-hidden">

      {/* ── HERO BIFURCADOR — Fondo oscuro intencional (contraste máximo) ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 bg-zinc-900">

        {/* Textura sutil naranja */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(232,91,12,0.12)_0%,_transparent_65%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl w-full text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <SectionLabel label={`${COMPANY.yearsExperience} Años de Experiencia en Chile`} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.0] mb-6"
          >
            TOTAL
            <span className="text-[#E85B0C]">REPAIR</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-zinc-400 font-light">
              Construimos. Remodelamos. Reparamos.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-zinc-400 font-light max-w-xl mx-auto mb-16"
          >
            Soluciones integrales para empresas e instituciones, y para tu hogar.
            Elige tu división y descubre cómo podemos ayudarte.
          </motion.p>

          {/* Tarjetas bifurcadoras */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {/* División Empresas */}
            <Link href="/empresas" className="group">
              <div className="relative border border-zinc-700 bg-zinc-800/40 p-10 text-left overflow-hidden transition-all duration-500 group-hover:border-[#E85B0C]/70 group-hover:bg-zinc-800/60">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/img/fotos/hero-corporativo.jpg"
                    alt="División Empresas"
                    fill
                    className="object-cover opacity-10 scale-105 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 border border-zinc-600 group-hover:border-[#E85B0C]/60 flex items-center justify-center mb-8 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#E85B0C" strokeWidth="1.5" className="w-6 h-6">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <span className="text-[#E85B0C] text-xs font-bold uppercase tracking-widest mb-3 block">División Corporativa</span>
                  <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-[#E85B0C] transition-colors">
                    Empresas e Instituciones
                  </h2>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    Habilitación comercial, remodelaciones a gran escala y gestión de siniestros para Centros Comerciales, Clínicas y Co-works.
                  </p>
                  <span className="text-[#E85B0C] text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Ver División <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* División Hogar */}
            <Link href="/hogar" className="group">
              <div className="relative border border-zinc-700 bg-zinc-800/40 p-10 text-left overflow-hidden transition-all duration-500 group-hover:border-[#E85B0C]/70 group-hover:bg-zinc-800/60">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/img/fotos/hero-hogar.jpg"
                    alt="División Hogar"
                    fill
                    className="object-cover opacity-10 scale-105 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 border border-zinc-600 group-hover:border-[#E85B0C]/60 flex items-center justify-center mb-8 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#E85B0C" strokeWidth="1.5" className="w-6 h-6">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                  </div>
                  <span className="text-[#E85B0C] text-xs font-bold uppercase tracking-widest mb-3 block">División Residencial</span>
                  <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-[#E85B0C] transition-colors">
                    Hogar / Total Construye
                  </h2>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    Gasfitería, electricidad, remodelación interior y proyectos de ampliación para tu hogar con garantía total.
                  </p>
                  <span className="text-[#E85B0C] text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Ver División <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-zinc-800"
          >
            {[
              { value: COMPANY.yearsExperience, label: "Años de Experiencia" },
              { value: COMPANY.projectsDelivered, label: "Proyectos Entregados" },
              { value: "24/7", label: "Atención de Emergencias" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl font-black text-[#E85B0C] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CARRUSEL CLIENTES ─── */}
      <LogoCarousel />

      {/* ── CTA FINAL — fondo crema industrial ────────────────────────────── */}
      <section className="py-32 px-6 text-center bg-zinc-50 border-t border-zinc-200">
        <SectionLabel label="¿Listo para comenzar?" className="justify-center" light />
        <h2 className="font-display text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-6">
          HABLEMOS DE TU
          <span className="text-[#E85B0C]"> PROYECTO.</span>
        </h2>
        <p className="text-zinc-500 font-light mb-10 max-w-lg mx-auto">
          Cuéntanos tu necesidad y un especialista te contactará dentro de las próximas 24 horas hábiles.
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-[#E85B0C] text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-[#C4470A] transition-colors"
        >
          Solicitar Presupuesto
        </Link>
      </section>
    </div>
  );
}