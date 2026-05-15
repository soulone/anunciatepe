import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollRow } from "@/components/shared/scroll-arrows";
import { LiveCard } from "@/components/content/live-card";
import { VideoCard } from "@/components/content/video-card";

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

export default async function LivesPage() {
  const supabase = await createClient();
  const [{ data: upcoming }, { data: past }] = await Promise.all([
    supabase.from("lives").select("*").eq("status", "scheduled").order("scheduled_at"),
    supabase.from("recordings").select("*").order("published_at", { ascending: false }).limit(10),
  ]);

  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <section className="mb-10">
          <SectionHeader title="Próximos eventos en vivo" subtitle="Reserva tu asiento, son gratis" />
          {upcoming && upcoming.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((l) => (
                <LiveCard
                  key={l.id}
                  id={l.id}
                  when={new Date(l.scheduled_at).toLocaleDateString("es-PE", { weekday: "short", hour: "2-digit" }).toUpperCase()}
                  instructor=""
                  title={l.title}
                  subtitle={`${l.duration} min`}
                  duration={`${l.duration} min`}
                />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-[#A8AAAE]">No hay próximos lives programados.</p>
          )}
        </section>

        <section>
          <SectionHeader title="Lives pasados" subtitle="Revive los mejores momentos" href="/courses" />
          {past && past.length > 0 ? (
            <ScrollRow>
              {past.map((r) => (
                <VideoCard key={r.id} title={r.title} instructor="" duration={formatDuration(r.duration)} timeAgo={timeAgo(r.published_at)} />
              ))}
            </ScrollRow>
          ) : (
            <p className="mt-6 text-sm text-[#A8AAAE]">No hay grabaciones todavía.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
