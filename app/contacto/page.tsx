"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Contacto() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-900 text-slate-200 selection:bg-orange-600 selection:text-white font-sans antialiased">
      
      {/* 1. NAV TÉCNICO COMPARTIDO */}
      <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tighter text-white">
            TOTAL<span className="text-orange-600">REPAIR</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Inicio</Link>
            <Link href="/nosotros" className="text-slate-400 hover:text-white transition-colors">Sobre Nosotros</Link>
            <Link href="/servicios" className="text-slate-400 hover:text-white transition-colors">Servicios</Link>
            <Link href="/contacto" className="text-white border-b-2 border-orange-600 pb-1">
              Cotizar Proyecto
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. SPLIT LAYOUT (Pantalla Dividida) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 pt-20">
        
        {/* PANEL IZQUIERDO: Información y Textura */}
        <section className="relative p-10 md:p-20 flex flex-col justify-center border-r border-slate-800 bg-slate-900 overflow-hidden">
          {/* Fondo Texturizado (Asset 7) */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/img/fotos/textura-contacto.jpg" 
              alt="Textura Metálica B2B" 
              fill 
              className="object-cover opacity-20 grayscale-50 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 via-slate-900/80 to-slate-900" />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-md"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-0.5 w-12 bg-orange-600" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-400">Recepción de Proyectos</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-12 tracking-tighter">
              INICIAMOS TU <br /> OBRA <span className="text-orange-600">HOY.</span>
            </h1>

            <ul className="space-y-8 mb-12">
              <li className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 flex items-center justify-center text-orange-600 shrink-0 transition-colors group-hover:border-orange-600/50">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide text-sm uppercase mb-1">Centro de Operaciones</h4>
                  <p className="text-slate-400 font-light text-sm">Villasana 1398<br />Quinta Normal, Santiago, Chile</p>
                </div>
              </li>
              <li className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 flex items-center justify-center text-orange-600 shrink-0 transition-colors group-hover:border-orange-600/50">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide text-sm uppercase mb-1">Línea Comercial y Siniestros</h4>
                  <p className="text-slate-400 font-light text-sm">(+56) 9 9919 5521</p>
                </div>
              </li>
              <li className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 flex items-center justify-center text-orange-600 shrink-0 transition-colors group-hover:border-orange-600/50">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide text-sm uppercase mb-1">Correo Electrónico</h4>
                  <p className="text-slate-400 font-light text-sm">contacto@totalrepair.cl</p>
                </div>
              </li>
            </ul>

            {/* MAPA B2B (Filtro Dark Mode Invertido) */}
            <div className="h-48 w-full border border-slate-800 bg-slate-950 relative overflow-hidden group">
              <iframe 
                src="https://maps.google.com/maps?q=Villasana%201398,%20Quinta%20Normal,%20Santiago&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full absolute inset-0 grayscale-100 invert contrast-125 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </section>

        {/* PANEL DERECHO: Formulario Brutalista */}
        <section className="bg-slate-950 p-10 md:p-20 flex flex-col justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg w-full mx-auto lg:mx-0"
          >
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Solicitar Presupuesto Formal</h2>
            <p className="text-slate-500 font-light text-sm mb-10">Completa los datos técnicos y un ingeniero de cuentas te contactará a la brevedad.</p>

            <form action="https://formspree.io/f/TU_CODIGO_AQUI" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Contacto *</label>
                  <input type="text" id="nombre" name="Nombre" required className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all text-sm text-white rounded-none placeholder:text-slate-700" placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                  <label htmlFor="empresa" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Empresa *</label>
                  <input type="text" id="empresa" name="Empresa" required className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all text-sm text-white rounded-none placeholder:text-slate-700" placeholder="Ej: Inmobiliaria Sur" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefono" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Teléfono *</label>
                  <input type="tel" id="telefono" name="Telefono" required className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all text-sm text-white rounded-none placeholder:text-slate-700" placeholder="+56 9 1234 5678" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Correo Corporativo *</label>
                  <input type="email" id="email" name="Email" required className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all text-sm text-white rounded-none placeholder:text-slate-700" placeholder="jperez@empresa.cl" />
                </div>
              </div>

              <div>
                <label htmlFor="servicio" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Requerimiento *</label>
                <div className="relative">
                  <select id="servicio" name="Servicio" required className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all text-sm text-white appearance-none cursor-pointer rounded-none">
                    <option value="" disabled selected className="text-slate-500">Selecciona una división...</option>
                    <option value="Habilitación Comercial">Habilitación de Local / Oficina</option>
                    <option value="Emergencia Siniestro">Emergencia / Siniestro URI</option>
                    <option value="Remodelacion Estructural">Remodelación Estructural</option>
                    <option value="Mantenimiento Anual">Contrato de Mantenimiento Anual</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-orange-600">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Especificaciones Técnicas *</label>
                <textarea id="mensaje" name="Mensaje" rows={4} required className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all text-sm text-white resize-none rounded-none placeholder:text-slate-700" placeholder="Magnitud de la obra, plazos requeridos o detalles estructurales..."></textarea>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-4 bg-orange-600 text-white font-bold uppercase tracking-[0.2em] text-sm transition-colors hover:bg-orange-700 flex items-center justify-center gap-3 group">
                  Enviar Requerimiento
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </form>
          </motion.div>
        </section>
      </div>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-sm border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <p className="font-light text-xs">© 2026 Total Repair Ltda. Todos los derechos reservados.</p>
            </div>
            <div className="flex gap-6 text-xs font-bold tracking-widest uppercase">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
                <a href="https://www.totalconstruye.cl" target="_blank" rel="noreferrer" className="text-orange-600 hover:text-orange-500 transition-colors">División Hogar <i className="fa-solid fa-arrow-up-right-from-square text-[10px] ml-1"></i></a>
            </div>
        </div>
      </footer>

    </main>
  );
}