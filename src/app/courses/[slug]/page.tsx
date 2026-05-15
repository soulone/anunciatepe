import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Play, Download, Share2, ChevronDown } from "lucide-react";

const CHAPTERS = [
  { title: "Introducción: ¿Por qué prestar?", duration: "12:34", isFree: true },
  { title: "Conoce a tu prestatario", duration: "18:20", isFree: true },
  { title: "Las 5 reglas del préstamo seguro", duration: "24:15", isFree: false },
  { title: "Cómo calcular intereses justos", duration: "15:42", isFree: false },
  { title: "El contrato verbal que sí funciona", duration: "20:08", isFree: false },
  { title: "Qué hacer si no te pagan", duration: "22:30", isFree: false },
  { title: "Sistema de Don Pedro: el método completo", duration: "35:00", isFree: false },
] as const;

export default function CourseDetailPage() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900">
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <Play className="h-8 w-8 fill-primary text-primary" />
                </div>
                <p className="text-sm text-zinc-400">Capítulo 1: Introducción</p>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-primary text-xs font-bold text-black">
                  GRATIS
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs text-zinc-300">
                12:34
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white md:text-3xl">
                    El Secreto del Éxito de Barrio
                  </h1>
                  <p className="mt-2 text-zinc-400">
                    Aprende el sistema de Don Pedro para prestar dinero sin
                    riesgo. 30 años de experiencia en V.E.S. en 7 capítulos.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-zinc-500">
                <div>
                  <span className="font-medium text-zinc-300">Instructor</span>
                  <p>Don Pedro</p>
                </div>
                <div>
                  <span className="font-medium text-zinc-300">Capítulos</span>
                  <p>7</p>
                </div>
                <div>
                  <span className="font-medium text-zinc-300">Duración</span>
                  <p>2h 28min</p>
                </div>
                <div>
                  <span className="font-medium text-zinc-300">Nivel</span>
                  <p>Principiante</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-zinc-400">Tu progreso</span>
                <ProgressBar value={15} className="w-40" />
                <span className="text-xs text-zinc-500">15%</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white">Acerca de este curso</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Don Pedro lleva 30 años prestando dinero en Villa El Salvador
                sin caer en un gota a gota. En este curso te enseña su sistema
                probado: cómo evaluar prestatarios, calcular intereses justos,
                y recuperar tu dinero sin perder amigos ni clientes.
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-zinc-800 bg-[#141414]">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white">
                  Contenido del curso
                </h3>
                <p className="mt-1 text-xs text-zinc-500">7 capítulos · 2h 28min</p>
              </div>
              <div className="divide-y divide-zinc-800">
                {CHAPTERS.map((chapter, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-zinc-800">
                      {chapter.isFree ? (
                        <Play className="h-3.5 w-3.5 fill-primary text-primary" />
                      ) : (
                        <span className="text-xs font-medium text-zinc-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-zinc-300">
                        {chapter.title}
                      </p>
                      <p className="text-xs text-zinc-600">{chapter.duration}</p>
                    </div>
                    {chapter.isFree && (
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-[10px] text-primary"
                      >
                        GRATIS
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
