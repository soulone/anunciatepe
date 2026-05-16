"use client";

import { useRef, useState } from "react";
import { Upload, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadMediaAction, deleteMediaAction } from "@/lib/media-upload";

interface ImageUploadProps {
  currentUrl?: string | null;
  folder: "courses" | "lives" | "readings" | "tools";
  onUpload: (url: string) => void;
  onDelete: () => void;
  aspectRatio?: "16:9" | "3:2" | "1:1";
  label?: string;
  className?: string;
}

const aspectClasses = {
  "16:9": "aspect-video",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
};

export function ImageUpload({
  currentUrl,
  folder,
  onUpload,
  onDelete,
  aspectRatio = "16:9",
  label = "Imagen",
  className = "",
}: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) { alert("Formato no soportado. Usa PNG, JPG o WebP."); return; }
    if (file.size > 500 * 1024) { alert("La imagen no debe superar 500KB."); return; }

    setUploading(true);
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string)?.split(",")[1] ?? "";
      const result = await uploadMediaAction(base64, file.name, file.type, folder);
      if (result.error) { alert(result.error); setPreview(currentUrl ?? null); }
      else if (result.url) { onUpload(result.url); setPreview(result.url); }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }

  async function handleDelete() {
    if (currentUrl) await deleteMediaAction(currentUrl);
    setPreview(null);
    onDelete();
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="mb-1 block text-xs text-[#909296]">{label}</label>
      <div
        className={`relative overflow-hidden rounded-[16px] border-2 border-dashed transition-colors ${
          preview ? "border-transparent" : "border-white/10 hover:border-[#F26A2E]/30"
        } ${aspectClasses[aspectRatio]} bg-[#141416]`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#909296]">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs">{label}</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp"
          onChange={handleFile} className="hidden" />
        <button type="button" onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#F26A2E] px-4 text-xs font-bold text-white transition-colors hover:bg-[#F26A2E]/90 disabled:opacity-50 active:scale-[0.97]">
          <Upload className="h-3.5 w-3.5" />
          {uploading ? "Subiendo..." : "Subir imagen"}
        </button>
        {preview && (
          <button type="button" onClick={handleDelete}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-4 text-xs font-medium text-[#909296] transition-colors hover:bg-red-500/10 hover:text-red-400 active:scale-[0.97]">
            <Trash2 className="h-3.5 w-3.5" /> Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
