"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle, CreditCard, Plus } from "lucide-react";

export default function AdminPlanForm() {
  const { id } = useParams();
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
  const [saved, setSaved] = useState(false);

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
    setSaved(true);
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C4E27A]/10">
          <CheckCircle className="h-10 w-10 text-[#C4E27A]" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">Plan {isNew ? "creado" : "actualizado"}</h2>
        <p className="mt-2 text-[#A8AAAE]">{name} ya est&aacute; disponible en la plataforma.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/admin/plans" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#101012] shadow-lg transition-all hover:bg-[#F5C53D]/90 active:scale-[0.97]">
            <CreditCard className="h-4 w-4" /> Ver planes
          </Link>
          <Link href="/admin/plans/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-6 text-sm font-bold text-white transition-colors hover:bg-white/20 active:scale-[0.97]">
            <Plus className="h-4 w-4" /> Crear otro
          </Link>
        </div>
      </div>
    );
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
