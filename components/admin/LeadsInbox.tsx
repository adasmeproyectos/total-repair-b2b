"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Save,
  Search,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ContactLeadRecord, LeadStatus } from "@/lib/types/cms";

interface LeadsInboxProps {
  initialLeads: ContactLeadRecord[];
}

const STATUS_OPTIONS: Array<{
  id: LeadStatus;
  label: string;
  badgeClass: string;
}> = [
  {
    id: "nuevo",
    label: "Nuevo",
    badgeClass: "bg-orange-100 text-[#CC4000] border-orange-300",
  },
  {
    id: "contactado",
    label: "Contactado",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "cotizado",
    label: "Cotizado",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    id: "cerrado",
    label: "Cerrado",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "archivado",
    label: "Archivado",
    badgeClass: "bg-zinc-100 text-zinc-600 border-zinc-300",
  },
];

function formatWhatsappNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("56") && digits.length >= 11) return digits;
  if (digits.startsWith("9") && digits.length === 9) return `56${digits}`;
  if (digits.length === 8) return `569${digits}`;
  return digits;
}

export function LeadsInbox({ initialLeads }: LeadsInboxProps) {
  const [leads, setLeads] = useState<ContactLeadRecord[]>(initialLeads);
  const [filter, setFilter] = useState<"all" | "urgent" | LeadStatus>("all");
  const [search, setSearch] = useState("");
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savingNoteId, setSavingNoteId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filtered = leads.filter((lead) => {
    if (filter === "urgent" && !lead.is_urgent) return false;
    if (filter !== "all" && filter !== "urgent" && lead.status !== filter) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        lead.nombre.toLowerCase().includes(q) ||
        lead.folio.toLowerCase().includes(q) ||
        lead.correo.toLowerCase().includes(q) ||
        lead.telefono.toLowerCase().includes(q) ||
        lead.tipo_requerimiento.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = async (id: string, nextStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l))
    );
    const supabase = createSupabaseBrowserClient();
    await supabase
      .from("contact_leads")
      .update({ status: nextStatus })
      .eq("id", id);
    setFeedback("Estado actualizado.");
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleSaveNotes = async (lead: ContactLeadRecord) => {
    setSavingNoteId(lead.id);
    const nextNotes = notesDraft[lead.id] ?? lead.admin_notes;
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("contact_leads")
      .update({ admin_notes: nextNotes })
      .eq("id", lead.id);

    if (!error) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id ? { ...l, admin_notes: nextNotes } : l
        )
      );
      setFeedback(`Nota guardada en ${lead.folio}.`);
      setTimeout(() => setFeedback(null), 2500);
    }
    setSavingNoteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 p-6">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5000] mb-1">
          Bandeja de Clientes y Correos
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F172A]">
          Solicitudes Recibidas ({leads.length})
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base mt-1">
          Todos los mensajes que envían desde la web quedan guardados aquí
          automáticamente. Responde directo por WhatsApp, llamada o correo.
        </p>

        {/* Buscador y Filtros */}
        <div className="mt-5 space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, folio, teléfono o servicio..."
              className="w-full bg-zinc-50 border border-zinc-300 pl-11 pr-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Todas" },
              { id: "nuevo", label: "Nuevas" },
              { id: "urgent", label: "🚨 Urgentes" },
              { id: "contactado", label: "Contactadas" },
              { id: "cotizado", label: "Cotizadas" },
              { id: "cerrado", label: "Cerradas" },
              { id: "archivado", label: "Archivadas" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2.5 text-sm font-bold border cursor-pointer transition-colors ${
                  filter === tab.id
                    ? "bg-[#FF5000] text-white border-[#FF5000]"
                    : "bg-zinc-50 text-zinc-700 border-zinc-300 hover:border-[#FF5000]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white border border-zinc-200 p-12 text-center text-zinc-500 text-base">
          No hay solicitudes en esta categoría todavía.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => {
            const waDigits = formatWhatsappNumber(lead.telefono);
            const waUrl = `https://wa.me/${waDigits}?text=${encodeURIComponent(
              `Hola ${lead.nombre}, te contactamos de Total Repair Ltda. por tu solicitud ${lead.folio} (${lead.tipo_requerimiento}).`
            )}`;
            const currentNotes = notesDraft[lead.id] ?? lead.admin_notes;

            return (
              <article
                key={lead.id}
                className={`bg-white border-2 p-5 sm:p-7 space-y-5 ${
                  lead.is_urgent ? "border-red-300" : "border-zinc-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-zinc-100 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-[#0F172A] text-white px-2.5 py-1">
                        {lead.folio}
                      </span>
                      {lead.is_urgent && (
                        <span className="bg-red-100 text-red-700 border border-red-300 text-xs font-bold px-2.5 py-1 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>URGENTE 24/7</span>
                        </span>
                      )}
                      <span className="text-xs text-zinc-500 font-mono">
                        {new Date(lead.created_at).toLocaleString("es-CL", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A]">
                      {lead.nombre}
                      {lead.empresa && (
                        <span className="text-zinc-500 font-normal text-base ml-2">
                          ({lead.empresa})
                        </span>
                      )}
                    </h2>
                    <p className="text-[#FF5000] font-bold text-sm uppercase tracking-wide">
                      {lead.tipo_requerimiento}
                    </p>
                  </div>

                  {/* Selector de estado */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleStatusChange(lead.id, opt.id)}
                        className={`px-3 py-2 text-xs font-bold border cursor-pointer transition-all ${
                          lead.status === opt.id
                            ? opt.badgeClass + " ring-2 ring-offset-1 ring-[#0F172A]/20"
                            : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detalles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="space-y-1.5">
                    <p>
                      <strong>Teléfono:</strong>{" "}
                      <span className="font-mono">{lead.telefono}</span>
                    </p>
                    <p>
                      <strong>Correo:</strong>{" "}
                      <span className="font-mono break-all">{lead.correo}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span
                        className={`text-xs px-2.5 py-1 border font-medium ${
                          lead.email_status === "sent"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : lead.email_status === "pending_dns"
                              ? "bg-amber-50 border-amber-200 text-amber-800"
                              : "bg-zinc-100 border-zinc-200 text-zinc-600"
                        }`}
                      >
                        {lead.email_status === "sent"
                          ? "✉️ Correo entregado"
                          : lead.email_status === "pending_dns"
                            ? "⏳ Correo pendiente DNS"
                            : "⚠️ Correo no enviado"}
                      </span>
                      {lead.telegram_sent && (
                        <span className="text-xs px-2.5 py-1 border bg-blue-50 border-blue-200 text-blue-700 font-medium">
                          ✈️ Telegram enviado
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-4">
                    <p className="text-xs font-bold uppercase text-zinc-500 mb-1">
                      Mensaje / Especificaciones:
                    </p>
                    <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed">
                      {lead.especificaciones || "Sin detalles adicionales."}
                    </p>
                  </div>
                </div>

                {/* Acciones rápidas + Notas */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3 inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Responder por WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${lead.telefono}`}
                      className="min-h-[48px] bg-[#0F172A] hover:bg-zinc-800 text-white font-bold text-sm px-5 py-3 inline-flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Llamar</span>
                    </a>
                    <a
                      href={`mailto:${lead.correo}?subject=${encodeURIComponent(
                        `Total Repair Ltda. — Respuesta a solicitud ${lead.folio}`
                      )}`}
                      className="min-h-[48px] bg-white border border-zinc-300 hover:border-[#FF5000] text-[#0F172A] font-bold text-sm px-5 py-3 inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#FF5000]" />
                      <span>Responder Correo</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <input
                      type="text"
                      value={currentNotes}
                      onChange={(e) =>
                        setNotesDraft((prev) => ({
                          ...prev,
                          [lead.id]: e.target.value,
                        }))
                      }
                      placeholder="Nota interna (ej: Se envió cotización el martes)..."
                      className="flex-1 bg-zinc-50 border border-zinc-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#FF5000]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveNotes(lead)}
                      disabled={savingNoteId === lead.id}
                      className="min-h-[44px] px-4 bg-zinc-900 hover:bg-[#FF5000] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
