"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Radio } from "lucide-react";
import { DataList } from "@/components/admin/data-list";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

export default function AdminLives() {
  const router = useRouter();
  const supabase = createClient();
  const [lives, setLives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { loadLives(); }, []);

  async function loadLives() {
    setLoading(true);
    const { data } = await supabase.from("lives").select("*").order("scheduled_at", { ascending: false });
    if (data) setLives(data);
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await supabase.from("lives").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    loadLives();
  }

  const columns = [
    { key: "title", label: "Título", render: (v: any, item: any) => (
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${
          item.status === "live" ? "bg-[#F04A8A]/20" : item.status === "scheduled" ? "bg-[#F5C53D]/20" : "bg-white/5"
        }`}>
          <Radio className={`h-4 w-4 ${
            item.status === "live" ? "text-[#F04A8A] animate-pulse" : item.status === "scheduled" ? "text-[#F5C53D]" : "text-[#909296]"
          }`} />
        </div>
        <div>
          <p className="font-medium text-white">{item.title}</p>
          <p className="text-xs text-[#909296]">{item.description?.slice(0, 60)}</p>
        </div>
      </div>
    )},
    { key: "status", label: "Estado", render: (v: string) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
        v === "live" ? "bg-[#F04A8A]/20 text-[#F04A8A]" :
        v === "scheduled" ? "bg-[#F5C53D]/20 text-[#F5C53D]" :
        v === "finished" ? "bg-[#909296]/20 text-[#909296]" : "bg-red-500/20 text-red-400"
      }`}>{v}</span>
    )},
    { key: "scheduled_at", label: "Fecha", render: (v: string) => (
      <span className="text-xs text-[#909296]">
        {v ? new Date(v).toLocaleDateString("es-PE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
      </span>
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🔴 Lives</h1>
        <p className="text-sm text-[#909296]">Programa y gestiona eventos en vivo</p>
      </div>

      <DataList
        columns={columns}
        data={lives}
        searchKeys={["title", "description"]}
        filterOptions={[
          { label: "🔴 En vivo", value: "live" },
          { label: "📅 Programado", value: "scheduled" },
          { label: "✅ Finalizado", value: "finished" },
        ]}
        filterKey="status"
        onNew={() => router.push("/admin/lives/new")}
        onEdit={(item) => router.push(`/admin/lives/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item)}
        emptyMessage="No hay lives todavía. ¡Programa el primero!"
        loading={loading}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="¿Eliminar live?"
        message={`¿Estás seguro de eliminar "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
}
