import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ImageWrapper } from "@/components/shared/ImageWrapper";

const FEATURED_PROJECTS = [
  {
    id: "PRJ-01",
    title: "Recuperación Integral de Propiedad Post-Incendio",
    category: "Siniestros Complejos",
    location: "Sector Oriente, RM",
    clientType: "Compañía de Seguros",
    description:
      "Descontaminación de hollín, reconstrucción total de techumbre colapsada, renovación de red eléctrica bajo norma SEC y terminaciones de alto estándar.",
    image: "/img/fotos/dano-incendio.jpg",
  },
  {
    id: "PRJ-02",
    title: "Mitigación y Secado Industrial por Rotura de Matriz",
    category: "Daño por Agua",
    location: "Providencia, RM",
    clientType: "Comunidad de Edificio / Liquidador",
    description:
      "Extracción de agua, deshumidificación mecánica en 4 niveles afectados, reemplazo de pisos estructurados y pintura general con entrega conforme en tiempo récord.",
    image: "/img/fotos/dano-agua.jpg",
  },
  {
    id: "PRJ-03",
    title: "Habilitación y Remodelación de Oficinas Corporativas",
    category: "Obras Civiles B2B",
    location: "Santiago Centro, RM",
    clientType: "Institución Privada",
    description:
      "Rediseño de layout operativo, tabiquería acústica, climatización, cielo modular e iluminación LED de alta eficiencia para continuidad operacional.",
    image: "/img/fotos/remodelacion-interior.jpg",
  },
];

export function ProjectSpotlight() {
  return (
    <section className="py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel label="Capacidad Comprobada en Terreno" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading uppercase">
              Operaciones Recientes
            </h2>
          </div>
          <p className="text-zinc-600 max-w-md text-sm md:text-base border-l-2 border-[#FF5000] pl-4">
            Cada proyecto es ejecutado bajo estrictos protocolos de trazabilidad, seguridad laboral y cumplimiento normativo chileno.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group border border-zinc-200 bg-zinc-50 flex flex-col justify-between overflow-hidden hover:border-zinc-400 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Imagen del Proyecto con Blindaje de Marca de Agua */}
                <div className="relative h-64 w-full overflow-hidden bg-zinc-900">
                  <ImageWrapper className="w-full h-full" overlayOpacity="light">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </ImageWrapper>
                  <div className="absolute top-4 left-4 z-20 bg-zinc-950/90 text-white text-xs font-mono uppercase px-3 py-1.5 tracking-wider border border-zinc-700">
                    {project.category}
                  </div>
                </div>

                {/* Contenido Técnico */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3.5 h-3.5 text-[#FF5000]"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {project.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3.5 h-3.5 text-zinc-400"
                        aria-hidden="true"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      {project.clientType}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#FF5000] transition-colors duration-200 font-heading">
                    {project.title}
                  </h3>

                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Footer de la Tarjeta */}
              <div className="px-8 py-4 bg-zinc-100 border-t border-zinc-200 flex items-center justify-between text-xs font-mono text-zinc-600">
                <span>ESTADO: RECEPCIÓN CONFORME</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-emerald-600"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSpotlight;
