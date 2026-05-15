"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Radio } from "lucide-react";
import { useParams } from "next/navigation";
import { WizardLayout } from "@/components/admin/wizard-layout";

const STEPS = [
  { icon: "📝", title: "Info" },
  { icon: "📅", title: "Fecha" },
  { icon: "🚀", title: "Publicar" },
];

export default function AdminLiveForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const isNew = id === "new";

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [status, setStatus] = useState("scheduled");
  const [preregisteredCount, setPreregisteredCount] = useState(0);
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    if (!isNew) {
      supabase.from("lives").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setDescription(data.description ?? "");
          const d = new Date(data.scheduled_at);
          setScheduledDate(d.toISOString().split("T")[0]);
          setScheduledTime(d.toTimeString().slice(0, 5));
          setDuration(data.duration ?? 60);
          setStatus(data.status ?? "scheduled");
          setPreregisteredCount(data.preregistered_count ?? 0);
          setStreamUrl(data.stream_url ?? "");
        }
      });
    }
  }, [id]);

  async function handleSave() {
    setSaving(true);
    const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}:00`).toISOString();

    const payload = {
      title,
      description,
      scheduled_at: scheduledAt,
      duration,
      status,
      preregistered_count: preregisteredCount,
      stream_url: streamUrl || null,
    };

    if (isNew) {
      await supabase.from("lives").insert(payload);
    } else {
      await supabase.from("lives").update(payload).eq("id", id);
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
        <h2 className="mt-6 text-2xl font-bold text-white">¡Live {isNew ? "creado" : "actualizado"} con éxito!</h2>
        <p className="mt-2 text-[#909296]">{title} ya está en la plataforma.</p>
        <div className="mt-8 flex gap-4">
          <Link href="/admin/lives" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-colors hover:bg-[#F5C53D]/90 active:scale-[0.97]">📋 Ver todos</Link>
          <Link href="/admin/lives/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 active:scale-[0.97]">➕ Crear otro</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/lives" className="flex h-9 w-9 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? "Programar live" : "Editar live"}</h1>
          <p className="text-sm text-[#909296]">{isNew ? "Completa los pasos para programar tu evento en vivo" : `Editando: ${title}`}</p>
        </div>
      </div>

      <WizardLayout
        steps={STEPS}
        currentStep={step}
        isFirst={step === 0}
        isLast={step === STEPS.length - 1}
        onBack={() => setStep(step - 1)}
        onNext={() => setStep(step + 1)}
        onFinish={handleSave}
        loading={saving}
        nextLabel="👋 Siguiente →"
        backLabel="← Atrás"
      >
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">📝 Paso 1: Información del live</h3>
            <p className="text-sm text-[#909296]">¿De qué trata tu evento en vivo?</p>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Título del live</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: El Secreto del Éxito - Capítulo 3"
                className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Descripción</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                placeholder="Describe de qué tratará el live..."
                className="w-full rounded-[12px] bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30 resize-none" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">📅 Paso 2: Fecha y duración</h3>
            <p className="text-sm text-[#909296]">¿Cuándo y cuánto durará?</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm text-[#909296]">Fecha</label>
                <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)}
                  className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[#909296]">Hora</label>
                <input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)}
                  className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Duración (minutos)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min={5} step={5}
                className="h-12 w-full max-w-[200px] rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">URL del streaming (opcional)</label>
              <input value={streamUrl} onChange={(e) => setStreamUrl(e.target.value)} placeholder="https://drive.google.com/file/d/..."
                className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">🚀 Paso 3: Estado y publicación</h3>

            <div className="rounded-[16px] bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <Radio className="h-6 w-6 text-[#F04A8A]" />
                <div>
                  <p className="font-medium text-white">{title || "Sin título"}</p>
                  <p className="text-xs text-[#909296]">
                    {scheduledDate ? `${scheduledDate} a las ${scheduledTime}` : "Sin fecha"} · {duration} min
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Estado</label>
              <div className="flex gap-3">
                {[
                  { value: "scheduled", label: "📅 Programado", desc: "Visible en la plataforma" },
                  { value: "live", label: "🔴 En vivo", desc: "Transmitiendo ahora" },
                  { value: "finished", label: "✅ Finalizado", desc: "Ya terminó" },
                ].map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setStatus(opt.value)}
                    className={`flex-1 rounded-[16px] border-2 p-4 text-left transition-all ${
                      status === opt.value ? "border-[#F26A2E] bg-[#F26A2E]/10" : "border-transparent bg-white/5"
                    } active:scale-[0.97]`}>
                    <p className="font-medium text-white">{opt.label}</p>
                    <p className="text-xs text-[#909296]">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Pre-agendados</label>
              <input type="number" value={preregisteredCount} onChange={(e) => setPreregisteredCount(Number(e.target.value))} min={0}
                className="h-12 w-full max-w-[200px] rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
            </div>
          </div>
        )}
      </WizardLayout>
    </>
  );
}
