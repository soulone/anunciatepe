"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, Wrench as WrenchIcon } from "lucide-react";
import { DataList } from "@/components/admin/data-list";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

const TOOL_TYPES = [
  { value: "calculator", label: "🧮 Calculadora" },
  { value: "wizard", label: "📝 Wizard" },
  { value: "quiz", label: "❓ Quiz" },
  { value: "game", label: "🎮 Juego" },
  { value: "app", label: "📱 App" },
];

export default function AdminTools() {
  const router = useRouter();
  const supabase = createClient();
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadTools();
  }, []);

  async function loadTools() {
    setLoading(true);
    const { data } = await supabase.from("tools").select("*").order("created_at", { ascending: false });
    if (data) setTools(data);
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await supabase.from("tools").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    loadTools();
  }

  const columns = [
    { key: "title", label: "Nombre", render: (v: any, item: any) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F26A2E]/10">
          <WrenchIcon className="h-4 w-4 text-[#F26A2E]" />
        </div>
        <div>
          <p className="font-medium text-white">{item.title}</p>
          <p className="text-xs text-[#909296]">{item.description?.slice(0, 60)}</p>
        </div>
      </div>
    )},
    { key: "type", label: "Tipo", render: (v: string) => (
      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-[#909296]">{v}</span>
    )},
    { key: "color_theme", label: "Color", render: (v: string) => (
      <span className={`inline-block h-5 w-5 rounded-full ${
        v === "amber" || v === "orange" ? "bg-[#F26A2E]" :
        v === "morado" ? "bg-[#C8B6E2]" :
        v === "coral" ? "bg-[#F09BB8]" :
        v === "cyan" ? "bg-[#C4E27A]" : "bg-[#C8E6C9]"
      }`} />
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🧰 Herramientas</h1>
        <p className="text-sm text-[#909296]">Gestiona las herramientas interactivas</p>
      </div>

      <DataList
        columns={columns}
        data={tools}
        searchKeys={["title", "description"]}
        filterOptions={TOOL_TYPES.map(t => ({ label: t.label, value: t.value }))}
        filterKey="type"
        onNew={() => router.push("/admin/tools/new")}
        onEdit={(item) => router.push(`/admin/tools/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item)}
        emptyMessage="No hay herramientas todavía. ¡Crea la primera!"
        loading={loading}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="¿Eliminar herramienta?"
        message={`¿Estás seguro de eliminar "${deleteTarget?.title}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
}
