"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  History,
  KeyRound,
  Loader2,
  Mail,
  RotateCcw,
  Save,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SiteCompany, SiteConfig, SiteRevision } from "@/lib/types/cms";

interface SettingsManagerProps {
  initialConfig: SiteConfig;
  initialRevisions: SiteRevision[];
  userEmail: string;
}

export function SettingsManager({
  initialConfig,
  initialRevisions,
  userEmail,
}: SettingsManagerProps) {
  const [company, setCompany] = useState<SiteCompany>(initialConfig.company);
  const [revisions, setRevisions] = useState<SiteRevision[]>(initialRevisions);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const [savingEmailCfg, setSavingEmailCfg] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const handleSaveEmailConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEmailCfg(true);
    setStatusMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase
        .from("site_config")
        .update({ company, updated_by: userEmail })
        .eq("id", "main");

      if (error) throw new Error(error.message);
      await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);

      setStatusMsg({
        type: "ok",
        text: "Configuración de correos automáticos guardada correctamente.",
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo guardar la configuración.",
      });
    } finally {
      setSavingEmailCfg(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (newPassword.length < 6) {
      setStatusMsg({
        type: "err",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMsg({
        type: "err",
        text: "Las dos contraseñas no coinciden. Vuelve a escribirlas.",
      });
      return;
    }

    setUpdatingPassword(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw new Error(error.message);

      setNewPassword("");
      setConfirmPassword("");
      setStatusMsg({
        type: "ok",
        text: "¡Listo! La contraseña de acceso se actualizó correctamente.",
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text:
          err instanceof Error
            ? `No se pudo cambiar la contraseña: ${err.message}`
            : "Error al cambiar la contraseña.",
      });
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleRestoreRevision = async (rev: SiteRevision) => {
    setRestoringId(rev.id);
    setStatusMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();

      const { data: currentLive } = await supabase
        .from("site_config")
        .select("theme, company, content")
        .eq("id", "main")
        .maybeSingle();

      if (currentLive) {
        await supabase.from("site_revisions").insert({
          label: `Respaldo automático antes de restaurar (${rev.label})`,
          theme: currentLive.theme,
          company: currentLive.company,
          content: currentLive.content,
          created_by: userEmail,
        });
      }

      const { error } = await supabase
        .from("site_config")
        .update({
          theme: rev.theme,
          company: rev.company,
          content: rev.content,
          updated_by: userEmail,
        })
        .eq("id", "main");

      if (error) throw new Error(error.message);

      setCompany(rev.company);
      const { data: latestRevs } = await supabase
        .from("site_revisions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (latestRevs) setRevisions(latestRevs as SiteRevision[]);

      await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);

      setStatusMsg({
        type: "ok",
        text: "Versión restaurada y publicada correctamente en toda la web.",
      });
    } catch {
      setStatusMsg({
        type: "err",
        text: "No se pudo restaurar esta versión.",
      });
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white border border-zinc-200 p-6">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5000] mb-1">
          Ajustes, Correos y Seguridad
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-[#141413]">
          Automatización de Correos, Contraseña y Respaldos
        </h1>
      </div>

      {statusMsg && (
        <div
          className={`p-4 border text-sm sm:text-base font-bold flex items-center gap-2 ${
            statusMsg.type === "ok"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* 1. Automatización de Correos */}
      <form
        onSubmit={handleSaveEmailConfig}
        className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center gap-3 border-b border-zinc-200 pb-3">
          <Mail className="w-6 h-6 text-[#FF5000]" />
          <h2 className="font-display text-xl font-bold text-[#141413]">
            1. Automatización de Correos (Premium Hosting)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#141413]">
              Correo principal donde llegan las cotizaciones
            </label>
            <input
              type="email"
              value={company.notificationEmail}
              onChange={(e) =>
                setCompany((p) => ({ ...p, notificationEmail: e.target.value }))
              }
              className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#141413]">
              Enviar copia adicional a (Opcional, ej: tu correo de apoyo)
            </label>
            <input
              type="text"
              value={company.notificationCcEmail}
              onChange={(e) =>
                setCompany((p) => ({
                  ...p,
                  notificationCcEmail: e.target.value,
                }))
              }
              placeholder="ejemplo@gmail.com"
              className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={company.autoReplyEnabled}
                onChange={(e) =>
                  setCompany((p) => ({
                    ...p,
                    autoReplyEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 accent-[#FF5000]"
              />
              <span className="font-bold text-sm sm:text-base text-[#141413]">
                Enviar correo automático de confirmación al cliente apenas
                escribe
              </span>
            </label>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-bold text-[#141413]">
              Asunto del correo automático al cliente
            </label>
            <input
              type="text"
              value={company.autoReplySubject}
              onChange={(e) =>
                setCompany((p) => ({ ...p, autoReplySubject: e.target.value }))
              }
              className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-bold text-[#141413]">
              Mensaje automático para el cliente
            </label>
            <textarea
              rows={3}
              value={company.autoReplyGreeting}
              onChange={(e) =>
                setCompany((p) => ({ ...p, autoReplyGreeting: e.target.value }))
              }
              className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={savingEmailCfg}
          className="bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold text-base px-7 py-3.5 inline-flex items-center gap-2 cursor-pointer"
        >
          {savingEmailCfg ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>Guardar Configuración de Correos</span>
        </button>
      </form>

      {/* 2. Cambiar Contraseña de Acceso */}
      <form
        onSubmit={handleUpdatePassword}
        className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-3">
            <KeyRound className="w-6 h-6 text-[#FF5000]" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#141413]">
                2. Cambiar Contraseña de Acceso al Panel
              </h2>
              <p className="text-sm text-zinc-600">
                Sesión actual: <span className="font-mono">{userEmail}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswords((prev) => !prev)}
            className="px-3.5 py-2 border border-zinc-300 bg-zinc-50 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            {showPasswords ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Ocultar</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Mostrar</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#141413]">
              Nueva contraseña (mínimo 6 caracteres)
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Escribe la nueva clave..."
              className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#141413]">
              Repetir nueva contraseña
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Vuelve a escribirla..."
              className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updatingPassword}
          className="bg-[#141413] hover:bg-[#FF5000] text-white font-bold text-base px-7 py-3.5 inline-flex items-center gap-2 cursor-pointer transition-colors"
        >
          {updatingPassword ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <KeyRound className="w-5 h-5" />
          )}
          <span>
            {updatingPassword
              ? "Actualizando clave..."
              : "Actualizar Contraseña"}
          </span>
        </button>
      </form>

      {/* 3. Historial de Respaldos */}
      <section className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-zinc-200 pb-3">
          <History className="w-6 h-6 text-[#FF5000]" />
          <div>
            <h2 className="font-display text-xl font-bold text-[#141413]">
              3. Copias de Respaldo y Deshacer ({revisions.length})
            </h2>
            <p className="text-sm text-zinc-600">
              Cada vez que guardas textos o diseño, guardamos una copia por si
              necesitas volver atrás.
            </p>
          </div>
        </div>

        {revisions.length === 0 ? (
          <p className="text-zinc-500 text-sm">
            Todavía no hay copias registradas. Aparecerán aquí automáticamente
            cuando guardes cambios en Textos o Diseño.
          </p>
        ) : (
          <div className="space-y-2.5">
            {revisions.map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-zinc-200 bg-zinc-50 p-4"
              >
                <div>
                  <p className="font-bold text-[#141413] text-sm sm:text-base">
                    {rev.label}
                  </p>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    {new Date(rev.created_at).toLocaleString("es-CL", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    · Por: {rev.created_by || "sistema"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRestoreRevision(rev)}
                  disabled={restoringId === rev.id}
                  className="px-4 py-2.5 bg-white border border-zinc-300 hover:border-[#FF5000] text-[#141413] text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  {restoringId === rev.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RotateCcw className="w-4 h-4 text-[#FF5000]" />
                  )}
                  <span>Restaurar esta versión</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
