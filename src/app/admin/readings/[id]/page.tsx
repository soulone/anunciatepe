"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft, CheckCircle, BookOpen, FileText, Edit3, Eye, List, Plus } from "lucide-react";
import { WizardLayout } from "@/components/admin/wizard-layout";

const STEPS = [
  { icon: <FileText className="h-4 w-4" />, title: "Info" },
  { icon: <Edit3 className="h-4 w-4" />, title: "Contenido" },
  { icon: <Eye className="h-4 w-4" />, title: "Publicar" },
];

export default function AdminReadingForm() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const isNew = id === "new";

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Finanzas básicas");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [contentUrl, setContentUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (!isNew) {
      supabase.from("readings").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setAuthor(data.author ?? "");
          setCategory(data.category ?? "Finanzas básicas");
          setExcerpt(data.excerpt ?? "");
          setContent(data.content ?? "");
          setIsPublished(data.is_published);
        }
      });
    }
  }, [id]);

  const durationMin = Math.max(1, Math.ceil((content.length / 800) * 5));

  async function handleSave() {
    setSaving(true);
    const payload = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      author,
      excerpt,
      content,
      content_url: contentUrl || null,
      duration_min: durationMin,
      category,
      is_published: isPublished,
    };

    if (isNew) {
      const { error } = await supabase.from("readings").insert(payload);
      if (!error) setSaved(true);
    } else {
      const { error } = await supabase.from("readings").update(payload).eq("id", id);
      if (!error) setSaved(true);
    }
    setSaving(false);
  }

  if (saved) {
    const readingSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C4E27A]/10">
          <CheckCircle className="h-10 w-10 text-[#C4E27A]" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">¡Lectura publicada con éxito!</h2>
        <p className="mt-2 text-[#909296]">{title} ya está disponible para los kapitalistas.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={`/readings/${readingSlug}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
            <Eye className="h-4 w-4" /> Ver lectura
          </Link>
          <Link href="/admin/readings" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-colors hover:bg-[#F5C53D]/90 active:scale-[0.97]">
            <List className="h-4 w-4" /> Ver todas
          </Link>
          <Link href="/admin/readings/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20 active:scale-[0.97]">
            <Plus className="h-4 w-4" /> Crear otra
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/readings" className="flex h-9 w-9 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? "Crear lectura" : "Editar lectura"}</h1>
          <p className="text-sm text-[#909296]">{isNew ? "Completa los pasos para publicar tu artículo" : `Editando: ${title}`}</p>
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
            <h3 className="text-lg font-semibold text-white">📝 Paso 1: Información de la lectura</h3>
            <p className="text-sm text-[#909296]">¿De qué trata tu artículo?</p>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Título</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Guía: Abre tu Primera Cuenta Bancaria"
                className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Autor</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Ej: Equipo Kapitalizando"
                className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Categoría</label>
              <div className="flex flex-wrap gap-2">
                {["Finanzas básicas", "Crédito", "Inversión", "Negocios", "Ahorro", "Seguridad", "Ruta"].map((cat) => (
                  <button key={cat} type="button" onClick={() => setCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      category === cat ? "bg-[#F26A2E] text-white" : "bg-white/10 text-[#909296] hover:bg-white/20"
                    } active:scale-[0.97]`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">✍️ Paso 2: Escribe el contenido</h3>
            <p className="text-sm text-[#909296]">Escribe el extracto y el contenido completo.</p>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Extracto (aparece en la lista)</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2}
                className="w-full rounded-[12px] bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30 resize-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">Contenido completo</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10}
                className="w-full rounded-[12px] bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30 resize-none font-mono" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#909296]">URL del contenido (opcional)</label>
              <input value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} placeholder="https://drive.google.com/file/d/..."
                className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
            </div>
            <p className="text-xs text-[#909296]">Tiempo estimado de lectura: {durationMin} min</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">👀 Paso 3: Vista previa y publicar</h3>

            <div className="rounded-[16px] bg-white/5 p-5">
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="h-5 w-5 text-[#F26A2E]" />
                <div>
                  <p className="font-medium text-white">{title || "Sin título"}</p>
                  <p className="text-xs text-[#909296]">Por {author || "Anónimo"} · {durationMin} min de lectura</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-[#909296] line-clamp-3">{excerpt || "Sin extracto"}</p>
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
