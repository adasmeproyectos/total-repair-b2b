"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";

const FLAGSHIP_PROJECTS = [
  {
    title: "Chilevisión Machasa",
    subtitle: "Proyecto Emblemático",
    description: "Ejecución de terminaciones de alta precisión técnica, revestimientos especializados e interiorismo detallado para estudios de televisión, cumpliendo con los más altos estándares acústicos y visuales de la industria.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    badges: ["Alta Precisión", "Interiorismo", "Estudios TV"],
    align: "left",
  },
  {
    title: "IntegraMédica Post-27F",
    subtitle: "Reconstrucción Crítica 24/7",
    description: "Reconstrucción simultánea de 8 centros médicos post-terremoto operando en turnos 24/7. Destaca la alta coordinación logística en Plaza Norte trabajando en conjunto con constructora Icafal.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    badges: ["24/7", "Logística Crítica", "Salud"],
    align: "right",
  },
  {
    title: "Hotel Park Lake",
    subtitle: "Sobrecubierta a Gran Escala",
    description: "Intervención mayor consistente en el recambio completo de 3.000 m² de cubierta en pleno invierno en la región lacustre, garantizando impermeabilidad total sin interrumpir la operación del hotel.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    badges: ["3.000 m²", "Cubiertas", "Hotelería"],
    align: "left",
  },
];

export function ProjectSpotlight() {
  return (
    <section className="py-32 px-6 bg-[#F8FAFC] border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <SectionLabel label="Proyectos Insignia" className="justify-center" />
          <h2 className="font-display text-4xl md:text-6xl font-black text-[#0F172A] tracking-tight mt-6">
            OBRAS QUE DEJAN <span className="text-[#FF5000]">HUELLA</span>
          </h2>
          <p className="mt-6 text-zinc-600 font-light max-w-2xl mx-auto text-lg">
            Nuestra experiencia se forja en proyectos donde la precisión, los plazos críticos y la excelencia técnica son innegociables.
          </p>
        </div>

        <div className="space-y-32">
          {FLAGSHIP_PROJECTS.map((project, index) => {
            const isRight = project.align === "right";
            
            return (
              <div 
                key={project.title} 
                className={`flex flex-col ${isRight ? "md:flex-row-reverse" : "md:flex-row"} gap-12 lg:gap-20 items-center`}
              >
                {/* Image Section */}
                <motion.div 
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full md:w-1/2 relative aspect-[4/3] group overflow-hidden bg-zinc-200"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>

                {/* Content Section */}
                <motion.div 
                  initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="w-full md:w-1/2"
                >
                  <span className="text-[#FF5000] font-bold tracking-widest text-xs uppercase mb-4 block">
                    {project.subtitle}
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl font-black text-[#0F172A] mb-6 tracking-tight leading-none">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 font-light leading-relaxed mb-8 text-lg">
                    {project.description}
                  </p>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3">
                    {project.badges.map(badge => (
                      <span 
                        key={badge} 
                        className="px-4 py-2 border border-zinc-200 bg-white text-zinc-600 text-xs font-semibold tracking-wide rounded-sm"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
