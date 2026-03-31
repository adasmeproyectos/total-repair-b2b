"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Motor de iconos simplificado (Tipo inferido automáticamente para evitar error JSX)
const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    carpentery: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.5 14.5l-8.5-8.5L2 16l8.5 8.5L20.5 14.5z"/><path d="M12 2l4 4-4 4-4-4 4-4z"/></svg>,
    paint: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11l-4.5 4.5m0 0L7 11l4.5-4.5L16 11z"/><path d="M19 19c2 2 4 1 4-1a5 5 0 00-5-5H6a5 5 0 00-5 5c0 2 2 3 4 1"/></svg>,
    sec: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    data: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/><path d="M7 6v12M11 6v12M15 6v12M19 6v12"/></svg>,
  };
  return <div className="w-8 h-8 text-slate-500 group-hover:text-orange-500 transition-colors">{icons[name] || icons.data}</div>;
};

// Datos técnicos de especialidades
const specialities = [
  { name: "Carpintería Industrial", icon: "carpentery", code: "SPE-CRP-01" },
  { name: "Pintura Alta Gama", icon: "paint", code: "SPE-PNT-03" },
  { name: "Electricidad SEC", icon: "sec", code: "SPE-ELE-02" },
  { name: "Redes de Datos", icon: "data", code: "SPE-DAT-04" },
];

// Datos de siniestros para el acordeón
const claims = [
  { id: "01", title: "Inundación y Daño por Agua", desc: "Reparación ultra-rápida de locales operativos y vacíos tras roturas de matrices o temporales.", prompt: "dano-agua.jpg" },
  { id: "02", title: "Siniestros por Incendio", desc: "Retiro de escombros, limpieza técnica y reconstrucción estructural certificada pos-fuego.", prompt: "dano-incendio.jpg" },
  { id: "03", title: "Impacto y Daño Estructural", desc: "Evaluación SEC inmediata y reparación de muros, fachadas y techos por sismos o accidentes.", prompt: "otros-siniestros.jpg" },
];

export default function Servicios() {
  const [expandedClaim, setExpandedClaim] = useState<string | null>("01");

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200 selection:bg-orange-600 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Textura de Fondo Global Técnica */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/img/fotos/texture-servicios.jpg')", backgroundSize: 'cover' }} />

      {/* 1. NAV TÉCNICO */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tighter text-white">
            TOTAL<span className="text-orange-600">REPAIR</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Inicio</Link>
            <Link href="/nosotros" className="text-slate-400 hover:text-white transition-colors">Sobre Nosotros</Link>
            <Link href="/servicios" className="text-white border-b-2 border-orange-600 pb-1">Servicios</Link>
            <Link href="/contacto" className="bg-orange-600 text-white px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-orange-700 transition-colors">
              Cotizar Proyecto
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO DIVIDIDO (Split Layout) */}
      <section className="relative pt-20 border-b border-slate-800 bg-slate-950">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-10 md:p-20 lg:p-32"
          >
            <div className="flex items-center gap-4 mb-6">
              {/* Actualizado a h-0.5 */}
              <div className="h-0.5 w-12 bg-orange-600" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-400">Catálogo Técnico</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
              SOLUCIONES <br /> ESTRUCTURALES <br /> <span className="text-orange-600">B2B.</span>
            </h1>
            <p className="text-lg text-slate-400 font-light leading-relaxed max-w-md">
              Abarcamos toda la gama de servicios, desde la planificación del proyecto arquitectónico hasta su construcción final, operando bajo estándares industriales rígidos.
            </p>
          </motion.div>
          
          {/* Actualizado min-h a sintaxis canónica */}
          <div className="relative h-full min-h-100 md:min-h-150 overflow-hidden border-l border-slate-800">
            <Image 
              src="/img/fotos/split-servicios.jpg" 
              alt="Arquitectura Moderna Industrial" 
              fill 
              className="object-cover grayscale-30 opacity-60"
              priority
            />
            {/* Actualizado bg-linear-to-t */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* 3. GRID TÉCNICO DE ESPECIALIDADES */}
      <section className="py-32 max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Especialidades de Ejecución</h2>
          <p className="text-slate-400 font-light">Coordinamos todos los gremios bajo una misma supervisión logística y administrativa para garantizar cumplimiento.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specialities.map((spec, index) => (
            <motion.div 
              key={spec.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              /* Actualizado a h-55 */
              className="group border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between h-55 transition-all duration-300 hover:border-slate-600"
            >
              <div className="flex justify-between items-start">
                <Icon name={spec.icon} />
                <span className="text-xs font-mono text-slate-700 tracking-wider group-hover:text-slate-500">{spec.code}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug tracking-tight group-hover:text-orange-500 transition-colors">
                {spec.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SINIESTROS EXPANDIBLES */}
      <section className="pb-40 max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <span className="inline-block bg-orange-600/10 text-orange-500 border border-orange-600/30 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4">
            Unidad de Reacción Inmediata
          </span>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Manejo de Emergencias Corporativas</h2>
        </div>

        <div className="border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          {claims.map((claim) => (
            <motion.div 
              key={claim.id}
              className="border-b border-slate-800 last:border-b-0 cursor-pointer relative group"
              onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
            >
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <Image src={`/img/fotos/${claim.prompt}`} alt={claim.title} fill className="object-cover" />
              </div>

              <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-slate-700 text-lg">{claim.id}</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-orange-500 transition-colors">
                    {claim.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedClaim === claim.id ? 180 : 0 }}
                  className="text-slate-600 group-hover:text-orange-500 w-6 h-6 shrink-0"
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
                className="overflow-hidden bg-slate-900/50"
              >
                <div className="px-8 md:px-28 pb-10 pt-2 text-slate-400 font-light leading-relaxed max-w-4xl">
                  {claim.desc}
                  <Link href="/contacto" className="text-orange-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2 mt-6 hover:text-orange-400">
                    Solicitar Asistencia Técnica URI <span className="text-lg">→</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-slate-950 text-slate-400 py-16 text-sm border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
                <h4 className="text-white font-bold text-xl mb-6">Total Repair Ltda.</h4>
                <p className="max-w-md leading-relaxed mb-6 font-light">
                    Soluciones constructivas integrales para empresas. Entregamos la administración y supervisión total del proyecto garantizando el cumplimiento logístico y administrativo.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-xs">Contacto Directo</h4>
                <ul className="space-y-4 font-light">
                    <li className="flex items-start gap-3"><i className="fa-solid fa-location-dot mt-1 text-orange-600"></i> Villasana 1398, Quinta Normal</li>
                    <li className="flex items-center gap-3"><i className="fa-solid fa-phone text-orange-600"></i> (+56) 9 9919 5521</li>
                    <li className="flex items-center gap-3"><i className="fa-solid fa-envelope text-orange-600"></i> contacto@totalrepair.cl</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-xs">Divisiones</h4>
                <ul className="space-y-3 font-light">
                    <li><Link href="/" className="text-white transition-colors">Empresas (B2B)</Link></li>
                    <li><a href="https://www.totalconstruye.cl" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Hogar (Total Construye) <i className="fa-solid fa-arrow-up-right-from-square text-[10px] ml-1"></i></a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800/50 text-center text-xs font-light">
            <p>© 2026 Total Repair Ltda. Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  );
}