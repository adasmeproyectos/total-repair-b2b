"use client";

/**
 * components/contact/ContactForm.tsx
 * Formulario unificado — reemplaza:
 *   - total-construye: form con Formspree placeholder ROTO
 *   - total-repair-b2b/contacto/page.tsx L114: form con Formspree placeholder ROTO
 *
 * Backend: POST /api/contact → Resend API (free tier, sin Formspree)
 * Seguridad: Cloudflare Turnstile embebido
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TurnstileWidget } from "./TurnstileWidget";

interface ContactFormProps {
  /** Cambia labels, campos y opciones del select */
  mode: "empresa" | "hogar";
}

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ mode }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!turnstileToken) {
      alert("Por favor, completa la verificación de seguridad.");
      return;
    }

    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, string> = { mode, turnstileToken };
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-white border border-zinc-300 focus:border-[#E85B0C] focus:ring-1 focus:ring-[#E85B0C] outline-none transition-all text-sm text-zinc-900 placeholder:text-zinc-400 rounded-none";
  const labelClass =
    "block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2";

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-16 text-center"
      >
        <div className="w-16 h-16 bg-green-900/30 border border-green-600/50 flex items-center justify-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22C55E"
            strokeWidth="2"
            className="w-8 h-8"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-3">
          ¡Requerimiento recibido!
        </h3>
        <p className="text-zinc-500 font-light text-sm max-w-sm mx-auto">
          Te contactaremos a la brevedad en el número o correo indicado. Tiempo
          de respuesta habitual: menos de 24 horas hábiles.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Campos comunes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre" className={labelClass}>
            {mode === "empresa" ? "Contacto" : "Nombre y Apellido"} *
          </label>
          <input
            type="text"
            id="nombre"
            name="Nombre"
            required
            className={inputClass}
            placeholder={mode === "empresa" ? "Ej: Juan Pérez" : "Ej: María González"}
          />
        </div>
        {mode === "empresa" && (
          <div>
            <label htmlFor="empresa" className={labelClass}>
              Empresa *
            </label>
            <input
              type="text"
              id="empresa"
              name="Empresa"
              required
              className={inputClass}
              placeholder="Ej: Inmobiliaria Sur"
            />
          </div>
        )}
        {mode === "hogar" && (
          <div>
            <label htmlFor="telefono" className={labelClass}>
              Teléfono (WhatsApp) *
            </label>
            <input
              type="tel"
              id="telefono"
              name="Telefono"
              required
              className={inputClass}
              placeholder="+56 9 1234 5678"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mode === "empresa" && (
          <div>
            <label htmlFor="telefono" className={labelClass}>
              Teléfono *
            </label>
            <input
              type="tel"
              id="telefono"
              name="Telefono"
              required
              className={inputClass}
              placeholder="+56 9 1234 5678"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className={labelClass}>
            {mode === "empresa" ? "Correo Corporativo" : "Correo Electrónico"} *
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            required
            className={inputClass}
            placeholder={
              mode === "empresa" ? "jperez@empresa.cl" : "maria@gmail.com"
            }
          />
        </div>
      </div>

      {/* Select de tipo de servicio */}
      <div>
        <label htmlFor="servicio" className={labelClass}>
          {mode === "empresa" ? "Tipo de Requerimiento" : "¿Qué necesitas?"} *
        </label>
        <div className="relative">
          <select
            id="servicio"
            name="Servicio"
            required
            defaultValue=""
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled>
              Selecciona una opción...
            </option>
            {mode === "empresa" ? (
              <>
                <option value="Habilitación Comercial">Habilitación de Local / Oficina</option>
                <option value="Emergencia Siniestro">Emergencia / Siniestro URI</option>
                <option value="Remodelación Estructural">Remodelación Estructural</option>
                <option value="Mantenimiento Anual">Contrato de Mantenimiento Anual</option>
                <option value="Co-work / Espacio Flexible">Co-work / Espacio Flexible</option>
              </>
            ) : (
              <>
                <option value="Gasfitería">Gasfitería / Redes de Agua</option>
                <option value="Electricidad">Electricidad Certificada</option>
                <option value="Remodelación Interior">Remodelación Interior</option>
                <option value="Pintura">Pintura y Terminaciones</option>
                <option value="Emergencia Hogar">Emergencia en el Hogar</option>
              </>
            )}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-orange-600">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className={labelClass}>
          {mode === "empresa"
            ? "Especificaciones Técnicas"
            : "Descripción del trabajo"}{" "}
          *
        </label>
        <textarea
          id="mensaje"
          name="Mensaje"
          rows={4}
          required
          className={inputClass}
          placeholder={
            mode === "empresa"
              ? "Magnitud de la obra, plazos requeridos o detalles estructurales..."
              : "Describe brevemente qué necesitas hacer en tu hogar..."
          }
        />
      </div>

      {/* Turnstile Bot Protection */}
      <TurnstileWidget
        onSuccess={(token) => setTurnstileToken(token)}
        theme="light"
      />

      {/* Error feedback */}
      <AnimatePresence>
        {formState === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-sm"
          >
            Hubo un error al enviar. Por favor intenta nuevamente o llámanos directamente.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full py-4 bg-orange-600 text-white font-bold uppercase tracking-[0.2em] text-sm transition-all hover:bg-orange-700 flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            {mode === "empresa" ? "Enviar Requerimiento" : "Solicitar Presupuesto"}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
