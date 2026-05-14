import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

interface PathCardProps {
  title: string;
  subtitle: string;
  chapters: number;
  completed: number;
  gradient: string;
  status: "in-progress" | "not-started" | "completed";
}

export function PathCard({
  title,
  subtitle,
  chapters,
  completed,
  gradient,
  status,
}: PathCardProps) {
  return (
    <div
      className={`min-w-[300px] max-w-[340px] flex-shrink-0 overflow-hidden rounded-[24px] p-5 text-white transition-all duration-300 hover:scale-[1.02] ${gradient}`}
    >
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-white/70">{subtitle}</p>

      <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
        <span>{chapters} capítulos</span>
        {status === "completed" && (
          <span className="flex items-center gap-1 text-[#C4E27A]">
            <CheckCircle className="h-3.5 w-3.5" />
            COMPLETADO
          </span>
        )}
      </div>

      <div className="mt-3 flex gap-1">
        {Array.from({ length: chapters }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < completed ? "bg-[#C4E27A]" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-xs text-white/50">
        {completed}/{chapters} {status === "completed" ? "" : "hechos"}
      </p>

      <div className="mt-5">
        <button
          className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium transition-colors ${
            status === "completed"
              ? "bg-white/10 text-white/70 hover:bg-white/20"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          {status === "completed" ? (
            <>
              Ver certificado
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              {status === "in-progress" ? "Continuar ruta" : "Empezar ruta"}
              <Play className="h-4 w-4 fill-white" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
