"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Monitor,
  RotateCcw,
  Save,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { DEFAULT_THEME, DESIGN_PRESETS } from "@/lib/default-site-config";
import {
  BODY_FONTS,
  DISPLAY_FONTS,
  getContrastRatio,
  getContrastStatus,
} from "@/lib/theme-css";
import type {
  BodyFontKey,
  CardShadowKey,
  DisplayFontKey,
  SiteConfig,
  SiteTheme,
} from "@/lib/types/cms";

interface DesignStudioProps {
  initialConfig: SiteConfig;
  userEmail: string;
}

const PREVIEW_ROUTES = [
  { path: "/", label: "Inicio" },
  { path: "/proyectos", label: "Proyectos" },
  { path: "/empresas", label: "Empresas" },
  { path: "/hogar", label: "Hogar" },
  { path: "/contacto", label: "Contacto" },
];

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  hint?: string;
  onChange: (val: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-bold text-[#0F172A]">{label}</label>
        <span className="font-mono text-xs font-bold bg-zinc-100 px-2 py-0.5 border border-zinc-200">
          {unit === "%" ? `${Math.round(value * 100)}%` : `${value}${unit ?? ""}`}
        </span>
      </div>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#FF5000] cursor-pointer h-2.5"
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border border-zinc-200 bg-zinc-50 px-3 py-2.5">
      <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-9 border border-zinc-300 bg-white cursor-pointer p-0.5"
        />
        <span className="font-mono text-xs text-zinc-600 uppercase w-16">
          {value}
        </span>
      </div>
    </div>
  );
}

