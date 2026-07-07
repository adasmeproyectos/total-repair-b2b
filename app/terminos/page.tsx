/**
 * app/terminos/page.tsx
 * Términos de Servicio — requeridos por Manifiesto §6.2
 */

import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: "Términos y condiciones de los servicios de Total Repair Ltda.",
  robots: "noindex, follow",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-700 pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-orange-500 text-sm hover:underline mb-8 block">← Volver al Inicio</Link>

        <h1 className="text-4xl font-black text-white mb-2">Términos de Servicio</h1>
        <p className="text-zinc-400 text-sm mb-12">Última actualización: {new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Aceptación de Términos</h2>
            <p>Al acceder y utilizar el sitio web totalrepair.cl, usted acepta los presentes Términos de Servicio. Si no está de acuerdo con alguno de ellos, le pedimos que no utilice este sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Descripción del Servicio</h2>
            <p>{COMPANY.name} ofrece servicios de construcción, remodelación y reparación para empresas y hogares en la Región Metropolitana de Chile. Los presupuestos emitidos son referenciales y pueden variar previa visita técnica.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Solicitudes y Presupuestos</h2>
            <p>El envío de un formulario de contacto o solicitud de presupuesto no constituye la contratación de un servicio. Todo servicio debe ser formalizado mediante un presupuesto firmado y aceptado por ambas partes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Garantías</h2>
            <p>Los trabajos ejecutados por {COMPANY.name} tienen garantía de mano de obra según lo especificado en cada contrato. Las garantías de fabricante sobre materiales son responsabilidad del proveedor.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Propiedad Intelectual</h2>
            <p>Todo el contenido de este sitio web (textos, imágenes, diseño, código) es propiedad de {COMPANY.name} y/o sus creadores. Queda prohibida su reproducción sin autorización expresa.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Limitación de Responsabilidad</h2>
            <p>{COMPANY.name} no se hace responsable por daños indirectos, pérdidas de beneficios, o cualquier otro perjuicio derivado del uso de este sitio web o de la información contenida en él.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Legislación Aplicable</h2>
            <p>Los presentes términos se rigen por las leyes de la República de Chile. Cualquier controversia será sometida a los tribunales ordinarios de justicia de Santiago.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Contacto</h2>
            <p>Para consultas sobre estos términos: <a href={`mailto:${COMPANY.email}`} className="text-orange-500 hover:underline">{COMPANY.email}</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
