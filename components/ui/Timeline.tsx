import { SectionLabel } from "@/components/shared/SectionLabel";

const MILESTONES = [
  {
    year: "2004",
    title: "Fundación e Inicio de Operaciones",
    description:
      "Fundada el 4 de agosto de 2004 por Patricia Cecilia Gallardo como contratista general especializado en mantenimiento correctivo, obras menores y remodelaciones en la Región Metropolitana.",
  },
  {
    year: "2010",
    title: "Hito Operativo: Terremoto 27F",
    description:
      "Despliegue masivo en reconstrucción estructural y reparación de inmuebles siniestrados. Inicio de alianzas estratégicas con compañías de seguros y liquidadores oficiales.",
  },
  {
    year: "2016",
    title: "Consolidación B2B e Institucional",
    description:
      "Adjudicación de contratos de mantenimiento y habilitación para entidades públicas (Sernatur, GORE, MOP) y grandes corporaciones privadas.",
  },
  {
    year: "Actualidad",
    title: "Liderazgo en Respuesta a Siniestros y Obras Civiles",
    description:
      "Más de 22 años de trayectoria ininterrumpida, operando bajo estándares de cumplimiento normativo (SEC / OGUC) con cobertura integral para empresas, aseguradoras y propietarios.",
  },
];

export function Timeline() {
  return (
    <section className="py-24 bg-zinc-950 text-white border-y border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <SectionLabel label="Evolución Corporativa" dark />
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading uppercase text-white">
            Más de dos décadas de respaldo
          </h2>
        </div>

        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {MILESTONES.map((item) => (
            <div key={item.year} className="relative group">
              {/* Nodo indicador */}
              <div
                className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-[#FF5000] group-hover:bg-[#FF5000] transition-colors duration-200"
                aria-hidden="true"
              />

              <span className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 text-[#FF5000] font-mono text-sm font-bold mb-3">
                {item.year}
              </span>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-heading">
                {item.title}
              </h3>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
