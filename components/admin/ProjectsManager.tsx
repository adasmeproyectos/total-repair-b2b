"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Eye,
  EyeOff,
  GripVertical,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ImageUploader, type UploadedImageResult } from "./ImageUploader";
import type {
  ProjectDivision,
  ProjectImageRecord,
  ProjectPhotoType,
  ProjectRecord,
} from "@/lib/types/cms";

interface ProjectsManagerProps {
  initialProjects: ProjectRecord[];
}

interface EditablePhoto {
  id?: string;
  image_url: string;
  storage_path: string | null;
  caption: string;
  photo_type: ProjectPhotoType;
  sort_order: number;
}

const DIVISION_LABELS: Record<ProjectDivision, string> = {
  empresas: "Empresas B2B",
  hogar: "Hogar",
  siniestros: "Siniestros 24/7",
};

const CATEGORY_SUGGESTIONS = [
  "Habilitación Comercial",
  "Remodelación Residencial",
  "Siniestro — Daño por Agua",
  "Siniestro — Incendio",
  "Construcción — Salas de Baño",
  "Electricidad Certificada SEC",
  "Mantención Corporativa",
];

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "proyecto"
  );
}

async function revalidateSite() {
  await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [editing, setEditing] = useState<ProjectRecord | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form fields for active project
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Habilitación Comercial");
  const [division, setDivision] = useState<ProjectDivision>("empresas");
  const [location, setLocation] = useState("Santiago");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [description, setDescription] = useState("");
  const [tagsText, setTagsText] = useState("B2B");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [photos, setPhotos] = useState<EditablePhoto[]>([]);
  const [coverUrl, setCoverUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [dragProjIdx, setDragProjIdx] = useState<number | null>(null);
  const [dragPhotoIdx, setDragPhotoIdx] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const openNewProject = () => {
    setIsNew(true);
    setEditing({
      id: "new",
      slug: "",
      title: "",
      category: "Habilitación Comercial",
      division: "empresas",
      location: "Santiago",
      year: String(new Date().getFullYear()),
      description: "",
      tags: [],
      cover_image_url: "",
      is_featured: false,
      is_published: true,
      sort_order: projects.length + 1,
      images: [],
    });
    setTitle("");
    setCategory("Habilitación Comercial");
    setDivision("empresas");
    setLocation("Santiago");
    setYear(String(new Date().getFullYear()));
    setDescription("");
    setTagsText("");
    setIsFeatured(false);
    setIsPublished(true);
    setPhotos([]);
    setCoverUrl("");
    setStatusMsg(null);
  };

  const openEditProject = (proj: ProjectRecord) => {
    setIsNew(false);
    setEditing(proj);
    setTitle(proj.title);
    setCategory(proj.category);
    setDivision(proj.division);
    setLocation(proj.location);
    setYear(proj.year);
    setDescription(proj.description);
    setTagsText((proj.tags ?? []).join(", "));
    setIsFeatured(proj.is_featured);
    setIsPublished(proj.is_published);
    const list: EditablePhoto[] = (proj.images ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img, idx) => ({
        id: img.id,
        image_url: img.image_url,
        storage_path: img.storage_path,
        caption: img.caption,
        photo_type: img.photo_type,
        sort_order: idx + 1,
      }));
    if (list.length === 0 && proj.cover_image_url) {
      list.push({
        image_url: proj.cover_image_url,
        storage_path: null,
        caption: proj.title,
        photo_type: "gallery",
        sort_order: 1,
      });
    }
    setPhotos(list);
    setCoverUrl(proj.cover_image_url || list[0]?.image_url || "");
    setStatusMsg(null);
  };

  const persistProjectOrder = async (nextList: ProjectRecord[]) => {
    setReordering(true);
    setProjects(nextList);
    try {
      const supabase = createSupabaseBrowserClient();
      await Promise.all(
        nextList.map((proj, index) =>
          supabase
            .from("projects")
            .update({ sort_order: index + 1 })
            .eq("id", proj.id)
        )
      );
      await revalidateSite();
      setStatusMsg({ type: "ok", text: "Orden actualizado y publicado." });
    } catch {
      setStatusMsg({ type: "err", text: "No se pudo guardar el nuevo orden." });
    } finally {
      setReordering(false);
    }
  };

  const moveProject = async (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= projects.length) return;
    const copy = [...projects];
    const [item] = copy.splice(index, 1);
    copy.splice(target, 0, item);
    await persistProjectOrder(
      copy.map((p, idx) => ({ ...p, sort_order: idx + 1 }))
    );
  };

  const togglePublish = async (proj: ProjectRecord) => {
    const nextVal = !proj.is_published;
    setProjects((prev) =>
      prev.map((p) => (p.id === proj.id ? { ...p, is_published: nextVal } : p))
    );
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("projects")
      .update({ is_published: nextVal })
      .eq("id", proj.id);
    if (!error) {
      await revalidateSite();
      setStatusMsg({
        type: "ok",
        text: nextVal
          ? `"${proj.title}" ahora está visible en la página.`
          : `"${proj.title}" quedó oculto (borrador).`,
      });
    }
  };

  const toggleFeatured = async (proj: ProjectRecord) => {
    const nextVal = !proj.is_featured;
    setProjects((prev) =>
      prev.map((p) => (p.id === proj.id ? { ...p, is_featured: nextVal } : p))
    );
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("projects")
      .update({ is_featured: nextVal })
      .eq("id", proj.id);
    if (!error) {
      await revalidateSite();
      setStatusMsg({
        type: "ok",
        text: nextVal
          ? `"${proj.title}" se mostrará en la portada de Inicio.`
          : `"${proj.title}" quitado de destacados en Inicio.`,
      });
    }
  };

  const handleDeleteProject = async (proj: ProjectRecord) => {
    const supabase = createSupabaseBrowserClient();
    const storagePaths = (proj.images ?? [])
      .map((i) => i.storage_path)
      .filter((p): p is string => Boolean(p));

    if (storagePaths.length > 0) {
      await supabase.storage
        .from("site-media")
        .remove(storagePaths)
        .catch(() => undefined);
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", proj.id);

    if (error) {
      setStatusMsg({
        type: "err",
        text: `Error al eliminar: ${error.message}`,
      });
      return;
    }

    setProjects((prev) => prev.filter((p) => p.id !== proj.id));
    setConfirmDeleteId(null);
    await revalidateSite();
    setStatusMsg({
      type: "ok",
      text: `Proyecto "${proj.title}" eliminado correctamente.`,
    });
  };

  const handlePhotosUploaded = (uploaded: UploadedImageResult[]) => {
    setPhotos((prev) => {
      const additions: EditablePhoto[] = uploaded.map((u, idx) => ({
        image_url: u.url,
        storage_path: u.storagePath,
        caption: "",
        photo_type: "gallery",
        sort_order: prev.length + idx + 1,
      }));
      const next = [...prev, ...additions];
      if (!coverUrl && next[0]) {
        setCoverUrl(next[0].image_url);
      }
      return next;
    });
  };

  const movePhoto = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= photos.length) return;
    setPhotos((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(target, 0, item);
      return copy.map((ph, idx) => ({ ...ph, sort_order: idx + 1 }));
    });
  };

  const removePhoto = async (index: number) => {
    const target = photos[index];
    if (target?.storage_path) {
      const supabase = createSupabaseBrowserClient();
      await supabase.storage
        .from("site-media")
        .remove([target.storage_path])
        .catch(() => undefined);
    }
    setPhotos((prev) => {
      const next = prev
        .filter((_, idx) => idx !== index)
        .map((ph, idx) => ({ ...ph, sort_order: idx + 1 }));
      if (target && coverUrl === target.image_url) {
        setCoverUrl(next[0]?.image_url || "");
      }
      return next;
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMsg({ type: "err", text: "Escribe un título para el proyecto." });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const parsedTags = tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const effectiveCover =
        coverUrl || photos[0]?.image_url || "/img/fotos/hero-corporativo.jpg";

      let projectId = editing?.id;

      if (isNew || !projectId || projectId === "new") {
        const uniqueSlug = `${slugify(title)}-${Date.now().toString().slice(-4)}`;
        const { data: inserted, error: insErr } = await supabase
          .from("projects")
          .insert({
            slug: uniqueSlug,
            title: title.trim(),
            category: category.trim() || "Habilitación Comercial",
            division,
            location: location.trim() || "Santiago",
            year: year.trim() || String(new Date().getFullYear()),
            description: description.trim(),
            tags: parsedTags,
            cover_image_url: effectiveCover,
            is_featured: isFeatured,
            is_published: isPublished,
            sort_order: projects.length + 1,
          })
          .select("*")
          .single();

        if (insErr || !inserted) {
          throw new Error(insErr?.message || "No se pudo crear el proyecto");
        }
        projectId = inserted.id;
      } else {
        const { error: updErr } = await supabase
          .from("projects")
          .update({
            title: title.trim(),
            category: category.trim() || "Habilitación Comercial",
            division,
            location: location.trim() || "Santiago",
            year: year.trim() || String(new Date().getFullYear()),
            description: description.trim(),
            tags: parsedTags,
            cover_image_url: effectiveCover,
            is_featured: isFeatured,
            is_published: isPublished,
          })
          .eq("id", projectId);

        if (updErr) throw new Error(updErr.message);

        // Replace ordered image list cleanly
        await supabase
          .from("project_images")
          .delete()
          .eq("project_id", projectId);
      }

      let finalImages: ProjectImageRecord[] = [];
      if (photos.length > 0) {
        const rows = photos.map((ph, idx) => ({
          project_id: projectId!,
          image_url: ph.image_url,
          storage_path: ph.storage_path,
          caption: ph.caption.trim(),
          photo_type: ph.photo_type,
          sort_order: idx + 1,
        }));

        const { data: imgRows, error: imgErr } = await supabase
          .from("project_images")
          .insert(rows)
          .select("*");

        if (imgErr) throw new Error(imgErr.message);
        finalImages = (imgRows ?? []) as ProjectImageRecord[];
      }

      const { data: refreshed } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId!)
        .single();

      const updatedProject: ProjectRecord = {
        ...(refreshed as ProjectRecord),
        images: finalImages.sort((a, b) => a.sort_order - b.sort_order),
      };

      setProjects((prev) => {
        const exists = prev.some((p) => p.id === updatedProject.id);
        if (exists) {
          return prev.map((p) =>
            p.id === updatedProject.id ? updatedProject : p
          );
        }
        return [...prev, updatedProject];
      });

      await revalidateSite();
      setEditing(null);
      setStatusMsg({
        type: "ok",
        text: `¡Listo! "${updatedProject.title}" quedó guardado y publicado en tu página web.`,
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text:
          err instanceof Error
            ? `No se pudo guardar: ${err.message}`
            : "Ocurrió un error al guardar el proyecto.",
      });
    } finally {
      setSaving(false);
    }
  };

  // ── EDITOR DE PROYECTO ─────────────────────────────────────────────────────
  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-zinc-200 p-5 sm:p-6">
          <div>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="text-sm font-bold text-[#FF5000] hover:underline inline-flex items-center gap-1.5 mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la lista de proyectos</span>
            </button>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F172A]">
              {isNew ? "Agregar Nuevo Proyecto" : `Editando: ${editing.title}`}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSaveProject} className="space-y-6">
          {/* Datos principales */}
          <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-5">
            <h2 className="font-display text-xl font-bold text-[#0F172A] border-b border-zinc-200 pb-3">
              1. Información del Trabajo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Título del Proyecto *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Remodelación completa de cocina en Las Condes"
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0F172A]">
                  ¿A qué área pertenece?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["empresas", "hogar", "siniestros"] as const).map((div) => (
                    <button
                      key={div}
                      type="button"
                      onClick={() => setDivision(div)}
                      className={`py-3 px-2 border text-sm font-bold transition-colors cursor-pointer ${
                        division === div
                          ? "bg-[#FF5000] text-white border-[#FF5000]"
                          : "bg-zinc-50 text-zinc-700 border-zinc-300 hover:border-[#FF5000]"
                      }`}
                    >
                      {DIVISION_LABELS[div]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Tipo o Categoría
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  list="tr-category-suggestions"
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
                />
                <datalist id="tr-category-suggestions">
                  {CATEGORY_SUGGESTIONS.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Comuna o Ciudad
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Providencia"
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Año
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Descripción del Trabajo
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Cuenta brevemente qué se hizo en este proyecto, materiales o plazo..."
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Etiquetas (separadas por coma)
                </label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="Ej. Hogar, Cocina, Electricidad SEC"
                  className="w-full bg-zinc-50 border border-zinc-300 px-4 py-3 text-base focus:outline-none focus:border-[#FF5000]"
                />
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-4 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-5 h-5 accent-[#FF5000]"
                  />
                  <span className="font-bold text-sm text-[#0F172A]">
                    Visible en la página web pública
                  </span>
                </label>

                <label className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-4 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-5 h-5 accent-[#FF5000]"
                  />
                  <span className="font-bold text-sm text-[#0F172A]">
                    Destacar también en la Portada de Inicio
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Gestor Multi-Foto */}
          <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#0F172A]">
                2. Fotos del Proyecto ({photos.length})
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Sube todas las fotos que quieras. Luego puedes elegir cuál es la
                portada, cambiar el orden o marcar si es &quot;Antes&quot; o
                &quot;Después&quot;.
              </p>
            </div>

            <ImageUploader
              folder={`projects/${slugify(title || "proyecto")}`}
              multiple
              label="Toca aquí para subir una o varias fotos desde tu galería"
              onUploaded={handlePhotosUploaded}
            />

            {photos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {photos.map((photo, idx) => {
                  const isCover = coverUrl === photo.image_url;
                  return (
                    <div
                      key={`${photo.image_url}-${idx}`}
                      draggable
                      onDragStart={() => setDragPhotoIdx(idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (dragPhotoIdx === null || dragPhotoIdx === idx) return;
                        setPhotos((prev) => {
                          const copy = [...prev];
                          const [item] = copy.splice(dragPhotoIdx, 1);
                          copy.splice(idx, 0, item);
                          return copy.map((ph, i) => ({
                            ...ph,
                            sort_order: i + 1,
                          }));
                        });
                        setDragPhotoIdx(null);
                      }}
                      className={`border-2 p-3 bg-zinc-50 flex flex-col justify-between gap-3 ${
                        isCover ? "border-[#FF5000]" : "border-zinc-200"
                      }`}
                    >
                      <div className="relative h-44 bg-zinc-200 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.image_url}
                          alt={photo.caption || `Foto ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-black/75 text-white text-xs font-mono px-2.5 py-1">
                          #{idx + 1}
                        </span>
                        {isCover && (
                          <span className="absolute top-2 right-2 bg-[#FF5000] text-white text-xs font-bold px-2.5 py-1 inline-flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-white" />
                            <span>Portada</span>
                          </span>
                        )}
                      </div>

                      {/* Selector Normal / Antes / Después */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {(
                          [
                            { id: "gallery", label: "Normal" },
                            { id: "before", label: "ANTES" },
                            { id: "after", label: "DESPUÉS" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setPhotos((prev) =>
                                prev.map((p, i) =>
                                  i === idx ? { ...p, photo_type: opt.id } : p
                                )
                              )
                            }
                            className={`py-2 text-xs font-bold border cursor-pointer ${
                              photo.photo_type === opt.id
                                ? "bg-[#0F172A] text-white border-[#0F172A]"
                                : "bg-white text-zinc-700 border-zinc-200"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>

                      {/* Descripción */}
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) =>
                          setPhotos((prev) =>
                            prev.map((p, i) =>
                              i === idx ? { ...p, caption: e.target.value } : p
                            )
                          )
                        }
                        placeholder="Comentario corto de esta foto (opcional)"
                        className="w-full bg-white border border-zinc-200 px-3 py-2 text-sm"
                      />

                      {/* Controles de orden, portada y borrado */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => movePhoto(idx, -1)}
                            disabled={idx === 0}
                            className="p-2 bg-white border border-zinc-300 disabled:opacity-35 cursor-pointer"
                            title="Mover antes"
                            aria-label="Mover foto antes"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => movePhoto(idx, 1)}
                            disabled={idx === photos.length - 1}
                            className="p-2 bg-white border border-zinc-300 disabled:opacity-35 cursor-pointer"
                            title="Mover después"
                            aria-label="Mover foto después"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                        {!isCover && (
                          <button
                            type="button"
                            onClick={() => setCoverUrl(photo.image_url)}
                            className="px-2.5 py-2 bg-white border border-zinc-300 hover:border-[#FF5000] text-xs font-bold text-[#0F172A] cursor-pointer"
                          >
                            Usar Portada
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="p-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Quitar foto"
                          aria-label="Quitar foto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {statusMsg && (
            <div
              className={`p-4 border text-sm font-semibold ${
                statusMsg.type === "ok"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          {/* Barra fija inferior de guardado */}
          <div className="sticky bottom-16 lg:bottom-4 z-20 bg-white border-2 border-zinc-300 p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="w-full sm:w-auto px-6 py-3.5 border border-zinc-300 text-zinc-700 font-bold text-sm cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto min-w-[240px] bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold text-base px-8 py-4 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {saving && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>
                {saving
                  ? "Guardando y publicando..."
                  : "Guardar Proyecto y Publicar"}
              </span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── LISTADO DE PROYECTOS ───────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5000] mb-1">
            Portafolio de Obras
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F172A]">
            Proyectos y Galería de Fotos
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base mt-1">
            Agrega trabajos nuevos, sube fotos o cambia el orden con las flechas{" "}
            <strong>↑ / ↓</strong> (o arrastrando).
          </p>
        </div>

        <button
          type="button"
          onClick={openNewProject}
          className="min-h-[52px] bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold text-base px-6 py-3.5 inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Nuevo Proyecto</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-4 border text-sm sm:text-base font-semibold flex items-center gap-2 ${
            statusMsg.type === "ok"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {reordering && (
        <div className="text-sm font-semibold text-[#FF5000] flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Guardando nuevo orden...</span>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((proj, idx) => {
          const photoCount = proj.images?.length || (proj.cover_image_url ? 1 : 0);
          return (
            <div
              key={proj.id}
              draggable
              onDragStart={() => setDragProjIdx(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragProjIdx === null || dragProjIdx === idx) return;
                const copy = [...projects];
                const [item] = copy.splice(dragProjIdx, 1);
                copy.splice(idx, 0, item);
                setDragProjIdx(null);
                persistProjectOrder(
                  copy.map((p, i) => ({ ...p, sort_order: i + 1 }))
                );
              }}
              className={`bg-white border-2 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors ${
                proj.is_published ? "border-zinc-200" : "border-amber-200 bg-amber-50/30"
              }`}
            >
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                <div className="hidden sm:flex items-center text-zinc-400 cursor-grab">
                  <GripVertical className="w-5 h-5" />
                </div>

                <div className="relative w-24 h-20 sm:w-28 sm:h-20 bg-zinc-100 border border-zinc-200 shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proj.cover_image_url || "/img/fotos/hero-corporativo.jpg"}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 bg-black/75 text-white text-[10px] font-mono px-1.5 py-0.5">
                    #{idx + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 bg-zinc-100 text-zinc-700">
                      {DIVISION_LABELS[proj.division]}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {proj.location} · {photoCount}{" "}
                      {photoCount === 1 ? "foto" : "fotos"}
                    </span>
                    {proj.is_featured && (
                      <span className="text-xs font-bold px-2 py-0.5 bg-orange-100 text-[#FF5000]">
                        ⭐ Destacado
                      </span>
                    )}
                    {!proj.is_published && (
                      <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800">
                        Oculto (Borrador)
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#0F172A] truncate">
                    {proj.title}
                  </h2>
                  <p className="text-sm text-zinc-600 line-clamp-1">
                    {proj.category}
                  </p>
                </div>
              </div>

              {/* Botones grandes de acción */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 mr-1">
                  <button
                    type="button"
                    onClick={() => moveProject(idx, -1)}
                    disabled={idx === 0 || reordering}
                    className="min-h-[44px] px-3 bg-zinc-50 border border-zinc-300 hover:border-[#FF5000] disabled:opacity-35 inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                    title="Subir en la lista"
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span className="hidden sm:inline">Subir</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveProject(idx, 1)}
                    disabled={idx === projects.length - 1 || reordering}
                    className="min-h-[44px] px-3 bg-zinc-50 border border-zinc-300 hover:border-[#FF5000] disabled:opacity-35 inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                    title="Bajar en la lista"
                  >
                    <ArrowDown className="w-4 h-4" />
                    <span className="hidden sm:inline">Bajar</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFeatured(proj)}
                  className={`min-h-[44px] px-3 border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                    proj.is_featured
                      ? "bg-orange-50 border-[#FF5000] text-[#FF5000]"
                      : "bg-white border-zinc-300 text-zinc-600"
                  }`}
                  title="Mostrar en Inicio"
                >
                  <Star
                    className={`w-4 h-4 ${proj.is_featured ? "fill-[#FF5000]" : ""}`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => togglePublish(proj)}
                  className={`min-h-[44px] px-3.5 border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                    proj.is_published
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : "bg-amber-50 border-amber-300 text-amber-800"
                  }`}
                >
                  {proj.is_published ? (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Oculto</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => openEditProject(proj)}
                  className="min-h-[44px] px-4 bg-[#0F172A] hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Editar / Fotos</span>
                </button>

                {confirmDeleteId === proj.id ? (
                  <div className="flex items-center gap-1.5 bg-red-50 border border-red-300 p-1">
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj)}
                      className="px-3 py-2 bg-red-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Sí, borrar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-3 py-2 bg-white border border-zinc-300 text-xs font-bold cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(proj.id)}
                    className="min-h-[44px] px-3 bg-white border border-red-200 hover:bg-red-50 text-red-600 inline-flex items-center cursor-pointer"
                    title="Borrar proyecto"
                    aria-label={`Borrar ${proj.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
