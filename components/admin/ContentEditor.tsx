"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ImageUploader } from "./ImageUploader";
import type {
  HomeSectionKey,
  SiteConfig,
  SiteContent,
  SiteCompany,
} from "@/lib/types/cms";

interface ContentEditorProps {
  initialConfig: SiteConfig;
  userEmail: string;
}

type TabKey =
  | "home"
  | "empresas"
  | "hogar"
  | "servicios"
  | "nosotros"
  | "proyectos_contacto"
  | "empresa_logos_historia";

const TABS: Array<{ id: TabKey; label: string }> = [
  { id: "home", label: "1. Portada (Inicio)" },
  { id: "empresas", label: "2. Empresas" },
  { id: "hogar", label: "3. Hogar" },
  { id: "servicios", label: "4. Servicios" },
  { id: "nosotros", label: "5. Nosotros" },
  { id: "proyectos_contacto", label: "6. Proyectos y Contacto" },
  { id: "empresa_logos_historia", label: "7. Teléfonos, Logos e Historia" },
];

const HOME_SECTION_LABELS: Record<HomeSectionKey, string> = {
  hero: "Portada principal (Título y botones)",
  logos: "Carrusel de logos de clientes",
  timeline: "Línea de tiempo (Nuestra historia)",
  spotlight: "Proyectos Insignia + Obras Destacadas",
  cta: "Llamado a cotizar (Hablemos de su proyecto)",
  emergency: "Banner de Emergencias 24/7",
};

function FieldInput({
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-[#0F172A]">{label}</label>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
        />
      )}
    </div>
  );
}

