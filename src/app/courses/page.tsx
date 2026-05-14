import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { CourseCard } from "@/components/content/course-card";

const ALL_COURSES = [
  { title: "EL SECRETO...", subtitle: "Aprende a prestar sin riesgo en 7 lecciones", instructor: "Don Pedro" },
  { title: "RECETAS", subtitle: "Finanzas para tu emprendimiento", instructor: "Carlos" },
  { title: "COSER TU FUTUR...", subtitle: "Vende lo que haces", instructor: "Lucía" },
  { title: "TALLER", subtitle: "Tu primer crédito formal", instructor: "Manuel" },
  { title: "SALÓN PRO", subtitle: "Servicios profesionales", instructor: "Tatiana" },
  { title: "RECICLA", subtitle: "Economía circular", instructor: "Juvenal" },
  { title: "MARKETING", subtitle: "Vende más en redes", instructor: "Rosa" },
  { title: "AHORRO", subtitle: "Ahorra S/100 en 30 días", instructor: "Don Pedro" },
  { title: "INVERSIÓN", subtitle: "Haz crecer tu dinero", instructor: "Carlos" },
  { title: "CONTABILIDAD", subtitle: "Lleva tus cuentas claras", instructor: "Tatiana" },
  { title: "NEGOCIACIÓN", subtitle: "Consigue mejores precios", instructor: "Manuel" },
  { title: "DIGITAL", subtitle: "Vende por internet", instructor: "Lucía" },
] as const;

export default function CoursesPage() {
  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <SectionHeader
          title="Todos los cursos"
          subtitle="Los maestros del barrio te enseñan"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {ALL_COURSES.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
