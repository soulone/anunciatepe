import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function AdminProjects() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Proyectos</h1>
          <p className="text-sm text-[#A8AAAE]">Gestiona los proyectos comunitarios</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F09BB8] px-5 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F09BB8]/90"
        >
          <Plus className="h-4 w-4" />
          Nuevo proyecto
        </Link>
      </div>

      <div className="card-dark rounded-[24px] p-8 text-center">
        <p className="text-[#A8AAAE]">Lista de proyectos próximamente</p>
        <p className="mt-2 text-xs text-[#A8AAAE]/60">Usa Supabase Dashboard → Table Editor → projects para ver los datos</p>
      </div>
    </>
  );
}
