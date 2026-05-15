import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { StatsBar } from "@/components/community/stats-bar";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Users, Heart, MessageCircle, Share2 } from "lucide-react";

const PROJECTS = [
  { title: "Bodega 'Don Carlos'", creator: "Carlos M.", goal: "S/ 5,000", raised: "S/ 3,200", backers: 48, progress: 64, daysLeft: 12, category: "Negocio" },
  { title: "Taller de costura 'Lucía'", creator: "Lucía R.", goal: "S/ 8,000", raised: "S/ 6,500", backers: 73, progress: 81, daysLeft: 5, category: "Emprendimiento" },
  { title: "Puesto de jugos 'La Rosa'", creator: "Rosa P.", goal: "S/ 3,000", raised: "S/ 1,800", backers: 29, progress: 60, daysLeft: 20, category: "Comida" },
  { title: "Recicladora 'Juvenal'", creator: "Juvenal T.", goal: "S/ 12,000", raised: "S/ 4,200", backers: 67, progress: 35, daysLeft: 25, category: "Ambiente" },
] as const;

export default function CommunityPage() {
  return (
    <>
      <Topbar />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pt-24 pb-10 md:px-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Comunidad</h1>
            <p className="mt-2 text-zinc-400">
              Proyectos de kapitalistas como tú. Apoya, comparte y crece.
            </p>
          </div>

          <div className="flex gap-2 border-b border-zinc-800 pb-4">
            {["Proyectos", "Foro", "Eventos", "Top colaboradores"].map((tab) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  tab === "Proyectos"
                    ? "bg-primary text-black"
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-lg bg-[#141414] transition-all duration-300 hover:bg-[#1a1a1a]"
              >
                <div className="relative aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <div className="flex h-full w-full items-center justify-center">
                    <Users className="h-10 w-10 text-zinc-700" />
                  </div>
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 px-2 py-0.5 text-xs text-zinc-300 backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{project.title}</h3>
                      <p className="text-xs text-zinc-500">{project.creator}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-500 hover:text-red-400"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-white">{project.raised}</span>
                      <span className="text-zinc-500">{project.goal}</span>
                    </div>
                    <ProgressBar value={project.progress} className="mt-1" />
                    <div className="mt-1 flex justify-between text-xs text-zinc-600">
                      <span>{project.backers} backers</span>
                      <span>{project.daysLeft} días restantes</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <Button className="flex-1 bg-primary text-xs font-bold text-black hover:bg-primary/90">
                      Apoyar proyecto
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-zinc-500 hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-zinc-500 hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <StatsBar />
      </main>
      <Footer />
    </>
  );
}
