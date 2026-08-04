"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { COMPANY } from "@/lib/constants";

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">

      {/* 1. HEADER */}
      <section className="pt-28 pb-20 px-8 md:px-16 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionLabel label="Filosofía Corporativa" className="justify-center" />
          <h1 className="font-display text-5xl md:text-7xl font-black text-[#0F172A] leading-tight mb-8 tracking-tight">
            RESPUESTAS BAJO <br /> <span className="text-[#FF5000]">PRESIÓN.</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed">
            Nacimos en {COMPANY.founded} con la convicción de ofrecer respuestas reales cuando los tiempos apremian. Con más de {COMPANY.yearsExperience} años de historia en Chile, nos especializamos en ejecutar obras complejas en espacios ocupados, garantizando la continuidad operacional de su negocio.
          </p>
        </motion.div>
      </section>

      {/* 2. CORE SPECIALIZATION */}
      <section className="relative h-auto md:h-[70vh] min-h-[600px] flex items-center mb-32 border-y border-zinc-200 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 z-0 overflow-hidden md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
            alt="Ingeniería bajo presión"
            fill
            className="object-cover opacity-90 scale-105"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-full mx-auto px-8 md:px-16 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-[55%] bg-white border border-zinc-200 border-l-4 border-l-[#FF5000] p-8 md:p-14 shadow-xl"
          >
            <svg viewBox="0 0 24 24" fill="#FF5000" opacity="0.2" className="w-16 h-16 mb-6">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-snug mb-6">
              &quot;Nuestra especialidad es operar donde otros se detienen: espacios habitados y recintos críticos.&quot;
            </p>
            <p className="text-zinc-600 leading-relaxed font-light text-lg">
              Desde reparaciones por siniestros hasta remodelaciones de alta complejidad, entendemos que el mundo no se detiene por una obra. Entregamos a nuestros clientes la administración y supervisión total del proyecto para asegurar cero interrupciones en su operación.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. GARANTÍAS */}
      <section className="pb-32 px-8 md:px-16 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <SectionLabel label="Certificaciones y Garantías" className="justify-center" />
          <h2 className="font-display text-4xl font-black text-[#0F172A] mb-4 tracking-tight">Seguridad Certificada</h2>
          <p className="text-zinc-500 font-light text-lg">Trabajamos bajo los más altos estándares normativos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              title: "Protocolos Activos",
              desc: "Aplicamos normativas actualizadas de seguridad en terreno, garantizando espacios seguros para todo el personal.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4, borderColor: "#FF5000" }}
              className="bg-[#F8FAFC] border border-zinc-200 p-10 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-white border border-zinc-200 shadow-sm flex items-center justify-center mb-8 text-[#FF5000]">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-[#0F172A] mb-4">{item.title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}