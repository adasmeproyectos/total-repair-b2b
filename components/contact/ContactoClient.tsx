"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import type { SiteCompany, SiteContent } from "@/lib/types/cms";

interface ContactoClientProps {
  company: SiteCompany;
  content: SiteContent["contacto"];
}

const QUICK_INTENTS = [
  {
    id: "Siniestros / Emergencia 24/7",
    label: "🚨 Emergencia 24/7",
    sub: "Inundación, incendio o daño urgente",
  },
  {
    id: "Remodelación Corporativa",
    label: "🏢 Empresa / Local",
    sub: "Oficinas, retail, mantención B2B",
  },
  {
    id: "Remodelación Residencial / Hogar",
    label: "🏠 Hogar",
    sub: "Cocinas, baños, gasfitería, luz",
  },
];

function ContactoFormInner({ company, content }: ContactoClientProps) {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [folio, setFolio] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    correo: "",
    tipoRequerimiento: "",
    especificacionOtro: "",
    especificaciones: "",
    website: "", // Honeypot anti-bot field
  });

  useEffect(() => {
    const urgencia = searchParams.get("urgencia");
    const modo = searchParams.get("modo");
    if (urgencia === "true") {
      setFormData((prev) => ({
        ...prev,
        tipoRequerimiento:
          prev.tipoRequerimiento || "Siniestros / Emergencia 24/7",
      }));
    } else if (modo === "hogar") {
      setFormData((prev) => ({
        ...prev,
        tipoRequerimiento:
          prev.tipoRequerimiento || "Remodelación Residencial / Hogar",
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setFolio(data.folio || null);
        setIsSuccess(true);
      } else {
        setErrorMessage(
          data.error ||
            `Hubo un error al enviar su solicitud. Por favor contáctenos al ${company.phoneDisplay}.`
        );
      }
    } catch {
      setErrorMessage("Error de red. Verifique su conexión e intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tr-container w-full grid grid-cols-1 lg:grid-cols-12 shadow-xl tr-card overflow-hidden bg-white">
      {/* COLUMNA IZQUIERDA OSCURA: Atención Directa & Urgencias */}
      <aside
        style={{ backgroundColor: "var(--color-surface-dark, #141413)" }}
        className="lg:col-span-5 p-8 sm:p-10 md:p-12 text-white tr-blueprint-grid flex flex-col justify-between gap-10"
      >
        <div>
          <SectionLabel label="Atención Directa" dark />
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
            Respuesta rápida en{" "}
            <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
              terreno.
            </span>
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed mb-8">
            Coordinamos visitas técnicas e informes para empresas, comunidades,
            aseguradoras y viviendas en toda la Región Metropolitana.
          </p>

          <div className="space-y-4">
            <a
              href={`tel:${company.phoneClean}`}
              style={{
                backgroundColor: "var(--color-brand-orange, #FF5000)",
                borderRadius: "var(--tr-btn-radius, 2px)",
              }}
              className="w-full py-4 px-5 flex items-center justify-between text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <span>Llamar Directo ({company.phoneDisplay})</span>
              <span>→</span>
            </a>

            <a
              href={`${company.whatsappUrl}?text=${encodeURIComponent(
                company.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderRadius: "var(--tr-btn-radius, 2px)" }}
              className="w-full py-4 px-5 bg-emerald-600 hover:bg-emerald-700 flex items-center justify-between text-white font-bold text-sm uppercase tracking-wider transition-colors"
            >
              <span>Escribir por WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 space-y-3 text-sm text-zinc-300">
          <div className="grid grid-cols-2 gap-3 pb-3">
            <div className="bg-white/5 border border-white/10 p-3.5">
              <p className="text-[#FF5000] font-display text-xl font-black">
                &lt; 2 hrs
              </p>
              <p className="text-xs text-zinc-400">Emergencias URI 24/7</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3.5">
              <p className="text-white font-display text-xl font-black">
                &lt; 24 hrs
              </p>
              <p className="text-xs text-zinc-400">Presupuestos hábiles</p>
            </div>
          </div>

          <p>
            <strong className="text-white">Central:</strong> {company.address}
          </p>
          <p>
            <strong className="text-white">Correo:</strong>{" "}
            <span className="font-mono">{company.email}</span>
          </p>
          <p>
            <strong className="text-white">Horario:</strong> {company.hours}
          </p>
        </div>
      </aside>

      {/* COLUMNA DERECHA: Formulario con Selector Rápido de Intención */}
      <div className="lg:col-span-7 p-8 sm:p-10 md:p-12 bg-white">
        {!isSuccess ? (
          <div>
            <div className="mb-8">
              <SectionLabel label={content.eyebrow} />
              <h1
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase"
              >
                {content.titlePrefix}{" "}
                <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                  {content.titleHighlight}
                </span>
              </h1>
              <p
                style={{ color: "var(--color-ink-mid, #52525B)" }}
                className="mt-2 font-light text-sm sm:text-base"
              >
                {content.description}
              </p>
            </div>

            {/* Selector visual de intención */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-2.5">
                1. ¿Qué necesitas hoy?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {QUICK_INTENTS.map((intent) => {
                  const active = formData.tipoRequerimiento === intent.id;
                  return (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          tipoRequerimiento: intent.id,
                        }))
                      }
                      style={
                        active
                          ? {
                              borderColor: "var(--color-brand-orange, #FF5000)",
                              backgroundColor: "#FFF5F0",
                            }
                          : undefined
                      }
                      className={`p-3 border text-left transition-colors cursor-pointer ${
                        active
                          ? "border-2"
                          : "border-zinc-200 bg-zinc-50 hover:border-zinc-400"
                      }`}
                    >
                      <p className="font-bold text-xs sm:text-sm text-[#141413]">
                        {intent.label}
                      </p>
                      <p className="text-[11px] text-zinc-600 mt-0.5">
                        {intent.sub}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot hidden field */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Sitio web</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="nombre"
                    className="text-xs font-bold uppercase tracking-widest text-zinc-700"
                  >
                    Nombre Completo <span className="text-[#FF5000]">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="empresa"
                    className="text-xs font-bold uppercase tracking-widest text-zinc-700"
                  >
                    Empresa o Comunidad
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                    placeholder="Razón Social o Particular (Opcional)"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="telefono"
                    className="text-xs font-bold uppercase tracking-widest text-zinc-700"
                  >
                    Teléfono <span className="text-[#FF5000]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="correo"
                    className="text-xs font-bold uppercase tracking-widest text-zinc-700"
                  >
                    Correo Electrónico <span className="text-[#FF5000]">*</span>
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    required
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                    placeholder="correo@empresa.cl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tipoRequerimiento"
                  className="text-xs font-bold uppercase tracking-widest text-zinc-700"
                >
                  Tipo de Requerimiento <span className="text-[#FF5000]">*</span>
                </label>
                <select
                  id="tipoRequerimiento"
                  name="tipoRequerimiento"
                  required
                  value={formData.tipoRequerimiento}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                >
                  <option value="" disabled>
                    Seleccione una opción
                  </option>
                  <option value="Siniestros / Emergencia 24/7">
                    Siniestros / Emergencia 24/7
                  </option>
                  <option value="Remodelación Corporativa">
                    Remodelación Corporativa / Habilitación B2B
                  </option>
                  <option value="Remodelación Residencial / Hogar">
                    Remodelación Residencial / Hogar
                  </option>
                  <option value="Gasfitería / Electricidad SEC">
                    Gasfitería / Electricidad Certificada SEC
                  </option>
                  <option value="Mantención">Mantención Industrial o Edificios</option>
                  <option value="Reconstrucción">Reconstrucción Estructural</option>
                  <option value="Otro">Otro (Especificar)</option>
                </select>
              </div>

              {formData.tipoRequerimiento === "Otro" && (
                <div className="space-y-2">
                  <label
                    htmlFor="especificacionOtro"
                    className="text-xs font-bold uppercase tracking-widest text-zinc-700"
                  >
                    Especifique su requerimiento{" "}
                    <span className="text-[#FF5000]">*</span>
                  </label>
                  <input
                    type="text"
                    id="especificacionOtro"
                    name="especificacionOtro"
                    required
                    value={formData.especificacionOtro}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                    placeholder="Describa brevemente el tipo de obra..."
                  />
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="especificaciones"
                  className="text-xs font-bold uppercase tracking-widest text-zinc-700 flex justify-between"
                >
                  <span>Especificaciones Técnicas</span>
                  <span className="text-zinc-500 font-light normal-case tracking-normal">
                    Opcional
                  </span>
                </label>
                <textarea
                  id="especificaciones"
                  name="especificaciones"
                  rows={4}
                  value={formData.especificaciones}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors resize-y"
                  placeholder="Detalles adicionales, metros cuadrados, comuna, compañía de seguros (si aplica), etc."
                />
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "var(--color-brand-orange, #FF5000)",
                  borderRadius: "var(--tr-btn-radius, 2px)",
                }}
                className="w-full text-white py-4 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? "Procesando..." : content.submitLabel}
              </button>

              <p className="text-xs text-zinc-500 text-center font-light mt-4">
                {content.privacyNote}{" "}
                <Link
                  href="/privacidad"
                  className="underline hover:text-[#FF5000]"
                >
                  Ver Política de Privacidad
                </Link>
                .
              </p>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center relative overflow-hidden">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="font-display text-3xl font-black text-[#141413] mb-4 tracking-tight">
              SOLICITUD RECIBIDA
            </h2>

            <p className="text-zinc-600 font-light text-lg mb-8">
              Gracias,{" "}
              <strong className="font-semibold text-[#141413]">
                {formData.nombre}
              </strong>
              . Hemos registrado exitosamente su requerimiento de{" "}
              <strong className="font-semibold text-[#141413]">
                {formData.tipoRequerimiento === "Otro"
                  ? formData.especificacionOtro
                  : formData.tipoRequerimiento}
              </strong>
              .
            </p>

            <div className="bg-zinc-50 border border-zinc-200 p-6 text-sm text-left mb-8">
              <p className="text-zinc-500 font-mono text-xs uppercase mb-2">
                Comprobante de Recepción — {company.legalName}
              </p>
              {folio && (
                <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-2">
                  <span className="text-zinc-500">N° de Folio:</span>
                  <span className="font-mono font-bold text-[#141413]">
                    {folio}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-2">
                <span className="text-zinc-500">Fecha:</span>
                <span className="font-medium text-[#141413]">
                  {new Date().toLocaleDateString("es-CL")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Estado:</span>
                <span className="font-mono font-bold text-[#FF5000]">
                  EN EVALUACIÓN TÉCNICA
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-600 font-light mb-8">
              Un especialista se contactará al{" "}
              <span className="font-mono font-medium">{formData.telefono}</span>{" "}
              o vía correo electrónico a la brevedad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${company.whatsappUrl}?text=${encodeURIComponent(
                  `Hola Total Repair, acabo de enviar la solicitud ${folio ?? ""} a nombre de ${formData.nombre}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-emerald-700 transition-colors duration-200 text-center"
              >
                Escribir por WhatsApp
              </a>
              <Link
                href="/"
                className="flex-1 bg-[#141413] text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors duration-200 text-center"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContactoClient({ company, content }: ContactoClientProps) {
  return (
    <div
      style={{ backgroundColor: "var(--color-surface-cream, #F5F3EE)" }}
      className="min-h-screen text-zinc-900 pt-[96px] sm:pt-[136px] pb-24 px-4 sm:px-6 flex items-center justify-center"
    >
      <Suspense
        fallback={
          <div className="max-w-4xl w-full bg-white p-12 border border-zinc-200 text-center text-zinc-500 font-mono text-sm">
            Cargando formulario de contacto...
          </div>
        }
      >
        <ContactoFormInner company={company} content={content} />
      </Suspense>
    </div>
  );
}
