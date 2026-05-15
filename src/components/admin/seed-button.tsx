"use client";

import { useState } from "react";
import { seedDatabase } from "@/lib/seed/actions";
import { Loader2, CheckCircle, XCircle, Database } from "lucide-react";

export function SeedButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSeed() {
    setStatus("loading");
    setMessage("");

    const result = await seedDatabase();

    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("¡Base de datos poblada exitosamente!");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <div className="card-dark rounded-[24px] p-5">
      <h2 className="mb-4 text-base font-semibold text-white">Poblar base de datos</h2>
      <p className="mb-4 text-sm text-[#A8AAAE]">
        Inserta datos de prueba para visualizar la plataforma con contenido real.
      </p>

      {status === "success" && (
        <div className="mb-3 flex items-center gap-2 rounded-[12px] bg-green-500/10 px-4 py-3 text-sm text-[#C4E27A]">
          <CheckCircle className="h-4 w-4" /> {message}
        </div>
      )}
      {status === "error" && (
        <div className="mb-3 flex items-center gap-2 rounded-[12px] bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <XCircle className="h-4 w-4" /> {message}
        </div>
      )}

      <button
        onClick={handleSeed}
        disabled={status === "loading" || status === "success"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C53D] py-3 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90 disabled:opacity-50"
      >
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Poblando...</>
        ) : (
          <><Database className="h-4 w-4" /> Poblar datos de prueba</>
        )}
      </button>
    </div>
  );
}
