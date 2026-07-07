"use client";

/**
 * app/nosotros/page.tsx — Paleta v2 (Blanco / Naranjo)
 * Header blanco, hito 27/F con overlay oscuro intencional, garantías en blanco.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">

      {/* 1. HEADER */}
      <section className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionLabel label="Filosofía Corporativa" />
          <h1 className="font-display text-5xl md:text-7xl font-black text-zinc-900 leading-tight mb-8 tracking-tight">
            RESPUESTAS BAJO <br /> <span className="text-[#E85B0C]">PRESIÓN.</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl font-light leading-relaxed">
            La compañía nace de la necesidad de contar con una empresa integral dedicada a
            la remodelación y reparación de edificios y espacios comerciales.
          </p>
        </motion.div>
      </section>

      {/* 2. HITO 27/F — Fondo oscuro intencional (énfasis histórico) */}
      <section className="relative h-auto md:h-[80vh] min-h-[600px] flex items-center mb-32 border-y border-zinc-200 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/img/fotos/historia-27f.jpg"
            alt="Ingeniería bajo presión — Terremoto 27/F"
            fill
            className="object-cover opacity-30 grayscale scale-105"
            priority
          />
          <div className="absolute inset-0 bg-zinc-900/70" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 bg-zinc-900/70 backdrop-blur-xl border-l-4 border-[#E85B0C] p-8 md:p-12 shadow-2xl"
          >
            <svg viewBox="0 0 24 24" fill="#E85B0C" opacity="0.4" className="w-12 h-12 mb-6">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
              &quot;El 27/F marcó un precedente. Desde entonces, desarrollamos la experiencia
              de lograr lo imposible en condiciones extremas.&quot;
            </p>
            <p className="text-zinc-300 leading-relaxed font-light">
              Tiempos acotados, el clima o la dificultad logística no son pretextos.
              Entregamos a nuestros clientes la administración y supervisión total del
              proyecto para garantizar el cumplimiento de la obra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. GARANTÍAS — Fondo blanco */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <SectionLabel label="Certificaciones y Garantías" />
          <h2 className="font-display text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Seguridad Certificada</h2>
          <p className="text-zinc-500">Trabajamos bajo los más altos estándares normativos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              ),
              title: "Seguros TRC",
              desc: "Contamos con Seguros de Todo Riesgo Construcción, protegiendo tu inversión desde el día uno de la obra.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              ),
              title: "Asociados ACHS",
              desc: "Trabajamos bajo estrictos protocolos de prevención de riesgos apoyados por la Asociación Chilena de Seguridad.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              ),
              title: "Protocolos Sanitarios",
              desc: "Aplicamos protocolos actualizados de salud en terreno, garantizando espacios seguros para todo el personal.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4, borderColor: "#E85B0C" }}
              className="bg-white border border-zinc-200 p-10 transition-all duration-300 shadow-sm"
            >
              <div className="w-16 h-16 bg-orange-50 border border-orange-100 flex items-center justify-center mb-8 text-[#E85B0C]">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-900 mb-4">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}