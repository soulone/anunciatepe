"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Film, ExternalLink } from "lucide-react";
import { DataList } from "@/components/admin/data-list";

export default function AdminRecordings() {
  const router = useRouter();
  const supabase = createClient();
  const [recordings, setRecordings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadRecordings(); }, []);

  async function loadRecordings() {
    setLoading(true);
    const { data } = await supabase.from("recordings").select("*").order("published_at", { ascending: false });
    if (data) setRecordings(data);
    setLoading(false);
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from("recordings").update({ is_published: !current }).eq("id", id);
    loadRecordings();
  }

  const columns = [
    { key: "title", label: "Título", render: (v: any, item: any) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F04A8A]/10">
          <Film className="h-4 w-4 text-[#F04A8A]" />
        </div>
        <div>
          <p className="font-medium text-white">{item.title}</p>
          <p className="text-xs text-[#909296]">{item.duration} min · {item.views ?? 0} vistas</p>
        </div>
      </div>
    )},
    { key: "published_at", label: "Fecha", render: (v: string) => (
      <span className="text-xs text-[#909296]">
        {v ? new Date(v).toLocaleDateString("es-PE") : "—"}
      </span>
    )},
    { key: "is_published", label: "Publicado", render: (v: boolean, item: any) => (
      <button onClick={() => togglePublish(item.id, v)}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
          v ? "bg-[#C4E27A]/20 text-[#C4E27A] hover:bg-[#C4E27A]/30" : "bg-[#909296]/20 text-[#909296] hover:bg-[#909296]/30"
        }`}>
        {v ? "✅ Sí" : "❌ No"}
      </button>
    )},
    { key: "live_id", label: "Live", render: (v: string) => v ? (
      <a href={`/lives/${v}`} target="_blank" className="inline-flex items-center gap-1 text-xs text-[#F26A2E] hover:underline">
        Ver <ExternalLink className="h-3 w-3" />
      </a>
    ) : "—"},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🎬 Grabaciones</h1>
        <p className="text-sm text-[#909296]">Gestiona las grabaciones de lives pasados</p>
      </div>

      <DataList
        columns={columns}
        data={recordings}
        searchKeys={["title", "description"]}
        emptyMessage="No hay grabaciones todavía."
        loading={loading}
      />
    </>
  );
}
