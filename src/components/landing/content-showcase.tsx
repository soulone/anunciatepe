"use client";

import Link from "next/link";
import { ArrowRight, Handshake, Wrench, Building2, BookOpen, TrendingUp, Target, DollarSign, Shield } from "lucide-react";
import { PreviewCard } from "./preview-card";
import { ScrollRow } from "./scroll-row";

interface ContentShowcaseProps {
  projects: any[];
  tools: any[];
}

export function ContentShowcase({ projects, tools }: ContentShowcaseProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
      {/* Fila 1: Crowdfunding — PRODUCTO ESTRELLA */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#C4E27A]/10 px-3 py-1 text-xs font-medium text-[#C4E27A]">
              🔥 Ahora en vivo
            </div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <Handshake className="h-6 w-6 text-[#C4E27A]" />
              Crowdfunding — Proyectos del barrio
            </h2>
            <p className="mt-1 text-sm text-[#909296]">
              Apoya y sé parte del crecimiento de tu comunidad
            </p>
          </div>
          <Link href="/comunidad" className="flex items-center gap-1 text-sm font-medium text-[#C4E27A] transition-colors hover:text-[#C4E27A]/80">
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
                href="/comunidad"
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

      {/* Fila 2: Mini Apps */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <Wrench className="h-6 w-6 text-[#F26A2E]" />
              Mini Apps — Herramientas prácticas
            </h2>
            <p className="mt-1 text-sm text-[#909296]">
              Calculadoras, quizzes y wizards para tu negocio
            </p>
          </div>
          <Link href="/tools" className="flex items-center gap-1 text-sm font-medium text-[#F26A2E] transition-colors hover:text-[#F26A2E]/80">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ScrollRow>
          {tools.map((t: any) => (
            <PreviewCard key={t.id ?? t.slug} type="tool" title={t.title} subtitle={t.type} href={`/tools/${t.slug}`} />
          ))}
        </ScrollRow>
      </div>

      {/* Fila 3: Próximamente — Cursos + Apps Empresa */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[20px] border border-dashed border-white/10 bg-[#141416] p-6 transition-all hover:border-[#F26A2E]/30">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F26A2E]/10">
            <BookOpen className="h-6 w-6 text-[#F26A2E]" />
          </div>
          <h3 className="text-lg font-bold text-white">📚 Cursos</h3>
          <p className="mt-1 text-sm text-[#909296]">
            Educación financiera con los maestros del barrio. Próximamente.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#F5C53D]/10 px-3 py-1 text-xs font-medium text-[#F5C53D]">
            🚧 Próximamente
          </div>
        </div>

        <div className="rounded-[20px] border border-dashed border-white/10 bg-[#141416] p-6 transition-all hover:border-[#F26A2E]/30">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F5C53D]/10">
            <Building2 className="h-6 w-6 text-[#F5C53D]" />
          </div>
          <h3 className="text-lg font-bold text-white">🏢 Apps para empresas</h3>
          <p className="mt-1 text-sm text-[#909296]">
            Control de caja, reportes y herramientas para tu equipo. Muy pronto.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#F5C53D]/10 px-3 py-1 text-xs font-medium text-[#F5C53D]">
            🚧 Próximamente
          </div>
        </div>
      </div>
    </section>
  );
}
