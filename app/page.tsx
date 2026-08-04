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
        
        {/* Clean top divider line only — no AI gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial={isMounted ? "hidden" : "visible"}
          animate="visible"
          className="relative z-10 max-w-6xl w-full text-center"
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span className="px-4 py-2 border border-[#FF5000]/20 bg-[#FF5000]/5 text-[#FF5000] text-xs font-bold uppercase tracking-widest rounded-full">
              Más de dos décadas de experiencia en Chile
            </span>
          </motion.div>

          {/* H1 — Two-tone dominant brand name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black tracking-tight leading-none mb-6"
          >
            <span className="block text-7xl md:text-9xl lg:text-[11rem] leading-none">
              <span className="text-[#0F172A]">TOTAL</span>{" "}
              <span className="text-[#FF5000]">REPAIR</span>
            </span>
          </motion.h1>

          {/* Subtitle & slogan */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
              Construimos Confianza Desde 2004
            </p>
            <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
              Cuando la continuidad de su operación es crítica,{" "}
              <strong className="text-[#0F172A] font-semibold">Total Repair responde.</strong>
            </p>
          </motion.div>

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