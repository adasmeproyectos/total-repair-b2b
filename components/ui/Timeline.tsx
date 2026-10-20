import { SectionLabel } from "@/components/shared/SectionLabel";

const MILESTONES = [
  {
    year: "2004",
    title: "Nacimiento de Total Repair Ltda.",
    description:
      "Fundada el 4 de agosto de 2004 por Patricia Cecilia Gallardo, iniciando operaciones enfocadas en la reparación integral de inmuebles, obras civiles y respuesta a siniestros.",
  },
  {
    year: "2008",
    title: "Hotel del Mar Enjoy",
    description:
      "Ampliamos nuestra cartera de proyectos corporativos, marcando un estándar de alta exigencia técnica en el sector hotelero e institucional.",
  },
  {
    year: "2009",
    title: "Hospital Clínico UC",
    description:
      "Habilitación e intervenciones técnicas en recintos clínicos y hospitalarios donde la continuidad operacional y la bioseguridad son vitales.",
  },
  {
    year: "2010",
    title: "Hito 27F: Reconstrucción 24/7",
    description:
      "Reconstrucción post-terremoto trabajando 24/7 en 8 centros IntegraMédica de forma simultánea, destacando la coordinación logística en Plaza Norte junto a Icafal.",
    isHighlight: true,
  },
  {
    year: "2013–2014",
    title: "Chilevisión Machasa",
    description:
      "Proyecto emblemático de terminaciones de alta precisión técnica, revestimientos acústicos e interiorismo corporativo para estudios de televisión.",
    isHighlight: true,
  },
  {
    year: "2015–2020",
    title: "Expansión Nacional",
    description:
      "Consolidación en retail, telecomunicaciones (Claro, WOM), educación superior (Duoc UC, UTFSM) y obras mayores como la sobrecubierta del Hotel Park Lake (3.000 m²).",
  },
  {
    year: "Actualidad",
    title: "Más de 22 Años de Respaldo B2B y Hogar",
    description:
      "Liderazgo consolidado en construcción, habilitación corporativa y respuesta a siniestros en Chile, operando bajo normativa SEC y OGUC.",
    isHighlight: true,
  },
];

export function Timeline() {
  return (
    <section
      className="py-24 px-4 sm:px-6 md:px-12 bg-white border-b border-zinc-200 overflow-hidden"
      id="historia"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <SectionLabel
            label="Nuestra Historia en Obras"
            className="justify-center"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mt-4 uppercase">
            CONSTRUIMOS <span className="text-[#FF5000]">CONFIANZA</span> DESDE
            2004
          </h2>
          <p className="mt-4 text-zinc-600 font-light max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Un recorrido por nuestros hitos y proyectos más exigentes, demostrando capacidad de respuesta y excelencia técnica a lo largo de más de dos décadas.
          </p>
        </div>

        {/* Alternating 2-Column Light-Mode Corporate Timeline */}
        <div className="relative">
          {/* Centre spine — visible on md+ */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 -translate-x-1/2"
            aria-hidden="true"
          />

          {MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={milestone.year} className="relative mb-8 last:mb-0">
                {/* Centre dot (md+) */}
                <div
                  className={[
                    "hidden md:block absolute left-1/2 top-8 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 z-10",
                    milestone.isHighlight
                      ? "bg-[#FF5000] ring-4 ring-[#FF5000]/15"
                      : "bg-zinc-400",
                  ].join(" ")}
                  aria-hidden="true"
                />

                {/* Card container */}
                <div
                  className={[
                    "pl-6 border-l-2 border-zinc-200 py-2",
                    isEven
                      ? "md:border-l-0 md:pl-0 md:w-1/2 md:ml-0 md:pr-12 md:text-right"
                      : "md:border-l-0 md:pl-12 md:w-1/2 md:ml-auto md:text-left",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "bg-[#F8FAFC] p-6 sm:p-8 hover:shadow-md transition-shadow duration-200 border border-zinc-200",
                      milestone.isHighlight
                        ? isEven
                          ? "border-l-4 border-l-[#FF5000] md:border-l-zinc-200 md:border-r-4 md:border-r-[#FF5000]"
                          : "border-l-4 border-l-[#FF5000]"
                        : "",
                    ].join(" ")}
                  >
                    <span className="text-[#FF5000] font-mono font-bold tracking-widest text-sm mb-2 block">
                      {milestone.year}
                    </span>
                    <h3 className="font-display text-xl xl:text-2xl font-bold text-[#0F172A] mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-zinc-600 font-light leading-relaxed text-sm xl:text-base">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
