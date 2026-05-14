"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, BookOpen, Radio, Wrench, BookText, FolderKanban, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_NAV = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BookOpen, label: "Cursos", href: "/admin/courses" },
  { icon: Radio, label: "Lives", href: "/admin/lives" },
  { icon: Wrench, label: "Herramientas", href: "/admin/tools" },
  { icon: BookText, label: "Lecturas", href: "/admin/readings" },
  { icon: FolderKanban, label: "Proyectos", href: "/admin/projects" },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const isSetupPage = pathname === "/admin/setup";

  useEffect(() => {
    if (isSetupPage) return;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/auth/login");
        return;
      }
      setUserEmail(data.user.email ?? "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user.id)
        .single();
      if (!profile?.is_admin) {
        router.push("/");
        return;
      }
      setIsAdmin(true);
    });
  }, [supabase, router, isSetupPage]);

  if (!isSetupPage && isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0E0E10]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F5C53D] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0E0E10] text-white">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[72px] flex-col items-center gap-4 bg-[#0E0E10] py-4 md:flex">
        <Link href="/" className="flex h-6 w-6 items-center justify-center">
          <div className="grid grid-cols-3 gap-[2px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#F5C53D]" />
            ))}
          </div>
        </Link>

        <nav className="flex flex-col items-center gap-4">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isActive ? "bg-white/10 text-white" : "text-[#A8AAAE] hover:bg-white/5 hover:text-white"
                }`}
                title={item.label}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:text-white">
            <Moon className="h-5 w-5" />
          </button>
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:text-[#F04A8A]"
            title="Volver a la app"
          >
            <LogOut className="h-5 w-5" />
          </Link>
        </div>
      </aside>

      <main className="flex-1 md:pl-[72px] pb-16 md:pb-0">
        <div className="mx-auto max-w-[1200px] px-6 py-6 md:px-10 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
