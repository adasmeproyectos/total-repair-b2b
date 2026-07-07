"use client";

/**
 * app/contacto/page.tsx — REFACTORIZADO
 * Elimina nav/footer duplicados.
 * Usa ContactForm unificado con Turnstile + Resend.
 * Formulario ya NO apunta a Formspree placeholder.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { COMPANY } from "@/lib/constants";

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 antialiased pt-20">

      {/* SPLIT LAYOUT */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">

        {/* PANEL IZQUIERDO: Información */}
        <section className="relative p-10 md:p-20 flex flex-col justify-center border-r border-zinc-200 bg-zinc-900 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/img/fotos/textura-contacto.jpg"
              alt="Textura Metálica"
              fill
              className="object-cover opacity-20 grayscale-50 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-zinc-900/50 via-zinc-900/80 to-zinc-900" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-md"
          >
            <SectionLabel label="Recepción de Proyectos" />
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-12 tracking-tighter">
              INICIAMOS TU <br /> OBRA <span className="text-orange-600">HOY.</span>
            </h1>

            <ul className="space-y-8 mb-12">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" className="w-5 h-5">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  ),
                  label: "Centro de Operaciones",
                  value: "Villasana 1398\nQuinta Normal, Santiago, Chile",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" className="w-5 h-5">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  ),
                  label: "Línea Comercial y Siniestros",
                  value: COMPANY.phoneDisplay,
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" className="w-5 h-5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  ),
                  label: "Correo Electrónico",
                  value: COMPANY.email,
                },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 transition-colors group-hover:border-orange-600/50">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-wide text-sm uppercase mb-1">{item.label}</h4>
                    <p className="text-zinc-500 font-light text-sm whitespace-pre-line">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mapa oscuro */}
            <div className="h-48 w-full border border-zinc-200 bg-zinc-50 relative overflow-hidden group">
              <iframe
                src="https://maps.google.com/maps?q=Villasana%201398,%20Quinta%20Normal,%20Santiago&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full absolute inset-0 grayscale invert contrast-125 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Total Repair — Villasana 1398, Quinta Normal"
              />
            </div>
          </motion.div>
        </section>

        {/* PANEL DERECHO: Formulario */}
        <section className="bg-zinc-50 p-10 md:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg w-full mx-auto lg:mx-0"
          >
            <h2 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
              Solicitar Presupuesto Formal
            </h2>
            <p className="text-zinc-400 font-light text-sm mb-10">
              Completa los datos y un ingeniero de cuentas te contactará a la brevedad.
            </p>
            {/* Formulario unificado — modo empresa por defecto en /contacto */}
            <ContactForm mode="empresa" />
          </motion.div>
        </section>
      </div>
    </div>
  );
}