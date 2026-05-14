import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "42.317", label: "Kapitalistas activos" },
  { value: "S/ 1.2M", label: "Ahorrado en comunidad" },
  { value: "8.124", label: "Retos completados" },
  { value: "312", label: "Proyectos financiados" },
] as const;

export function StatsBar() {
  return (
    <section className="rounded-[24px] bg-[#17181B] py-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold text-white">
            La comunidad sigue creciendo
          </h2>
          <p className="mt-1 text-sm text-[#A8AAAE]">
            Cada semana se suman más kapitalistas. Únete.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#F5C53D] md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[#A8AAAE]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#101012] transition-all hover:bg-[#F5C53D]/90">
            Únete a la comunidad
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
