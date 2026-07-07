/**
 * app/proyectos/page.tsx
 * Galería de Proyectos — contenido extraído del sitio live totalrepair-cl.webnode.cl
 *
 * Esta sección es la PRUEBA SOCIAL más importante en el rubro construcción.
 * Muestra proyectos reales terminados con antes/después y descripción breve.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Galería de proyectos ejecutados por Total Repair: remodelaciones comerciales, habilitaciones, siniestros y construcción. 20 años de experiencia en Chile.",
};

const proyectos = [
  {
    id: "01",
    category: "Habilitación Comercial",
    title: "Remodelación de Local en Centro Comercial",
    desc: "Habilitación completa de local comercial en horario extendido para no interrumpir operaciones del mall. Carpintería, porcelanato, electricidad y climatización.",
    image: "/img/fotos/hero-corporativo.jpg",
    tags: ["B2B", "Retail"],
  },
  {
    id: "02",
    category: "Remodelación Residencial",
    title: "Renovación Integral de Baño y Cocina",
    desc: "Modernización completa de baño y cocina en departamento habitado. Porcelanatos de gran formato, gasfitería certificada SEC y electricidad.",
    image: "/img/fotos/remodelacion-interior.jpg",
    tags: ["Hogar", "Terminaciones"],
  },
  {
    id: "03",
    category: "Siniestro — Daño por Agua",
    title: "Recuperación Post-Inundación Oficina Corporativa",
    desc: "Restauración completa de oficina de 800m² tras rotura de matriz principal. Reparación en tiempo récord con lugar operativo. Presupuesto coordinado con aseguradora.",
    image: "/img/fotos/dano-agua.jpg",
    tags: ["B2B", "Emergencia"],
  },
  {
    id: "04",
    category: "Siniestro — Incendio",
    title: "Reconstrucción Pos-Incendio Local Comercial",
    desc: "Retiro de escombros, limpieza técnica, recuperación de superficies y reconstrucción completa. Propiedad devuelta como nueva en 21 días hábiles.",
    image: "/img/fotos/dano-incendio.jpg",
    tags: ["B2B", "Emergencia"],
  },
  {
    id: "05",
    category: "Construcción — Salas de Baño",
    title: "Construcción de Baños para Institución Educativa",
    desc: "Desarrollo completo de 8 salas de baño para establecimiento educacional. Protocolos de seguridad ACHS, materiales certificados y entrega en plazo Carta Gantt.",
    image: "/img/fotos/gasfiteria-redes.jpg",
    tags: ["Institucional", "Obra Nueva"],
  },
  {
    id: "06",
    category: "Remodelación — Co-working",
    title: "Habilitación de Espacio Co-working Moderno",
    desc: "Transformación de oficina tradicional en espacio de co-working flexible. Diseño de zonas de trabajo colaborativo, terrazas y áreas de descanso.",
    image: "/img/fotos/blueprint-remodelacion.jpg",
    tags: ["B2B", "Diseño Interior"],
  },
];

const tags = ["Todos", "B2B", "Hogar", "Emergencia", "Institucional"];

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-800 pt-20">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto border-b border-zinc-100">
        <SectionLabel label="Portafolio de Obras" />
        <h1 className="font-display text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight mb-6">
          PROYECTOS<br />
          <span className="text-[#E85B0C]">EJECUTADOS.</span>
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl font-light leading-relaxed">
          20 años transformando espacios. Empresas, instituciones y hogares en la
          Región Metropolitana confían en nosotros para cada etapa de su proyecto.
        </p>
      </section>

      {/* ── GRID DE PROYECTOS ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((p) => (
            <article
              key={p.id}
              className="group bg-white border border-zinc-200 overflow-hidden hover:border-[#E85B0C] hover:shadow-lg transition-all duration-400"
            >
              {/* Imagen */}
              <div className="relative h-52 overflow-hidden bg-zinc-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay naranja sutil on hover */}
                <div className="absolute inset-0 bg-[#E85B0C]/0 group-hover:bg-[#E85B0C]/10 transition-colors duration-500" />

                {/* Número */}
                <span className="absolute top-4 left-4 bg-white/90 text-zinc-800 font-display font-bold text-sm px-3 py-1 tracking-widest">
                  {p.id}
                </span>
              </div>

              {/* Contenido */}
              <div className="p-8">
                <p className="text-[#E85B0C] text-xs font-semibold uppercase tracking-widest mb-3">
                  {p.category}
                </p>
                <h2 className="font-display text-xl font-bold text-zinc-900 mb-4 leading-snug">
                  {p.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                  {p.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-100 text-zinc-600 text-xs px-3 py-1 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Solicitar presupuesto */}
        <div className="mt-20 text-center border-t border-zinc-100 pt-16">
          <SectionLabel label="¿Tienes un proyecto?" />
          <h2 className="font-display text-4xl font-bold text-zinc-900 mb-6">
            CUÉNTANOS TU IDEA.
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto mb-10 font-light">
            Desde una remodelación de baño hasta la habilitación de un centro comercial
            completo. Evaluamos tu proyecto sin costo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-[#E85B0C] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#C4470A] transition-colors"
            >
              Solicitar Presupuesto
            </Link>
            <Link
              href="/servicios"
              className="border-2 border-zinc-300 text-zinc-700 px-10 py-4 font-bold uppercase tracking-widest text-sm hover:border-[#E85B0C] hover:text-[#E85B0C] transition-colors"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA EMERGENCIAS ────────────────────────────────────────────────── */}
      <EmergencyCTA variant="empresas" />

    </div>
  );
}
