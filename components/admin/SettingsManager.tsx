"use client";

import { useState } from "react";
import {
  CheckCircle2,
  History,
  Loader2,
  Mail,
  RotateCcw,
  Save,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  AdminUserRecord,
  SiteCompany,
  SiteConfig,
  SiteRevision,
} from "@/lib/types/cms";

interface SettingsManagerProps {
  initialConfig: SiteConfig;
  initialAdmins: AdminUserRecord[];
  initialRevisions: SiteRevision[];
  userEmail: string;
}

export function SettingsManager({
  initialConfig,
  initialAdmins,
  initialRevisions,
  userEmail,
}: SettingsManagerProps) {
  const [company, setCompany] = useState<SiteCompany>(initialConfig.company);
  const [admins, setAdmins] = useState<AdminUserRecord[]>(initialAdmins);
  const [revisions, setRevisions] = useState<SiteRevision[]>(initialRevisions);

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [savingEmailCfg, setSavingEmailCfg] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
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

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newEmail.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatusMsg({ type: "err", text: "Ingresa un correo de Google válido." });
      return;
    }

    setAddingUser(true);
    setStatusMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("admin_users")
        .insert({
          email: cleanEmail,
          display_name: newName.trim() || cleanEmail.split("@")[0],
          role: "admin",
          is_active: true,
        })
        .select("*")
        .single();

      if (error) throw new Error(error.message);
      setAdmins((prev) => [...prev, data as AdminUserRecord]);
      setNewEmail("");
      setNewName("");
      setStatusMsg({
        type: "ok",
        text: `¡Listo! ${cleanEmail} ahora puede entrar al panel con su cuenta Google.`,
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text:
          err instanceof Error
            ? `No se pudo agregar: ${err.message}`
            : "Error al agregar usuario.",
      });
    } finally {
      setAddingUser(false);
    }
  };

  const toggleAdminActive = async (target: AdminUserRecord) => {
    const activeOwners = admins.filter(
      (a) => a.role === "owner" && a.is_active
    );
    if (target.role === "owner" && target.is_active && activeOwners.length <= 1) {
      setStatusMsg({
        type: "err",
        text: "Debe quedar al menos un propietario activo para no perder el acceso.",
      });
      return;
    }

    const nextActive = !target.is_active;
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("admin_users")
      .update({ is_active: nextActive })
      .eq("id", target.id);

    if (!error) {
      setAdmins((prev) =>
        prev.map((a) =>
          a.id === target.id ? { ...a, is_active: nextActive } : a
        )
      );
      setStatusMsg({
        type: "ok",
        text: nextActive
          ? `Acceso activado para ${target.email}.`
          : `Acceso desactivado para ${target.email}.`,
      });
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
        <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F172A]">
          Automatización de Correos, Accesos y Respaldos
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
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            1. Automatización de Correos (Premium Hosting)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#0F172A]">
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
            <label className="block text-sm font-bold text-[#0F172A]">
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
              <span className="font-bold text-sm sm:text-base text-[#0F172A]">
                Enviar correo automático de confirmación al cliente apenas
                escribe
              </span>
            </label>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-bold text-[#0F172A]">
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
            <label className="block text-sm font-bold text-[#0F172A]">
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

      {/* 2. Cuentas de Google Autorizadas */}
      <section className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-zinc-200 pb-3">
          <ShieldCheck className="w-6 h-6 text-[#FF5000]" />
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F172A]">
              2. Cuentas de Google Autorizadas a Entrar
            </h2>
            <p className="text-sm text-zinc-600">
              Agrega aquí el correo Gmail de tu mamá para que entre con un toque.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleAddAdmin}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-50 border border-zinc-200 p-4"
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre (ej. Mamá / Patricia)"
            className="bg-white border border-zinc-300 px-4 py-3 text-base"
          />
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="correo.autorizado@gmail.com"
            className="bg-white border border-zinc-300 px-4 py-3 text-base"
          />
          <button
            type="submit"
            disabled={addingUser}
            className="bg-[#0F172A] hover:bg-[#FF5000] text-white font-bold text-sm px-5 py-3 inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>{addingUser ? "Agregando..." : "Autorizar Correo Google"}</span>
          </button>
        </form>

        <div className="space-y-2.5">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-zinc-200 p-4"
            >
              <div>
                <p className="font-bold text-[#0F172A]">
                  {admin.display_name || admin.email}
                  <span className="ml-2 text-xs font-mono px-2 py-0.5 bg-zinc-100 text-zinc-600 uppercase">
                    {admin.role === "owner" ? "Propietario" : "Editor"}
                  </span>
                </p>
                <p className="text-sm font-mono text-zinc-600">{admin.email}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleAdminActive(admin)}
                className={`px-4 py-2 text-xs font-bold border cursor-pointer ${
                  admin.is_active
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {admin.is_active ? "Activo (Puede entrar)" : "Desactivado"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Historial de Respaldos */}
      <section className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-zinc-200 pb-3">
          <History className="w-6 h-6 text-[#FF5000]" />
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F172A]">
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
                  <p className="font-bold text-[#0F172A] text-sm sm:text-base">
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
                  className="px-4 py-2.5 bg-white border border-zinc-300 hover:border-[#FF5000] text-[#0F172A] text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
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
