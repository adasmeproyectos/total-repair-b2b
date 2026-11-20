"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, MapPin, X } from "lucide-react";
import type { ProjectDivision, ProjectRecord } from "@/lib/types/cms";

interface ProjectsGalleryProps {
  projects: ProjectRecord[];
}

const FILTERS: Array<{ id: "all" | ProjectDivision; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "empresas", label: "Empresas B2B" },
  { id: "hogar", label: "Hogar" },
  { id: "siniestros", label: "Siniestros 24/7" },
];

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [filter, setFilter] = useState<"all" | ProjectDivision>("all");
  const [activeProject, setActiveProject] = useState<ProjectRecord | null>(
    null
  );
  const [photoIndex, setPhotoIndex] = useState(0);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.division === filter);

  const activePhotos = activeProject
    ? activeProject.images && activeProject.images.length > 0
      ? activeProject.images
      : [
          {
            id: "cover",
            project_id: activeProject.id,
            image_url: activeProject.cover_image_url,
            storage_path: null,
            caption: activeProject.title,
            photo_type: "gallery" as const,
            sort_order: 1,
          },
        ]
    : [];

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
      if (e.key === "ArrowRight") {
        setPhotoIndex((prev) =>
          activePhotos.length > 0 ? (prev + 1) % activePhotos.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setPhotoIndex((prev) =>
          activePhotos.length > 0
            ? (prev - 1 + activePhotos.length) % activePhotos.length
            : 0
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject, activePhotos.length]);

  const openModal = (project: ProjectRecord) => {
    setActiveProject(project);
    setPhotoIndex(0);
  };

  return (
    <>
      {/* Filtros por División */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {FILTERS.map((item) => {
          const isActive = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              style={{
                borderRadius: "var(--tr-btn-radius, 2px)",
                backgroundColor: isActive
                  ? "var(--color-brand-orange, #FF5000)"
                  : "var(--color-surface-cream, #F8FAFC)",
                color: isActive ? "#FFFFFF" : "var(--color-ink-anthracite, #0F172A)",
                borderColor: isActive
                  ? "var(--color-brand-orange, #FF5000)"
                  : "var(--color-divider, #E4E4E7)",
              }}
              className="px-5 py-2.5 border text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Grilla de Proyectos */}
      {filtered.length === 0 ? (
        <div
          style={{ backgroundColor: "var(--color-surface-cream, #F8FAFC)" }}
          className="tr-card p-12 text-center text-zinc-600"
        >
          No hay proyectos publicados en esta categoría por el momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 tr-grid">
          {filtered.map((p, index) => {
            const photoCount =
              p.images && p.images.length > 0 ? p.images.length : 1;
            const orderLabel = String(index + 1).padStart(2, "0");

            return (
              <article
                key={p.id}
                onClick={() => openModal(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(p);
                  }
                }}
                style={{
                  backgroundColor: "var(--color-surface-cream, #F8FAFC)",
                }}
                className="group tr-card overflow-hidden hover:border-[#FF5000] transition-all duration-200 flex flex-col justify-between cursor-pointer text-left"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-zinc-100 tr-divider-b">
                    <Image
                      src={p.cover_image_url || "/img/fotos/hero-corporativo.jpg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover origin-top-left scale-[1.08] group-hover:scale-[1.12] transition-transform duration-300"
                    />

                    <span
                      style={{
                        color: "var(--color-ink-anthracite, #0F172A)",
                        borderRadius: "var(--tr-btn-radius, 2px)",
                      }}
                      className="absolute top-4 left-4 bg-white/95 font-mono font-bold text-xs px-3 py-1 tracking-widest border border-zinc-200 shadow-2xs"
                    >
                      {orderLabel}
                    </span>

                    <span
                      style={{ borderRadius: "var(--tr-btn-radius, 2px)" }}
                      className="absolute bottom-3 right-3 bg-[#0F172A]/85 text-white font-mono text-[11px] px-2.5 py-1 inline-flex items-center gap-1.5"
                    >
                      <Images className="w-3.5 h-3.5 text-[#FF5000]" />
                      <span>
                        {photoCount} {photoCount === 1 ? "foto" : "fotos"}
                      </span>
                    </span>
                  </div>

                  <div className="tr-card-pad">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <p
                        style={{ color: "var(--color-brand-orange, #FF5000)" }}
                        className="text-xs font-mono font-semibold uppercase tracking-widest"
                      >
                        {p.category}
                      </p>
                      <span className="text-zinc-500 text-xs font-mono flex items-center gap-1 shrink-0">
                        <MapPin
                          style={{ color: "var(--color-brand-orange, #FF5000)" }}
                          className="w-3.5 h-3.5 shrink-0"
                        />
                        {p.location}
                      </span>
                    </div>

                    <h2
                      style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
                      className="font-display text-xl font-bold mb-3 leading-snug group-hover:text-[#FF5000] transition-colors duration-200"
                    >
                      {p.title}
                    </h2>
                    <p
                      style={{ color: "var(--color-ink-mid, #52525B)" }}
                      className="text-sm leading-relaxed font-light mb-2"
                    >
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: "var(--color-surface-white, #FFFFFF)",
                          borderRadius: "var(--tr-btn-radius, 2px)",
                        }}
                        className="border border-zinc-200 text-zinc-700 text-xs font-mono px-3 py-1 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{ color: "var(--color-brand-orange, #FF5000)" }}
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    Ver galería →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Visor Lightbox Multi-foto */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-[#0F172A]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${activeProject.title}`}
          onClick={() => setActiveProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-zinc-200 shadow-2xl flex flex-col"
          >
            {/* Barra superior */}
            <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-zinc-200">
              <div>
                <p className="text-[#FF5000] text-xs font-mono font-bold uppercase tracking-widest mb-1">
                  {activeProject.category} · {activeProject.location}
                  {activeProject.year ? ` (${activeProject.year})` : ""}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#0F172A]">
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-[#0F172A] shrink-0 cursor-pointer"
                aria-label="Cerrar galería"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Imagen principal */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-zinc-900 overflow-hidden">
              {activePhotos[photoIndex] && (
                <Image
                  src={activePhotos[photoIndex].image_url}
                  alt={
                    activePhotos[photoIndex].caption || activeProject.title
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              )}

              {activePhotos[photoIndex]?.photo_type !== "gallery" && (
                <span
                  className={`absolute top-4 left-4 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest shadow ${
                    activePhotos[photoIndex]?.photo_type === "before"
                      ? "bg-amber-500 text-white"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {activePhotos[photoIndex]?.photo_type === "before"
                    ? "ANTES"
                    : "DESPUÉS"}
                </span>
              )}

              {activePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPhotoIndex(
                        (prev) =>
                          (prev - 1 + activePhotos.length) % activePhotos.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-[#0F172A] flex items-center justify-center shadow-lg cursor-pointer"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPhotoIndex((prev) => (prev + 1) % activePhotos.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-[#0F172A] flex items-center justify-center shadow-lg cursor-pointer"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}

              <span className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-mono px-3 py-1">
                {photoIndex + 1} / {activePhotos.length}
              </span>
            </div>

            {/* Descripción + Miniaturas */}
            <div className="p-4 sm:p-6 space-y-4">
              {activePhotos[photoIndex]?.caption && (
                <p className="text-sm font-medium text-[#0F172A] bg-zinc-50 border-l-4 border-[#FF5000] px-4 py-2.5">
                  {activePhotos[photoIndex].caption}
                </p>
              )}

              <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
                {activeProject.description}
              </p>

              {activePhotos.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pt-2 pb-1">
                  {activePhotos.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setPhotoIndex(idx)}
                      className={`relative w-20 h-16 shrink-0 overflow-hidden border-2 cursor-pointer transition-all ${
                        idx === photoIndex
                          ? "border-[#FF5000] ring-2 ring-[#FF5000]/30"
                          : "border-zinc-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.image_url}
                        alt={img.caption || `Foto ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
