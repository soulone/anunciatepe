"use client";

import Link from "next/link";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Antes no sabía cómo manejar mi dinero. Los cursos de Kapitalizando me enseñaron a ahorrar, invertir y hacer crecer mi bodega.",
    author: "Don Pedro",
    role: "Bodeguero, V.E.S.",
    initial: "DP",
    color: "bg-[#F26A2E]/10 text-[#F26A2E]",
  },
  {
    quote: "Los lives en vivo son lo mejor. Puedo preguntar directamente a los maestros y me responden al toque.",
    author: "Rosa",
    role: "Emprendedora, SJL",
    initial: "R",
    color: "bg-[#F04A8A]/10 text-[#F04A8A]",
  },
];

export function LandingTestimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        {/* Testimonios */}
        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-white">
            Lo que dicen los kapitalistas
          </h2>
          <p className="text-sm text-[#909296]">Más de 42 mil personas ya confían en nosotros.</p>
          <div className="space-y-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="card-dark rounded-[16px] p-4 transition-all hover:scale-[1.01]">
                <Quote className="mb-2 h-4 w-4 text-[#F26A2E]/30" />
                <p className="text-sm leading-relaxed text-[#909296]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${t.color}`}>{t.initial}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.author}</p>
                    <p className="text-xs text-[#909296]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col justify-center rounded-[20px] bg-gradient-to-br from-[#1F3A2E] to-[#0E0E10] p-8 text-center md:p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5C53D]/10">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold text-white">Únete a la comunidad</h3>
          <p className="mt-2 text-sm text-[#909296]">
            Crea tu cuenta gratis y empieza a transformar tu futuro financiero.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/auth/register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#F26A2E] px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
              Crear cuenta gratuita →
            </Link>
            <Link href="/courses"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.97]">
              Ver cursos gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
