import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollRow } from "@/components/shared/scroll-arrows";
import { VideoCard } from "@/components/content/video-card";
import { CourseCard } from "@/components/content/course-card";
import { LiveCard } from "@/components/content/live-card";
import { ToolCard } from "@/components/tools/tool-card";
import { PathCard } from "@/components/learning-path/path-card";
import { RankCard } from "@/components/ranking/rank-card";
import { StatsBar } from "@/components/community/stats-bar";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Bell, Play, Plus, BookOpen, Wrench, Radio, TrendingUp, Calendar, Clock, Users, Info, Volume2, Calculator, FileText, Target, Brain, Route, Hash } from "lucide-react";
import { CheckoutButton } from "@/components/payments/checkout-button";

function formatDuration(min: number): string {
  if (!min) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  return `Hace ${Math.floor(days / 7)} sem.`;
}

function getToolIcon(name: string) {
  const icons: Record<string, any> = {
    Calculator: "🧮",
    FileText: "📝",
    Target: "🎯",
    Brain: "🧠",
    Route: "🛤️",
    Hash: "🔢",
  };
  return icons[name] ?? "🔧";
}

function getToolIconComponent(name: string) {
  const icons: Record<string, any> = {
    Calculator: Calculator,
    FileText: FileText,
    Target: Target,
    Brain: Brain,
    Route: Route,
    Hash: Hash,
  };
  return icons[name] ?? Wrench;
}

const toolColors = ["amber", "morado", "coral", "cyan", "teal", "orange"];
const toolLabels = ["WIZARD 3P", "WIZARD 7P", "RUTA 5MIN", "QUIZ 2MIN", "RUTA 8CAP", "CALC 1MIN"];

