import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function AdminTools() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Herramientas</h1>
          <p className="text-sm text-[#A8AAAE]">Gestiona las herramientas interactivas</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#C8B6E2] px-5 text-sm font-bold text-[#101012] transition-colors hover:bg-[#C8B6E2]/90"
        >
          <Plus className="h-4 w-4" />
          Nueva herramienta
        </Link>
      </div>

      <div className="card-dark rounded-[24px] p-8 text-center">
        <p className="text-[#A8AAAE]">Lista de herramientas próximamente</p>
        <p className="mt-2 text-xs text-[#A8AAAE]/60">Usa Supabase Dashboard → Table Editor → tools para ver los datos</p>
      </div>
    </>
  );
}
