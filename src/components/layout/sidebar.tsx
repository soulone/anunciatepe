"use client";

import {
  Calendar,
  Grid3X3,
  Clock,
  Plus,
  Moon,
  Sun,
  User,
  CreditCard,
  Crown,
  Shield,
  Bookmark,
  Menu,
  X,
  Home,
  Wrench,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SiteLogo } from "@/components/shared/site-logo";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";

function useTheme() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light");
    }
  }, []);

  function toggle() {
    setIsLight((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem("theme", next ? "light" : "dark");
      return next;
    });
  }

  return { isLight, toggle };
}

const NAV_ITEMS = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Grid3X3, label: "Cursos", href: "/courses" },
  { icon: Clock, label: "Lives", href: "/lives" },
  { icon: Wrench, label: "Apps", href: "/tools" },
  { icon: BookOpen, label: "Lecturas", href: "/readings" },
] as const;

const MOBILE_NAV = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Grid3X3, label: "Cursos", href: "/courses" },
  { icon: Clock, label: "Lives", href: "/lives" },
  { icon: Wrench, label: "Apps", href: "/tools" },
  { icon: BookOpen, label: "Lecturas", href: "/readings" },
] as const;

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string; name?: string; avatar?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLight, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setUser({
          email: data.user.email,
          name: data.user.user_metadata?.full_name ?? data.user.email,
          avatar: data.user.user_metadata?.avatar_url,
        });
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin, avatar_url")
          .eq("id", data.user.id)
          .single();
        setIsAdmin(profile?.is_admin ?? false);
        if (profile?.avatar_url) {
          setUser((prev) => ({ ...prev!, avatar: profile.avatar_url }));
        }
      }
    });
  }, [supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/auth/login");
    router.refresh();
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[72px] flex-col items-center gap-4 bg-[#0E0E10] py-4 md:flex">
        <SiteLogo />

        <nav className="flex flex-col items-center gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-[#A8AAAE] group-hover:bg-white/5 group-hover:text-white"
                }`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="absolute left-full ml-3 whitespace-nowrap rounded-[8px] bg-[#17181B] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3">
          <div className="group relative">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F04A8A] text-white shadow-lg transition-transform hover:scale-105">
              <Plus className="h-5 w-5" />
            </button>
            <span className="absolute left-full ml-3 whitespace-nowrap rounded-[8px] bg-[#17181B] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none z-50">
              Nuevo
            </span>
          </div>

          <div className="group relative">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:text-white"
            >
              {isLight ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <span suppressHydrationWarning className="absolute left-full ml-3 whitespace-nowrap rounded-[8px] bg-[#17181B] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none z-50">
              {isLight ? "Modo oscuro" : "Modo claro"}
            </span>
          </div>

          <div className="group relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col items-center gap-1 outline-none">
                <Avatar className="h-9 w-9 ring-2 ring-[#F04A8A]/30 transition-all hover:ring-[#F04A8A]/60">
                  {user?.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatar} alt="" referrerPolicy="no-referrer" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <AvatarFallback className="bg-[#F04A8A]/20 text-xs font-semibold text-[#F04A8A]">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                side="right"
                sideOffset={12}
                className="w-52 rounded-[16px] border-[rgba(255,255,255,0.06)] bg-[#17181B] p-2"
              >
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-white">{user?.name ?? "Usuario"}</p>
                  <p className="text-xs text-[#A8AAAE]">{user?.email ?? ""}</p>
                </div>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"
                >
                  <User className="mr-2 h-4 w-4" /> Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Mis compras
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"
                >
                  <Crown className="mr-2 h-4 w-4" /> Mi plan
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/my-list")}
                  className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"
                >
                  <Bookmark className="mr-2 h-4 w-4" /> Mi lista
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />
                    <DropdownMenuItem
                      onClick={() => router.push("/admin")}
                      className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#F5C53D] focus:bg-[#F5C53D]/10"
                    >
                      <Shield className="mr-2 h-4 w-4" /> Panel admin
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#F04A8A] focus:bg-[#F04A8A]/10 focus:text-[#F04A8A]"
                >
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="absolute left-full ml-3 whitespace-nowrap rounded-[8px] bg-[#17181B] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none z-50">
              Perfil
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-[#0E0E10] px-4 py-3 md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE]"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
          <SiteLogo />
          <span className="text-sm font-bold text-white">Kapitalizando</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="h-8 w-8 ring-2 ring-[#F04A8A]/30">
              {user?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt="" referrerPolicy="no-referrer" className="h-full w-full rounded-full object-cover" />
              ) : (
                <AvatarFallback className="bg-[#F04A8A]/20 text-[10px] font-semibold text-[#F04A8A]">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-48 rounded-[16px] border-[rgba(255,255,255,0.06)] bg-[#17181B] p-2"
          >
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-white">{user?.name ?? "Usuario"}</p>
              <p className="text-xs text-[#A8AAAE]">{user?.email ?? ""}</p>
            </div>
            <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />
            <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"><User className="mr-2 h-4 w-4" /> Mi perfil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"><CreditCard className="mr-2 h-4 w-4" /> Mis compras</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"><Crown className="mr-2 h-4 w-4" /> Mi plan</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/my-list")} className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#A8AAAE] focus:bg-white/5 focus:text-white"><Bookmark className="mr-2 h-4 w-4" /> Mi lista</DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={() => router.push("/admin")} className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#F5C53D] focus:bg-[#F5C53D]/10"><Shield className="mr-2 h-4 w-4" /> Panel admin</DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer rounded-[12px] px-2 py-2 text-sm text-[#F04A8A] focus:bg-[#F04A8A]/10 focus:text-[#F04A8A]">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile drawer menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="fixed left-0 top-14 bottom-0 w-64 bg-[#17181B] p-4 animate-in slide-in-from-left"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {MOBILE_NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-[#A8AAAE] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[rgba(255,255,255,0.06)] bg-[#0E0E10] px-2 py-2 md:hidden">
        {MOBILE_NAV.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 transition-colors ${
                isActive ? "text-[#F04A8A]" : "text-[#A8AAAE]"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
