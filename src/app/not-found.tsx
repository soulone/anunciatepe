"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto flex min-h-[80vh] max-w-[600px] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#F26A2E]/10">
          <span className="text-4xl">🚀</span>
        </div>
        <h1 className="mt-6 text-4xl font-bold text-white">404</h1>
        <p className="mt-2 text-xl text-white">Página no encontrada</p>
        <p className="mt-2 text-sm text-[#A8AAAE]">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
        >
          ← Volver al inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}
