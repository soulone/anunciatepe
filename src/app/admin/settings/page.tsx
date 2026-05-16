"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, CheckCircle, XCircle, Eye, EyeOff, Upload, Trash2, Image } from "lucide-react";

export default function AdminSettings() {
  const supabase = createClient();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from("settings").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s) => { map[s.key] = s.value; });
        setSettings(map);
        if (map["SITE_LOGO_URL"]) setLogoPreview(map["SITE_LOGO_URL"]);
      }
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setFeedback(null);
    const promises = Object.entries(settings).map(([key, value]) =>
      supabase.from("settings").upsert({ key, value }, { onConflict: "key" })
    );
    const results = await Promise.all(promises);
    const hasError = results.some((r) => r.error);
    setFeedback(hasError ? "error" : "success");
    setFeedbackMsg(hasError ? "Error al guardar" : "Configuración guardada");
    setSaving(false);
    setTimeout(() => setFeedback(null), 3000);
  }

  function update(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      setFeedback("error");
      setFeedbackMsg("Formato no soportado. Usa PNG, JPG o WebP.");
      setTimeout(() => setFeedback(null), 3000);
      return;
    }
    if (file.size > 500 * 1024) {
      setFeedback("error");
      setFeedbackMsg("La imagen no debe superar 500KB.");
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    setUploading(true);

    // Vista previa local
    const localUrl = URL.createObjectURL(file);
    setLogoPreview(localUrl);

    const ext = file.name.split(".").pop() ?? "png";
    const fileName = `logo-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(fileName, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setFeedback("error");
      setFeedbackMsg(`Error al subir: ${uploadError.message}`);
      setUploading(false);
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    const { data: urlData } = supabase.storage.from("logos").getPublicUrl(fileName);
    const publicUrl = urlData?.publicUrl ?? "";

    if (publicUrl) {
      await supabase.from("settings").upsert(
        { key: "SITE_LOGO_URL", value: publicUrl },
        { onConflict: "key" }
      );
      update("SITE_LOGO_URL", publicUrl);
      setLogoPreview(publicUrl);
      setFeedback("success");
      setFeedbackMsg("Logo subido exitosamente");
      setTimeout(() => setFeedback(null), 3000);
    }

    setUploading(false);
  }

  async function handleLogoDelete() {
    const currentUrl = settings["SITE_LOGO_URL"];
    if (currentUrl) {
      const path = currentUrl.split("/logos/").pop();
      if (path) await supabase.storage.from("logos").remove([path]);
    }
    await supabase.from("settings").upsert(
      { key: "SITE_LOGO_URL", value: "" },
      { onConflict: "key" }
    );
    update("SITE_LOGO_URL", "");
    setLogoPreview(null);
    setFeedback("success");
    setFeedbackMsg("Logo eliminado");
    setTimeout(() => setFeedback(null), 3000);
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-sm text-[#909296]">Credenciales y personalización</p>
      </div>

      <div className="mx-auto max-w-lg space-y-6">
        {/* Mercado Pago */}
        <div className="card-dark rounded-[24px] p-5 space-y-4">
          <h2 className="text-base font-semibold text-white">💳 Mercado Pago</h2>
          <div>
            <label className="mb-1 block text-xs text-[#909296]">Public Key</label>
            <input value={settings["MERCADO_PAGO_PUBLIC_KEY"] ?? ""}
              onChange={(e) => update("MERCADO_PAGO_PUBLIC_KEY", e.target.value)}
              placeholder="TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#909296]">Access Token</label>
            <div className="relative">
              <input type={showToken ? "text" : "password"}
                value={settings["MERCADO_PAGO_ACCESS_TOKEN"] ?? ""}
                onChange={(e) => update("MERCADO_PAGO_ACCESS_TOKEN", e.target.value)}
                placeholder="TEST-xxxxxxxx-xxxx-..."
                className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 pr-10 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50 placeholder:text-[#909296]/30" />
              <button type="button" onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#909296] hover:text-white">
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <label className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 cursor-pointer">
            <input type="checkbox" checked={settings["MERCADO_PAGO_ENABLED"] === "true"}
              onChange={(e) => update("MERCADO_PAGO_ENABLED", e.target.checked ? "true" : "false")}
              className="h-4 w-4 rounded border-[#909296]/30 bg-transparent text-[#F26A2E]" />
            <span className="text-sm text-white">Habilitar Mercado Pago</span>
          </label>
        </div>

        {/* Logo */}
        <div className="card-dark rounded-[24px] p-5 space-y-4">
          <h2 className="text-base font-semibold text-white">🖼️ Logo de la aplicación</h2>
          <p className="text-xs text-[#909296]">
            Sube el isologo de Kapitalizando. Se mostrará en el sidebar y topbar.
            Recomendado: 200×200px, max 500KB.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F26A2E]/20 to-[#F5C53D]/10">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Logo preview" className="h-full w-full rounded-[14px] object-contain" />
              ) : (
                <Image className="h-6 w-6 text-[#909296]" />
              )}
            </div>
            <div className="flex-1">
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp"
                onChange={handleLogoUpload} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F26A2E] px-4 text-xs font-bold text-white transition-colors hover:bg-[#F26A2E]/90 disabled:opacity-50 active:scale-[0.97]">
                <Upload className="h-3.5 w-3.5" />
                {uploading ? "Subiendo..." : "Subir logo"}
              </button>
              {logoPreview && (
                <button onClick={handleLogoDelete}
                  className="ml-2 inline-flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 text-xs font-medium text-[#909296] transition-colors hover:bg-red-500/10 hover:text-red-400 active:scale-[0.97]">
                  <Trash2 className="h-3.5 w-3.5" /> Eliminar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback === "success" && (
          <div className="flex items-center gap-2 rounded-[12px] bg-green-500/10 px-4 py-3 text-sm text-[#C4E27A]">
            <CheckCircle className="h-4 w-4" /> {feedbackMsg}
          </div>
        )}
        {feedback === "error" && (
          <div className="flex items-center gap-2 rounded-[12px] bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <XCircle className="h-4 w-4" /> {feedbackMsg}
          </div>
        )}

        <button onClick={handleSave} disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] py-3 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 disabled:opacity-50 active:scale-[0.97]">
          <Save className="h-4 w-4" /> {saving ? "Guardando..." : "Guardar configuración"}
        </button>
      </div>
    </>
  );
}
