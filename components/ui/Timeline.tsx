"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";

const MILESTONES = [
  {
    year: "2004",
    title: "Nacimiento de Total Repair",
    description:
      "Iniciamos operaciones enfocados en la reparación integral de inmuebles por siniestros, estableciendo nuestro compromiso con la calidad y los tiempos de respuesta.",
  },
  {
    year: "2008",
    title: "Hotel del Mar Enjoy",
    description:
      "Ampliamos nuestra cartera de proyectos corporativos, marcando un estándar premium en el sector hotelero.",
  },
  {
    year: "2009",
    title: "Hospital Clínico UC",
    description:
      "Habilitación e intervenciones en entornos críticos donde la continuidad operacional es vital.",
  },
  {
    year: "2010",
    title: "Hito 27F: Reconstrucción",
    description:
      "Reconstrucción post-terremoto trabajando 24/7 en 8 centros IntegraMédica, destacando la coordinación en Plaza Norte junto a Icafal.",
    isHighlight: true,
  },
  {
    year: "2013-14",
    title: "Chilevisión Machasa",
    description:
      "Proyecto emblemático de terminaciones de alta precisión técnica, revestimientos e interiorismo para estudios de televisión.",
    isHighlight: true,
  },
  {
    year: "2015+",
    title: "Expansión Nacional",
    description:
      "Consolidación en retail, telecomunicaciones (WOM), educación (DUOC UC, USM) y proyectos a gran escala como la sobrecubierta del Hotel Park Lake (3.000 m²).",
  },
  {
    year: "2026",
    title: "Confianza B2B",
    description:
      "Más de 22 años consolidando la confianza empresarial en Chile, respondiendo cuando la continuidad de su operación es crítica.",
    isHighlight: true,
  },
];

export function Timeline() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden" id="historia">
      <div className="max-w-6xl xl:max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <SectionLabel label="Nuestra Historia en Obras" className="justify-center" />
          <h2 className="font-display text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mt-6">
            CONSTRUIMOS <span className="text-[#FF5000]">CONFIANZA</span> DESDE 2004
          </h2>
          <p className="mt-4 text-zinc-500 font-light max-w-2xl mx-auto">
            Un recorrido por nuestros proyectos más emblemáticos, demostrando nuestra
            capacidad de respuesta y excelencia técnica a lo largo de las décadas.
          </p>
        </div>

        {/*
          Single DOM tree — ONE <h3> per milestone.
          Layout is CSS-driven:
          - Mobile (<md): left-bordered vertical list
          - Desktop (md+): true alternating 2-column grid with centred spine
        */}
        <div className="relative">
          {/* Centre spine — visible only md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-100 -translate-x-1/2" />

          {MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 0; // even → card on LEFT column

            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative mb-8"
              >
                {/* ── Centre dot (md+) ── */}
                <div
                  className={[
                    "hidden md:block absolute left-1/2 top-8 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 z-10 transition-all duration-300",
                    milestone.isHighlight
                      ? "bg-[#FF5000] shadow-[0_0_14px_rgba(255,80,0,0.55)]"
                      : "bg-zinc-300",
                  ].join(" ")}
                />

                {/*
                  Shared card — single render, positioned via CSS:
                  • Mobile:  full-width left-border strip
                  • Desktop: width 50%, pushed left OR right with padding
                */}
                <div
                  className={[
                    // Mobile: full width + left accent line
                    "pl-6 border-l-2 border-zinc-100 py-4",
                    // Desktop overrides: half-width, alternating side
                    isEven
                      ? "md:border-l-0 md:pl-0 md:w-1/2 md:ml-0 md:pr-12 md:text-right"
                      : "md:border-l-0 md:pl-12 md:w-1/2 md:ml-auto md:text-left",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "bg-[#F8FAFC] p-6 xl:p-8 hover:shadow-lg transition-all duration-300 border border-zinc-100",
                      milestone.isHighlight
                        ? isEven
                          ? "border-r-4 border-r-[#FF5000]"
                          : "border-l-4 border-l-[#FF5000]"
                        : "",
                    ].join(" ")}
                  >
                    <span className="text-[#FF5000] font-bold tracking-widest text-sm mb-2 block">
                      {milestone.year}
                    </span>
                    {/* ONE <h3> per milestone — no duplicates */}
                    <h3 className="font-display text-xl xl:text-2xl font-bold text-[#0F172A] mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-zinc-600 font-light leading-relaxed text-sm xl:text-base">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
