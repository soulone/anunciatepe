"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Target, DollarSign, Shield } from "lucide-react";
import { PreviewCard } from "./preview-card";
import { ScrollRow } from "./scroll-row";

interface ContentShowcaseProps {
  courses: any[];
  projects: any[];
  tools: any[];
}

export function ContentShowcase({ courses, projects, tools }: ContentShowcaseProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
      <div className="grid gap-5 md:grid-cols-[2fr_1.2fr_1fr]">
        {/* Panel 1: Cursos — grande */}
        <div className="card-light rounded-[20px] p-5 animate-[slideRight_0.6s_ease-out]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0E0E10]">📚 Cursos</h2>
              <p className="text-xs text-[#909296]">Aprende con los maestros del barrio</p>
            </div>
            <Link href="/courses" className="flex items-center gap-0.5 text-xs font-medium text-[#F26A2E]">
              Ver todo <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ScrollRow>
            {courses.map((c: any) => (
              <PreviewCard key={c.id ?? c.slug} type="course" title={c.title} subtitle={c.category} href={`/courses/${c.slug}`} />
            ))}
          </ScrollRow>
        </div>

        {/* Panel 2: Crowdfunding — mediano */}
        <div className="rounded-[20px] bg-[#1F3A2E] p-5 animate-[slideLeft_0.6s_ease-out_0.2s_both]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">🤝 Crowdfunding</h2>
              <p className="text-xs text-white/60">Apoya proyectos del barrio</p>
            </div>
            <Link href="/comunidad" className="flex items-center gap-0.5 text-xs font-medium text-[#C4E27A]">
              Ver todo <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {projects.slice(0, 3).map((p: any) => {
              const progress = p.goal_amount > 0 ? Math.round((p.raised_amount / p.goal_amount) * 100) : 0;
              return (
                <PreviewCard
                  key={p.id}
                  type="project"
                  title={p.title}
                  subtitle={p.description?.slice(0, 60)}
                  href="/comunidad"
                  progress={progress}
                  raised={`S/${Number(p.raised_amount).toLocaleString()}`}
                  goal={`S/${Number(p.goal_amount).toLocaleString()}`}
                  backers={p.backers_count}
                  category={p.category}
                />
              );
            })}
          </div>
        </div>

        {/* Panel 3: Mini Apps — mediano */}
        <div className="card-light rounded-[20px] p-5 animate-[slideRight_0.6s_ease-out_0.4s_both]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0E0E10]">🧰 Mini Apps</h2>
              <p className="text-xs text-[#909296]">Herramientas prácticas</p>
            </div>
            <Link href="/tools" className="flex items-center gap-0.5 text-xs font-medium text-[#F26A2E]">
              Ver todo <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ScrollRow>
            {tools.slice(0, 4).map((t: any) => (
              <PreviewCard key={t.id ?? t.slug} type="tool" title={t.title} subtitle={t.type} href={`/tools/${t.slug}`} />
            ))}
          </ScrollRow>
        </div>
      </div>

      {/* Panel 4: Apps para empresas — full width */}
      <div className="mt-5 rounded-[20px] bg-gradient-to-br from-[#F26A2E]/10 to-[#F5C53D]/10 p-6 animate-[fadeInUp_0.5s_ease-out_0.6s_both]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#F26A2E]/10 px-3 py-1 text-xs font-medium text-[#F26A2E]">
              🏢 Nuevo
            </div>
            <h2 className="text-xl font-bold text-white">Apps para tu empresa</h2>
            <p className="mt-1 text-sm text-[#909296]">
              Control de caja, reportes diarios y herramientas para tu equipo.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {[
                { icon: TrendingUp, label: "Control de caja", desc: "Lleva tus cuentas al día" },
                { icon: Target, label: "Reportes", desc: "Visualiza tus ganancias" },
                { icon: Shield, label: "Equipo", desc: "Colabora con tu personal" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 rounded-[12px] bg-white/5 px-4 py-3">
                  <f.icon className="h-5 w-5 text-[#F5C53D]" />
                  <div>
                    <p className="text-sm font-medium text-white">{f.label}</p>
                    <p className="text-xs text-[#909296]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/tools"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-all hover:bg-[#F5C53D]/90 active:scale-[0.97]"
          >
            Saber más <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
