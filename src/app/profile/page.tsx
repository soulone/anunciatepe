import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Settings, CreditCard, Crown, BookOpen, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <Topbar isAuthenticated />
      <main className="mx-auto max-w-[1000px] px-4 pt-24 pb-20 md:px-10">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary/20 text-2xl text-primary">
              RK
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Rosa Kapitalista</h1>
                <p className="text-sm text-zinc-500">rosa@email.com</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">
              <Crown className="mr-1 h-3 w-3" />
              Plan Free
            </Badge>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-[#141414] p-4 text-center">
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="mt-1 text-xs text-zinc-500">Cursos en progreso</p>
          </div>
          <div className="rounded-lg bg-[#141414] p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="mt-1 text-xs text-zinc-500">Lives vistos</p>
          </div>
          <div className="rounded-lg bg-[#141414] p-4 text-center">
            <p className="text-2xl font-bold text-primary">🔥 8</p>
            <p className="mt-1 text-xs text-zinc-500">Días racha</p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-white">Mi progreso</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-[#141414] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-white">El Secreto del Éxito</p>
                    <p className="text-xs text-zinc-500">Don Pedro</p>
                  </div>
                </div>
                <span className="text-xs text-zinc-500">60%</span>
              </div>
              <ProgressBar value={60} className="mt-2" />
            </div>
            <div className="rounded-lg bg-[#141414] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-teal-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Recetas Financieras</p>
                    <p className="text-xs text-zinc-500">Carlos</p>
                  </div>
                </div>
                <span className="text-xs text-zinc-500">30%</span>
              </div>
              <ProgressBar value={30} className="mt-2" />
            </div>
          </div>
        </section>

        <section className="mt-8 space-y-2">
          <h2 className="text-lg font-semibold text-white">Mi cuenta</h2>
          {[
            { icon: CreditCard, label: "Mis compras", desc: "Historial de pagos" },
            { icon: Crown, label: "Mi plan", desc: "Free · Mejorar plan" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center justify-between rounded-lg bg-[#141414] p-4 transition-colors hover:bg-[#1a1a1a]"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-zinc-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-600" />
            </button>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
