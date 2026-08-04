import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y tratamiento de datos personales de Total Repair Ltda.",
  robots: "noindex, follow",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-[#FF5000] text-sm font-bold tracking-widest uppercase hover:underline mb-8 block">
          ← Volver al Inicio
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">
          Política de Privacidad
        </h1>
        <p className="text-zinc-500 text-sm mb-12 font-light">
          Última actualización: {new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="bg-white p-8 md:p-12 border border-zinc-200 shadow-sm rounded-sm">
          <div className="prose prose-slate max-w-none space-y-10 text-[15px] leading-relaxed text-zinc-600 font-light">
            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">1. Responsable del Tratamiento</h2>
              <p>{COMPANY.name}, con domicilio en {COMPANY.address}, correo electrónico {COMPANY.email}.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">2. Ley N° 19.628 sobre Protección de la Vida Privada</h2>
              <p>De conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada vigente en la República de Chile, le informamos que los datos personales que nos proporcione a través de nuestros formularios de contacto, u otras vías de comunicación, serán tratados con estricta confidencialidad y bajo los más altos estándares de seguridad.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">3. Datos que Recopilamos</h2>
              <p>Recopilamos los siguientes datos personales a través de nuestros formularios:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Nombre y apellido</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Nombre de empresa (para clientes B2B)</li>
                <li>Descripción del proyecto o requerimiento técnico</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">4. Finalidad del Tratamiento</h2>
              <p>Los datos recopilados se utilizan exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Responder a solicitudes de presupuesto, servicios y cotizaciones.</li>
                <li>Coordinar visitas técnicas en terreno.</li>
                <li>Comunicaciones relacionadas con la gestión, ejecución y garantía del servicio contratado.</li>
              </ul>
              <p className="mt-4"><strong>No utilizamos sus datos para campañas masivas de marketing</strong> sin su consentimiento expreso, ni comercializamos, arrendamos o cedemos bases de datos a terceros.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">5. Seguridad</h2>
              <p>Implementamos medidas técnicas y organizativas robustas (incluyendo encriptación HTTPS, transmisión cifrada y protección anti-bot) orientadas a evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados. Nuestro proceso de envío de correos utiliza infraestructura de clase mundial que se rige por estrictos estándares internacionales de seguridad.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">6. Derechos ARCO</h2>
              <p>En estricto cumplimiento con la legislación chilena (Ley N° 19.628), usted ejerce plenos derechos sobre sus datos. Tiene derecho a Exigir información, Modificar (rectificar), Eliminar (cancelar) o Bloquear (oponerse al tratamiento) de sus datos personales. Para ejercer cualquiera de estos derechos, por favor contáctenos a través de: <a href={`mailto:${COMPANY.email}`} className="text-[#FF5000] font-medium hover:underline">{COMPANY.email}</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 font-display">7. Modificaciones a la Política</h2>
              <p>Total Repair se reserva el derecho de modificar esta política para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. Le recomendamos revisar esta página periódicamente.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