export function DesignStudio({ initialConfig, userEmail }: DesignStudioProps) {
  const [theme, setTheme] = useState<SiteTheme>(initialConfig.theme);
  const [previewPath, setPreviewPath] = useState("/");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [mobilePane, setMobilePane] = useState<"controls" | "preview">(
    "controls"
  );
  const [saving, setSaving] = useState(false);
  const [undoing, setUndoing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const pushPreviewTheme = (nextTheme: SiteTheme) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      { type: "TR_PREVIEW_THEME", theme: nextTheme },
      window.location.origin
    );
  };

  useEffect(() => {
    pushPreviewTheme(theme);
  }, [theme]);

  const textContrast = getContrastRatio(theme.inkAnthracite, theme.surfaceWhite);
  const textStatus = getContrastStatus(textContrast);
  const btnContrast = getContrastRatio("#FFFFFF", theme.brandOrange);
  const btnStatus = getContrastStatus(btnContrast);

  const handleSaveTheme = async () => {
    setSaving(true);
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
          label: "Respaldo antes de cambio de diseño visual",
          theme: currentLive.theme,
          company: currentLive.company,
          content: currentLive.content,
          created_by: userEmail,
        });
      }

      const { error } = await supabase
        .from("site_config")
        .update({ theme, updated_by: userEmail })
        .eq("id", "main");

      if (error) throw new Error(error.message);

      await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);

      setStatusMsg({
        type: "ok",
        text: "¡Diseño guardado y publicado! Toda tu página ya se ve con este estilo.",
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text:
          err instanceof Error
            ? `No se pudo guardar el diseño: ${err.message}`
            : "Error al guardar el diseño.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUndo = async () => {
    setUndoing(true);
    setStatusMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: rev } = await supabase
        .from("site_revisions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!rev) {
        setStatusMsg({
          type: "err",
          text: "No hay una versión anterior guardada aún.",
        });
        return;
      }

      const { error } = await supabase
        .from("site_config")
        .update({
          theme: rev.theme,
          updated_by: userEmail,
        })
        .eq("id", "main");

      if (error) throw new Error(error.message);

      setTheme(rev.theme as SiteTheme);
      await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);

      setStatusMsg({
        type: "ok",
        text: "Se restauró el diseño anterior correctamente.",
      });
    } finally {
      setUndoing(false);
    }
  };

  return (
    <div className="space-y-5 pb-24">
      <div className="bg-white border border-zinc-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5000] mb-1">
            Modo Diseño Total
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F172A]">
            Letras, Colores, Espacios, Líneas y Cuadros
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base mt-1">
            Prueba todo lo que quieras viendo la página en vivo. Nada cambia en
            público hasta que toques <strong>Guardar y Publicar</strong>.
          </p>
        </div>

        {/* Toggle móvil Controles / Vista Previa */}
        <div className="flex lg:hidden gap-2">
          <button
            type="button"
            onClick={() => setMobilePane("controls")}
            className={`flex-1 py-3 px-4 text-sm font-bold border ${
              mobilePane === "controls"
                ? "bg-[#FF5000] text-white border-[#FF5000]"
                : "bg-zinc-50 text-zinc-700 border-zinc-300"
            }`}
          >
            Editar Diseño
          </button>
          <button
            type="button"
            onClick={() => setMobilePane("preview")}
            className={`flex-1 py-3 px-4 text-sm font-bold border ${
              mobilePane === "preview"
                ? "bg-[#0F172A] text-white border-[#0F172A]"
                : "bg-zinc-50 text-zinc-700 border-zinc-300"
            }`}
          >
            Ver en Vivo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMNA CONTROLES */}
        <div
          className={`lg:col-span-5 space-y-5 ${
            mobilePane === "controls" ? "block" : "hidden lg:block"
          }`}
        >
          {/* 1. Estilos rápidos */}
          <section className="bg-white border border-zinc-200 p-5 space-y-3">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF5000]" />
              <span>1. Estilos Rápidos (1 toque)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {DESIGN_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setTheme(preset.theme)}
                  className="text-left p-3.5 border border-zinc-200 bg-zinc-50 hover:border-[#FF5000] hover:bg-orange-50/40 transition-colors cursor-pointer"
                >
                  <p className="font-bold text-sm text-[#0F172A]">
                    {preset.name}
                  </p>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    {preset.description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Tipografía y Tamaño de Letras */}
          <section className="bg-white border border-zinc-200 p-5 space-y-4">
            <h2 className="font-display text-lg font-bold border-b border-zinc-200 pb-2">
              2. Tipografía y Tamaño de Letras
            </h2>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#0F172A]">
                Tipo de letra para Títulos
              </label>
              <select
                value={theme.displayFont}
                onChange={(e) =>
                  setTheme((p) => ({
                    ...p,
                    displayFont: e.target.value as DisplayFontKey,
                  }))
                }
                className="w-full bg-zinc-50 border border-zinc-300 px-3.5 py-3 text-base"
              >
                {Object.entries(DISPLAY_FONTS).map(([key, meta]) => (
                  <option key={key} value={key}>
                    {meta.label} — {meta.sample}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#0F172A]">
                Tipo de letra para Textos y Párrafos
              </label>
              <select
                value={theme.bodyFont}
                onChange={(e) =>
                  setTheme((p) => ({
                    ...p,
                    bodyFont: e.target.value as BodyFontKey,
                  }))
                }
                className="w-full bg-zinc-50 border border-zinc-300 px-3.5 py-3 text-base"
              >
                {Object.entries(BODY_FONTS).map(([key, meta]) => (
                  <option key={key} value={key}>
                    {meta.label} — {meta.sample}
                  </option>
                ))}
              </select>
            </div>

            <SliderField
              label="Tamaño general de letras"
              value={theme.textScale}
              min={0.9}
              max={1.3}
              step={0.02}
              unit="%"
              hint="Súbelo si prefieres letras más grandes para leer cómodo."
              onChange={(v) => setTheme((p) => ({ ...p, textScale: v }))}
            />

            <SliderField
              label="Tamaño de los títulos"
              value={theme.headingScale}
              min={0.85}
              max={1.25}
              step={0.02}
              unit="%"
              onChange={(v) => setTheme((p) => ({ ...p, headingScale: v }))}
            />

            <SliderField
              label="Espacio entre líneas de texto"
              value={theme.lineHeight}
              min={1.35}
              max={1.95}
              step={0.05}
              onChange={(v) => setTheme((p) => ({ ...p, lineHeight: v }))}
            />
          </section>

          {/* 3. Colores */}
          <section className="bg-white border border-zinc-200 p-5 space-y-3">
            <h2 className="font-display text-lg font-bold border-b border-zinc-200 pb-2">
              3. Colores de la Página
            </h2>
            <ColorField
              label="Naranjo Principal (Botones y Acentos)"
              value={theme.brandOrange}
              onChange={(v) => setTheme((p) => ({ ...p, brandOrange: v }))}
            />
            <ColorField
              label="Carbón Oscuro (Portadas y Footer)"
              value={theme.heroDarkBg}
              onChange={(v) => setTheme((p) => ({ ...p, heroDarkBg: v }))}
            />
            <ColorField
              label="Color de Títulos"
              value={theme.inkAnthracite}
              onChange={(v) => setTheme((p) => ({ ...p, inkAnthracite: v }))}
            />
            <ColorField
              label="Color de Párrafos"
              value={theme.inkMid}
              onChange={(v) => setTheme((p) => ({ ...p, inkMid: v }))}
            />
            <ColorField
              label="Fondo Principal"
              value={theme.surfaceWhite}
              onChange={(v) => setTheme((p) => ({ ...p, surfaceWhite: v }))}
            />
            <ColorField
              label="Fondo Secundario (Secciones alternas)"
              value={theme.surfaceCream}
              onChange={(v) => setTheme((p) => ({ ...p, surfaceCream: v }))}
            />
            <ColorField
              label="Color de Líneas y Bordes"
              value={theme.dividerColor}
              onChange={(v) => setTheme((p) => ({ ...p, dividerColor: v }))}
            />

            {/* Semáforo de legibilidad */}
            <div
              className={`p-3 border text-xs space-y-1 ${
                textStatus.level === "LOW" || btnStatus.level === "LOW"
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
              }`}
            >
              <p className="font-bold flex items-center gap-1.5">
                {textStatus.level === "LOW" || btnStatus.level === "LOW" ? (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                <span>
                  Legibilidad de textos: {textStatus.label} ({textContrast}:1)
                </span>
              </p>
              {btnStatus.level === "LOW" && (
                <p>
                  Aviso: El texto blanco sobre este color de botón puede costar
                  un poco de leer ({btnContrast}:1). Conviene un color un poco
                  más intenso.
                </p>
              )}
            </div>
          </section>

          {/* 4. Espacios, Líneas y Cuadros */}
          <section className="bg-white border border-zinc-200 p-5 space-y-4">
            <h2 className="font-display text-lg font-bold border-b border-zinc-200 pb-2">
              4. Espacios, Líneas y Cuadros
            </h2>

            <SliderField
              label="Espacio arriba y abajo de cada sección"
              value={theme.sectionPy}
              min={44}
              max={136}
              step={4}
              unit="px"
              onChange={(v) => setTheme((p) => ({ ...p, sectionPy: v }))}
            />
            <SliderField
              label="Separación entre cuadros"
              value={theme.gridGap}
              min={12}
              max={48}
              step={2}
              unit="px"
              onChange={(v) => setTheme((p) => ({ ...p, gridGap: v }))}
            />
            <SliderField
              label="Ancho máximo del contenido"
              value={theme.containerMax}
              min={1024}
              max={1440}
              step={16}
              unit="px"
              onChange={(v) => setTheme((p) => ({ ...p, containerMax: v }))}
            />
            <SliderField
              label="Grosor de líneas divisoras"
              value={theme.dividerWidth}
              min={0}
              max={4}
              step={1}
              unit="px"
              hint="0 = sin líneas separadoras"
              onChange={(v) => setTheme((p) => ({ ...p, dividerWidth: v }))}
            />
            <SliderField
              label="Grosor del borde de cuadros"
              value={theme.borderWidth}
              min={0}
              max={4}
              step={1}
              unit="px"
              onChange={(v) => setTheme((p) => ({ ...p, borderWidth: v }))}
            />
            <SliderField
              label="Esquinas redondeadas de los cuadros"
              value={theme.cardRadius}
              min={0}
              max={24}
              step={2}
              unit="px"
              hint="0 = esquinas cuadradas | 16+ = esquinas suaves"
              onChange={(v) => setTheme((p) => ({ ...p, cardRadius: v }))}
            />
            <SliderField
              label="Espacio interior dentro de cada cuadro"
              value={theme.cardPadding}
              min={16}
              max={44}
              step={2}
              unit="px"
              onChange={(v) => setTheme((p) => ({ ...p, cardPadding: v }))}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#0F172A]">
                Sombra de los cuadros
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  [
                    { id: "none", label: "Sin" },
                    { id: "sm", label: "Suave" },
                    { id: "md", label: "Media" },
                    { id: "lg", label: "Fuerte" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() =>
                      setTheme((p) => ({
                        ...p,
                        cardShadow: s.id as CardShadowKey,
                      }))
                    }
                    className={`py-2 text-xs font-bold border cursor-pointer ${
                      theme.cardShadow === s.id
                        ? "bg-[#0F172A] text-white border-[#0F172A]"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#0F172A]">
                Forma de los botones
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { val: 0, label: "Recto" },
                  { val: 4, label: "Suave" },
                  { val: 12, label: "Redondo" },
                  { val: 999, label: "Píldora" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() =>
                      setTheme((p) => ({ ...p, btnRadius: opt.val }))
                    }
                    className={`py-2 text-xs font-bold border cursor-pointer ${
                      theme.btnRadius === opt.val
                        ? "bg-[#0F172A] text-white border-[#0F172A]"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* COLUMNA VISTA PREVIA EN VIVO */}
        <div
          className={`lg:col-span-7 lg:sticky lg:top-6 space-y-3 ${
            mobilePane === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="bg-white border border-zinc-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {PREVIEW_ROUTES.map((r) => (
                <button
                  key={r.path}
                  type="button"
                  onClick={() => setPreviewPath(r.path)}
                  className={`px-3 py-1.5 text-xs font-bold border cursor-pointer ${
                    previewPath === r.path
                      ? "bg-[#FF5000] text-white border-[#FF5000]"
                      : "bg-zinc-50 text-zinc-700 border-zinc-200"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`p-2 border cursor-pointer ${
                  device === "desktop"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200"
                }`}
                title="Vista Computador"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`p-2 border cursor-pointer ${
                  device === "mobile"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200"
                }`}
                title="Vista Celular"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-zinc-200 border border-zinc-300 p-2 sm:p-4 flex justify-center overflow-hidden">
            <iframe
              ref={iframeRef}
              src={`${previewPath}?preview=1`}
              title="Vista previa en vivo de Total Repair"
              onLoad={() => pushPreviewTheme(theme)}
              className="bg-white border border-zinc-300 shadow-lg transition-all duration-300 h-[72vh]"
              style={{ width: device === "mobile" ? "390px" : "100%" }}
            />
          </div>
        </div>
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

      {/* Barra fija inferior */}
      <div className="fixed bottom-16 lg:bottom-0 left-0 lg:left-72 right-0 z-30 bg-white border-t-2 border-zinc-200 px-4 sm:px-6 py-3.5 shadow-xl flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(DEFAULT_THEME)}
            className="px-4 py-3 border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-[#0F172A] font-bold text-xs sm:text-sm cursor-pointer"
          >
            Diseño Original
          </button>
          <button
            type="button"
            onClick={handleUndo}
            disabled={undoing || saving}
            className="px-4 py-3 border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-[#0F172A] font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Deshacer</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSaveTheme}
          disabled={saving || undoing}
          className="min-w-[240px] bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold text-base px-8 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>
            {saving ? "Publicando diseño..." : "Guardar y Publicar Diseño"}
          </span>
        </button>
      </div>
    </div>
  );
}
