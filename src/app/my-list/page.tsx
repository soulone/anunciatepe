import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollRow } from "@/components/shared/scroll-arrows";
import { VideoCard } from "@/components/content/video-card";
import { Bookmark, Heart } from "lucide-react";

const SAVED_VIDEOS = [
  { title: "Don Pedro Cap. 1", instructor: "Don Pedro", duration: "1h 24m", timeAgo: "Guardado" },
  { title: "Lucía - Crédito", instructor: "Lucía", duration: "1h 47m", timeAgo: "Guardado" },
  { title: "Comunidad Q&A Mar", instructor: "Equipo", duration: "58 min", timeAgo: "Guardado" },
  { title: "Manuel - Pitch", instructor: "Manuel", duration: "1h 12m", timeAgo: "Guardado" },
] as const;

export default function MyListPage() {
  return (
    <>
      <Topbar isAuthenticated />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <div className="mb-6 flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-white">Mi lista</h1>
        </div>

        <section className="mb-10">
          <SectionHeader title="Guardados" subtitle="Videos que marcaste para ver después" />
          <ScrollRow>
            {SAVED_VIDEOS.map((video) => (
              <div key={video.title} className="relative">
                <VideoCard {...video} />
                <button className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-red-400 backdrop-blur-sm transition-colors hover:bg-black/80">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            ))}
          </ScrollRow>
        </section>

        <section>
          <SectionHeader
            title="Recomendados para ti"
            subtitle="Basado en lo que has visto"
            href="/courses"
          />
          <ScrollRow>
            {SAVED_VIDEOS.map((video) => (
              <VideoCard key={`rec-${video.title}`} {...video} />
            ))}
          </ScrollRow>
        </section>
      </main>
      <Footer />
    </>
  );
}
