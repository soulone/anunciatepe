"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminPlanForm() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const isNew = id === "new";

  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("subscription");
  const [interval_, setInterval_] = useState("month");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      supabase.from("products").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setKey(data.key);
          setName(data.name);
          setDescription(data.description ?? "");
          setPrice(data.price);
          setType(data.type);
          setInterval_(data.interval ?? "month");
          setIsActive(data.is_active);
        }
      });
    }
  }, [id, isNew]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = { key, name, description, price, type, interval: interval_, is_active: isActive };

    if (isNew) {
      await supabase.from("products").insert(payload);
    } else {
      await supabase.from("products").update(payload).eq("id", id);
    }
    setSaving(false);
    router.push("/admin/plans");
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/plans" className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? "Nuevo plan" : "Editar plan"}</h1>
          <p className="text-sm text-[#A8AAAE]">{isNew ? "Crea un nuevo plan de suscripción" : `Editando: ${name}`}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
        <div className="card-dark rounded-[24px] p-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-[#A8AAAE]">Key (identificador único)</label>
            <input value={key} onChange={(e) => setKey(e.target.value)} required placeholder="battle_pass"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#A8AAAE]">Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Battle Pass"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#A8AAAE]">Descripción</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Acceso a contenido premium"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-[#A8AAAE]">Precio (S/)</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} min={0} step={0.1} required
                className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[#A8AAAE]">Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50">
                <option value="subscription">Suscripción</option>
                <option value="one_time">Pago único</option>
              </select>
            </div>
          </div>
          {type === "subscription" && (
            <div>
              <label className="mb-1 block text-xs text-[#A8AAAE]">Intervalo</label>
              <select value={interval_} onChange={(e) => setInterval_(e.target.value)}
                className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50">
                <option value="month">Mensual</option>
                <option value="year">Anual</option>
              </select>
            </div>
          )}
          <label className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-[#A8AAAE]/30 bg-transparent text-[#F5C53D]" />
            <span className="text-sm text-white">Activo</span>
          </label>
        </div>

        <button type="submit" disabled={saving}
          className="w-full rounded-full bg-[#F5C53D] py-3 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90 disabled:opacity-50">
          {saving ? "Guardando..." : isNew ? "Crear plan" : "Guardar cambios"}
        </button>
      </form>
    </>
  );
}
