"use client";

import Link from "next/link";
import { ArrowRight, Wrench, Handshake, Crown } from "lucide-react";
import { PreviewCard } from "./preview-card";
import { ScrollRow } from "./scroll-row";

interface ContentShowcaseProps {
  projects: any[];
  tools: any[];
}

export function ContentShowcase({ projects, tools }: ContentShowcaseProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
      {/* Fila 1: Mini Apps — PERFIL 1 (bodeguero) + PERFIL 2 (digital) */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <Wrench className="h-6 w-6 text-[#F26A2E]" />
              Herramientas que te sacan de apuros
            </h2>
            <p className="mt-1 text-sm text-[#909296]">
              Calcula, organiza y decide sin complicaciones.
            </p>
          </div>
          <Link href="/auth/register" className="flex items-center gap-1 text-sm font-medium text-[#F26A2E] transition-colors hover:text-[#F26A2E]/80">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ScrollRow>
          {tools.map((t: any) => (
            <PreviewCard key={t.id ?? t.slug} type="tool" title={t.title} subtitle={t.type} href="/auth/register" />
          ))}
        </ScrollRow>
      </div>

      {/* Fila 2: Crowdfunding — PERFIL 1 (bodeguero) */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#C4E27A]/10 px-3 py-1 text-xs font-medium text-[#C4E27A]">
              Proyectos activos
            </div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <Handshake className="h-6 w-6 text-[#C4E27A]" />
              Apoya a otros kapitalistas
            </h2>
            <p className="mt-1 text-sm text-[#909296]">
              Tu aporte, por pequeño que sea, mueve el barrio.
            </p>
          </div>
          <Link href="/auth/register" className="flex items-center gap-1 text-sm font-medium text-[#C4E27A] transition-colors hover:text-[#C4E27A]/80">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ScrollRow>
          {projects.map((p: any) => {
            const progress = p.goal_amount > 0 ? Math.round((p.raised_amount / p.goal_amount) * 100) : 0;
            return (
              <PreviewCard
                key={p.id}
                type="project"
                title={p.title}
                subtitle={p.description?.slice(0, 60)}
                href="/auth/register"
                progress={progress}
                raised={Number(p.raised_amount).toLocaleString()}
                goal={Number(p.goal_amount).toLocaleString()}
                backers={p.backers_count}
                category={p.category}
              />
            );
          })}
        </ScrollRow>
      </div>

      {/* Fila 3: Battle Pass — PERFIL 3 (ambicioso) */}
      <div className="rounded-[20px] bg-gradient-to-br from-[#1F3A2E] to-[#0E0E10] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#F5C53D]/10 px-3 py-1 text-xs font-medium text-[#F5C53D]">
              <Crown className="h-3.5 w-3.5" />
          Para los que quieren más
            </div>
            <h2 className="text-xl font-bold text-white md:text-2xl">
              Lleva tu negocio al siguiente nivel
            </h2>
            <p className="mt-2 max-w-lg text-sm text-[#909296]">
              Mentorías, herramientas premium, contenido exclusivo 
              y protección para tu emprendimiento.
            </p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm">
              {[
                { label: "Mentorías con expertos", emoji: "🎓" },
                { label: "Herramientas premium", emoji: "⚡" },
                { label: "Contenido exclusivo", emoji: "🔒" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <span>{f.emoji}</span>
                  <span className="text-[#909296]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/auth/register"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-all hover:bg-[#F5C53D]/90 active:scale-[0.97]"
          >
            Conoce el Battle Pass <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Banner sutíl: Próximamente */}
      <div className="mt-12 rounded-[12px] border border-white/5 bg-[#141416] px-4 py-3 text-center">
        <p className="text-sm text-[#909296]">
          📚 Cursos y apps para empresas están en camino. 
          <span className="text-[#F26A2E]"> Muy pronto.</span>
        </p>
      </div>
    </section>
  );
}
