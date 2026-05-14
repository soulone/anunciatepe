"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Edit, ExternalLink, Search } from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  is_published: boolean;
}

export default function AdminCourses() {
  const supabase = createClient();
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.from("courses").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setCourses(data);
    });
  }, [supabase]);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cursos</h1>
          <p className="text-sm text-[#A8AAAE]">Gestiona los cursos de Kapitalizando</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F26A2E] px-5 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90"
        >
          <Plus className="h-4 w-4" />
          Nuevo curso
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-[#17181B] px-4 py-2">
        <Search className="h-4 w-4 text-[#A8AAAE]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar cursos..."
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#A8AAAE]/50"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="card-light flex items-center gap-4 p-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-[#101012]">{course.title}</p>
                {course.is_published ? (
                  <span className="rounded-full bg-[#C4E27A]/20 px-2 py-0.5 text-[10px] font-medium text-[#C4E27A]">Publicado</span>
                ) : (
                  <span className="rounded-full bg-[#A8AAAE]/20 px-2 py-0.5 text-[10px] font-medium text-[#A8AAAE]">Borrador</span>
                )}
              </div>
              <p className="text-xs text-[#6B6F72]">
                {course.category} &middot; S/ {course.price} &middot; /{course.slug}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/courses/${course.slug}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B6F72] transition-colors hover:bg-white/10 hover:text-[#101012]"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href={`/admin/courses/${course.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B6F72] transition-colors hover:bg-white/10 hover:text-[#101012]"
              >
                <Edit className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[#A8AAAE]">
            {courses.length === 0 ? "No hay cursos aún. Crea el primero." : "Sin resultados."}
          </p>
        )}
      </div>
    </>
  );
}
