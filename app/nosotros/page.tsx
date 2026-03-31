"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Nosotros() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-200 selection:bg-orange-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. NAV TÉCNICO */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tighter text-white">
            TOTAL<span className="text-orange-600">REPAIR</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Inicio</Link>
            <Link href="/nosotros" className="text-white border-b-2 border-orange-600 pb-1">Sobre Nosotros</Link>
            <Link href="/servicios" className="text-slate-400 hover:text-white transition-colors">Servicios</Link>
            <Link href="/contacto" className="bg-orange-600 text-white px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-orange-700 transition-colors">
              Cotizar Proyecto
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HEADER TITÁNICO */}
      <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-0.5 w-12 bg-orange-600" />
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-400">Filosofía Corporativa</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            RESPUESTAS BAJO <br /> <span className="text-orange-600">PRESIÓN.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
            La compañía nace de la necesidad de contar con una empresa integral dedicada a la remodelación y reparación de edificios y espacios comerciales.
          </p>
        </motion.div>
      </section>

      {/* 3. HITO 27/F */}
      <section className="relative h-auto md:h-[80vh] min-h-150 flex items-center mb-32 border-y border-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/img/fotos/historia-27f.jpg" 
            alt="Ingeniería bajo presión" 
            fill 
            className="object-cover opacity-30 grayscale-50 scale-105"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 bg-slate-900/60 backdrop-blur-xl border-l-4 border-orange-600 p-8 md:p-12 shadow-2xl"
          >
            <i className="fa-solid fa-quote-left text-4xl text-orange-600/50 mb-6 block"></i>
            <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
              "El 27/F marcó un precedente. Desde entonces, desarrollamos la experiencia de lograr lo imposible en condiciones extremas."
            </p>
            <p className="text-slate-300 leading-relaxed font-light">
              Tiempos acotados, el clima o la dificultad logística no son pretextos. Entregamos a nuestros clientes la administración y supervisión total del proyecto para garantizar el cumplimiento de la obra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. GARANTÍAS */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Seguridad Certificada</h2>
          <p className="text-slate-400">Trabajamos bajo los más altos estándares normativos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ y: -5, borderColor: "#EA580C" }}
            className="bg-slate-800/40 border border-slate-700 p-10 transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 text-orange-500 text-2xl">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Seguros TRC</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Contamos con Seguros de Todo Riesgo Construcción, protegiendo tu inversión desde el día uno de la obra.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, borderColor: "#EA580C" }}
            className="bg-slate-800/40 border border-slate-700 p-10 transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 text-orange-500 text-2xl">
              <i className="fa-solid fa-hard-hat"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Asociados ACHS</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Trabajamos bajo estrictos protocolos de prevención de riesgos apoyados por la Asociación Chilena de Seguridad.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, borderColor: "#EA580C" }}
            className="bg-slate-800/40 border border-slate-700 p-10 transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 text-orange-500 text-2xl">
              <i className="fa-solid fa-clipboard-check"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Protocolos Sanitarios</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Aplicamos protocolos actualizados de salud en terreno, garantizando espacios seguros para todo el personal.</p>
          </motion.div>

        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-slate-950 text-slate-400 py-16 text-sm border-t border-slate-800">
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