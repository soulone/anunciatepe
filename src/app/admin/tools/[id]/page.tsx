"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Wrench, FileText, Target, Brain, Route, Hash } from "lucide-react";
import { WizardLayout } from "@/components/admin/wizard-layout";
import { ColorPicker } from "@/components/admin/color-picker";

const STEPS = [
  { icon: "📝", title: "Nombre" },
  { icon: "🎨", title: "Tipo y color" },
  { icon: "⚙️", title: "Config" },
];

const TOOL_TYPES = [
  { value: "calculator", label: "🧮 Calculadora", desc: "Herramienta de cálculo paso a paso" },
  { value: "wizard", label: "📝 Wizard", desc: "Asistente interactivo con pasos" },
  { value: "quiz", label: "❓ Quiz", desc: "Preguntas y respuestas" },
  { value: "game", label: "🎮 Juego", desc: "Experiencia gamificada" },
  { value: "app", label: "📱 App", desc: "Aplicación interactiva" },
];

export default function AdminToolForm() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const isNew = id === "new";

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("calculator");
  const [color, setColor] = useState("amber");
  const [config, setConfig] = useState("{}");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (!isNew) {
      supabase.from("tools").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setDescription(data.description ?? "");
          setType(data.type ?? "calculator");
          setColor(data.color_theme ?? "amber");
          setConfig(JSON.stringify(data.config ?? {}, null, 2));
          setIsPublished(data.is_published);
        }
      });
    }
  }, [id]);

  async function handleSave() {
    setSaving(true);
    let parsedConfig: any = {};
    try { parsedConfig = JSON.parse(config); } catch {}

    const payload = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description,
      icon_name: type === "calculator" ? "Calculator" : type === "wizard" ? "FileText" : "Brain",
      color_theme: color,
      type,
      config: parsedConfig,
      is_published: isPublished,
    };

    if (isNew) {
      const { error } = await supabase.from("tools").insert(payload);
      if (!error) setSaved(true);
    } else {
      const { error } = await supabase.from("tools").update(payload).eq("id", id);
      if (!error) setSaved(true);
    }
    setSaving(false);
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C4E27A]/10">
          <CheckCircle className="h-10 w-10 text-[#C4E27A]" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">¡Herramienta creada con éxito!</h2>
        <p className="mt-2 text-[#909296]">{title} ya está disponible para los kapitalistas.</p>
        <div className="mt-8 flex gap-4">
          <Link href="/admin/tools" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-colors hover:bg-[#F5C53D]/90 active:scale-[0.97]">
            📋 Ver todas
          </Link>
          <Link href="/admin/tools/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 active:scale-[0.97]">
            ➕ Crear otra
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/tools" className="flex h-9 w-9 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? "Crear herramienta" : "Editar herramienta"}</h1>
          <p className="text-sm text-[#909296]">
            {isNew ? "Completa los 3 pasos para crear tu herramienta" : `Editando: ${title}`}
          </p>
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
            <h3 className="text-lg font-semibold text-white">📝 Paso 1: Información básica</h3>
            <p className="text-sm text-[#909296]">¿Cómo se llama tu herramienta y qué hace?</p>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Nombre de la herramienta</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Calculadora de Préstamos"
                className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Descripción (opcional)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe brevemente qué hace tu herramienta..."
                className="w-full rounded-[12px] bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30 resize-none" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">🎨 Paso 2: Tipo y apariencia</h3>

            <div>
              <p className="mb-3 text-sm text-[#909296]">¿Qué tipo de herramienta es?</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {TOOL_TYPES.map((t) => (
                  <button key={t.value} type="button" onClick={() => setType(t.value)}
                    className={`rounded-[16px] border-2 p-4 text-left transition-all ${
                      type === t.value
                        ? "border-[#F26A2E] bg-[#F26A2E]/10"
                        : "border-transparent bg-white/5 hover:bg-white/10"
                    } active:scale-[0.97]`}>
                    <span className="text-2xl">{t.label.split(" ")[0]}</span>
                    <p className="mt-1 text-sm font-medium text-white">{t.label.split(" ").slice(1).join(" ")}</p>
                    <p className="mt-0.5 text-xs text-[#909296]">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm text-[#909296]">Elige un color</p>
              <ColorPicker value={color} onChange={setColor} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">⚙️ Paso 3: Configuración</h3>
            <p className="text-sm text-[#909296]">Configuración avanzada (opcional).</p>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Configuración (JSON)</label>
              <textarea value={config} onChange={(e) => setConfig(e.target.value)} rows={5}
                className="w-full rounded-[12px] bg-white/5 px-4 py-3 font-mono text-xs text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 resize-none" />
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3">
              <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 rounded border-white/30 bg-transparent text-[#F26A2E]" />
              <span className="text-sm text-white">Publicar inmediatamente</span>
            </label>
          </div>
        )}
      </WizardLayout>
    </>
  );
}
