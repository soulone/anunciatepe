"use client";

import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FailurePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E10] p-4">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <span className="text-4xl">😅</span>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-white">Algo no salió bien</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#909296]">
          No te preocupes, <strong className="text-white">no te hemos cobrado nada</strong>.
          Puedes intentarlo de nuevo o probar con otro medio de pago.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.back()}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C53D] py-3.5 text-sm font-bold text-[#0E0E10] shadow-lg transition-all hover:bg-[#F5C53D]/90 active:scale-[0.97]"
          >
            🔄 Intentar de nuevo
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm font-medium text-[#909296] transition-colors hover:bg-white/20 hover:text-white active:scale-[0.97]"
          >
            🏠 Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
