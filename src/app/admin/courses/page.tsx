"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Edit, ExternalLink, BookOpen, Clock, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

export default function AdminCourses() {
  const supabase = createClient();
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { loadCourses(); }, [supabase]);

  async function loadCourses() {
    setLoading(true);
    const { data } = await supabase.from("courses").select("*, chapters!left(duration)").order("created_at", { ascending: false });
    if (data) {
      const withDuration = data.map((c: any) => {
        const totalMin = (c.chapters ?? []).reduce((s: number, ch: any) => s + (ch.duration ?? 0), 0);
        return { ...c, total_duration: totalMin };
      });
      setCourses(withDuration);
    }
    setLoading(false);
  }

  async function deleteHandler() {
    if (!deleteTarget) return;
    setDeleting(true);
    await supabase.from("chapters").delete().eq("course_id", deleteTarget.id);
    await supabase.from("courses").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    loadCourses();
  }

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cursos</h1>
          <p className="text-sm text-[#909296]">Gestiona los cursos de Kapitalizando</p>
        </div>
        <Link href="/admin/courses/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F26A2E] px-5 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 active:scale-[0.97]">
          <Plus className="h-4 w-4" /> Nuevo curso
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-[#141416] px-4 py-2.5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar cursos..."
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#909296]/30" />
      </div>

      <div className="space-y-2">
        {filtered.map((course) => {
          const totalMin = course.total_duration ?? 0;
          const durStr = totalMin > 0 ? `${Math.floor(totalMin / 60)}h ${totalMin % 60}m` : "—";

          return (
            <div key={course.id} className="card-dark flex items-center gap-4 rounded-[16px] p-3 transition-all hover:bg-white/5">
              {/* Thumbnail */}
              <div className="h-16 w-28 shrink-0 overflow-hidden rounded-[10px] bg-gradient-to-br from-zinc-800 to-zinc-900">
                {course.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.thumbnail_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BookOpen className="h-5 w-5 text-zinc-600" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-white">{course.title}</p>
                  {course.is_published ? (
                    <span className="shrink-0 rounded-full bg-[#C4E27A]/20 px-2 py-0.5 text-[10px] font-medium text-[#C4E27A]">Publicado</span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-[#909296]/20 px-2 py-0.5 text-[10px] font-medium text-[#909296]">Borrador</span>
                  )}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-[#909296]">
                  <span>{course.category}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {durStr}</span>
                  <span>S/ {course.price}</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Link href={`/courses/${course.slug}`}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-white/10 hover:text-white">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
                <Link href={`/admin/courses/${course.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-white/10 hover:text-white">
                  <Edit className="h-3.5 w-3.5" />
                </Link>
                <button onClick={() => setDeleteTarget(course)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-red-500/10 hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        {loading && <p className="py-8 text-center text-sm text-[#909296]">Cargando...</p>}
        {!loading && filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[#909296]">
            {courses.length === 0 ? "No hay cursos aún. Crea el primero." : "Sin resultados."}
          </p>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar curso"
        message={`¿Estás seguro de eliminar "${deleteTarget?.title}"? Se eliminarán también sus capítulos.`}
        onConfirm={deleteHandler}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
}
