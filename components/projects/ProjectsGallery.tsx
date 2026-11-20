"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
      {/* Filtros arquitectónicos */}
      <div className="flex flex-wrap items-center gap-2 pb-6 mb-10 tr-divider-b">
        {FILTERS.map((item) => {
          const isActive = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              style={{
                borderRadius: "var(--tr-btn-radius, 0px)",
                backgroundColor: isActive
                  ? "var(--color-ink-anthracite, #141413)"
                  : "transparent",
                color: isActive
                  ? "#FFFFFF"
                  : "var(--color-ink-mid, #57534E)",
                borderColor: isActive
                  ? "var(--color-ink-anthracite, #141413)"
                  : "var(--color-divider, #D6D3CD)",
              }}
              className="px-4 py-2 border text-xs font-mono uppercase tracking-wider transition-colors duration-150 cursor-pointer hover:text-[#141413]"
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Grilla Editorial de Obras */}
      {filtered.length === 0 ? (
        <div
          style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
          className="tr-card p-12 text-center text-[#57534E]"
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
                  backgroundColor: "var(--color-surface-cream, #F7F6F2)",
                }}
                className="group tr-card overflow-hidden hover:border-[#E8490F] transition-colors duration-150 flex flex-col justify-between cursor-pointer text-left"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-[#ECEAE3] tr-divider-b">
                    <Image
                      src={p.cover_image_url || "/img/fotos/hero-corporativo.jpg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover origin-top-left scale-[1.08] group-hover:scale-[1.11] transition-transform duration-300"
                    />

                    {photoCount > 1 && (
                      <span className="absolute bottom-3 right-3 bg-[#141413]/90 text-white font-mono text-[11px] px-2.5 py-1">
                        {photoCount} fotos
                      </span>
                    )}
                  </div>

                  <div className="tr-card-pad">
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono">
                      <span
                        style={{ color: "var(--color-brand-orange, #E8490F)" }}
                        className="font-semibold uppercase tracking-wider"
                      >
                        {orderLabel} · {p.category}
                      </span>
                      <span
                        style={{ color: "var(--color-ink-mid, #57534E)" }}
                        className="shrink-0"
                      >
                        {p.location}
                      </span>
                    </div>

                    <h2
                      style={{ color: "var(--color-ink-anthracite, #141413)" }}
                      className="font-display text-xl font-bold mb-2.5 leading-snug group-hover:text-[#E8490F] transition-colors duration-150"
                    >
                      {p.title}
                    </h2>
                    <p
                      style={{ color: "var(--color-ink-mid, #57534E)" }}
                      className="text-sm leading-relaxed"
                    >
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 py-4 tr-divider-t flex items-center justify-between gap-2 text-xs font-mono">
                  <span style={{ color: "var(--color-ink-mid, #57534E)" }}>
                    {p.tags.join(" · ")}
                  </span>
                  <span
                    style={{ color: "var(--color-brand-orange, #E8490F)" }}
                    className="font-semibold uppercase tracking-wider shrink-0"
                  >
                    Ver registro →
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
          className="fixed inset-0 z-50 bg-[#141413]/85 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${activeProject.title}`}
          onClick={() => setActiveProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-[#D6D3CD] flex flex-col"
          >
            {/* Barra superior */}
            <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-[#D6D3CD]">
              <div>
                <p className="text-[#E8490F] text-xs font-mono font-semibold uppercase tracking-widest mb-1">
                  {activeProject.category} · {activeProject.location}
                  {activeProject.year ? ` (${activeProject.year})` : ""}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141413]">
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-2.5 bg-[#F7F6F2] hover:bg-[#ECEAE3] border border-[#D6D3CD] text-[#141413] shrink-0 cursor-pointer"
                aria-label="Cerrar galería"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen principal */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#141413] overflow-hidden">
              {activePhotos[photoIndex] && (
                <Image
                  src={activePhotos[photoIndex].image_url}
                  alt={
                    activePhotos[photoIndex].caption || activeProject.title
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              )}

              {activePhotos[photoIndex]?.photo_type !== "gallery" && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest ${
                    activePhotos[photoIndex]?.photo_type === "before"
                      ? "bg-[#141413] text-white border border-white/25"
                      : "bg-[#E8490F] text-white"
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white hover:bg-[#F7F6F2] text-[#141413] border border-[#D6D3CD] flex items-center justify-center cursor-pointer"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPhotoIndex((prev) => (prev + 1) % activePhotos.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white hover:bg-[#F7F6F2] text-[#141413] border border-[#D6D3CD] flex items-center justify-center cursor-pointer"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <span className="absolute bottom-3 right-3 bg-[#141413]/90 text-white text-xs font-mono px-3 py-1">
                {photoIndex + 1} / {activePhotos.length}
              </span>
            </div>

            {/* Descripción + Miniaturas */}
            <div className="p-4 sm:p-6 space-y-4">
              {activePhotos[photoIndex]?.caption && (
                <p className="text-sm font-medium text-[#141413] bg-[#F7F6F2] border-l-2 border-[#E8490F] px-4 py-2.5">
                  {activePhotos[photoIndex].caption}
                </p>
              )}

              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                {activeProject.description}
              </p>

              {activePhotos.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pt-2 pb-1">
                  {activePhotos.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setPhotoIndex(idx)}
                      className={`relative w-20 h-16 shrink-0 overflow-hidden border-2 cursor-pointer transition-opacity ${
                        idx === photoIndex
                          ? "border-[#E8490F] opacity-100"
                          : "border-[#D6D3CD] opacity-65 hover:opacity-100"
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
