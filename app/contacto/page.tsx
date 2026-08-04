"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { COMPANY } from "@/lib/constants";

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    correo: "",
    tipoRequerimiento: "",
    especificacionOtro: "",
    especificaciones: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Hubo un error al enviar su solicitud. Por favor intente más tarde.");
      }
    } catch (error) {
      alert("Error de red. Verifique su conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-zinc-900 pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-12 border border-zinc-200 shadow-xl rounded-sm"
            >
              <div className="text-center mb-10">
                <SectionLabel label="Contacto Directo" className="justify-center" />
                <h1 className="font-display text-4xl md:text-5xl font-black text-[#0F172A] mt-4 tracking-tight">
                  INICIAMOS SU <span className="text-[#FF5000]">PROYECTO</span>
                </h1>
                <p className="mt-4 text-zinc-500 font-light text-sm md:text-base">
                  Complete los detalles a continuación y nuestro equipo técnico se comunicará dentro de las próximas 24 horas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-widest text-zinc-700">
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

                  {/* Empresa (Opcional) */}
                  <div className="space-y-2">
                    <label htmlFor="empresa" className="text-xs font-bold uppercase tracking-widest text-zinc-700">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                      placeholder="Razón Social (Opcional)"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="text-xs font-bold uppercase tracking-widest text-zinc-700">
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
                    <label htmlFor="correo" className="text-xs font-bold uppercase tracking-widest text-zinc-700">
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
                      placeholder="correo@empresa.com"
                    />
                  </div>
                </div>

                {/* Tipo de Requerimiento */}
                <div className="space-y-2">
                  <label htmlFor="tipoRequerimiento" className="text-xs font-bold uppercase tracking-widest text-zinc-700">
                    Tipo de Requerimiento <span className="text-[#FF5000]">*</span>
                  </label>
                  <select
                    id="tipoRequerimiento"
                    name="tipoRequerimiento"
                    required
                    value={formData.tipoRequerimiento}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors appearance-none"
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="Siniestros">Siniestros</option>
                    <option value="Remodelación Corporativa">Remodelación Corporativa</option>
                    <option value="Mantención">Mantención</option>
                    <option value="Reconstrucción">Reconstrucción</option>
                    <option value="Otro">Otro (Especificar)</option>
                  </select>
                </div>

                {/* Especificación Otro (Conditional) */}
                <AnimatePresence>
                  {formData.tipoRequerimiento === "Otro" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <label htmlFor="especificacionOtro" className="text-xs font-bold uppercase tracking-widest text-zinc-700">
                        Especifique su requerimiento <span className="text-[#FF5000]">*</span>
                      </label>
                      <input
                        type="text"
                        id="especificacionOtro"
                        name="especificacionOtro"
                        required={formData.tipoRequerimiento === "Otro"}
                        value={formData.especificacionOtro}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors"
                        placeholder="Describa brevemente el tipo de obra..."
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Especificaciones Técnicas */}
                <div className="space-y-2">
                  <label htmlFor="especificaciones" className="text-xs font-bold uppercase tracking-widest text-zinc-700 flex justify-between">
                    <span>Especificaciones Técnicas</span>
                    <span className="text-zinc-400 font-light normal-case tracking-normal">Opcional</span>
                  </label>
                  <textarea
                    id="especificaciones"
                    name="especificaciones"
                    rows={4}
                    value={formData.especificaciones}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000] transition-colors resize-y"
                    placeholder="Detalles adicionales, metros cuadrados, ubicación, etc."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF5000] text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#CC4000] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : "Enviar Cotización"}
                </button>
                <p className="text-xs text-zinc-400 text-center font-light mt-4">
                  Al enviar este formulario, usted acepta nuestra <a href="/privacidad" className="underline hover:text-[#FF5000]">Política de Privacidad</a> acorde a la Ley N° 19.628.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white border-t-8 border-t-[#FF5000] border border-zinc-200 shadow-2xl p-10 md:p-14 rounded-sm text-center relative overflow-hidden"
            >
              {/* Decorative dashed line for ticket look */}
              <div className="absolute top-0 left-0 right-0 h-4 border-b-2 border-dashed border-zinc-200 opacity-50" style={{ transform: "translateY(5px)" }} />
              
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="font-display text-3xl font-black text-[#0F172A] mb-4 tracking-tight">
                COTIZACIÓN RECIBIDA
              </h2>
              
              <p className="text-zinc-600 font-light text-lg mb-8">
                Gracias, <strong className="font-semibold text-[#0F172A]">{formData.nombre}</strong>. Hemos registrado exitosamente su requerimiento de tipo <strong className="font-semibold text-[#0F172A]">{formData.tipoRequerimiento === 'Otro' ? formData.especificacionOtro : formData.tipoRequerimiento}</strong>.
              </p>
              
              <div className="bg-zinc-50 border border-zinc-200 p-6 text-sm text-left mb-8">
                <p className="text-zinc-500 font-light mb-2">Ticket de Recepción</p>
                <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-2">
                  <span className="text-zinc-400">Fecha:</span>
                  <span className="font-medium text-[#0F172A]">{new Date().toLocaleDateString('es-CL')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Estado:</span>
                  <span className="font-medium text-[#FF5000]">En Evaluación Técnica</span>
                </div>
              </div>

              <p className="text-sm text-zinc-500 font-light mb-10">
                Un especialista se contactará al {formData.telefono} o vía correo electrónico a la brevedad.
              </p>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-[#0F172A] text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors"
              >
                Volver al Inicio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}