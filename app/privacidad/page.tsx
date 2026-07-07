/**
 * app/privacidad/page.tsx
 * Política de Privacidad — requerida por Manifiesto §6.2
 */

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
    <div className="min-h-screen bg-white text-zinc-700 pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-orange-500 text-sm hover:underline mb-8 block">← Volver al Inicio</Link>

        <h1 className="text-4xl font-black text-white mb-2">Política de Privacidad</h1>
        <p className="text-zinc-400 text-sm mb-12">Última actualización: {new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Responsable del Tratamiento</h2>
            <p>{COMPANY.name}, RUT 76.XXX.XXX-X, con domicilio en {COMPANY.address}, correo electrónico {COMPANY.email}.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes datos personales a través de nuestros formularios de contacto:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Nombre y apellido</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Nombre de empresa (opcional, para clientes B2B)</li>
              <li>Descripción del proyecto o requerimiento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Finalidad del Tratamiento</h2>
            <p>Los datos recopilados se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Responder a solicitudes de presupuesto o información</li>
              <li>Coordinar visitas técnicas</li>
              <li>Comunicaciones relacionadas con el servicio contratado</li>
            </ul>
            <p className="mt-3">No utilizamos sus datos para marketing sin consentimiento expreso, ni los cedemos a terceros con fines comerciales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Seguridad</h2>
            <p>Implementamos medidas técnicas de seguridad incluyendo HTTPS, protección anti-bot (Cloudflare Turnstile) y transmisión cifrada de datos. Los emails de contacto son procesados por Resend, un proveedor de email transaccional con sede en EE.UU., bajo términos de privacidad compatibles con estándares internacionales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Derechos del Titular</h2>
            <p>De conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada (Chile), usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos en: <a href={`mailto:${COMPANY.email}`} className="text-orange-500 hover:underline">{COMPANY.email}</a></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Analíticas</h2>
            <p>Este sitio puede utilizar herramientas de analítica web (PostHog) para medir el uso del sitio de forma anónima. No se recopilan datos de identificación personal a través de estas herramientas.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Contacto</h2>
            <p>Para consultas sobre esta política: <a href={`mailto:${COMPANY.email}`} className="text-orange-500 hover:underline">{COMPANY.email}</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
