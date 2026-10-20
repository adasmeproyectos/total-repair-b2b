import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Timeline } from "@/components/ui/Timeline";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { COMPANY } from "@/lib/constants";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Nosotros y Filosofía Corporativa",
  description:
    "Conoce la historia de Total Repair Ltda., fundada el 4 de agosto de 2004 por Patricia Cecilia Gallardo. Más de 22 años liderando obras críticas, remodelaciones y respuesta a siniestros en Chile.",
  path: "/nosotros",
});

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">
      {/* 1. HEADER */}
      <section className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div>
          <SectionLabel label="Filosofía Corporativa" className="justify-center" />
          <h1 className="font-display text-5xl md:text-7xl font-black text-[#0F172A] leading-tight mb-8 tracking-tight">
            RESPUESTAS BAJO <br /> <span className="text-[#FF5000]">PRESIÓN.</span>
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-light leading-relaxed">
            Fundada el 4 de agosto de {COMPANY.founded} por{" "}
            <strong className="font-semibold text-[#0F172A]">
              {COMPANY.founder}
            </strong>
            ,{" "}
            <strong className="font-semibold text-[#0F172A]">
              {COMPANY.legalName}
            </strong>{" "}
            nació con la convicción de ofrecer respuestas reales cuando los tiempos apremian. Con más de {COMPANY.yearsExperience} años de trayectoria en Chile, nos especializamos en ejecutar obras complejas en espacios ocupados, garantizando la continuidad operacional de su empresa y la tranquilidad de su hogar.
          </p>
        </div>
      </section>

      {/* 2. CORE SPECIALIZATION */}
      <section className="relative h-auto md:h-[70vh] min-h-[560px] flex items-center border-y border-zinc-200 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0 overflow-hidden md:w-1/2">
          <Image
            src="/img/fotos/historia-27f.jpg"
            alt="Ingeniería bajo presión en terreno — Total Repair Ltda."
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-80 origin-top-left scale-[1.08]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950 hidden md:block" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex justify-end">
          <div className="md:w-[55%] bg-white border border-zinc-200 border-l-4 border-l-[#FF5000] p-8 md:p-14 shadow-xl">
            <svg
              viewBox="0 0 24 24"
              fill="#FF5000"
              opacity="0.2"
              className="w-16 h-16 mb-6"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-snug mb-6">
              &quot;Nuestra especialidad es operar donde otros se detienen: espacios habitados y recintos críticos.&quot;
            </p>
            <p className="text-zinc-600 leading-relaxed font-light text-lg">
              Desde reconstrucciones por siniestros graves hasta remodelaciones corporativas y domiciliarias de alta exigencia, entendemos que su vida y su operación no se detienen por una obra. Entregamos la administración y supervisión total del proyecto bajo estándares SEC y OGUC.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE CORPORATIVO */}
      <Timeline />

      {/* 4. GARANTÍAS */}
      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <SectionLabel label="Certificaciones y Garantías" className="justify-center" />
          <h2 className="font-display text-4xl font-black text-[#0F172A] mb-4 tracking-tight">
            Seguridad Certificada
          </h2>
          <p className="text-zinc-600 font-light text-lg">
            Trabajamos bajo los más altos estándares normativos y de prevención de riesgos en Chile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-8 h-8"
                >
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Seguros TRC y RC",
              desc: "Contamos con Seguros de Todo Riesgo Construcción y Responsabilidad Civil, protegiendo tu patrimonio desde el día uno de la obra.",
            },
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-8 h-8"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
              title: "Prevención ACHS",
              desc: "Trabajamos bajo estrictos protocolos de seguridad laboral y prevención de riesgos respaldados por la Asociación Chilena de Seguridad.",
            },
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-8 h-8"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              ),
              title: "Cumplimiento SEC / OGUC",
              desc: "Todas nuestras instalaciones eléctricas, sanitarias y de gas son ejecutadas por profesionales acreditados ante la Superintendencia (SEC).",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="bg-[#F8FAFC] border border-zinc-200 p-10 transition-colors duration-200 hover:border-[#FF5000] hover:shadow-md"
            >
              <div className="w-16 h-16 bg-white border border-zinc-200 shadow-sm flex items-center justify-center mb-8 text-[#FF5000]">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-[#0F172A] mb-4">
                {item.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <EmergencyCTA variant="empresas" />
    </div>
  );
}
