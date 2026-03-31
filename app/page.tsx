"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-200 selection:bg-orange-600 selection:text-white font-sans overflow-hidden">
      
      {/* 1. NAV TÉCNICO (Glassmorphism + Bordes rectos) */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter text-white">
            TOTAL<span className="text-orange-600">REPAIR</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/" className="text-white border-b-2 border-orange-600 pb-1">Inicio</Link>
            <Link href="/nosotros" className="text-slate-400 hover:text-white transition-colors">Sobre Nosotros</Link>
            <Link href="/servicios" className="text-slate-400 hover:text-white transition-colors">Servicios</Link>
            <Link href="/contacto" className="bg-orange-600 text-white px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-orange-700 transition-colors">
              Cotizar Proyecto
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO INMERSIVO */}
      <section className="relative h-[90vh] flex items-center">
        {/* Imagen de fondo (Asset 1) con Overlay degradado técnico */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/img/fotos/hero-corporativo.jpg" 
            alt="Oficina Corporativa en Construcción" 
            fill 
            className="object-cover opacity-40 grayscale-[20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-orange-600" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-400">División Empresas e Instituciones</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              CONSTRUIMOS TUS <br /> PROYECTOS. <br />
              <span className="text-orange-600">SIN DEMORAS.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl font-light leading-relaxed">
              Tu espacio listo para funcionar. Especialistas en remodelación y habilitación de locales comerciales con 20 años de experiencia.
            </p>
            <div className="flex gap-4">
              <Link href="/contacto" className="bg-white text-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
                Agendar Reunión
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. MARQUEE INFINITO (Framer Motion Component) */}
      <section className="border-y border-slate-800 bg-slate-900 py-10 relative overflow-hidden flex items-center">
        {/* Máscaras de gradiente para difuminar los bordes */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-24 whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {/* Loop de logos unificados en tamaño (h-10) y forzados a blanco */}
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-24 items-center">
              <img src="/img/logos/claro.png" alt="Claro" className="h-10 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
              <img src="/img/logos/wom.png" alt="Wom" className="h-10 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
              <img src="/img/logos/enjoy.png" alt="Enjoy" className="h-10 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
              <img src="/img/logos/usm.png" alt="USM" className="h-10 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
              <img src="/img/logos/duoc.png" alt="Duoc" className="h-10 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* 4. BENTO BOX GRID DE SERVICIOS */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Especialidades de Ejecución</h2>
          <p className="text-slate-400">Soluciones eficaces adaptadas a proyectos de gran escala.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Card 1: Span 2 (Remodelación) */}
          <motion.div 
            whileHover={{ borderColor: "#EA580C" }}
            className="md:col-span-2 md:row-span-2 relative border border-slate-800 bg-slate-800/50 overflow-hidden group p-10 flex flex-col justify-end transition-colors duration-500"
          >
            <Image 
              src="/img/fotos/blueprint-remodelacion.jpg" 
              alt="Planos arquitectónicos" 
              fill 
              className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4 block">Especialidad Principal</span>
              <h3 className="text-3xl font-bold text-white mb-4">Centros Comerciales y Habilitación</h3>
              <p className="text-slate-400 max-w-md">Desde el plano arquitectónico hasta la construcción final. Remodelamos locales y centros médicos garantizando que tus operaciones no se detengan.</p>
            </div>
          </motion.div>

          {/* Card 2: Square (Construcción) */}
          <motion.div 
            whileHover={{ borderColor: "#475569" }}
            className="border border-slate-800 bg-slate-800/30 p-8 flex flex-col justify-between transition-colors duration-500"
          >
            <div className="w-12 h-12 bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              {/* Usando un placeholder SVG limpio */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22L22 2"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Mantenimiento</h3>
              <p className="text-sm text-slate-400">Reparación de techos, pisos y muros en zonas de alta circulación.</p>
            </div>
          </motion.div>

          {/* Card 3: Vertical Emergencias (Glow Industrial) */}
          <motion.div 
            whileHover={{ borderColor: "#EA580C", boxShadow: "inset 0 0 40px rgba(234, 88, 12, 0.1)" }}
            className="relative border border-slate-800 bg-slate-900 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500"
          >
            <Image 
              src="/img/fotos/textura-emergencia.jpg" 
              alt="Textura industrial" 
              fill 
              className="object-cover opacity-10 mix-blend-overlay" 
            />
            <div className="relative z-10">
              <span className="inline-block bg-orange-600/20 text-orange-500 border border-orange-600/50 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                Atención 24/7
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Siniestros</h3>
              <p className="text-sm text-slate-400">Inundaciones, daños por fuego o sismos. Presupuestos directos aseguradoras.</p>
            </div>
            <Link href="/contacto" className="relative z-10 mt-8 text-orange-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-orange-400">
              Línea Directa <span className="text-lg">→</span>
            </Link>
          </motion.div>

        </div>
      </section>

    </main>
  );
}