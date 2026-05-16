"use client";

import Link from "next/link";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Antes no sabía cómo manejar mi dinero. Los cursos de Kapitalizando me enseñaron a ahorrar, invertir y hacer crecer mi bodega. Ahora hasta tengo empleados.",
    author: "Don Pedro",
    role: "Bodeguero, V.E.S.",
    initial: "DP",
    color: "bg-[#F26A2E]/10 text-[#F26A2E]",
  },
  {
    quote:
      "Los lives en vivo son lo mejor. Puedo preguntar directamente a los maestros y me responden al toque. He aprendido más aquí que en cualquier otro lado.",
    author: "Rosa",
    role: "Emprendedora, SJL",
    initial: "R",
    color: "bg-[#F04A8A]/10 text-[#F04A8A]",
  },
  {
    quote:
      "Las herramientas como la calculadora de préstamos me salvaron de caer en un gota a gota. Esto debería ser obligatorio para todos los emprendedores.",
    author: "Carlos",
    role: "Dueño de mercado, Comas",
    initial: "C",
    color: "bg-[#C4E27A]/10 text-[#C4E27A]",
  },
];

export function LandingTestimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-white">
          Lo que dicen los kapitalistas
        </h2>
        <p className="mt-2 text-[#909296]">
          Más de 42 mil personas ya confían en nosotros.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="card-dark group rounded-[20px] p-6 transition-all hover:scale-[1.02]"
          >
            <Quote className="mb-3 h-6 w-6 text-[#F26A2E]/30" />
            <p className="text-sm leading-relaxed text-[#909296]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${t.color}`}
              >
                {t.initial}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{t.author}</p>
                <p className="text-xs text-[#909296]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Final */}
      <div className="mt-16 rounded-[24px] bg-gradient-to-br from-[#F26A2E]/10 to-[#F5C53D]/10 p-8 text-center md:p-12">
        <h3 className="font-heading text-2xl font-bold text-white">
          🚀 Únete a 42,317 kapitalistas
        </h3>
        <p className="mt-2 text-[#909296]">
          Crea tu cuenta gratis y empieza a transformar tu futuro financiero.
        </p>

        <div className="mt-6 mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <Link
            href="/auth/register"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#F26A2E] py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]"
          >
            Crear cuenta gratuita →
          </Link>
          <Link
            href="/courses"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.97]"
          >
            Ver cursos gratis
          </Link>
        </div>
      </div>
    </section>
  );
}
