"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import Link from "next/link";

export default function AdminCourseForm() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Finanzas");
  const [level, setLevel] = useState("beginner");
  const [price, setPrice] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [chapters, setChapters] = useState<{ title: string; duration: number; is_free: boolean }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      supabase.from("courses").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setDescription(data.description ?? "");
          setCategory(data.category ?? "Finanzas");
          setLevel(data.level ?? "beginner");
          setPrice(data.price ?? 0);
          setIsPublished(data.is_published);
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
      category,
      level,
      price,
      is_published: isPublished,
    };

    if (isNew) {
      const { error } = await supabase.from("courses").insert(payload);
      if (!error) router.push("/admin/courses");
    } else {
      const { error } = await supabase.from("courses").update(payload).eq("id", id);
      if (!error) router.push("/admin/courses");
    }
    setSaving(false);
  }

  async function addChapter() {
    if (isNew) {
      setChapters([...chapters, { title: "", duration: 0, is_free: false }]);
      return;
    }
    await supabase.from("chapters").insert({
      course_id: id,
      title: "Nuevo capítulo",
      duration: 0,
      order_index: chapters.length + 1,
      is_free: false,
    });
    const { data } = await supabase.from("chapters").select("*").eq("course_id", id).order("order_index");
    if (data) setChapters(data);
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/courses"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? "Nuevo curso" : "Editar curso"}</h1>
          <p className="text-sm text-[#A8AAAE]">{isNew ? "Crea un nuevo curso" : `Editando: ${title}`}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="card-dark rounded-[24px] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Información del curso</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-[#A8AAAE]">Título</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required
                  className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50 placeholder:text-[#A8AAAE]/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#A8AAAE]">Slug</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="se-genera-auto"
                  className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50 placeholder:text-[#A8AAAE]/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#A8AAAE]">Descripción</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                  className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50 placeholder:text-[#A8AAAE]/50 resize-none" />
              </div>
            </div>
          </div>

          <div className="card-dark rounded-[24px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Capítulos</h2>
              <button type="button" onClick={addChapter}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#F5C53D]/10 px-3 text-xs font-medium text-[#F5C53D] transition-colors hover:bg-[#F5C53D]/20">
                <Plus className="h-3.5 w-3.5" /> Agregar
              </button>
            </div>
            <div className="space-y-2">
              {chapters.map((ch, i) => (
                <div key={i} className="flex items-center gap-3 rounded-[12px] bg-white/5 p-3">
                  <GripVertical className="h-4 w-4 text-[#A8AAAE]/50" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{ch.title || "Nuevo capítulo"}</p>
                    <p className="text-xs text-[#A8AAAE]">{ch.duration ? `${ch.duration} min` : "Sin duración"}</p>
                  </div>
                  <span className={`text-xs ${ch.is_free ? "text-[#C4E27A]" : "text-[#A8AAAE]"}`}>
                    {ch.is_free ? "Gratis" : "Premium"}
                  </span>
                </div>
              ))}
              {chapters.length === 0 && (
                <p className="text-center text-xs text-[#A8AAAE] py-4">Sin capítulos todavía</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-dark rounded-[24px] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Configuración</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-[#A8AAAE]">Categoría</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50">
                  <option value="Finanzas">Finanzas</option>
                  <option value="Emprendimiento">Emprendimiento</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Negocios">Negocios</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#A8AAAE]">Nivel</label>
                <select value={level} onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50">
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#A8AAAE]">Precio (S/)</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} min={0}
                  className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50" />
              </div>
              <label className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-[#A8AAAE]/30 bg-transparent text-[#F5C53D]" />
                <span className="text-sm text-white">Publicado</span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={saving}
            className="w-full rounded-full bg-[#F26A2E] py-3 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 disabled:opacity-50">
            {saving ? "Guardando..." : isNew ? "Crear curso" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </>
  );
}
