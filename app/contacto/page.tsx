"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { COMPANY } from "@/lib/constants";

function ContactoFormInner() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    correo: "",
    tipoRequerimiento: "",
    especificacionOtro: "",
    especificaciones: "",
  });

  useEffect(() => {
    const urgencia = searchParams.get("urgencia");
    const modo = searchParams.get("modo");
    if (urgencia === "true") {
      setFormData((prev) => ({
        ...prev,
        tipoRequerimiento: prev.tipoRequerimiento || "Siniestros / Emergencia 24/7",
      }));
    } else if (modo === "hogar") {
      setFormData((prev) => ({
        ...prev,
        tipoRequerimiento: prev.tipoRequerimiento || "Remodelación Residencial / Hogar",
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert(
          "Hubo un error al enviar su solicitud. Por favor intente más tarde o contáctenos al " +
            COMPANY.phoneDisplay
        );
      }
    } catch {
      alert("Error de red. Verifique su conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl w-full">
      {!isSuccess ? (
        <div className="bg-white p-8 md:p-12 border border-zinc-200 shadow-lg rounded-sm">
          <div className="text-center mb-10">
            <SectionLabel label="Contacto Directo" className="justify-center" />
            <h1 className="font-display text-4xl md:text-5xl font-black text-[#0F172A] mt-4 tracking-tight">
              INICIAMOS SU <span className="text-[#FF5000]">PROYECTO</span>
            </h1>
            <p className="mt-4 text-zinc-600 font-light text-sm md:text-base">
              Complete los detalles a continuación y nuestro equipo técnico se comunicará dentro de las próximas 24 horas hábiles (o de inmediato para emergencias 24/7).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              {/* Empresa / Comunidad (Opcional) */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                  placeholder="Razón Social o Particular (Opcional)"
                />
              </div>

              {/* Teléfono */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              {/* Correo */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                  placeholder="correo@empresa.cl"
                />
              </div>
            </div>

            {/* Tipo de Requerimiento */}
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
                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
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

            {/* Especificación Otro (Conditional) */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                  placeholder="Describa brevemente el tipo de obra..."
                />
              </div>
            )}

            {/* Especificaciones Técnicas */}
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
                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors resize-y"
                placeholder="Detalles adicionales, metros cuadrados, comuna, compañía de seguros (si aplica), etc."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF5000] text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#CC4000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isSubmitting ? "Procesando..." : "Enviar Solicitud de Presupuesto"}
            </button>
            <p className="text-xs text-zinc-500 text-center font-light mt-4">
              Al enviar este formulario, usted acepta nuestra{" "}
              <Link
                href="/privacidad"
                className="underline hover:text-[#FF5000]"
              >
                Política de Privacidad
              </Link>{" "}
              acorde a la Ley N° 19.628.
            </p>
          </form>
        </div>
      ) : (
        <div className="bg-white border-t-8 border-t-[#FF5000] border border-zinc-200 shadow-xl p-10 md:p-14 rounded-sm text-center relative overflow-hidden">
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

          <h2 className="font-display text-3xl font-black text-[#0F172A] mb-4 tracking-tight">
            SOLICITUD RECIBIDA
          </h2>

          <p className="text-zinc-600 font-light text-lg mb-8">
            Gracias,{" "}
            <strong className="font-semibold text-[#0F172A]">
              {formData.nombre}
            </strong>
            . Hemos registrado exitosamente su requerimiento de{" "}
            <strong className="font-semibold text-[#0F172A]">
              {formData.tipoRequerimiento === "Otro"
                ? formData.especificacionOtro
                : formData.tipoRequerimiento}
            </strong>
            .
          </p>

          <div className="bg-zinc-50 border border-zinc-200 p-6 text-sm text-left mb-8">
            <p className="text-zinc-500 font-mono text-xs uppercase mb-2">
              Comprobante de Recepción — {COMPANY.legalName}
            </p>
            <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-2">
              <span className="text-zinc-500">Fecha:</span>
              <span className="font-medium text-[#0F172A]">
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

          <p className="text-sm text-zinc-600 font-light mb-10">
            Un especialista se contactará al{" "}
            <span className="font-mono font-medium">{formData.telefono}</span> o
            vía correo electrónico a la brevedad.
          </p>

          <Link
            href="/"
            className="inline-block w-full bg-[#0F172A] text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors duration-200"
          >
            Volver al Inicio
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-zinc-900 pt-32 pb-24 px-6 flex items-center justify-center">
      <Suspense
        fallback={
          <div className="max-w-2xl w-full bg-white p-12 border border-zinc-200 text-center text-zinc-500 font-mono text-sm">
            Cargando formulario de contacto...
          </div>
        }
      >
        <ContactoFormInner />
      </Suspense>
    </div>
  );
}
