import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BENEFITS = [
  {
    icon: "🎓",
    title: "Cursos prácticos",
    desc: "Aprende con kapitalistas que han vivido lo mismo que tú. Finanzas, emprendimiento y más.",
    cta: "Ver cursos",
    href: "/courses",
    gradient: "from-[#F26A2E]/10 to-transparent",
    border: "border-[#F26A2E]/20",
    accent: "text-[#F26A2E]",
  },
  {
    icon: "🔴",
    title: "Lives en vivo",
    desc: "Conecta cada semana con maestros del barrio. Pregunta en directo y resuelve tus dudas.",
    cta: "Ver lives",
    href: "/lives",
    gradient: "from-[#F04A8A]/10 to-transparent",
    border: "border-[#F04A8A]/20",
    accent: "text-[#F04A8A]",
  },
  {
    icon: "🧰",
    title: "Herramientas gratis",
    desc: "Calculadoras, quizzes y wizards para aplicar lo aprendido al instante.",
    cta: "Ver apps",
    href: "/tools",
    gradient: "from-[#C4E27A]/10 to-transparent",
    border: "border-[#C4E27A]/20",
    accent: "text-[#C4E27A]",
  },
];

export function LandingBenefits() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-white">
          Todo lo que necesitas en un solo lugar
        </h2>
        <p className="mt-2 text-[#909296]">
          Capacitación real para kapitalistas de verdad.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {BENEFITS.map((b) => (
          <Link
            key={b.title}
            href={b.href}
            className={`group rounded-[20px] border ${b.border} bg-gradient-to-br ${b.gradient} p-6 transition-all hover:scale-[1.02]`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-white/5 text-2xl">
              {b.icon}
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-white">
              {b.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#909296]">
              {b.desc}
            </p>
            <div className={`mt-4 flex items-center gap-1 text-sm font-medium ${b.accent} transition-colors`}>
              {b.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
