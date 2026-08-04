"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Timeline } from "@/components/ui/Timeline";
import { ProjectSpotlight } from "@/components/ui/ProjectSpotlight";
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
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-hidden">
      {/* ── HERO — Light Theme ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-6 bg-white overflow-hidden">
        
        {/* Background elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,80,0,0.05)_0%,_transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>

        <motion.div
          variants={containerVariants}
          initial={isMounted ? "hidden" : "visible"}
          animate="visible"
          className="relative z-10 max-w-6xl w-full text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span className="px-4 py-2 border border-[#FF5000]/20 bg-[#FF5000]/5 text-[#FF5000] text-xs font-bold uppercase tracking-widest rounded-full">
              +{COMPANY.yearsExperience} Años de Experiencia en Chile
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-[#0F172A] tracking-tight leading-[1.0] mb-8"
          >
            CONSTRUIMOS <span className="text-[#FF5000]">CONFIANZA</span><br />
            DESDE {COMPANY.founded}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-500 font-light max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            Cuando la continuidad de su operación es crítica, <strong className="text-[#0F172A] font-semibold">Total Repair responde.</strong>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <Link
              href="/contacto"
              className="w-full sm:w-auto bg-[#FF5000] text-white px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#CC4000] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Solicitar Presupuesto
            </Link>
            <Link
              href="/empresas"
              className="w-full sm:w-auto bg-zinc-100 text-[#0F172A] px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-zinc-200 transition-all duration-300"
            >
              División Empresas
            </Link>
          </motion.div>

        </motion.div>
      </section>

      {/* ── CLIENTES ─── */}
      <div className="bg-[#F8FAFC] py-12 border-y border-zinc-200">
        <LogoCarousel />
      </div>

      {/* ── HISTORIA (TIMELINE) ── */}
      <Timeline />

      {/* ── PROYECTOS INSIGNIA (SPOTLIGHT) ── */}
      <ProjectSpotlight />

      {/* ── CTA FINAL ────────────────────────────── */}
      <section className="py-32 px-6 text-center bg-white border-t border-zinc-200">
        <SectionLabel label="¿Listo para comenzar?" className="justify-center" />
        <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-6 mt-6">
          HABLEMOS DE SU
          <span className="text-[#FF5000]"> PROYECTO.</span>
        </h2>
        <p className="text-zinc-500 font-light mb-10 max-w-lg mx-auto">
          Cuéntanos tu necesidad y un especialista te contactará dentro de las próximas 24 horas hábiles.
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-[#FF5000] text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-[#CC4000] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Contactar Ahora
        </Link>
      </section>
    </div>
  );
}