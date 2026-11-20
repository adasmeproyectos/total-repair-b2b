"use client";

import { useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export interface UploadedImageResult {
  url: string;
  storagePath: string;
}

async function compressImageToWebp(file: File): Promise<Blob> {
  if (file.type === "image/png" && file.size < 450 * 1024) {
    // Keep small transparent PNGs (like company/client logos) intact
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const maxDim = 1800;
  let { width, height } = bitmap;

  if (width > maxDim || height > maxDim) {
    if (width >= height) {
      height = Math.round((height * maxDim) / width);
      width = maxDim;
    } else {
      width = Math.round((width * maxDim) / height);
      height = maxDim;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const isPngLogo = file.type === "image/png";
  const outputType = isPngLogo ? "image/png" : "image/webp";

  return await new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob ?? file);
      },
      outputType,
      0.84
    );
  });
}

interface ImageUploaderProps {
  folder: string;
  multiple?: boolean;
  label?: string;
  helperText?: string;
  onUploaded: (results: UploadedImageResult[]) => void;
  compact?: boolean;
}

export function ImageUploader({
  folder,
  multiple = false,
  label = "Subir fotos desde tu celular o computador",
  helperText = "Las fotos se optimizan solas para que la página cargue rápido.",
  onUploaded,
  compact = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setError(null);
    const files = Array.from(fileList);
    const results: UploadedImageResult[] = [];

    try {
      const supabase = createSupabaseBrowserClient();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgressText(
          files.length > 1
            ? `Subiendo foto ${i + 1} de ${files.length}...`
            : "Optimizando y subiendo imagen..."
        );

        const compressed = await compressImageToWebp(file);
        const ext =
          compressed.type === "image/png"
            ? "png"
            : compressed.type === "image/jpeg"
              ? "jpg"
              : "webp";
        const safeBase = file.name
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 40);
        const storagePath = `${folder}/${Date.now()}-${i}-${safeBase || "foto"}.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from("site-media")
          .upload(storagePath, compressed, {
            contentType: compressed.type || "image/webp",
            upsert: false,
          });

        if (uploadErr) {
          throw new Error(uploadErr.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("site-media")
          .getPublicUrl(storagePath);

        results.push({
          url: publicUrlData.publicUrl,
          storagePath,
        });
      }

      if (results.length > 0) {
        onUploaded(results);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? `No se pudo subir la foto: ${err.message}`
          : "No se pudo subir la foto. Intenta nuevamente."
      );
    } finally {
      setUploading(false);
      setProgressText("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={`w-full border-2 border-dashed border-zinc-300 hover:border-[#FF5000] bg-zinc-50 hover:bg-orange-50/40 transition-colors flex flex-col items-center justify-center text-center cursor-pointer disabled:opacity-60 ${
          compact ? "px-4 py-3.5" : "px-6 py-7"
        }`}
      >
        {uploading ? (
          <div className="flex items-center gap-3 text-[#FF5000] font-bold text-base">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>{progressText}</span>
          </div>
        ) : (
          <>
            <UploadCloud
              className={`text-[#FF5000] ${compact ? "w-5 h-5 mb-1" : "w-9 h-9 mb-2"}`}
            />
            <span className="font-bold text-[#0F172A] text-sm sm:text-base">
              {label}
            </span>
            {!compact && (
              <span className="text-xs sm:text-sm text-zinc-600 mt-1">
                {helperText}
              </span>
            )}
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
