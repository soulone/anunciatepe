"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Sidebar />
      <main className="mx-auto flex min-h-[80vh] max-w-[600px] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#F04A8A]/10">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="mt-6 text-4xl font-bold text-white">Algo salió mal</h1>
        <p className="mt-2 text-sm text-[#A8AAAE]">
          Ocurrió un error inesperado. Puedes intentar de nuevo.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
        >
          <RotateCcw className="h-4 w-4" /> Reintentar
        </button>
      </main>
      <Footer />
    </>
  );
}
