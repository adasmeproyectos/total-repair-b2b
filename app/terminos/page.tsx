import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Términos de Servicio",
  description:
    "Términos y condiciones generales de los servicios de construcción, remodelación y respuesta a siniestros de Total Repair Ltda.",
  path: "/terminos",
  noIndex: true,
});

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="text-[#FF5000] text-sm font-bold tracking-widest uppercase hover:underline mb-8 block"
        >
          ← Volver al Inicio
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">
          Términos de Servicio
        </h1>
        <p className="text-zinc-500 text-sm mb-12 font-light">
          Última actualización: 20 de octubre de 2026
        </p>

        <div className="bg-white p-8 md:p-12 border border-zinc-200 shadow-sm rounded-sm">
          <div className="prose prose-slate max-w-none space-y-10 text-[15px] leading-relaxed text-zinc-600 font-light">
            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                1. Aceptación de los Términos
              </h2>
              <p>
                Al acceder y utilizar el sitio web{" "}
                <strong>www.totalrepair.cl</strong>, operado por{" "}
                <strong>{COMPANY.legalName}</strong>, usted acepta los presentes Términos de Servicio. Si no está de acuerdo con alguno de ellos, le solicitamos abstenerse de utilizar este sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                2. Descripción del Servicio
              </h2>
              <p>
                <strong>{COMPANY.legalName}</strong> ofrece servicios profesionales de construcción, obras civiles, remodelación corporativa y residencial, instalaciones certificadas SEC y gestión de siniestros en Chile. Toda estimación preliminar está sujeta a factibilidad e inspección técnica en terreno.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                3. Solicitudes y Presupuestos
              </h2>
              <p>
                El envío de un formulario de contacto o solicitud de cotización a través del sitio web no constituye por sí mismo la celebración de un contrato de construcción. Todo servicio se formaliza mediante presupuesto detallado, orden de compra o contrato de obra firmado y aceptado por ambas partes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                4. Garantías Legales y Contractuales
              </h2>
              <p>
                Los trabajos ejecutados por <strong>{COMPANY.legalName}</strong> cuentan con garantía de mano de obra conforme a lo estipulado en cada contrato y a la Ley General de Urbanismo y Construcciones (LGUC) cuando corresponda. Las garantías sobre equipos y materiales manufacturados corresponden a las otorgadas por sus respectivos fabricantes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                5. Propiedad Intelectual
              </h2>
              <p>
                Todos los contenidos de este sitio web (textos técnicos, fotografías, logotipos, diseño gráfico y código fuente) son propiedad intelectual de{" "}
                <strong>{COMPANY.legalName}</strong> o de sus respectivos titulares y se encuentran protegidos por la Ley N° 17.336 sobre Propiedad Intelectual. Queda prohibida su reproducción total o parcial sin autorización escrita.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                6. Limitación de Responsabilidad
              </h2>
              <p>
                <strong>{COMPANY.legalName}</strong> procura mantener la información del sitio actualizada y exacta, pero no asume responsabilidad por interrupciones temporales del servicio digital ni por decisiones tomadas únicamente con base en información general del portal sin previa evaluación técnica en terreno.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                7. Legislación Aplicable y Jurisdicción
              </h2>
              <p>
                Los presentes Términos de Servicio se rigen íntegramente por las leyes de la República de Chile. Para todos los efectos legales, las partes fijan su domicilio en la ciudad y comuna de Santiago, sometiéndose a la jurisdicción de sus Tribunales Ordinarios de Justicia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                8. Contacto Legal
              </h2>
              <p>
                Para consultas sobre estos términos o requerimientos institucionales, puede escribirnos a:{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-[#FF5000] font-medium hover:underline"
                >
                  {COMPANY.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
