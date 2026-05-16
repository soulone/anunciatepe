"use client";

import Link from "next/link";
import { Quote, Rocket } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Con la calculadora de préstamos dejé de perder plata en intereses. Me salvé de caer en un gota a gota.",
    author: "Don Pedro",
    role: "Bodeguero, V.E.S.",
    initial: "DP",
    color: "bg-[#F26A2E]/10 text-[#F26A2E]",
  },
  {
    quote: "Gracias al crowdfunding de la comunidad pude comprar las máquinas para mi taller. Nunca imaginé recibir tanto apoyo.",
    author: "Lucía",
    role: "Emprendedora, Villa María",
    initial: "L",
    color: "bg-[#C4E27A]/10 text-[#C4E27A]",
  },
];

export function LandingTestimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-white">
            Lo que dicen los kapitalistas
          </h2>
          <p className="text-sm text-[#909296]">
            Más de 42 mil personas ya usan nuestras herramientas y crowdfunding.
          </p>
          <div className="space-y-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="card-light rounded-[16px] p-5 transition-all hover:scale-[1.01]">
                <Quote className="mb-2 h-5 w-5 text-[#F26A2E]/30" />
                <p className="text-sm leading-relaxed text-[#0E0E10]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${t.color}`}>{t.initial}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#0E0E10]">{t.author}</p>
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
            <Rocket className="h-7 w-7 text-[#F5C53D]" />
          </div>
          <h3 className="text-xl font-bold text-white">Únete a 42,317 kapitalistas</h3>
          <p className="mt-2 text-sm text-[#909296]">
            Accede a herramientas, apoya proyectos y haz crecer tu negocio.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/auth/register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#F26A2E] px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
              Crear cuenta gratuita →
            </Link>
            <Link href="/comunidad"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.97]">
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
