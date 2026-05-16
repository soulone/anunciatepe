"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "42K+", label: "Kapitalistas" },
  { value: "S/1.2M", label: "Ahorrados" },
  { value: "8K+", label: "Retos" },
  { value: "312", label: "Proyectos" },
];

export function LandingHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-10 md:px-10 md:pt-32">
      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
        {/* Col 1: Texto */}
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#F26A2E]/10 px-3 py-1 text-xs font-medium text-[#F26A2E]">
            💪 Comunidad kapitalista
          </div>
          <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
            Educación financiera<br />
            <span className="text-[#F26A2E]">para kapitalistas</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#909296]">
            Aprende con los maestros del barrio. Cursos, herramientas, 
            crowdfunding y apps para hacer crecer tu negocio.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white shadow-lg shadow-[#F26A2E]/25 transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]"
            >
              🚀 Empieza gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.97]"
            >
              🔍 Ver cursos
            </Link>
          </div>
        </div>

        {/* Col 2: Stats Card */}
        <div className="flex flex-col justify-center">
          <div className="card-light rounded-[20px] p-6 md:p-8">
            <p className="text-sm font-semibold text-[#0E0E10]">La comunidad crece</p>
            <p className="mt-1 text-xs text-[#909296]">Cada semana se suman más kapitalistas.</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-2xl font-bold text-[#F26A2E] md:text-3xl">{s.value}</p>
                  <p className="text-xs text-[#909296]">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[12px] bg-[#F26A2E]/5 p-3 text-center text-sm">
              <span className="font-medium text-[#F26A2E]">⭐ 4.8</span>
              <span className="text-[#909296]"> — Calificación de la comunidad</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
