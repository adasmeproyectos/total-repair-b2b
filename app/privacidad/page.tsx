import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Política de Privacidad",
  description:
    "Política de privacidad y tratamiento de datos personales de Total Repair Ltda. conforme a la Ley N° 19.628.",
  path: "/privacidad",
  noIndex: true,
});

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>
        <p className="text-zinc-500 text-sm mb-12 font-light">
          Última actualización: 20 de octubre de 2026
        </p>

        <div className="bg-white p-8 md:p-12 border border-zinc-200 shadow-sm rounded-sm">
          <div className="prose prose-slate max-w-none space-y-10 text-[15px] leading-relaxed text-zinc-600 font-light">
            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                1. Responsable del Tratamiento
              </h2>
              <p>
                <strong>{COMPANY.legalName}</strong>, fundada por {COMPANY.founder}, con domicilio comercial en {COMPANY.address}, correo electrónico{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-[#FF5000] font-medium hover:underline"
                >
                  {COMPANY.email}
                </a>{" "}
                y teléfono {COMPANY.phoneDisplay}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                2. Ley N° 19.628 sobre Protección de la Vida Privada
              </h2>
              <p>
                De conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada vigente en la República de Chile, le informamos que los datos personales que nos proporcione a través de nuestros formularios de contacto u otras vías de comunicación serán tratados con estricta confidencialidad y bajo los más altos estándares de seguridad.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                3. Datos que Recopilamos
              </h2>
              <p>
                Recopilamos únicamente los datos necesarios a través de nuestros canales de atención:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Nombre y apellido</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono de contacto</li>
                <li>Nombre de empresa o comunidad (para clientes B2B)</li>
                <li>Descripción técnica del proyecto, obra o siniestro</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                4. Finalidad del Tratamiento
              </h2>
              <p>Los datos recopilados se utilizan exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Responder a solicitudes de presupuesto, servicios técnicos y cotizaciones.
                </li>
                <li>Coordinar visitas técnicas e inspecciones en terreno.</li>
                <li>
                  Comunicaciones relacionadas con la gestión, ejecución y garantía del servicio contratado.
                </li>
              </ul>
              <p className="mt-4">
                <strong>
                  No utilizamos sus datos para campañas masivas de marketing
                </strong>{" "}
                sin su consentimiento expreso, ni comercializamos, arrendamos o cedemos bases de datos a terceros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                5. Seguridad de la Información
              </h2>
              <p>
                Implementamos medidas técnicas y organizativas robustas (incluyendo cifrado HTTPS/TLS y cabeceras de seguridad estrictas) orientadas a evitar la pérdida, mal uso, alteración y acceso no autorizado a los datos facilitados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                6. Derechos ARCO
              </h2>
              <p>
                En estricto cumplimiento con la legislación chilena (Ley N° 19.628), usted puede ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición respecto de sus datos personales escribiendo a:{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-[#FF5000] font-medium hover:underline"
                >
                  {COMPANY.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">
                7. Modificaciones a la Política
              </h2>
              <p>
                {COMPANY.legalName} se reserva el derecho de actualizar esta política para adaptarla a novedades legislativas o jurisprudenciales en Chile.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
