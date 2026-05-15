import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { ProgressBar } from "@/components/shared/progress-bar";
import { VideoPlayer } from "@/components/shared/video-player";
import { CheckoutButton } from "@/components/payments/checkout-button";
import { notFound } from "next/navigation";
import { Play, Download, Share2, BookOpen } from "lucide-react";

function formatDuration(sec: number): string {
  if (!sec) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${m} min`;
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!course) notFound();

  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("course_id", course.id)
    .order("order_index");

  const safeChapters = chapters ?? [];
  const firstChapter = safeChapters[0];
  const totalDuration = safeChapters.reduce((sum, ch) => sum + (ch.duration ?? 0), 0);

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <VideoPlayer
              src={firstChapter?.video_url ?? undefined}
              title={firstChapter?.title ?? course.title}
            />

            <div className="mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white md:text-3xl">{course.title}</h1>
                  <p className="mt-2 text-[#A8AAAE]">{course.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A8AAAE] transition-colors hover:bg-white/10 hover:text-white">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-6 text-sm text-[#A8AAAE]">
                <div>
                  <span className="font-medium text-white">Categoría</span>
                  <p>{course.category}</p>
                </div>
                <div>
                  <span className="font-medium text-white">Capítulos</span>
                  <p>{safeChapters.length}</p>
                </div>
                <div>
                  <span className="font-medium text-white">Duración</span>
                  <p>{formatDuration(totalDuration)}</p>
                </div>
                <div>
                  <span className="font-medium text-white">Nivel</span>
                  <p className="capitalize">{course.level === "beginner" ? "Principiante" : course.level === "intermediate" ? "Intermedio" : "Avanzado"}</p>
                </div>
              </div>

              {course.price > 0 && (
                <div className="mt-4">
                  <CheckoutButton
                    productKey={course.slug}
                    productName={course.title}
                    price={course.price}
                    type="course"
                    itemId={course.id}
                  />
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white">Acerca de este curso</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#A8AAAE]">{course.description}</p>
            </div>
          </div>

          <div>
            <div className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#17181B]">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white">Contenido del curso</h3>
                <p className="mt-1 text-xs text-[#A8AAAE]">{safeChapters.length} capítulos · {formatDuration(totalDuration)}</p>
              </div>
              {safeChapters.length > 0 ? (
                <div className="divide-y divide-[rgba(255,255,255,0.06)]">
                  {safeChapters.map((ch, i) => (
                    <div key={ch.id} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5">
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] ${ch.is_free ? "bg-[#F26A2E]/10" : "bg-white/5"}`}>
                        {ch.is_free ? (
                          <Play className="h-3.5 w-3.5 fill-[#F26A2E] text-[#F26A2E]" />
                        ) : (
                          <span className="text-xs font-medium text-[#A8AAAE]">{String(i + 1).padStart(2, "0")}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-white">{ch.title}</p>
                        <p className="text-xs text-[#A8AAAE]/60">{formatDuration(ch.duration ?? 0)}</p>
                      </div>
                      {ch.is_free && (
                        <span className="shrink-0 rounded-full border border-[#F26A2E]/30 px-2 py-0.5 text-[10px] font-medium text-[#F26A2E]">
                          GRATIS
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <BookOpen className="mx-auto h-8 w-8 text-[#A8AAAE]/30" />
                  <p className="mt-2 text-sm text-[#A8AAAE]">Sin capítulos todavía</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
