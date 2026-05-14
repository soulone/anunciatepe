"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";

export default function AdminLives() {
  const supabase = createClient();
  const [lives, setLives] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("lives").select("*").order("scheduled_at", { ascending: false }).then(({ data }) => {
      if (data) setLives(data);
    });
  }, [supabase]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Lives</h1>
          <p className="text-sm text-[#A8AAAE]">Programa y gestiona eventos en vivo</p>
        </div>
        <Link
          href="/admin/lives/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F04A8A] px-5 text-sm font-bold text-white transition-colors hover:bg-[#F04A8A]/90"
        >
          <Plus className="h-4 w-4" />
          Nuevo live
        </Link>
      </div>

      <div className="space-y-2">
        {lives.map((live) => (
          <div key={live.id} className="card-dark rounded-[16px] p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{live.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    live.status === "live" ? "bg-[#F04A8A]/20 text-[#F04A8A]" :
                    live.status === "scheduled" ? "bg-[#F5C53D]/20 text-[#F5C53D]" :
                    live.status === "finished" ? "bg-[#A8AAAE]/20 text-[#A8AAAE]" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {live.status === "live" ? "EN VIVO" : live.status === "scheduled" ? "Programado" : live.status === "finished" ? "Finalizado" : "Cancelado"}
                  </span>
                </div>
                <p className="text-xs text-[#A8AAAE] mt-0.5">
                  {new Date(live.scheduled_at).toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                  {" · "}{live.duration} min · {live.preregistered_count} pre-agendados
                </p>
              </div>
              <Link
                href={`/admin/lives/${live.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white"
              >
                <Edit className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
        {lives.length === 0 && (
          <p className="py-8 text-center text-sm text-[#A8AAAE]">No hay lives todavía.</p>
        )}
      </div>
    </>
  );
}
