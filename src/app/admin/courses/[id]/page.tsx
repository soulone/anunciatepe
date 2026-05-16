"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Save, CheckCircle } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";

export default function AdminCourseForm() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Finanzas");
  const [level, setLevel] = useState("beginner");
  const [price, setPrice] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [chapters, setChapters] = useState<{ title: string; duration: number; is_free: boolean }[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const totalDuration = chapters.reduce((s, ch) => s + (ch.duration ?? 0), 0);
  const durationStr = totalDuration > 0
    ? `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`
    : "—";

  useEffect(() => {
    if (!isNew) {
      supabase.from("courses").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setDescription(data.description ?? "");
          setExcerpt(data.excerpt ?? "");
          setCategory(data.category ?? "Finanzas");
          setLevel(data.level ?? "beginner");
          setPrice(data.price ?? 0);
          setIsPublished(data.is_published);
          setThumbnailUrl(data.thumbnail_url ?? null);
        }
      });
      supabase.from("chapters").select("*").eq("course_id", id).order("order_index").then(({ data }) => {
        if (data) setChapters(data);
      });
    }
  }, [id, isNew, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description,
      excerpt,
      category,
      level,
      price,
      thumbnail_url: thumbnailUrl,
      is_published: isPublished,
    };

    if (isNew) {
      const { error } = await supabase.from("courses").insert(payload);
      if (!error) setSaved(true);
      else alert(error.message);
    } else {
      const { error } = await supabase.from("courses").update(payload).eq("id", id);
      if (!error) setSaved(true);
      else alert(error.message);
    }
    setSaving(false);
  }

  async function addChapter() {
    const newChapter = { title: "Nuevo capítulo", duration: 0, is_free: false };
    if (isNew) {
      setChapters([...chapters, newChapter]);
      return;
    }
    const { data } = await supabase.from("chapters").insert({
      course_id: id, title: "Nuevo capítulo", duration: 0, order_index: chapters.length + 1, is_free: false,
    }).select().single();
    if (data) setChapters([...chapters, data]);
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="h-12 w-12 text-[#C4E27A]" />
        <h2 className="mt-4 text-xl font-bold text-white">Curso guardado</h2>
        <div className="mt-6 flex gap-4">
          <Link href="/admin/courses" className="rounded-full bg-[#F5C53D] px-6 py-2.5 text-sm font-bold text-[#0E0E10]">Volver a cursos</Link>
          {!isNew && <Link href={`/courses/${slug}`} className="rounded-full bg-white/10 px-6 py-2.5 text-sm text-white">Ver en frontend</Link>}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/courses" className="flex h-9 w-9 items-center justify-center rounded-xl text-[#909296] hover:bg-white/10 hover:text-white"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? "Nuevo curso" : "Editar curso"}</h1>
          <p className="text-sm text-[#909296]">{isNew ? "Crea un nuevo curso" : `Editando: ${title}`}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="card-dark rounded-[24px] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Información del curso</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-[#909296]">Título</label>
                <input value={title} onChange={(e) => { setTitle(e.target.value); if (!slug || isNew) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")); }} required
                  className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#909296]">Slug</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)}
                  className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30 font-mono text-xs" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#909296]">Descripción completa</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                  className="w-full rounded-[12px] bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 resize-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#909296]">Extracto (para listas, opcional)</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} maxLength={150}
                  className="w-full rounded-[12px] bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 resize-none" />
                <p className="mt-1 text-xs text-[#909296]/60">{excerpt.length}/150 caracteres</p>
              </div>
            </div>
          </div>

          <div className="card-dark rounded-[24px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Capítulos</h2>
                <p className="text-xs text-[#909296]">{chapters.length} capítulos · {durationStr} total</p>
              </div>
              <button type="button" onClick={addChapter}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#F5C53D]/10 px-3 text-xs font-medium text-[#F5C53D] transition-colors hover:bg-[#F5C53D]/20">
                <Plus className="h-3.5 w-3.5" /> Agregar
              </button>
            </div>
            <div className="space-y-2">
              {chapters.map((ch, i) => (
                <div key={i} className="flex items-center gap-3 rounded-[12px] bg-white/5 p-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs text-[#909296]">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <input value={ch.title} onChange={(e) => {
                      const copy = [...chapters]; copy[i] = { ...copy[i], title: e.target.value }; setChapters(copy);
                    }} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#909296]/50" />
                  </div>
                  <input type="number" value={ch.duration} onChange={(e) => {
                    const copy = [...chapters]; copy[i] = { ...copy[i], duration: Number(e.target.value) }; setChapters(copy);
                  }} className="h-8 w-16 rounded-[8px] bg-white/10 px-2 text-xs text-white outline-none text-center" placeholder="min" />
                  <button type="button" onClick={() => {
                    const copy = [...chapters]; copy[i] = { ...copy[i], is_free: !copy[i].is_free }; setChapters(copy);
                  }} className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${ch.is_free ? "bg-[#C4E27A]/20 text-[#C4E27A]" : "bg-white/10 text-[#909296]"}`}>
                    {ch.is_free ? "Gratis" : "Premium"}
                  </button>
                </div>
              ))}
              {chapters.length === 0 && <p className="py-4 text-center text-xs text-[#909296]">Sin capítulos todavía</p>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ImageUpload currentUrl={thumbnailUrl} folder="courses" onUpload={setThumbnailUrl} onDelete={() => setThumbnailUrl(null)} aspectRatio="16:9" label="Portada del curso" />

          <div className="card-dark rounded-[24px] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Configuración</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-[#909296]">Categoría</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50">
                  <option value="Finanzas">Finanzas</option>
                  <option value="Emprendimiento">Emprendimiento</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Negocios">Negocios</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#909296]">Nivel</label>
                <select value={level} onChange={(e) => setLevel(e.target.value)}
                  className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50">
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#909296]">Precio (S/)</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} min={0}
                  className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
              </div>
              <label className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-transparent text-[#F26A2E]" />
                <span className="text-sm text-white">Publicado</span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#F26A2E]/90 disabled:opacity-50 active:scale-[0.97]">
            <Save className="h-4 w-4" /> {saving ? "Guardando..." : isNew ? "Crear curso" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </>
  );
}
