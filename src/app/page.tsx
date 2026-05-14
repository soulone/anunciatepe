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
import { Bell, Play, Plus } from "lucide-react";

const RECENT_VIDEOS = [
  { title: "Don Pedro Cap. 1", instructor: "Don Pedro", duration: "1h 24m", timeAgo: "Hace 2 días" },
  { title: "Lucía - Crédito", instructor: "Lucía", duration: "1h 47m", timeAgo: "Sem. pas." },
  { title: "Comunidad Q&A Mar", instructor: "Equipo", duration: "58 min", timeAgo: "Hace 1 mes" },
  { title: "Manuel - Pitch", instructor: "Manuel", duration: "1h 12m", timeAgo: "Hace 4 días" },
  { title: "Tatiana - Detect.", instructor: "Tatiana", duration: "1h 08m", timeAgo: "Hace 6 días" },
  { title: "Carlos - Recetas", instructor: "Carlos", duration: "1h 31m", timeAgo: "Hace 8 días" },
] as const;

const COURSES = [
  { title: "EL SECRETO...", subtitle: "Aprende a prestar sin riesgo", instructor: "Don Pedro" },
  { title: "RECETAS", subtitle: "Finanzas para tu emprendimiento", instructor: "Carlos" },
  { title: "COSER TU FUTUR...", subtitle: "Vende lo que haces", instructor: "Lucía" },
  { title: "TALLER", subtitle: "Tu primer crédito formal", instructor: "Manuel" },
  { title: "SALÓN PRO", subtitle: "Servicios profesionales", instructor: "Tatiana" },
  { title: "RECICLA", subtitle: "Economía circular", instructor: "Juvenal" },
] as const;

const TOOLS = [
  { icon: Bell, title: "Calculadora", subtitle: "Simula tu préstamo en 3 pasos", color: "amber", label: "WIZARD 3P" },
  { icon: Bell, title: "Formato", subtitle: "Plantilla para tu plan de negocio", color: "morado", label: "WIZARD 7P" },
  { icon: Bell, title: "Metas", subtitle: "Define tu objetivo financiero en 5 min", color: "coral", label: "RUTA 5MIN" },
  { icon: Bell, title: "Quiz", subtitle: "¿Qué tan financiero eres?", color: "cyan", label: "QUIZ 2MIN" },
  { icon: Bell, title: "Ruta", subtitle: "Plan personalizado de ahorro", color: "teal", label: "RUTA 8CAP" },
  { icon: Bell, title: "Interés Comp.", subtitle: "Interés compuesto fácil", color: "orange", label: "CALC 1MIN" },
] as const;

const LIVES = [
  { when: "EN 6 HRS", instructor: "Don Pedro", title: "Cómo prestar sin que te coman vivo", subtitle: "Don Pedro · 90 min", duration: "90 min" },
  { when: "VIE 9PM", instructor: "Carlos", title: "Caja registradora: control total", subtitle: "Carlos · 75 min", duration: "75 min" },
  { when: "SAB 7PM", instructor: "Lucía", title: "Coser y vender: tu marca propia", subtitle: "Lucía · 60 min", duration: "60 min" },
  { when: "LUN 8PM", instructor: "Manuel", title: "Tu primer crédito formal", subtitle: "Manuel · 80 min", duration: "80 min" },
] as const;

const PATHS = [
  { title: "Tu primer crédito formal", subtitle: "7 capítulos", chapters: 7, completed: 3, gradient: "bg-gradient-to-br from-[#C8B6E2] to-[#7C3AED]", status: "in-progress" as const },
  { title: "Vende más en tu bodega", subtitle: "5 capítulos", chapters: 5, completed: 0, gradient: "bg-gradient-to-br from-[#F26A2E] to-[#F04A8A]", status: "not-started" as const },
  { title: "Ahorra S/ 100 en 30 días", subtitle: "4 capítulos", chapters: 4, completed: 4, gradient: "bg-gradient-to-br from-[#C4E27A] to-[#1F3A2E]", status: "completed" as const },
] as const;

const RANKINGS = [
  { rank: 1, title: "El Secreto Cap 1", subtitle: "Don Pedro" },
  { rank: 2, title: "Receta Financiera Ep 5", subtitle: "Carlos" },
  { rank: 3, title: "Vuelve al Crédito", subtitle: "Manuel" },
  { rank: 4, title: "Coser tu Futuro Cap 3", subtitle: "Lucía" },
  { rank: 5, title: "Don Pedro × Doña Rosa", subtitle: "Especial" },
] as const;

