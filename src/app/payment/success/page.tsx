"use client";

import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const item = searchParams.get("item") ?? "tu contenido";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E10] p-4">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C4E27A]/10">
          <CheckCircle className="h-10 w-10 text-[#C4E27A]" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-white">🎉 ¡Bien hecho!</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#909296]">
          Tu acceso a <strong className="text-white">{item}</strong> ya está activo.
        </p>
        <p className="mt-1 text-xs text-[#909296]/60">
          Disfruta de tu contenido cuando quieras.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.push("/courses")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]"
          >
            🎯 Empieza a aprender
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#0E0E10]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F5C53D] border-t-transparent" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
