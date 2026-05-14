"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Edit, ToggleLeft, ToggleRight } from "lucide-react";

export default function AdminPlans() {
  const supabase = createClient();
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    loadPlans();
  }, []);

  async function loadPlans() {
    const { data } = await supabase.from("products").select("*").order("sort_order");
    if (data) setPlans(data);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("products").update({ is_active: !current }).eq("id", id);
    loadPlans();
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Planes</h1>
          <p className="text-sm text-[#A8AAAE]">Suscripciones y pase de contenido</p>
        </div>
        <Link
          href="/admin/plans/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F5C53D] px-5 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
        >
          <Plus className="h-4 w-4" /> Nuevo plan
        </Link>
      </div>

      <div className="space-y-2">
        {plans.map((plan) => (
          <div key={plan.id} className="card-dark flex items-center gap-4 rounded-[16px] p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-white">{plan.name}</p>
                {plan.is_active ? (
                  <span className="rounded-full bg-[#C4E27A]/20 px-2 py-0.5 text-[10px] font-medium text-[#C4E27A]">Activo</span>
                ) : (
                  <span className="rounded-full bg-[#A8AAAE]/20 px-2 py-0.5 text-[10px] font-medium text-[#A8AAAE]">Inactivo</span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-[#A8AAAE]">
                S/ {plan.price}/mes · {plan.type} · {plan.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleActive(plan.id, plan.is_active)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:bg-white/10"
              >
                {plan.is_active ? <ToggleRight className="h-5 w-5 text-[#C4E27A]" /> : <ToggleLeft className="h-5 w-5" />}
              </button>
              <Link
                href={`/admin/plans/${plan.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white"
              >
                <Edit className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
        {plans.length === 0 && <p className="py-8 text-center text-sm text-[#A8AAAE]">No hay planes aún.</p>}
      </div>
    </>
  );
}