export default function Home() {
  return (
    <>
      <Sidebar />

      <main>
        <div className="mx-auto max-w-[1200px] px-6 py-6 md:px-10 md:py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Kapitalizando</h1>
              <p className="text-sm text-[#A8AAAE]">
                Educaci&oacute;n financiera y emprendimiento
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F04A8A]/10 text-[#F04A8A]">
                  <Bell className="h-4 w-4" />
                </div>
              </div>
              <button className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F5C53D] px-4 text-sm font-bold text-[#101012] transition-all hover:bg-[#F5C53D]/90">
                <Plus className="h-4 w-4" />
                Nuevo
              </button>
            </div>
          </div>

          {/* Hero - Live en vivo */}
          <section className="card-green mb-8 overflow-hidden p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#F04A8A]/20 px-3 py-1 text-xs font-medium text-[#F04A8A]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#F04A8A]" />
                  EN VIVO ESTA NOCHE
                </div>
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  El Secreto del &Eacute;xito de Barrio
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  Cap&iacute;tulo 2: C&oacute;mo prestarte sin que te coman vivo
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50 max-w-xl">
                  &ldquo;Don Pedro lleva 30 a&ntilde;os en V.E.S. sin caer en un
                  gota a gota. Esta noche te ense&ntilde;a su sistema en vivo.&rdquo;
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/50">
                  <span>🗓 Hoy 9:00 PM</span>
                  <span>⏱ ~90 min</span>
                  <span>👥 312 pre-agendados</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90">
                  <Play className="h-4 w-4 fill-white" />
                  VER EN VIVO
                </button>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Grabaciones recientes */}
          <section className="mb-8">
            <SectionHeader
              title="Grabaciones recientes"
              subtitle="Revive los &uacute;ltimos lives"
              href="/courses"
            />
            <ScrollRow>
              {RECENT_VIDEOS.map((video) => (
                <VideoCard key={video.title} {...video} />
              ))}
            </ScrollRow>
          </section>

          {/* Continuá donde quedaste */}
          <section className="mb-8">
            <SectionHeader
              title="Continu&aacute; donde quedaste"
              subtitle="Tu progreso en los cursos"
              href="/courses"
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {RECENT_VIDEOS.slice(0, 6).map((video, i) => (
                <div
                  key={video.title}
                  className="group overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-2xl">📺</span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-[#101012] line-clamp-1">
                      {video.title}
                    </p>
                    <ProgressBar value={[60, 50, 30, 80, 25, 15][i]} className="mt-2" />
                    <p className="mt-1 text-[11px] text-[#6B6F72]">
                      {[60, 50, 30, 80, 25, 15][i]}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cursos destacados */}
          <section className="mb-8">
            <SectionHeader
              title="Cursos destacados"
              subtitle="Los maestros del barrio te ense&ntilde;an"
              href="/courses"
            />
            <ScrollRow>
              {COURSES.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </ScrollRow>
          </section>

          {/* Herramientas */}
          <section className="mb-8">
            <SectionHeader
              title="Herramientas instant&aacute;neas"
              subtitle="Aplica lo aprendido en minutos"
              href="/tools"
            />
            <ScrollRow>
              {TOOLS.map((tool) => (
                <ToolCard key={tool.title} {...tool} />
              ))}
            </ScrollRow>
          </section>

          {/* Próximos lives */}
          <section className="mb-8">
            <SectionHeader
              title="Pr&oacute;ximos eventos en vivo"
              subtitle="Reserva tu asiento"
              href="/lives"
            />
            <ScrollRow>
              {LIVES.map((live) => (
                <LiveCard key={live.title} {...live} />
              ))}
            </ScrollRow>
          </section>

          {/* Rutas de aprendizaje */}
          <section className="mb-8">
            <SectionHeader
              title="Rutas de aprendizaje"
              subtitle="Series tem&aacute;ticas para dominar un tema"
              href="/courses"
            />
            <ScrollRow>
              {PATHS.map((path) => (
                <PathCard key={path.title} {...path} />
              ))}
            </ScrollRow>
          </section>

          {/* Top 10 */}
          <section className="mb-8">
            <SectionHeader
              title="Top 10 esta semana"
              href="/courses"
            />
            <ScrollRow>
              {RANKINGS.map((item) => (
                <RankCard key={item.rank} {...item} />
              ))}
            </ScrollRow>
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
