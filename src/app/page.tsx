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
import { Bell, Play, Plus, BookOpen, Wrench, Radio, TrendingUp } from "lucide-react";

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
  ] = await Promise.all([
    supabase.from("lives").select("*").eq("status", "live").order("scheduled_at").limit(1).single(),
    supabase.from("recordings").select("*").order("published_at", { ascending: false }).limit(10),
    supabase.from("courses").select("*").eq("is_published", true).limit(10),
    supabase.from("tools").select("*").eq("is_published", true).limit(10),
    supabase.from("lives").select("*").eq("status", "scheduled").order("scheduled_at").limit(10),
    supabase.from("readings").select("*").eq("category", "Ruta").limit(10),
    supabase.from("recordings").select("*").order("views", { ascending: false }).limit(10),
    supabase.from("enrollments").select("*, courses(title)").eq("user_id", user?.user?.id ?? "").limit(10),
  ]);

  const hero = liveHero ?? null;
  const safeRecordings = recordings ?? [];
  const safeCourses = courses ?? [];
  const safeTools = tools ?? [];
  const safeLives = upcomingLives ?? [];
  const safePaths = pathReadings ?? [];
  const safeTop = topRecordings ?? [];
  const safeEnrollments = enrollments ?? [];

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
            <section className="card-green mb-8 overflow-hidden p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#F04A8A]/20 px-3 py-1 text-xs font-medium text-[#F04A8A]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#F04A8A]" />
                    EN VIVO
                  </div>
                  <h2 className="text-2xl font-bold text-white md:text-3xl">{hero.title}</h2>
                  <p className="mt-2 text-sm text-white/70">{hero.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/50">
                    <span>🗓 {new Date(hero.scheduled_at).toLocaleDateString("es-PE", { weekday: "long", hour: "2-digit", minute: "2-digit" })}</span>
                    <span>⏱ ~{hero.duration} min</span>
                    <span>👥 {hero.preregistered_count} pre-agendados</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90">
                    <Play className="h-4 w-4 fill-white" /> VER EN VIVO
                  </button>
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
                  <VideoCard key={r.id} title={r.title} instructor={r.title} duration={formatDuration(r.duration)} timeAgo={timeAgo(r.published_at)} />
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
                  <div key={e.id} className="group overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                      <div className="flex h-full w-full items-center justify-center">
                        <BookOpen className="h-8 w-8 text-zinc-300" />
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-[#101012] line-clamp-1">{e.courses?.title ?? "Curso"}</p>
                      <ProgressBar value={e.progress ?? 0} className="mt-2" />
                      <p className="mt-1 text-[11px] text-[#6B6F72]">{e.progress ?? 0}%</p>
                    </div>
                  </div>
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
                  <CourseCard key={c.id} title={c.title} subtitle={c.description?.slice(0, 60)} instructor="" thumbnail={c.thumbnail_url ?? undefined} />
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
                  <LiveCard key={l.id} when={new Date(l.scheduled_at).toLocaleDateString("es-PE", { weekday: "short", hour: "2-digit" }).toUpperCase()} instructor="" title={l.title} subtitle={`${l.duration} min`} duration={`${l.duration} min`} />
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
                  <RankCard key={r.id} rank={i + 1} title={r.title} subtitle={`${r.views ?? 0} vistas`} />
                ))}
              </ScrollRow>
            </section>
          )}

          <StatsBar />

          <div className="mt-8">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
