import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Catálogo Técnico de Servicios y Siniestros",
  description:
    "Especialidades de construcción B2B, carpintería industrial, pintura de alta gama, electricidad certificada SEC, redes de datos y manejo de emergencias 24/7 en Chile.",
  path: "/servicios",
});

const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    carpentery: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.5 14.5l-8.5-8.5L2 16l8.5 8.5L20.5 14.5z" />
        <path d="M12 2l4 4-4 4-4-4 4-4z" />
      </svg>
    ),
    paint: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 11l-4.5 4.5m0 0L7 11l4.5-4.5L16 11z" />
        <path d="M19 19c2 2 4 1 4-1a5 5 0 00-5-5H6a5 5 0 00-5 5c0 2 2 3 4 1" />
      </svg>
    ),
    sec: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    data: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        <path d="M7 6v12M11 6v12M15 6v12M19 6v12" />
      </svg>
    ),
  };
  return (
    <div className="w-8 h-8 text-zinc-500 group-hover:text-[#FF5000] transition-colors duration-200">
      {icons[name] || icons.data}
    </div>
  );
};

const specialities = [
  {
    name: "Carpintería Industrial",
    desc: "Tabiquería estructural y acústica, puertas cortafuego, cielos modulares y mobiliario técnico corporativo.",
    icon: "carpentery",
  },
  {
    name: "Pintura Alta Gama",
    desc: "Revestimientos epóxicos, intumescentes, esmaltes industriales y terminaciones arquitectónicas de alto tráfico.",
    icon: "paint",
  },
  {
    name: "Electricidad SEC",
    desc: "Proyectos eléctricos en baja tensión, tableros generales, bancos de condensadores, iluminación LED y certificación TE1.",
    icon: "sec",
  },
  {
    name: "Redes de Datos y Clima",
    desc: "Cableado estructurado, canalización industrial, salas de servidores y climatización HVAC para oficinas y locales.",
    icon: "data",
  },
];

const claims = [
  {
    id: "01",
    title: "Inundación y Daño por Agua",
    desc: "Extracción mecanizada de agua, deshumidificación industrial, secado de losas y reparación integral de locales comerciales, oficinas y viviendas tras roturas de matrices o eventos climáticos.",
  },
  {
    id: "02",
    title: "Siniestros por Incendio",
    desc: "Retiro normado de escombros, encapsulamiento y limpieza técnica de hollín, evaluación estructural y reconstrucción certificada pos-fuego en coordinación directa con liquidadores de seguros.",
  },
  {
    id: "03",
    title: "Impacto y Daño Estructural",
    desc: "Apuntalamiento de emergencia, evaluación SEC/OGUC inmediata y reconstrucción de muros perimetrales, fachadas, escaparates comerciales y techumbres afectadas por sismos o colisiones.",
  },
];

const claimsFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: claims.map((c) => ({
    "@type": "Question",
    name: `¿En qué consiste el servicio de ${c.title} de Total Repair Ltda.?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: c.desc,
    },
  })),
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claimsFaqJsonLd) }}
      />

      {/* 1. HERO DIVIDIDO */}
      <section className="relative border-b border-zinc-200 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionLabel label="Catálogo Técnico" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] leading-[1.08] mb-6 tracking-tight font-display uppercase">
              SOLUCIONES <br className="hidden sm:inline" /> ESTRUCTURALES{" "}
              <span className="text-[#FF5000] block sm:inline">B2B & HOGAR.</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-xl">
              Abarcamos toda la gama de servicios de ingeniería civil, remodelación y respuesta a siniestros, desde el levantamiento técnico hasta la recepción conforme bajo normativa chilena.
            </p>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden border border-zinc-200 bg-zinc-100 shadow-xs">
            <Image
              src="/img/fotos/arquitectura-B2B.jpg"
              alt="Arquitectura e Ingeniería Industrial B2B — Total Repair Ltda."
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover origin-top-left scale-[1.08]"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. GRID TÉCNICO DE ESPECIALIDADES (#FFFFFF) */}
      <section className="py-20 sm:py-24 max-w-7xl px-4 sm:px-6 md:px-12 mx-auto bg-white">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <SectionLabel label="Gremios Integrados" className="justify-center" />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] mb-3 tracking-tight uppercase">
            Especialidades de Ejecución
          </h2>
          <p className="text-zinc-600 font-light">
            Coordinamos todos los gremios bajo una misma supervisión logística y administrativa para garantizar cumplimiento de plazos y calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialities.map((spec) => (
            <article
              key={spec.name}
              className="group border border-zinc-200 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between min-h-[220px] transition-colors duration-200 hover:border-[#FF5000] hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-6">
                <Icon name={spec.icon} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] leading-snug tracking-tight group-hover:text-[#FF5000] transition-colors duration-200 mb-2">
                  {spec.name}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-light">
                  {spec.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. SINIESTROS EXPANDIBLES (#F8FAFC) */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-t border-zinc-200">
        <div className="max-w-7xl px-4 sm:px-6 md:px-12 mx-auto">
          <div className="mb-12">
            <span className="inline-block bg-[#FF5000]/10 text-[#FF5000] border border-[#FF5000]/30 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              Unidad de Reacción Inmediata
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] mb-3 tracking-tight uppercase">
              Manejo de Emergencias y Siniestros
            </h2>
          </div>

          <div className="border border-zinc-200 bg-white shadow-xs overflow-hidden">
            {claims.map((claim, index) => (
              <details
                key={claim.id}
                open={index === 0}
                className="group border-b border-zinc-200 last:border-b-0"
              >
                <summary className="p-6 sm:p-8 md:p-10 flex items-center justify-between gap-4 sm:gap-6 cursor-pointer list-none hover:bg-[#F8FAFC] transition-colors duration-200">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-mono text-[#FF5000] font-bold text-base sm:text-lg">
                      {claim.id}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#FF5000] transition-colors duration-200">
                      {claim.title}
                    </h3>
                  </div>
                  <div className="text-zinc-500 group-open:rotate-180 group-open:text-[#FF5000] w-6 h-6 shrink-0 transition-transform duration-200">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="px-6 sm:px-8 md:px-20 pb-8 sm:pb-10 pt-2 bg-[#F8FAFC] border-t border-zinc-200/60 text-zinc-600 leading-relaxed font-light">
                  <p className="max-w-4xl pt-4 text-sm sm:text-base">{claim.desc}</p>
                  <Link
                    href="/contacto?urgencia=true"
                    className="text-[#FF5000] text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2 mt-6 hover:text-[#CC4000] w-fit transition-colors duration-200"
                  >
                    Solicitar Asistencia Técnica <span className="text-lg">→</span>
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <EmergencyCTA variant="empresas" />
    </div>
  );
}
