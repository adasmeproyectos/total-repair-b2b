"use client";

/**
 * app/hogar/page.tsx
 * División Residencial — Migración de total-construye.
 *
 * Diferencia visual intencional vs /empresas:
 *  - Diseño más cálido (backgrounds menos oscuros, card variant claro)
 *  - Servicios residenciales: Gasfitería, Electricidad, Remodelación, Pintura
 *  - Galería de proyectos
 *  - FAQ accordion
 *  - EmergencyCTA variante hogar (fondo naranja)
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { COMPANY } from "@/lib/constants";


const services = [
  {
    id: "gasfiteria",
    title: "Gasfitería y Redes",
    desc: "Instalación, mantención y reparación de redes de agua caliente, fría y gas. Trabajo certificado SEC.",
    image: "/img/fotos/gasfiteria-redes.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2a3 3 0 013 3v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-1v7a2 2 0 01-2 2H8a2 2 0 01-2-2V11H5a1 1 0 01-1-1V7a1 1 0 011-1h2V5a3 3 0 013-3h2z"/>
      </svg>
    ),
  },
  {
    id: "electricidad",
    title: "Electricidad SEC",
    desc: "Instalaciones eléctricas residenciales certificadas. Tableros eléctricos, enchufes, iluminación y más.",
    image: "/img/fotos/electricidad-sec.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: "remodelacion",
    title: "Remodelación Interior",
    desc: "Transformamos cocinas, baños y espacios. Diseño, materiales y ejecución con garantía total.",
    image: "/img/fotos/remodelacion-interior.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    id: "pintura",
    title: "Pintura y Terminaciones",
    desc: "Pintura interior y exterior, estuco, revestimientos y terminaciones de alto estándar.",
    image: "/img/fotos/split-servicios.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M20 19.5v.5a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8.5L20 7.5v12zM14 2v6h6"/>
      </svg>
    ),
  },
];

const projects = [
  { id: "p1", title: "Remodelación Cocina Completa", location: "Las Condes", image: "/img/fotos/proyecto-cocina.jpg" },
  { id: "p2", title: "Baño Suite Masterplan", location: "Providencia", image: "/img/fotos/proyecto-bano.jpg" },
  { id: "p3", title: "Ampliación Segundo Piso", location: "La Florida", image: "/img/fotos/proyecto-ampliacion.jpg" },
];

const faqs = [
  { q: "¿Trabajan con materiales del cliente?", a: "Sí. Podemos ejecutar la obra con materiales que tú proveas, o bien nos encargamos de toda la provisión con precios convenidos." },
  { q: "¿Tienen garantía en los trabajos?", a: "Todos nuestros trabajos tienen garantía mínima de 6 meses en mano de obra. Las garantías de fabricante sobre materiales son adicionales." },
  { q: "¿En cuánto tiempo parten?", a: "Una vez aprobado el presupuesto, coordinamos el inicio dentro de los próximos 5 a 10 días hábiles dependiendo de la disponibilidad del equipo." },
  { q: "¿Hacen trabajos en departamentos?", a: "Sí. Trabajamos tanto en casas como en departamentos y tenemos protocolos especiales para mínima interferencia con vecinos." },
  { q: "¿Cómo solicito presupuesto?", a: "Puedes usar el formulario de contacto, llamarnos directamente al " + COMPANY.phoneDisplay + " o enviarnos un mensaje por WhatsApp." },
];

export default function HogarPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">

      {/* ── HERO RESIDENCIAL ──────────────────────────────────────────────── */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/img/fotos/hero-hogar.jpg"
            alt="Remodelación de hogar moderno"
            fill
            className="object-cover opacity-50 scale-105"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/img/fotos/arquitectura-B2B.jpg";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <SectionLabel label="División Hogar / Total Construye" />
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              TU HOGAR,<br />
              <span className="text-orange-600">RENOVADO.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-xl font-light leading-relaxed">
              Gasfitería, electricidad, remodelación y más. Profesionales certificados,
              materiales de calidad y garantía en cada trabajo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto?modo=hogar"
                className="bg-orange-600 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-orange-700 transition-colors"
              >
                Solicitar Presupuesto
              </Link>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-300 text-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:border-green-500 hover:text-green-600 transition-colors"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS HOGAR ──────────────────────────────────────────────────── */}
      <div className="border-y border-zinc-200 bg-zinc-50 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { value: COMPANY.yearsExperience, label: "Años de Trayectoria" },
            { value: COMPANY.projectsDelivered, label: "Proyectos en Hogares" },
            { value: "100%", label: "Trabajos con Garantía" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-black text-orange-600">{stat.value}</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICIOS RESIDENCIALES ───────────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <SectionLabel label="Nuestros Servicios" />
          <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">
            Todo lo que tu hogar necesita
          </h2>
          <p className="text-zinc-500 max-w-xl">
            Un solo equipo para todos los oficios. Sin subcontratistas externos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex gap-6 border border-zinc-200 bg-zinc-50 p-8 hover:border-orange-600/40 transition-all duration-300"
            >
              {/* Imagen miniatura */}
              <div className="relative w-24 h-24 shrink-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500 grayscale-50 group-hover:grayscale-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <div className="text-orange-500 mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── GALERÍA DE PROYECTOS ──────────────────────────────────────────── */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <SectionLabel label="Portfolio" />
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Proyectos Realizados</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group relative h-72 overflow-hidden border border-zinc-200"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 grayscale-20 group-hover:grayscale-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/img/fotos/texture-servicios.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">{project.location}</p>
                  <h3 className="text-white font-bold">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-32 max-w-4xl mx-auto px-6">
        <div className="mb-16 text-center">
          <SectionLabel label="Preguntas Frecuentes" className="justify-center" />
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Lo que más nos preguntan</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq.q} className="border border-zinc-200 bg-zinc-50">
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.q ? null : faq.q)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-white pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: expandedFaq === faq.q ? 180 : 0 }}
                  className="text-zinc-400 shrink-0"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M19 9l-7 7-7-7"/>
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {expandedFaq === faq.q && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-zinc-500 font-light leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMERGENCIAS HOGAR ──────────────────────────────────────────────── */}
      <EmergencyCTA variant="hogar" />

    </div>
  );
}