function ImageField({
  label,
  value,
  folder,
  onChange,
}: {
  label: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
}) {
  return (
    <div className="border border-zinc-200 bg-zinc-50 p-4 space-y-3">
      <p className="text-sm font-bold text-[#0F172A]">{label}</p>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-36 h-24 bg-white border border-zinc-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 w-full">
          <ImageUploader
            folder={folder}
            compact
            label="Cambiar foto desde mi galería"
            onUploaded={(res) => {
              if (res[0]) onChange(res[0].url);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function ContentEditor({
  initialConfig,
  userEmail,
}: ContentEditorProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [company, setCompany] = useState<SiteCompany>(initialConfig.company);
  const [content, setContent] = useState<SiteContent>(initialConfig.content);
  const [saving, setSaving] = useState(false);
  const [undoing, setUndoing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const publishChanges = async (
    nextCompany: SiteCompany,
    nextContent: SiteContent,
    revisionLabel = "Edición de textos e imágenes"
  ) => {
    setSaving(true);
    setStatusMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();

      // Fetch current live config first to create a restore point before overwriting
      const { data: currentLive } = await supabase
        .from("site_config")
        .select("theme, company, content")
        .eq("id", "main")
        .maybeSingle();

      if (currentLive) {
        await supabase.from("site_revisions").insert({
          label: `Respaldo antes de: ${revisionLabel}`,
          theme: currentLive.theme,
          company: currentLive.company,
          content: currentLive.content,
          created_by: userEmail,
        });
      }

      const { error } = await supabase
        .from("site_config")
        .update({
          company: nextCompany,
          content: nextContent,
          updated_by: userEmail,
        })
        .eq("id", "main");

      if (error) throw new Error(error.message);

      await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);

      setStatusMsg({
        type: "ok",
        text: "¡Listo! Todos los cambios ya están publicados en totalrepair.cl.",
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text:
          err instanceof Error
            ? `No se pudo guardar: ${err.message}`
            : "Error al guardar los cambios.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUndoLast = async () => {
    setUndoing(true);
    setStatusMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: rev, error } = await supabase
        .from("site_revisions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !rev) {
        setStatusMsg({
          type: "err",
          text: "No hay copias anteriores disponibles todavía.",
        });
        return;
      }

      const { error: updErr } = await supabase
        .from("site_config")
        .update({
          company: rev.company,
          content: rev.content,
          theme: rev.theme,
          updated_by: userEmail,
        })
        .eq("id", "main");

      if (updErr) throw new Error(updErr.message);

      setCompany(rev.company as SiteCompany);
      setContent(rev.content as SiteContent);
      await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);

      setStatusMsg({
        type: "ok",
        text: "Se restauró la versión anterior correctamente.",
      });
    } catch {
      setStatusMsg({
        type: "err",
        text: "No se pudo restaurar la versión anterior.",
      });
    } finally {
      setUndoing(false);
    }
  };

  const moveHomeSection = (index: number, delta: -1 | 1) => {
    const order = [...content.home.sectionsOrder];
    const target = index + delta;
    if (target < 0 || target >= order.length) return;
    const [moved] = order.splice(index, 1);
    order.splice(target, 0, moved);
    setContent((prev) => ({
      ...prev,
      home: { ...prev.home, sectionsOrder: order },
    }));
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="bg-white border border-zinc-200 p-6">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5000] mb-1">
          Modo Fácil
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F172A]">
          Editar Textos, Fotos y Secciones
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base mt-1">
          Elige la sección que deseas modificar abajo. Cuando termines, toca{" "}
          <strong>Guardar y Publicar</strong>.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pt-5 pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-bold border whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? "bg-[#FF5000] text-white border-[#FF5000]"
                  : "bg-zinc-50 text-zinc-700 border-zinc-300 hover:border-[#FF5000]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB 1: HOME ── */}
      {activeTab === "home" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 p-6 space-y-5">
            <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
              Portada Principal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldInput
                label="Etiqueta superior (naranja)"
                value={content.home.badge}
                onChange={(v) =>
                  setContent((p) => ({ ...p, home: { ...p.home, badge: v } }))
                }
              />
              <FieldInput
                label="Subtítulo debajo del título grande"
                value={content.home.subtitle}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, subtitle: v },
                  }))
                }
              />
              <FieldInput
                label="Título Grande — Primera palabra"
                value={content.home.titlePrefix}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, titlePrefix: v },
                  }))
                }
              />
              <FieldInput
                label="Título Grande — Segunda palabra (en naranjo)"
                value={content.home.titleHighlight}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, titleHighlight: v },
                  }))
                }
              />
              <FieldInput
                label="Texto descriptivo"
                value={content.home.descriptionPrefix}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, descriptionPrefix: v },
                  }))
                }
              />
              <FieldInput
                label="Frase final en negrita"
                value={content.home.descriptionBold}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, descriptionBold: v },
                  }))
                }
              />
              <FieldInput
                label="Botón Principal"
                value={content.home.ctaPrimaryLabel}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, ctaPrimaryLabel: v },
                  }))
                }
              />
              <FieldInput
                label="Botón Empresas"
                value={content.home.ctaEmpresasLabel}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, ctaEmpresasLabel: v },
                  }))
                }
              />
              <FieldInput
                label="Botón Hogar"
                value={content.home.ctaHogarLabel}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, ctaHogarLabel: v },
                  }))
                }
              />
            </div>
          </div>

          {/* Orden y Visibilidad de bloques del Inicio */}
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <div>
              <h2 className="font-display text-xl font-bold">
                Orden y visibilidad de las secciones del Inicio
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Cambia en qué orden aparecen los bloques o esconde alguno si no
                lo necesitas.
              </p>
            </div>
            <div className="space-y-2.5">
              {content.home.sectionsOrder.map((secKey, idx) => {
                const visible = content.home.sectionsVisible?.[secKey] !== false;
                return (
                  <div
                    key={secKey}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-zinc-200 bg-zinc-50 p-3.5"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#0F172A]">
                      {idx + 1}. {HOME_SECTION_LABELS[secKey]}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveHomeSection(idx, -1)}
                        disabled={idx === 0}
                        className="px-3 py-2 bg-white border border-zinc-300 disabled:opacity-35 cursor-pointer"
                        aria-label="Subir sección"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveHomeSection(idx, 1)}
                        disabled={idx === content.home.sectionsOrder.length - 1}
                        className="px-3 py-2 bg-white border border-zinc-300 disabled:opacity-35 cursor-pointer"
                        aria-label="Bajar sección"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setContent((p) => ({
                            ...p,
                            home: {
                              ...p.home,
                              sectionsVisible: {
                                ...p.home.sectionsVisible,
                                [secKey]: !visible,
                              },
                            },
                          }))
                        }
                        className={`px-4 py-2 border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                          visible
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : "bg-amber-50 border-amber-300 text-amber-800"
                        }`}
                      >
                        {visible ? (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            <span>Oculta</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
              Invitación Final a Cotizar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldInput
                label="Título"
                value={content.home.finalCtaTitle}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, finalCtaTitle: v },
                  }))
                }
              />
              <FieldInput
                label="Palabra destacada (naranjo)"
                value={content.home.finalCtaHighlight}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, finalCtaHighlight: v },
                  }))
                }
              />
              <div className="md:col-span-2">
                <FieldInput
                  label="Texto explicativo"
                  multiline
                  value={content.home.finalCtaDescription}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      home: { ...p.home, finalCtaDescription: v },
                    }))
                  }
                />
              </div>
              <FieldInput
                label="Texto del botón"
                value={content.home.finalCtaButtonLabel}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    home: { ...p.home, finalCtaButtonLabel: v },
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: EMPRESAS ── */}
      {activeTab === "empresas" && (
        <div className="bg-white border border-zinc-200 p-6 space-y-6">
          <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
            Sección Empresas (/empresas)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldInput
              label="Título Principal"
              value={content.empresas.titleLine1}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  empresas: { ...p.empresas, titleLine1: v },
                }))
              }
            />
            <FieldInput
              label="Frase destacada (naranjo)"
              value={content.empresas.titleHighlight}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  empresas: { ...p.empresas, titleHighlight: v },
                }))
              }
            />
            <div className="md:col-span-2">
              <FieldInput
                label="Descripción de portada"
                multiline
                value={content.empresas.description}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    empresas: { ...p.empresas, description: v },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <ImageField
                label="Foto principal de Empresas"
                value={content.empresas.heroImage}
                folder="pages/empresas"
                onChange={(url) =>
                  setContent((p) => ({
                    ...p,
                    empresas: { ...p.empresas, heroImage: url },
                  }))
                }
              />
            </div>
            <FieldInput
              label="Título bloque grande de especialidad"
              value={content.empresas.featuredTitle}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  empresas: { ...p.empresas, featuredTitle: v },
                }))
              }
            />
            <FieldInput
              label="Título bloque Mantenimiento"
              value={content.empresas.maintTitle}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  empresas: { ...p.empresas, maintTitle: v },
                }))
              }
            />
            <div className="md:col-span-2">
              <FieldInput
                label="Descripción especialidad principal"
                multiline
                value={content.empresas.featuredDescription}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    empresas: { ...p.empresas, featuredDescription: v },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <ImageField
                label="Foto especialidad principal"
                value={content.empresas.featuredImage}
                folder="pages/empresas"
                onChange={(url) =>
                  setContent((p) => ({
                    ...p,
                    empresas: { ...p.empresas, featuredImage: url },
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200">
            <h3 className="font-bold text-lg">
              Tarjetas de Siniestros Corporativos
            </h3>
            {content.empresas.uriItems.map((item, idx) => (
              <div
                key={item.id}
                className="border border-zinc-200 p-4 space-y-3 bg-zinc-50"
              >
                <FieldInput
                  label={`Protocolo ${item.code} — Título`}
                  value={item.title}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      empresas: {
                        ...p.empresas,
                        uriItems: p.empresas.uriItems.map((u, i) =>
                          i === idx ? { ...u, title: v } : u
                        ),
                      },
                    }))
                  }
                />
                <FieldInput
                  label="Descripción"
                  multiline
                  value={item.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      empresas: {
                        ...p.empresas,
                        uriItems: p.empresas.uriItems.map((u, i) =>
                          i === idx ? { ...u, description: v } : u
                        ),
                      },
                    }))
                  }
                />
                <ImageField
                  label="Foto"
                  value={item.image}
                  folder="pages/empresas"
                  onChange={(url) =>
                    setContent((p) => ({
                      ...p,
                      empresas: {
                        ...p.empresas,
                        uriItems: p.empresas.uriItems.map((u, i) =>
                          i === idx ? { ...u, image: url } : u
                        ),
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: HOGAR ── */}
      {activeTab === "hogar" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
              Sección Hogar (/hogar)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldInput
                label="Título"
                value={content.hogar.title}
                onChange={(v) =>
                  setContent((p) => ({ ...p, hogar: { ...p.hogar, title: v } }))
                }
              />
              <FieldInput
                label="Palabra destacada (naranjo)"
                value={content.hogar.titleHighlight}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    hogar: { ...p.hogar, titleHighlight: v },
                  }))
                }
              />
              <div className="md:col-span-2">
                <FieldInput
                  label="Descripción principal"
                  multiline
                  value={content.hogar.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      hogar: { ...p.hogar, description: v },
                    }))
                  }
                />
              </div>
              <div className="md:col-span-2">
                <ImageField
                  label="Foto principal de Hogar"
                  value={content.hogar.heroImage}
                  folder="pages/hogar"
                  onChange={(url) =>
                    setContent((p) => ({
                      ...p,
                      hogar: { ...p.hogar, heroImage: url },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Servicios de Hogar */}
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <h3 className="font-display text-xl font-bold">
              Tarjetas de Servicios para Hogar
            </h3>
            {content.hogar.services.map((srv, idx) => (
              <div
                key={srv.id}
                className="border border-zinc-200 p-4 space-y-3 bg-zinc-50"
              >
                <FieldInput
                  label={`Servicio #${idx + 1} — Título`}
                  value={srv.title}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      hogar: {
                        ...p.hogar,
                        services: p.hogar.services.map((s, i) =>
                          i === idx ? { ...s, title: v } : s
                        ),
                      },
                    }))
                  }
                />
                <FieldInput
                  label="Descripción"
                  multiline
                  value={srv.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      hogar: {
                        ...p.hogar,
                        services: p.hogar.services.map((s, i) =>
                          i === idx ? { ...s, description: v } : s
                        ),
                      },
                    }))
                  }
                />
                <ImageField
                  label="Foto del servicio"
                  value={srv.image}
                  folder="pages/hogar"
                  onChange={(url) =>
                    setContent((p) => ({
                      ...p,
                      hogar: {
                        ...p.hogar,
                        services: p.hogar.services.map((s, i) =>
                          i === idx ? { ...s, image: url } : s
                        ),
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-xl font-bold">
                Preguntas Frecuentes
              </h3>
              <button
                type="button"
                onClick={() =>
                  setContent((p) => ({
                    ...p,
                    hogar: {
                      ...p.hogar,
                      faqs: [
                        ...p.hogar.faqs,
                        {
                          id: `faq-${Date.now()}`,
                          q: "Nueva pregunta",
                          a: "Respuesta aquí...",
                        },
                      ],
                    },
                  }))
                }
                className="px-4 py-2.5 bg-[#FF5000] text-white text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Pregunta</span>
              </button>
            </div>

            {content.hogar.faqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="border border-zinc-200 p-4 space-y-3 bg-zinc-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#FF5000]">
                    Pregunta #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((p) => ({
                        ...p,
                        hogar: {
                          ...p.hogar,
                          faqs: p.hogar.faqs.filter((_, i) => i !== idx),
                        },
                      }))
                    }
                    className="p-2 text-red-600 hover:bg-red-50 border border-red-200 cursor-pointer"
                    aria-label="Eliminar pregunta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <FieldInput
                  label="Pregunta"
                  value={faq.q}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      hogar: {
                        ...p.hogar,
                        faqs: p.hogar.faqs.map((f, i) =>
                          i === idx ? { ...f, q: v } : f
                        ),
                      },
                    }))
                  }
                />
                <FieldInput
                  label="Respuesta"
                  multiline
                  value={faq.a}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      hogar: {
                        ...p.hogar,
                        faqs: p.hogar.faqs.map((f, i) =>
                          i === idx ? { ...f, a: v } : f
                        ),
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 4: SERVICIOS ── */}
      {activeTab === "servicios" && (
        <div className="bg-white border border-zinc-200 p-6 space-y-6">
          <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
            Sección Servicios (/servicios)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldInput
              label="Título"
              value={content.servicios.title}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  servicios: { ...p.servicios, title: v },
                }))
              }
            />
            <FieldInput
              label="Palabra destacada (naranjo)"
              value={content.servicios.titleHighlight}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  servicios: { ...p.servicios, titleHighlight: v },
                }))
              }
            />
            <div className="md:col-span-2">
              <FieldInput
                label="Descripción"
                multiline
                value={content.servicios.description}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    servicios: { ...p.servicios, description: v },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <ImageField
                label="Foto principal de Servicios"
                value={content.servicios.heroImage}
                folder="pages/servicios"
                onChange={(url) =>
                  setContent((p) => ({
                    ...p,
                    servicios: { ...p.servicios, heroImage: url },
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200">
            <h3 className="font-bold text-lg">Especialidades de Ejecución</h3>
            {content.servicios.specialities.map((sp, idx) => (
              <div
                key={sp.id}
                className="border border-zinc-200 p-4 space-y-3 bg-zinc-50"
              >
                <FieldInput
                  label={`Especialidad #${idx + 1} — Nombre`}
                  value={sp.name}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      servicios: {
                        ...p.servicios,
                        specialities: p.servicios.specialities.map((item, i) =>
                          i === idx ? { ...item, name: v } : item
                        ),
                      },
                    }))
                  }
                />
                <FieldInput
                  label="Descripción"
                  multiline
                  value={sp.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      servicios: {
                        ...p.servicios,
                        specialities: p.servicios.specialities.map((item, i) =>
                          i === idx ? { ...item, description: v } : item
                        ),
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 5: NOSOTROS ── */}
      {activeTab === "nosotros" && (
        <div className="bg-white border border-zinc-200 p-6 space-y-6">
          <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
            Sección Nosotros (/nosotros)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldInput
              label="Título"
              value={content.nosotros.title}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  nosotros: { ...p.nosotros, title: v },
                }))
              }
            />
            <FieldInput
              label="Palabra destacada (naranjo)"
              value={content.nosotros.titleHighlight}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  nosotros: { ...p.nosotros, titleHighlight: v },
                }))
              }
            />
            <div className="md:col-span-2">
              <FieldInput
                label="Historia introductoria"
                multiline
                value={content.nosotros.description}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    nosotros: { ...p.nosotros, description: v },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <FieldInput
                label="Frase destacada (cita)"
                multiline
                value={content.nosotros.coreQuote}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    nosotros: { ...p.nosotros, coreQuote: v },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <FieldInput
                label="Descripción debajo de la cita"
                multiline
                value={content.nosotros.coreDescription}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    nosotros: { ...p.nosotros, coreDescription: v },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <ImageField
                label="Foto histórica en terreno"
                value={content.nosotros.coreImage}
                folder="pages/nosotros"
                onChange={(url) =>
                  setContent((p) => ({
                    ...p,
                    nosotros: { ...p.nosotros, coreImage: url },
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 6: PROYECTOS Y CONTACTO ── */}
      {activeTab === "proyectos_contacto" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
              Textos de la Página de Proyectos (/proyectos)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldInput
                label="Título"
                value={content.proyectos.title}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    proyectos: { ...p.proyectos, title: v },
                  }))
                }
              />
              <FieldInput
                label="Palabra destacada (naranjo)"
                value={content.proyectos.titleHighlight}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    proyectos: { ...p.proyectos, titleHighlight: v },
                  }))
                }
              />
              <div className="md:col-span-2">
                <FieldInput
                  label="Bajada explicativa"
                  multiline
                  value={content.proyectos.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      proyectos: { ...p.proyectos, description: v },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
              Textos de la Página de Contacto (/contacto)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldInput
                label="Título"
                value={content.contacto.titlePrefix}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    contacto: { ...p.contacto, titlePrefix: v },
                  }))
                }
              />
              <FieldInput
                label="Palabra destacada"
                value={content.contacto.titleHighlight}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    contacto: { ...p.contacto, titleHighlight: v },
                  }))
                }
              />
              <div className="md:col-span-2">
                <FieldInput
                  label="Descripción"
                  multiline
                  value={content.contacto.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      contacto: { ...p.contacto, description: v },
                    }))
                  }
                />
              </div>
              <FieldInput
                label="Texto del botón Enviar"
                value={content.contacto.submitLabel}
                onChange={(v) =>
                  setContent((p) => ({
                    ...p,
                    contacto: { ...p.contacto, submitLabel: v },
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 7: DATOS DE EMPRESA, LOGOS E HISTORIA ── */}
      {activeTab === "empresa_logos_historia" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <h2 className="font-display text-xl font-bold border-b border-zinc-200 pb-3">
              Datos de Contacto y Marca (Navbar y Footer)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldInput
                label="Nombre corto de marca"
                value={company.shortName}
                onChange={(v) => setCompany((p) => ({ ...p, shortName: v }))}
              />
              <FieldInput
                label="Subtítulo bajo el logo"
                value={company.tagline}
                onChange={(v) => setCompany((p) => ({ ...p, tagline: v }))}
              />
              <FieldInput
                label="Teléfono visible"
                value={company.phoneDisplay}
                onChange={(v) => setCompany((p) => ({ ...p, phoneDisplay: v }))}
              />
              <FieldInput
                label="Teléfono limpio (para botón llamar, ej: +56999195521)"
                value={company.phoneClean}
                onChange={(v) =>
                  setCompany((p) => ({ ...p, phoneClean: v, phone: v }))
                }
              />
              <FieldInput
                label="Correo público visible"
                value={company.email}
                onChange={(v) => setCompany((p) => ({ ...p, email: v }))}
              />
              <FieldInput
                label="Dirección"
                value={company.address}
                onChange={(v) => setCompany((p) => ({ ...p, address: v }))}
              />
              <FieldInput
                label="Horario normal"
                value={company.hours}
                onChange={(v) => setCompany((p) => ({ ...p, hours: v }))}
              />
              <FieldInput
                label="Horario de emergencias"
                value={company.emergencyHours}
                onChange={(v) =>
                  setCompany((p) => ({ ...p, emergencyHours: v }))
                }
              />
              <FieldInput
                label="Enlace WhatsApp (ej: https://wa.me/56999195521)"
                value={company.whatsappUrl}
                onChange={(v) => setCompany((p) => ({ ...p, whatsappUrl: v }))}
              />
              <FieldInput
                label="Mensaje inicial automático de WhatsApp"
                value={company.whatsappMessage}
                onChange={(v) =>
                  setCompany((p) => ({ ...p, whatsappMessage: v }))
                }
              />
              <div className="md:col-span-2">
                <ImageField
                  label="Logo principal de la empresa"
                  value={company.logoUrl}
                  folder="brand"
                  onChange={(url) => setCompany((p) => ({ ...p, logoUrl: url }))}
                />
              </div>
            </div>
          </div>

          {/* Carrusel de Logos */}
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold">
                Logos de Clientes ({content.logos.length})
              </h2>
              <ImageUploader
                folder="logos"
                compact
                label="+ Subir Logo Nuevo"
                onUploaded={(res) => {
                  if (res[0]) {
                    setContent((p) => ({
                      ...p,
                      logos: [
                        ...p.logos,
                        {
                          id: `logo-${Date.now()}`,
                          src: res[0].url,
                          alt: "Nuevo Cliente",
                        },
                      ],
                    }));
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.logos.map((logo, idx) => (
                <div
                  key={logo.id}
                  className="border border-zinc-200 p-3 bg-zinc-50 space-y-2.5"
                >
                  <div className="h-20 bg-white border border-zinc-200 flex items-center justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <input
                    type="text"
                    value={logo.alt}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        logos: p.logos.map((l, i) =>
                          i === idx ? { ...l, alt: e.target.value } : l
                        ),
                      }))
                    }
                    className="w-full bg-white border border-zinc-300 px-3 py-2 text-sm"
                    placeholder="Nombre del cliente"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setContent((p) => ({
                        ...p,
                        logos: p.logos.filter((_, i) => i !== idx),
                      }))
                    }
                    className="w-full py-2 text-xs font-bold text-red-600 border border-red-200 bg-white hover:bg-red-50 cursor-pointer"
                  >
                    Quitar logo
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-zinc-200 p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold">
                Hitos de Nuestra Historia ({content.timeline.items.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setContent((p) => ({
                    ...p,
                    timeline: {
                      ...p.timeline,
                      items: [
                        ...p.timeline.items,
                        {
                          id: `hito-${Date.now()}`,
                          year: String(new Date().getFullYear()),
                          title: "Nuevo hito o proyecto importante",
                          description: "Describe este logro...",
                          isHighlight: true,
                        },
                      ],
                    },
                  }))
                }
                className="px-4 py-2.5 bg-[#FF5000] text-white text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Hito</span>
              </button>
            </div>

            {content.timeline.items.map((item, idx) => (
              <div
                key={item.id}
                className="border border-zinc-200 p-4 bg-zinc-50 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-[#FF5000]">
                    Hito #{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold inline-flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(item.isHighlight)}
                        onChange={(e) =>
                          setContent((p) => ({
                            ...p,
                            timeline: {
                              ...p.timeline,
                              items: p.timeline.items.map((it, i) =>
                                i === idx
                                  ? { ...it, isHighlight: e.target.checked }
                                  : it
                              ),
                            },
                          }))
                        }
                        className="accent-[#FF5000]"
                      />
                      <span>Destacar en naranjo</span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setContent((p) => ({
                          ...p,
                          timeline: {
                            ...p.timeline,
                            items: p.timeline.items.filter((_, i) => i !== idx),
                          },
                        }))
                      }
                      className="p-2 text-red-600 border border-red-200 bg-white cursor-pointer"
                      aria-label="Eliminar hito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <FieldInput
                    label="Año"
                    value={item.year}
                    onChange={(v) =>
                      setContent((p) => ({
                        ...p,
                        timeline: {
                          ...p.timeline,
                          items: p.timeline.items.map((it, i) =>
                            i === idx ? { ...it, year: v } : it
                          ),
                        },
                      }))
                    }
                  />
                  <div className="sm:col-span-2">
                    <FieldInput
                      label="Título del hito"
                      value={item.title}
                      onChange={(v) =>
                        setContent((p) => ({
                          ...p,
                          timeline: {
                            ...p.timeline,
                            items: p.timeline.items.map((it, i) =>
                              i === idx ? { ...it, title: v } : it
                            ),
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <FieldInput
                  label="Descripción"
                  multiline
                  value={item.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      timeline: {
                        ...p.timeline,
                        items: p.timeline.items.map((it, i) =>
                          i === idx ? { ...it, description: v } : it
                        ),
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Barra fija inferior */}
      <div className="fixed bottom-16 lg:bottom-0 left-0 lg:left-72 right-0 z-30 bg-white border-t-2 border-zinc-200 px-4 sm:px-6 py-3.5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleUndoLast}
          disabled={undoing || saving}
          className="w-full sm:w-auto px-5 py-3 border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-[#0F172A] font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          {undoing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RotateCcw className="w-4 h-4" />
          )}
          <span>Deshacer último guardado</span>
        </button>

        <button
          type="button"
          onClick={() => publishChanges(company, content)}
          disabled={saving || undoing}
          className="w-full sm:w-auto min-w-[260px] bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold text-base px-8 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>
            {saving ? "Guardando y publicando..." : "Guardar y Publicar en la Web"}
          </span>
        </button>
      </div>
    </div>
  );
}
