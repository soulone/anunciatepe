import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollRow } from "@/components/shared/scroll-arrows";
import { LiveCard } from "@/components/content/live-card";
import { VideoCard } from "@/components/content/video-card";

const UPCOMING_LIVES = [
  { when: "EN 6 HRS", instructor: "Don Pedro", title: "Cómo prestar sin que te coman vivo", subtitle: "Don Pedro · 90 min", duration: "90 min" },
  { when: "VIE 9PM", instructor: "Carlos", title: "Caja registradora: control total", subtitle: "Carlos · 75 min", duration: "75 min" },
  { when: "SAB 7PM", instructor: "Lucía", title: "Coser y vender: tu marca propia", subtitle: "Lucía · 60 min", duration: "60 min" },
  { when: "LUN 8PM", instructor: "Manuel", title: "Tu primer crédito formal", subtitle: "Manuel · 80 min", duration: "80 min" },
  { when: "MIÉ 9PM", instructor: "Tatiana", title: "Detección de fraudes", subtitle: "Tatiana · 70 min", duration: "70 min" },
  { when: "JUE 8PM", instructor: "Juvenal", title: "Reciclaje: segunda oportunidad", subtitle: "Juvenal · 65 min", duration: "65 min" },
] as const;

const PAST_LIVES = [
  { title: "El Secreto Cap. 1", instructor: "Don Pedro", duration: "1h 24m", timeAgo: "Hace 2 días" },
  { title: "Lucía - Crédito", instructor: "Lucía", duration: "1h 47m", timeAgo: "Sem. pas." },
  { title: "Comunidad Q&A Mar", instructor: "Equipo", duration: "58 min", timeAgo: "Hace 1 mes" },
  { title: "Manuel - Pitch", instructor: "Manuel", duration: "1h 12m", timeAgo: "Hace 4 días" },
  { title: "Tatiana - Detect.", instructor: "Tatiana", duration: "1h 08m", timeAgo: "Hace 6 días" },
  { title: "Carlos - Recetas", instructor: "Carlos", duration: "1h 31m", timeAgo: "Hace 8 días" },
] as const;

export default function LivesPage() {
  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <section className="mb-10">
          <SectionHeader
            title="Próximos eventos en vivo"
            subtitle="Reserva tu asiento, son gratis"
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {UPCOMING_LIVES.map((live) => (
              <LiveCard key={live.title} {...live} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Lives pasados"
            subtitle="Revive los mejores momentos"
            href="/courses"
          />
          <ScrollRow>
            {PAST_LIVES.map((video) => (
              <VideoCard key={video.title} {...video} />
            ))}
          </ScrollRow>
        </section>
      </main>
      <Footer />
    </>
  );
}
