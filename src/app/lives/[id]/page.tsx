import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { Calendar, Clock, Users, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function LiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: live } = await supabase.from("lives").select("*").eq("id", id).single();

  if (!live) notFound();

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1000px] px-6 py-8 md:px-10">
        <nav className="mb-6 flex items-center gap-2 text-sm text-[#909296]">
          <Link href="/lives" className="transition-colors hover:text-white">Lives</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate text-white">{live.title}</span>
        </nav>
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: live.status === "live" ? "rgba(240,74,138,0.2)" : live.status === "scheduled" ? "rgba(245,197,61,0.2)" : "rgba(168,170,174,0.2)",
              color: live.status === "live" ? "#F04A8A" : live.status === "scheduled" ? "#F5C53D" : "#A8AAAE",
            }}
          >
            <span className={`h-2 w-2 rounded-full ${live.status === "live" ? "animate-pulse bg-[#F04A8A]" : "bg-current"}`} />
            {live.status === "live" ? "EN VIVO" : live.status === "scheduled" ? "Programado" : "Finalizado"}
          </div>
          <h1 className="text-3xl font-bold text-white">{live.title}</h1>
          <p className="mt-3 text-[#A8AAAE]">{live.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#A8AAAE]">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(live.scheduled_at).toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> ~{live.duration} min</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {live.preregistered_count} pre-agendados</span>
          </div>
        </div>
        <div className="aspect-video w-full rounded-[24px] bg-[#17181B] flex items-center justify-center">
          <p className="text-[#A8AAAE]">{live.status === "finished" ? "Grabación disponible pronto" : "El live comenzará en la fecha programada"}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
