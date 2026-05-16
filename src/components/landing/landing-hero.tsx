"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const STATS = [
  { value: "42K+", label: "Kapitalistas" },
  { value: "S/1.2M", label: "Ahorrados" },
  { value: "8K+", label: "Retos" },
  { value: "312", label: "Proyectos" },
];

export function LandingHero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden rounded-none">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #F26A2E 0%, transparent 50%)" }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F26A2E]/10 px-3 py-1 text-xs font-medium text-[#F26A2E]">
            💪 Comunidad kapitalista
          </div>

          <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
            Educación financiera<br />
            <span className="text-[#F26A2E]">para kapitalistas</span>
          </h1>

          <p className="mt-4 max-w-lg text-lg text-[#909296]">
            Aprende con los maestros del barrio. Lives, cursos y herramientas
            para hacer crecer tu negocio.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/auth/register"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F26A2E] px-8 text-sm font-bold text-white shadow-lg shadow-[#F26A2E]/25 transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]"
            >
              🚀 Empieza gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.97]"
            >
              <Play className="h-4 w-4 fill-white" />
              Ver cursos
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-bold text-[#F5C53D]">{s.value}</p>
                <p className="text-[#909296]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
