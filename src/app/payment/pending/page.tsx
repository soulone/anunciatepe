"use client";

import { Clock, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PendingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E10] p-4">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5C53D]/10">
          <Clock className="h-10 w-10 text-[#F5C53D]" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-white">⏳ Pago en revisión</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#909296]">
          Estamos verificando tu pago. Esto toma solo unos segundos.
        </p>
        <p className="mt-1 text-xs text-[#909296]/60">No es necesario que hagas nada más.</p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.push("/")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C53D] py-3.5 text-sm font-bold text-[#0E0E10] shadow-lg transition-all hover:bg-[#F5C53D]/90 active:scale-[0.97]"
          >
            <RotateCcw className="h-4 w-4" /> Verificar estado
          </button>
        </div>
      </div>
    </div>
  );
}
