import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollRow } from "@/components/shared/scroll-arrows";
import { CourseCard } from "@/components/content/course-card";

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const safe = courses ?? [];

  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <SectionHeader title="Todos los cursos" subtitle="Los maestros del barrio te enseñan" />
        {safe.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {safe.map((c) => (
              <CourseCard key={c.id} title={c.title} subtitle={c.description?.slice(0, 60)} instructor="" />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-[#A8AAAE]">No hay cursos publicados todavía.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
