import Link from "next/link";
import { ArrowUpRight, BookOpen, Radio, Users, TrendingUp, Wrench, BookText, FolderKanban } from "lucide-react";
import { SeedButton } from "@/components/admin/seed-button";

const STATS = [
  { icon: BookOpen, label: "Cursos", value: "8", href: "/admin/courses", color: "text-[#F26A2E]" },
  { icon: Radio, label: "Lives", value: "10", href: "/admin/lives", color: "text-[#F04A8A]" },
  { icon: Users, label: "Usuarios", value: "42", href: "#", color: "text-[#C4E27A]" },
  { icon: TrendingUp, label: "Ingresos", value: "S/ 0", href: "#", color: "text-[#F5C53D]" },
  { icon: Wrench, label: "Herramientas", value: "6", href: "/admin/tools", color: "text-[#C8B6E2]" },
  { icon: BookText, label: "Lecturas", value: "11", href: "/admin/readings", color: "text-[#C8E6C9]" },
  { icon: FolderKanban, label: "Proyectos", value: "6", href: "/admin/projects", color: "text-[#F09BB8]" },
] as const;

function StatCard({ icon: Icon, label, value, href, color }: typeof STATS[number]) {
  return (
    <Link
      href={href}
      className="card-light group flex items-center gap-4 p-4 transition-all hover:scale-[1.02]"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-[12px] bg-white ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold text-[#101012]">{value}</p>
        <p className="text-sm text-[#6B6F72]">{label}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-[#6B6F72] transition-colors group-hover:text-[#101012]" />
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-[#A8AAAE]">Panel de administración de Kapitalizando</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-dark rounded-[24px] p-5">
          <h2 className="mb-4 text-base font-semibold text-white">Acceso rápido</h2>
          <div className="space-y-2">
            <Link
              href="/admin/courses"
              className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 text-sm text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white"
            >
              <BookOpen className="h-4 w-4 text-[#F26A2E]" />
              Crear nuevo curso
            </Link>
            <Link
              href="/admin/lives"
              className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 text-sm text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white"
            >
              <Radio className="h-4 w-4 text-[#F04A8A]" />
              Programar nuevo live
            </Link>
            <Link
              href="/admin/tools"
              className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 text-sm text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white"
            >
              <Wrench className="h-4 w-4 text-[#C8B6E2]" />
              Agregar herramienta
            </Link>
            <Link
              href="/admin/readings"
              className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 text-sm text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white"
            >
              <BookText className="h-4 w-4 text-[#C8E6C9]" />
              Publicar lectura
            </Link>
          </div>
        </div>

        <SeedButton />
      </div>
    </>
  );
}
