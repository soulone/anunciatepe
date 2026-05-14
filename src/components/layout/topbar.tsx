"use client";

import { Bell, Flame, Search, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Lives", href: "/lives" },
  { label: "Cursos", href: "/courses" },
  { label: "Apps", href: "/tools" },
  { label: "Comunidad", href: "/komunidad" },
  { label: "Mi lista", href: "/my-list" },
] as const;

interface TopbarProps {
  isAuthenticated?: boolean;
}

export function Topbar({ isAuthenticated = false }: TopbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-lg shadow-lg shadow-black/20"
            : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-2xl font-bold tracking-tight text-primary"
          >
            KAPITALIZANDO
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  item.href === "/"
                    ? "text-primary"
                    : "text-zinc-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-300 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-zinc-300 hover:text-white"
            >
              <Flame className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-black">
                12
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-zinc-300 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                5
              </span>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full pl-0.5 pr-2 py-0.5 transition-colors hover:bg-white/10">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      RK
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 border-zinc-800 bg-zinc-950"
                >
                  <DropdownMenuItem className="text-zinc-300 focus:bg-white/10 focus:text-white">
                    Mi perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-zinc-300 focus:bg-white/10 focus:text-white">
                    Mis compras
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-zinc-300 focus:bg-white/10 focus:text-white">
                    Mi plan
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="text-zinc-400 focus:bg-white/10 focus:text-white">
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Iniciar sesión
                </Button>
              </Link>
            )}

            <Sheet>
              <SheetTrigger className="md:hidden flex items-center justify-center h-10 w-10 text-zinc-300 hover:text-white transition-colors">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 border-zinc-800 bg-zinc-950"
              >
                <SheetHeader>
                  <SheetTitle className="font-heading text-xl text-primary">
                    KAPITALIZANDO
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  );
}