export default async function Home() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  const [
    { data: liveHero },
    { data: recordings },
    { data: courses },
    { data: tools },
    { data: upcomingLives },
    { data: pathReadings },
    { data: topRecordings },
    { data: enrollments },
    { data: plans },
  ] = await Promise.all([
    supabase.from("lives").select("*").eq("status", "live").order("scheduled_at").limit(1).single(),
    supabase.from("recordings").select("*").order("published_at", { ascending: false }).limit(10),
    supabase.from("courses").select("*").eq("is_published", true).limit(10),
    supabase.from("tools").select("*").eq("is_published", true).limit(10),
    supabase.from("lives").select("*").eq("status", "scheduled").order("scheduled_at").limit(10),
    supabase.from("readings").select("*").eq("category", "Ruta").limit(10),
    supabase.from("recordings").select("*").order("views", { ascending: false }).limit(10),
    supabase.from("enrollments").select("*, courses(title, slug)").eq("user_id", user?.user?.id ?? "").limit(10),
    supabase.from("products").select("*").eq("is_active", true).order("sort_order"),
  ]);

  const hero = liveHero ?? null;
  const safeRecordings = recordings ?? [];
  const safeCourses = courses ?? [];
  const safeTools = tools ?? [];
  const safeLives = upcomingLives ?? [];
  const safePaths = pathReadings ?? [];
  const safeTop = topRecordings ?? [];
  const safeEnrollments = enrollments ?? [];
  const safePlans = plans ?? [];

  return (
    <>
      <Sidebar />

      <main>
        <div className="mx-auto max-w-[1200px] px-6 py-6 md:px-10 md:py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Kapitalizando</h1>
              <p className="text-sm text-[#A8AAAE]">Educación financiera y emprendimiento</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F04A8A]/10 text-[#F04A8A]">
                <Bell className="h-4 w-4" />
              </div>
              <button className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F5C53D] px-4 text-sm font-bold text-[#101012] transition-all hover:bg-[#F5C53D]/90">
                <Plus className="h-4 w-4" /> Nuevo
              </button>
            </div>
          </div>

          {/* Hero */}
          {hero && (
            <section className="relative mb-8 min-h-[50vh] overflow-hidden rounded-[24px] md:min-h-[60vh]">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_50%,_#F26A2E_0%,_transparent_60%)]" />

              <div className="relative z-10 flex h-full min-h-[50vh] md:min-h-[60vh] flex-col justify-end p-6 md:p-10">
                <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#F04A8A]/20 px-3 py-1 text-xs font-medium text-[#F04A8A] backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#F04A8A]" />
                  EN VIVO
                </div>

                <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
                  {hero.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  {hero.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(hero.scheduled_at).toLocaleDateString("es-PE", { weekday: "long", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    ~{hero.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {hero.preregistered_count} pre-agendados
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white shadow-lg shadow-[#F26A2E]/25 transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
                    <Play className="h-4 w-4 fill-white" /> VER EN VIVO
                  </button>
                  <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white active:scale-[0.97]">
                    <Bell className="h-4 w-4" />
                  </button>
                  <button className="inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-zinc-300 active:scale-[0.97]">
                    <Info className="h-4 w-4" />
                  </button>
                  <span className="ml-auto flex items-center gap-1 text-xs text-zinc-600">
                    <Volume2 className="h-3 w-3" /> 16+
                  </span>
                </div>

                <div className="mt-6 flex gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-[#F26A2E]" />
                  <span className="h-1.5 w-4 rounded-full bg-white/20" />
                  <span className="h-1.5 w-4 rounded-full bg-white/20" />
                  <span className="h-1.5 w-4 rounded-full bg-white/20" />
                </div>
              </div>
            </section>
          )}

          {/* Grabaciones recientes */}
          {safeRecordings.length > 0 && (
            <section className="mb-8">
              <SectionHeader title="Grabaciones recientes" subtitle="Revive los últimos lives" href="/courses" />
              <ScrollRow>
                {safeRecordings.map((r) => (
                  <VideoCard key={r.id} title={r.title} instructor={r.title} duration={formatDuration(r.duration)} timeAgo={timeAgo(r.published_at)} href={r.live_id ? `/lives/${r.live_id}` : undefined} />
                ))}
              </ScrollRow>
            </section>
          )}

          {/* Continuá donde quedaste */}
          {safeEnrollments.length > 0 && (
            <section className="mb-8">
              <SectionHeader title="Continuá donde quedaste" subtitle="Tu progreso en los cursos" href="/courses" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {safeEnrollments.map((e) => (
                  <a key={e.id} href={`/courses/${e.courses?.slug ?? ""}`} className="group overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                      <div className="flex h-full w-full items-center justify-center"><BookOpen className="h-8 w-8 text-zinc-300" /></div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-[#101012] line-clamp-1">{e.courses?.title ?? "Curso"}</p>
                      <ProgressBar value={e.progress ?? 0} className="mt-2" />
                      <p className="mt-1 text-[11px] text-[#6B6F72]">{e.progress ?? 0}%</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Cursos destacados */}
          {safeCourses.length > 0 && (
            <section className="mb-8">
              <SectionHeader title="Cursos destacados" subtitle="Los maestros del barrio te enseñan" href="/courses" />
              <ScrollRow>
                {safeCourses.map((c) => (
                  <CourseCard key={c.id} title={c.title} subtitle={c.description?.slice(0, 60)} instructor="" thumbnail={c.thumbnail_url ?? undefined} slug={c.slug} />
                ))}
              </ScrollRow>
            </section>
          )}

          {/* Herramientas */}
          {safeTools.length > 0 && (
            <section className="mb-8">
              <SectionHeader title="Herramientas instantáneas" subtitle="Aplica lo aprendido en minutos" href="/tools" />
              <ScrollRow>
                {safeTools.map((t, i) => (
                  <ToolCard
                    key={t.id}
                    icon={BookOpen}
                    title={t.title}
                    subtitle={t.description}
                    color={toolColors[i % toolColors.length]}
                    label={toolLabels[i % toolLabels.length]}
                    slug={t.slug}
                  />
                ))}
              </ScrollRow>
            </section>
          )}

          {/* Próximos lives */}
          {safeLives.length > 0 && (
            <section className="mb-8">
              <SectionHeader title="Próximos eventos en vivo" subtitle="Reserva tu asiento" href="/lives" />
              <ScrollRow>
                {safeLives.map((l) => (
                  <LiveCard key={l.id} id={l.id} when={new Date(l.scheduled_at).toLocaleDateString("es-PE", { weekday: "short", hour: "2-digit" }).toUpperCase()} instructor="" title={l.title} subtitle={`${l.duration} min`} duration={`${l.duration} min`} />
                ))}
              </ScrollRow>
            </section>
          )}

          {/* Rutas de aprendizaje */}
          {safePaths.length > 0 && (
            <section className="mb-8">
              <SectionHeader title="Rutas de aprendizaje" subtitle="Series temáticas para dominar un tema" href="/courses" />
              <ScrollRow>
                {safePaths.map((p, i) => (
                  <PathCard
                    key={p.id}
                    title={p.title}
                    subtitle={`${p.duration_min} min`}
                    chapters={5}
                    completed={i === 2 ? 5 : i}
                    gradient={["bg-gradient-to-br from-[#C8B6E2] to-[#7C3AED]", "bg-gradient-to-br from-[#F26A2E] to-[#F04A8A]", "bg-gradient-to-br from-[#C4E27A] to-[#1F3A2E]"][i % 3]}
                    status={i === 2 ? "completed" : i === 0 ? "in-progress" : "not-started"}
                    href="/courses"
                  />
                ))}
              </ScrollRow>
            </section>
          )}

          {/* Top 10 */}
          {safeTop.length > 0 && (
            <section className="mb-8">
              <SectionHeader title="Top 10 esta semana" href="/courses" />
              <ScrollRow>
                {safeTop.slice(0, 10).map((r, i) => (
                  <RankCard key={r.id} rank={i + 1} title={r.title} subtitle={`${r.views ?? 0} vistas`} href={r.live_id ? `/lives/${r.live_id}` : undefined} />
                ))}
              </ScrollRow>
            </section>
          )}

          {/* Planes de suscripción */}
          <section className="mb-8">
            <SectionHeader title="Planes" subtitle="Elige el plan que mejor se adapte a ti" />
            <div className="grid gap-4 sm:grid-cols-2">
              {safePlans.map((plan) => (
                <div key={plan.id} className="card-dark rounded-[24px] p-6 transition-all hover:scale-[1.02]">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-[#A8AAAE]">{plan.description}</p>
                  <p className="mt-4 font-heading text-3xl font-bold text-[#F5C53D]">
                    S/ {plan.price}
                    <span className="text-base font-normal text-[#A8AAAE]">/{plan.interval}</span>
                  </p>
                  <div className="mt-6">
                    <CheckoutButton
                      productKey={plan.key}
                      productName={plan.name}
                      price={plan.price}
                      type="plan"
                      itemId={plan.key}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <StatsBar />

          <div className="mt-8">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
