import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ImageWrapper } from "@/components/shared/ImageWrapper";

const FLAGSHIP_PROJECTS = [
  {
    title: "Chilevisión Machasa",
    subtitle: "Proyecto Emblemático",
    description:
      "Ejecución de terminaciones de alta precisión técnica, revestimientos especializados e interiorismo detallado para estudios de televisión, cumpliendo con los más altos estándares acústicos y visuales de la industria.",
    image: "/img/fotos/remodelacion-interior.jpg",
    badges: ["Alta Precisión", "Interiorismo", "Estudios TV"],
    align: "left",
  },
  {
    title: "IntegraMédica Post-27F",
    subtitle: "Reconstrucción Crítica 24/7",
    description:
      "Reconstrucción simultánea de 8 centros médicos post-terremoto operando en turnos 24/7. Destaca la alta coordinación logística en Plaza Norte trabajando en conjunto con constructora Icafal.",
    image: "/img/fotos/historia-27f.jpg",
    badges: ["24/7", "Logística Crítica", "Salud"],
    align: "right",
  },
  {
    title: "Hotel Park Lake",
    subtitle: "Sobrecubierta a Gran Escala",
    description:
      "Intervención mayor consistente en el recambio completo de 3.000 m² de cubierta en pleno invierno en la región lacustre, garantizando impermeabilidad total sin interrumpir la operación del hotel.",
    image: "/img/fotos/arquitectura-B2B.jpg",
    badges: ["3.000 m²", "Cubiertas", "Hotelería"],
    align: "left",
  },
];

export function ProjectSpotlight() {
  return (
    <section className="py-24 px-4 sm:px-6 md:px-12 bg-[#F8FAFC] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionLabel label="Proyectos Insignia" className="justify-center" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mt-4 uppercase">
            OBRAS QUE DEJAN <span className="text-[#FF5000]">HUELLA</span>
          </h2>
          <p className="mt-4 text-zinc-600 font-light max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Nuestra experiencia se forja en proyectos donde la precisión, los plazos críticos y la excelencia técnica son innegociables.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {FLAGSHIP_PROJECTS.map((project) => {
            const isRight = project.align === "right";

            return (
              <article
                key={project.title}
                className={`flex flex-col ${
                  isRight ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 md:gap-12 lg:gap-16 items-center`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative aspect-[4/3] group overflow-hidden border border-zinc-200 bg-zinc-100 shadow-xs">
                  <ImageWrapper className="w-full h-full" overlayOpacity="none">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </ImageWrapper>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2">
                  <span className="text-[#FF5000] font-mono font-bold tracking-widest text-xs uppercase mb-3 block">
                    {project.subtitle}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] mb-5 tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 font-light leading-relaxed mb-6 text-base sm:text-lg">
                    {project.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {project.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3.5 py-1.5 border border-zinc-200 bg-white text-zinc-700 text-xs font-mono font-semibold tracking-wide"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectSpotlight;
