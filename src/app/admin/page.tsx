import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Radio, Users as UsersIcon, TrendingUp, Wrench, BookText, FolderKanban } from "lucide-react";
import { SeedButton } from "@/components/admin/seed-button";

async function StatCard({ icon: Icon, label, href, color, count }: { icon: any; label: string; href: string; color: string; count: number | string }) {
  return (
    <Link href={href} className="card-light group flex items-center gap-4 p-4 transition-all hover:scale-[1.02]">
      <div className={`flex h-12 w-12 items-center justify-center rounded-[12px] bg-white ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold text-[#0E0E10]">{count}</p>
        <p className="text-sm text-[#909296]">{label}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-[#909296] transition-colors group-hover:text-[#0E0E10]" />
    </Link>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: courses }, { count: lives }, { count: tools }, { count: readings }, { count: users }] = await Promise.all([
    supabase.from("courses").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("lives").select("*", { count: "exact", head: true }),
    supabase.from("tools").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("readings").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-[#909296]">Panel de administración de Kapitalizando</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={BookOpen} label="Cursos publicados" count={courses ?? 0} href="/admin/courses" color="text-[#F26A2E]" />
        <StatCard icon={Radio} label="Lives" count={lives ?? 0} href="/admin/lives" color="text-[#F04A8A]" />
        <StatCard icon={UsersIcon} label="Usuarios" count={users ?? 0} href="#" color="text-[#C4E27A]" />
        <StatCard icon={TrendingUp} label="Ingresos" count="S/ 0" href="#" color="text-[#F5C53D]" />
        <StatCard icon={Wrench} label="Herramientas" count={tools ?? 0} href="/admin/tools" color="text-[#C8B6E2]" />
        <StatCard icon={BookText} label="Lecturas" count={readings ?? 0} href="/admin/readings" color="text-[#C8E6C9]" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-dark rounded-[24px] p-5">
          <h2 className="mb-4 text-base font-semibold text-white">Acceso rápido</h2>
          <div className="space-y-2">
            {[
              { icon: BookOpen, label: "Crear nuevo curso", href: "/admin/courses/new", color: "text-[#F26A2E]" },
              { icon: Radio, label: "Programar nuevo live", href: "/admin/lives/new", color: "text-[#F04A8A]" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 rounded-[12px] bg-white/5 px-4 py-3 text-sm text-[#909296] transition-colors hover:bg-white/10 hover:text-white">
                <item.icon className={`h-4 w-4 ${item.color}`} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <SeedButton />
      </div>
    </>
  );
}
