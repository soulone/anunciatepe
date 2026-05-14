"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";

export default function AdminSettings() {
  const supabase = createClient();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    supabase.from("settings").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s) => { map[s.key] = s.value; });
        setSettings(map);
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
    setSaving(false);
    setTimeout(() => setFeedback(null), 3000);
  }

  function update(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-sm text-[#A8AAAE]">Credenciales de Mercado Pago</p>
      </div>

      <div className="card-dark mx-auto max-w-lg rounded-[24px] p-5 space-y-4">
        <div>
          <label className="mb-1 block text-xs text-[#A8AAAE]">Public Key</label>
          <input
            value={settings["MERCADO_PAGO_PUBLIC_KEY"] ?? ""}
            onChange={(e) => update("MERCADO_PAGO_PUBLIC_KEY", e.target.value)}
            placeholder="TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50 placeholder:text-[#A8AAAE]/30"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-[#A8AAAE]">Access Token</label>
          <div className="relative">
            <input
              type={showToken ? "text" : "password"}
              value={settings["MERCADO_PAGO_ACCESS_TOKEN"] ?? ""}
              onChange={(e) => update("MERCADO_PAGO_ACCESS_TOKEN", e.target.value)}
              placeholder="TEST-xxxxxxxxxxxxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxx"
              className="w-full rounded-[12px] bg-white/5 px-4 py-2.5 pr-10 text-sm text-white outline-none focus:ring-1 focus:ring-[#F5C53D]/50 placeholder:text-[#A8AAAE]/30"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8AAAE] hover:text-white"
            >
              {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings["MERCADO_PAGO_ENABLED"] === "true"}
            onChange={(e) => update("MERCADO_PAGO_ENABLED", e.target.checked ? "true" : "false")}
            className="h-4 w-4 rounded border-[#A8AAAE]/30 bg-transparent text-[#F5C53D]"
          />
          <span className="text-sm text-white">Habilitar Mercado Pago</span>
        </label>

        {feedback === "success" && (
          <div className="flex items-center gap-2 rounded-[12px] bg-green-500/10 px-4 py-3 text-sm text-[#C4E27A]">
            <CheckCircle className="h-4 w-4" /> Configuración guardada
          </div>
        )}
        {feedback === "error" && (
          <div className="flex items-center gap-2 rounded-[12px] bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <XCircle className="h-4 w-4" /> Error al guardar
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] py-3 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" /> {saving ? "Guardando..." : "Guardar configuración"}
        </button>

        <p className="text-center text-xs text-[#A8AAAE]/50">
          Las credenciales se guardan en Supabase y se usan desde el servidor
        </p>
      </div>
    </>
  );
}
