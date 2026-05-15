"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { DataList } from "@/components/admin/data-list";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

const CATEGORIES = [
  "Finanzas básicas", "Crédito", "Inversión", "Negocios", "Ahorro", "Seguridad", "Ruta",
];

export default function AdminReadings() {
  const router = useRouter();
  const supabase = createClient();
  const [readings, setReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { loadReadings(); }, []);

  async function loadReadings() {
    setLoading(true);
    const { data } = await supabase.from("readings").select("*").order("created_at", { ascending: false });
    if (data) setReadings(data);
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await supabase.from("readings").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    loadReadings();
  }

  const columns = [
    { key: "title", label: "Título", render: (v: any, item: any) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F26A2E]/10">
          <BookOpen className="h-4 w-4 text-[#F26A2E]" />
        </div>
        <div>
          <p className="font-medium text-white">{item.title}</p>
          <p className="text-xs text-[#909296]">Por {item.author} · {item.duration_min} min</p>
        </div>
      </div>
    )},
    { key: "category", label: "Categoría", render: (v: string) => (
      <span className="rounded-full bg-[#F26A2E]/10 px-2.5 py-0.5 text-xs text-[#F26A2E]">{v}</span>
    )},
    { key: "is_published", label: "Estado", render: (v: boolean) => (
      <span className={`text-xs ${v ? "text-[#C4E27A]" : "text-[#909296]"}`}>{v ? "✅ Publicado" : "📝 Borrador"}</span>
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">📖 Lecturas</h1>
        <p className="text-sm text-[#909296]">Gestiona los artículos y guías</p>
      </div>

      <DataList
        columns={columns}
        data={readings}
        searchKeys={["title", "author"]}
        filterOptions={CATEGORIES.map(c => ({ label: c, value: c }))}
        filterKey="category"
        onNew={() => router.push("/admin/readings/new")}
        onEdit={(item) => router.push(`/admin/readings/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item)}
        emptyMessage="No hay lecturas todavía. ¡Escribe la primera!"
        loading={loading}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="¿Eliminar lectura?"
        message={`¿Estás seguro de eliminar "${deleteTarget?.title}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
}
