/**
 * app/empresas/page.tsx — Paleta v2 (Blanco / Naranjo)
 * Hero: fondo oscuro con overlay de imagen real.
 * Interior: fondo blanco con cards en zinc-100/blanco.
 */

import Image from "next/image";
import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "División Empresas",
  description:
    "Habilitación comercial, remodelaciones corporativas y gestión de siniestros para empresas, centros comerciales, clínicas y co-works. 20 años de experiencia.",
};

export default function EmpresasPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">

      {/* ── HERO — Oscuro intencional con imagen real ─────────────────────── */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/img/fotos/hero-corporativo.jpg"
            alt="Oficina Corporativa en Construcción"
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <SectionLabel label="División Empresas e Instituciones" dark />
            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              CONSTRUIMOS TUS <br /> PROYECTOS. <br />
              <span className="text-[#E85B0C]">SIN DEMORAS.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-xl font-light leading-relaxed">
              Tu espacio listo para funcionar. Especialistas en remodelación y habilitación
              de locales comerciales con 20 años de experiencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="bg-white text-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
              >
                Agendar Reunión
              </Link>
              <Link
                href="/servicios"
                className="border border-zinc-500 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:border-[#E85B0C] transition-colors"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARRUSEL CLIENTES ────────────────────────────────────────────────── */}
      <LogoCarousel />

      {/* ── BENTO GRID SERVICIOS ─────────────────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <SectionLabel label="Especialidades de Ejecución" />
          <h2 className="font-display text-3xl font-bold text-zinc-900 mb-4 tracking-tight">
            Soluciones Corporativas Integrales
          </h2>
          <p className="text-zinc-500">
            Coordinamos todos los gremios bajo una supervisión logística y administrativa unificada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:h-[600px]">
          {/* Featured: Centros Comerciales */}
          <div className="md:col-span-2 md:row-span-2 relative border border-zinc-200 bg-zinc-50 overflow-hidden group p-10 flex flex-col justify-end hover:border-[#E85B0C] transition-colors duration-500">
            <Image
              src="/img/fotos/blueprint-remodelacion.jpg"
              alt="Planos arquitectónicos"
              fill
              className="object-cover opacity-15 group-hover:opacity-25 scale-105 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            <div className="relative z-10">
              <span className="text-[#E85B0C] text-xs font-bold uppercase tracking-widest mb-4 block">Especialidad Principal</span>
              <h3 className="font-display text-3xl font-bold text-white mb-4">Centros Comerciales y Habilitación</h3>
              <p className="text-zinc-300 max-w-md font-light">
                Desde el plano arquitectónico hasta la construcción final. Remodelamos locales
                y centros médicos garantizando que tus operaciones no se detengan.
              </p>
            </div>
          </div>

          {/* Mantenimiento */}
          <div className="border border-zinc-200 bg-zinc-50 p-8 flex flex-col justify-between hover:border-zinc-300 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-zinc-900 mb-2">Mantenimiento</h3>
              <p className="text-sm text-zinc-500">Reparación de techos, pisos y muros en zonas de alta circulación.</p>
            </div>
          </div>

          {/* Emergencias */}
          <div className="relative border border-zinc-200 bg-zinc-900 p-8 flex flex-col justify-between overflow-hidden hover:border-[#E85B0C] transition-all duration-500">
            <div className="relative z-10">
              <span className="inline-block bg-[#E85B0C]/20 text-[#E85B0C] border border-[#E85B0C]/40 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                Atención 24/7
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">Siniestros</h3>
              <p className="text-sm text-zinc-400">Inundaciones, daños por fuego o sismos. Presupuestos directos aseguradoras.</p>
            </div>
            <Link
              href="/contacto"
              className="relative z-10 mt-8 text-[#E85B0C] text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-orange-400"
            >
              Línea Directa <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GESTIÓN DE SINIESTROS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <SectionLabel label="Unidad de Reacción Inmediata (URI)" />
            <h2 className="font-display text-3xl font-bold text-zinc-900 tracking-tight">Gestión de Siniestros Corporativos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "01",
                title: "Inundación y Daño por Agua",
                desc: "Reparación ultra-rápida de locales operativos y vacíos tras roturas de matrices o temporales.",
                image: "/img/fotos/dano-agua.jpg",
              },
              {
                id: "02",
                title: "Siniestros por Incendio",
                desc: "Retiro de escombros, limpieza técnica y reconstrucción estructural certificada pos-fuego.",
                image: "/img/fotos/dano-incendio.jpg",
              },
              {
                id: "03",
                title: "Impacto y Daño Estructural",
                desc: "Evaluación SEC inmediata y reparación de muros, fachadas y techos por sismos o accidentes.",
                image: "/img/fotos/otros-siniestros.jpg",
              },
            ].map((claim) => (
              <div key={claim.id} className="group border border-zinc-200 bg-white overflow-hidden hover:border-[#E85B0C]/50 hover:shadow-md transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={claim.image}
                    alt={claim.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                <div className="p-8">
                  <span className="text-zinc-300 text-xs font-mono mb-3 block">{claim.id}</span>
                  <h3 className="text-lg font-bold text-zinc-900 mb-3">{claim.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{claim.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA EMERGENCIAS ──────────────────────────────────────────────────── */}
      <EmergencyCTA variant="empresas" />

    </div>
  );
}
