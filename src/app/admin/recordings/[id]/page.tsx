"use client";

import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle, Film, Play } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

function RecordingFormContent() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const isNew = id === "new";

  const [title, setTitle] = useState(searchParams.get("title") ?? "");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [views, setViews] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [liveId, setLiveId] = useState(searchParams.get("liveId") ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isNew) {
      supabase.from("recordings").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setDescription(data.description ?? "");
          setVideoUrl(data.video_url ?? "");
          setDuration(data.duration ?? 0);
          setViews(data.views ?? 0);
          setIsPublished(data.is_published ?? false);
          setLiveId(data.live_id ?? "");
        }
      });
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      description: description || null,
      video_url: videoUrl || null,
      duration,
      views,
      is_published: isPublished,
      live_id: liveId || null,
    };

    if (isNew) {
      const { error } = await supabase.from("recordings").insert(payload);
      if (error) { alert(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("recordings").update(payload).eq("id", id);
      if (error) { alert(error.message); setSaving(false); return; }
    }

    setSaving(false);
    setSaved(true);
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C4E27A]/10">
          <CheckCircle className="h-10 w-10 text-[#C4E27A]" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">Grabación guardada</h2>
        <p className="mt-2 text-[#909296]">{title} ya está en la plataforma.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {liveId && (
            <Link href={`/lives/${liveId}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
              <Play className="h-4 w-4" /> Ver grabación
            </Link>
          )}
          <Link href="/admin/recordings" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-colors hover:bg-[#F5C53D]/90 active:scale-[0.97]">
            <Film className="h-4 w-4" /> Ver todas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/recordings" className="flex h-9 w-9 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? "Nueva grabación" : "Editar grabación"}</h1>
          <p className="text-sm text-[#909296]">{isNew ? "Agrega una grabación de un live pasado" : `Editando: ${title}`}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
        <div className="card-dark rounded-[24px] p-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-[#909296]">Título</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Título de la grabación"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F04A8A]/50" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#909296]">Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Descripción de la grabación"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F04A8A]/50 resize-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#909296]">URL del video</label>
            <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://drive.google.com/file/d/... o https://youtube.com/..."
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F04A8A]/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-[#909296]">Duración (min)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min={0} required
                className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F04A8A]/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[#909296]">Vistas</label>
              <input type="number" value={views} onChange={(e) => setViews(Number(e.target.value))} min={0}
                className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F04A8A]/50" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#909296]">Live ID (opcional)</label>
            <input value={liveId} onChange={(e) => setLiveId(e.target.value)} placeholder="ID del live asociado"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F04A8A]/50 text-xs font-mono" />
          </div>
          <label className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 cursor-pointer">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 rounded border-[#909296]/30 bg-transparent text-[#F04A8A]" />
            <span className="text-sm text-white">Publicado</span>
          </label>
        </div>

        <button type="submit" disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F04A8A] py-3 text-sm font-bold text-white transition-colors hover:bg-[#F04A8A]/90 disabled:opacity-50 active:scale-[0.97]">
          <Save className="h-4 w-4" /> {saving ? "Guardando..." : isNew ? "Crear grabación" : "Guardar cambios"}
        </button>
      </form>
    </>
  );
}

export default function AdminRecordingFormPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F5C53D] border-t-transparent" /></div>}>
      <RecordingFormContent />
    </Suspense>
  );
}
