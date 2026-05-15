import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Settings, CreditCard, Crown, BookOpen, Bookmark, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CheckoutButton } from "@/components/payments/checkout-button";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id ?? "")
    .single();

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*, products:plan_key(*)")
    .eq("user_id", user?.id ?? "")
    .eq("status", "active")
    .single();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(title)")
    .eq("user_id", user?.id ?? "")
    .limit(3);

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1000px] px-6 py-10 md:px-10">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-[#F04A8A]/20 text-2xl text-[#F04A8A]">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">{profile?.full_name ?? "Usuario"}</h1>
                <p className="text-sm text-[#A8AAAE]">{user?.email}</p>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>
            {subscription ? (
              <Badge className="mt-2 bg-[#C4E27A]/10 text-[#C4E27A] border-[#C4E27A]/20">
                <Crown className="mr-1 h-3 w-3" /> Plan activo
              </Badge>
            ) : (
              <Badge className="mt-2 bg-[#A8AAAE]/10 text-[#A8AAAE] border-[#A8AAAE]/20">
                Plan Free
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[16px] bg-[#17181B] p-4 text-center">
            <p className="text-2xl font-bold text-[#F5C53D]">{enrollments?.length ?? 0}</p>
            <p className="mt-1 text-xs text-[#A8AAAE]">Cursos en progreso</p>
          </div>
          <div className="rounded-[16px] bg-[#17181B] p-4 text-center">
            <p className="text-2xl font-bold text-[#F5C53D]">{subscription ? "✅" : "—"}</p>
            <p className="mt-1 text-xs text-[#A8AAAE]">Suscripción activa</p>
          </div>
          <div className="rounded-[16px] bg-[#17181B] p-4 text-center">
            <p className="text-2xl font-bold text-[#F5C53D]">{profile?.streak_days ?? 0}</p>
            <p className="mt-1 text-xs text-[#A8AAAE]">Días racha</p>
          </div>
        </div>

        {/* Battle Pass / Plan */}
        {!subscription && (
          <section className="mt-8 rounded-[24px] bg-gradient-to-br from-[#F26A2E]/10 to-[#F5C53D]/10 border-2 border-[#F26A2E]/20 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#F5C53D]/20 px-3 py-1 text-xs font-medium text-[#F5C53D]">
                  💎 ¿Quieres más?
                </div>
                <h2 className="text-lg font-bold text-white">Por solo S/19.90 al mes</h2>
                <p className="mt-1 text-sm text-[#909296]">
                  Acceso a todo el contenido nuevo que se lance.
                </p>
                <ul className="mt-3 space-y-1.5">
                  {["Cursos ilimitados", "Lives exclusivos", "Herramientas premium", "Sin compromiso, cancela cuando quieras"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#909296]">
                      <span className="text-[#C4E27A]">✅</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <CheckoutButton
                  productKey="battle_pass"
                  productName="Battle Pass"
                  price={19.90}
                  type="plan"
                  itemId="battle_pass"
                  compact
                />
              </div>
            </div>
          </section>
        )}

        {/* Mi progreso */}
        {enrollments && enrollments.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-white">Mi progreso</h2>
            <div className="mt-4 space-y-3">
              {enrollments.map((e: any) => (
                <div key={e.id} className="rounded-[16px] bg-[#17181B] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-[#F26A2E]" />
                      <p className="text-sm font-medium text-white">{e.courses?.title ?? "Curso"}</p>
                    </div>
                    <span className="text-xs text-[#A8AAAE]">{e.progress ?? 0}%</span>
                  </div>
                  <ProgressBar value={e.progress ?? 0} className="mt-2 bg-white/10 [&>div]:bg-[#F5C53D]" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mi cuenta */}
        <section className="mt-8 space-y-2">
          <h2 className="text-lg font-semibold text-white">Mi cuenta</h2>
          {[
            { icon: CreditCard, label: "Mis compras", desc: "Historial de pagos", href: "/" },
            { icon: Crown, label: "Mi plan", desc: subscription ? "Plan activo" : "Free · Mejorar plan", href: "/" },
            { icon: Bookmark, label: "Mi lista", desc: "Contenido guardado", href: "/my-list" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex w-full items-center justify-between rounded-[16px] bg-[#17181B] p-4 transition-colors hover:bg-[#1a1a1a]"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-[#A8AAAE]" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-[#A8AAAE]">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#A8AAAE]/60" />
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
