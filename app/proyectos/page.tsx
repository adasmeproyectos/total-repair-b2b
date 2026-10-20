import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Portafolio de Proyectos Ejecutados",
  description:
    "Galería de proyectos ejecutados por Total Repair Ltda.: remodelaciones comerciales, habilitaciones B2B, reconstrucción de siniestros y construcción residencial con más de 22 años de experiencia en Chile.",
  path: "/proyectos",
});

const proyectos = [
  {
    id: "01",
    category: "Habilitación Comercial",
    title: "Remodelación de Local en Centro Comercial",
    location: "Las Condes",
    desc: "Habilitación completa de local comercial en horario extendido para no interrumpir operaciones del mall. Carpintería, porcelanato, electricidad SEC y climatización.",
    image: "/img/fotos/hero-corporativo.jpg",
    tags: ["B2B", "Retail"],
  },
  {
    id: "02",
    category: "Remodelación Residencial",
    title: "Renovación Integral de Baño y Cocina",
    location: "Providencia",
    desc: "Modernización completa de baño y cocina en departamento habitado. Porcelanatos de gran formato, gasfitería certificada SEC y electricidad.",
    image: "/img/fotos/remodelacion-interior.jpg",
    tags: ["Hogar", "Terminaciones"],
  },
  {
    id: "03",
    category: "Siniestro — Daño por Agua",
    title: "Recuperación Post-Inundación Oficina Corporativa",
    location: "Santiago Centro",
    desc: "Restauración completa de oficina de 800 m² tras rotura de matriz principal. Reparación en tiempo récord con recinto operativo y presupuesto coordinado con aseguradora.",
    image: "/img/fotos/dano-agua.jpg",
    tags: ["B2B", "Emergencia"],
  },
  {
    id: "04",
    category: "Siniestro — Incendio",
    title: "Reconstrucción Pos-Incendio Local Comercial",
    location: "Maipú",
    desc: "Retiro de escombros, limpieza técnica de hollín, recuperación de superficies y reconstrucción completa. Propiedad devuelta como nueva en 21 días hábiles.",
    image: "/img/fotos/dano-incendio.jpg",
    tags: ["B2B", "Emergencia"],
  },
  {
    id: "05",
    category: "Construcción — Salas de Baño",
    title: "Construcción de Baños para Institución Educativa",
    location: "La Florida",
    desc: "Desarrollo completo de 8 salas de baño para establecimiento educacional. Protocolos de seguridad ACHS, materiales certificados y entrega en plazo Carta Gantt.",
    image: "/img/fotos/gasfiteria-redes.jpg",
    tags: ["Institucional", "Obra Nueva"],
  },
  {
    id: "06",
    category: "Remodelación — Co-working",
    title: "Habilitación de Espacio Co-working Moderno",
    location: "Vitacura",
    desc: "Transformación de oficina tradicional en espacio de co-working flexible. Diseño de zonas de trabajo colaborativo, tabiquería acústica y áreas de descanso.",
    image: "/img/fotos/arquitectura-B2B.jpg",
    tags: ["B2B", "Diseño Interior"],
  },
];

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden pt-20">
      {/* ── HEADER (#F8FAFC) ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#F8FAFC] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Portafolio de Obras" />
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-tight mb-6 uppercase">
            PROYECTOS{" "}
            <span className="text-[#FF5000] block sm:inline">EJECUTADOS.</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl font-light leading-relaxed">
            Más de 22 años transformando y recuperando espacios. Empresas, aseguradoras, instituciones y hogares en la Región Metropolitana confían en nosotros para cada etapa de su proyecto.
          </p>
        </div>
      </section>

      {/* ── GRID DE PROYECTOS (#FFFFFF) ────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {proyectos.map((p) => (
            <article
              key={p.id}
              className="group bg-[#F8FAFC] border border-zinc-200 overflow-hidden hover:border-[#FF5000] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Imagen con Blindaje Anti-Marca de Agua */}
                <div className="relative h-56 overflow-hidden bg-zinc-100 border-b border-zinc-200">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover origin-top-left scale-[1.08]"
                  />

                  {/* Número */}
                  <span className="absolute top-4 left-4 bg-white/95 text-[#0F172A] font-mono font-bold text-xs px-3 py-1 tracking-widest border border-zinc-200 shadow-2xs">
                    {p.id}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="text-[#FF5000] text-xs font-mono font-semibold uppercase tracking-widest">
                      {p.category}
                    </p>
                    <span className="text-zinc-500 text-xs font-mono flex items-center gap-1 shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF5000"
                        strokeWidth="2"
                        className="w-3.5 h-3.5 shrink-0"
                      >
                        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {p.location}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-[#FF5000] transition-colors duration-200">
                    {p.title}
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed font-light mb-6">
                    {p.desc}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="px-6 sm:px-8 pb-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white border border-zinc-200 text-zinc-700 text-xs font-mono px-3 py-1 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* CTA Solicitar presupuesto */}
        <div className="mt-20 text-center border-t border-zinc-200 pt-16">
          <SectionLabel label="¿Tienes un proyecto?" className="justify-center" />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] mb-4 uppercase">
            CUÉNTANOS TU IDEA.
          </h2>
          <p className="text-zinc-600 max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Desde la remodelación de un baño o cocina hasta la habilitación de un centro comercial completo. Evaluamos tu proyecto en terreno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-[#FF5000] text-white px-10 py-4 font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-[#CC4000] transition-colors duration-200"
            >
              Solicitar Presupuesto
            </Link>
            <Link
              href="/servicios"
              className="border border-zinc-300 bg-[#F8FAFC] text-[#0F172A] px-10 py-4 font-bold uppercase tracking-widest text-xs sm:text-sm hover:border-[#FF5000] hover:text-[#FF5000] transition-colors duration-200"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA EMERGENCIAS (#F8FAFC) ──────────────────────────────────────── */}
      <EmergencyCTA variant="empresas" />
    </div>
  );
}
