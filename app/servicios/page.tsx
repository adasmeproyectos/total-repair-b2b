"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Motor de iconos simplificado
const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    carpentery: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.5 14.5l-8.5-8.5L2 16l8.5 8.5L20.5 14.5z"/><path d="M12 2l4 4-4 4-4-4 4-4z"/></svg>,
    paint: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11l-4.5 4.5m0 0L7 11l4.5-4.5L16 11z"/><path d="M19 19c2 2 4 1 4-1a5 5 0 00-5-5H6a5 5 0 00-5 5c0 2 2 3 4 1"/></svg>,
    sec: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    data: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/><path d="M7 6v12M11 6v12M15 6v12M19 6v12"/></svg>,
  };
  return <div className="w-8 h-8 text-zinc-400 group-hover:text-[#FF5000] transition-colors">{icons[name] || icons.data}</div>;
};

const specialities = [
  { name: "Carpintería Industrial", icon: "carpentery" },
  { name: "Pintura Alta Gama", icon: "paint" },
  { name: "Electricidad SEC", icon: "sec" },
  { name: "Redes de Datos", icon: "data" },
];

const claims = [
  { id: "01", title: "Inundación y Daño por Agua", desc: "Reparación ultra-rápida de locales operativos y vacíos tras roturas de matrices o temporales." },
  { id: "02", title: "Siniestros por Incendio", desc: "Retiro de escombros, limpieza técnica y reconstrucción estructural certificada pos-fuego." },
  { id: "03", title: "Impacto y Daño Estructural", desc: "Evaluación SEC inmediata y reparación de muros, fachadas y techos por sismos o accidentes." },
];

export default function Servicios() {
  const [expandedClaim, setExpandedClaim] = useState<string | null>("01");

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">
      
      {/* 1. HERO DIVIDIDO */}
      <section className="relative border-b border-zinc-200 bg-[#F8FAFC] z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-10 md:p-20 lg:p-32"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-0.5 w-12 bg-[#FF5000]" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-zinc-500">Catálogo Técnico</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] leading-tight mb-8 tracking-tighter font-display">
              SOLUCIONES <br /> ESTRUCTURALES <br /> <span className="text-[#FF5000]">B2B.</span>
            </h1>
            <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-md">
              Abarcamos toda la gama de servicios, desde la planificación del proyecto arquitectónico hasta su construcción final, operando bajo estándares industriales rígidos.
            </p>
          </motion.div>
          
          {/* Clean image container with strict aspect ratio */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[400px] overflow-hidden border-l border-zinc-200">
            <Image 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
              alt="Arquitectura Industrial B2B"
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. GRID TÉCNICO DE ESPECIALIDADES */}
      <section className="py-32 max-w-6xl px-8 md:px-16 mx-auto relative z-10">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">Especialidades de Ejecución</h2>
          <p className="text-zinc-500 font-light">Coordinamos todos los gremios bajo una misma supervisión logística y administrativa para garantizar cumplimiento.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specialities.map((spec, index) => (
            <motion.div 
              key={spec.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group border border-zinc-200 bg-[#F8FAFC] p-8 flex flex-col justify-between h-52 transition-all duration-300 hover:border-[#FF5000]/50 hover:shadow-lg"
            >
              <div className="flex justify-between items-start">
                <Icon name={spec.icon} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] leading-snug tracking-tight group-hover:text-[#FF5000] transition-colors">
                {spec.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SINIESTROS EXPANDIBLES */}
      <section className="pb-40 max-w-6xl px-8 md:px-16 mx-auto relative z-10">
        <div className="mb-20">
          <span className="inline-block bg-[#FF5000]/10 text-[#FF5000] border border-[#FF5000]/30 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4">
            Unidad de Reacción Inmediata
          </span>
          <h2 className="font-display text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">Manejo de Emergencias Corporativas</h2>
        </div>

        <div className="border border-zinc-200 bg-[#F8FAFC] shadow-xl overflow-hidden">
          {claims.map((claim) => (
            <motion.div 
              key={claim.id}
              className="border-b border-zinc-200 last:border-b-0 cursor-pointer relative group"
              onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
            >
              <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-zinc-400 text-lg">{claim.id}</span>
                  <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#FF5000] transition-colors">
                    {claim.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedClaim === claim.id ? 180 : 0 }}
                  className="text-zinc-400 group-hover:text-[#FF5000] w-6 h-6 shrink-0 transition-colors"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
                </motion.div>
              </div>

              <motion.div
                initial={false}
                animate={expandedClaim === claim.id ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto", visibility: "visible" },
                  collapsed: { opacity: 0, height: 0, visibility: "hidden" }
                }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden bg-zinc-100/50"
              >
                <div className="px-8 md:px-28 pb-10 pt-2 text-zinc-500 font-light leading-relaxed max-w-4xl">
                  {claim.desc}
                  <Link href="/contacto" className="text-[#FF5000] text-sm font-bold uppercase tracking-widest flex items-center gap-2 mt-6 hover:text-[#CC4000] w-fit transition-colors">
                    Solicitar Asistencia Técnica <span className="text-lg">→</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}