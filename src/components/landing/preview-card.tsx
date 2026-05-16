import Link from "next/link";
import { TrendingUp, Wrench, ArrowRight } from "lucide-react";

interface PreviewCardProps {
  type: "project" | "tool";
  title: string;
  subtitle?: string;
  href: string;
  progress?: number;
  raised?: string;
  goal?: string;
  backers?: number;
  category?: string;
}

export function PreviewCard({ type, title, subtitle, href, progress, raised, goal, backers, category }: PreviewCardProps) {
  if (type === "project") {
    return (
      <Link href={href} className="group block min-w-[260px] max-w-[300px] flex-shrink-0 overflow-hidden rounded-[16px] bg-[#1F3A2E] p-5 transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/70">{category}</span>
          <TrendingUp className="h-4 w-4 text-[#C4E27A]" />
        </div>
        <h3 className="mt-3 text-base font-semibold text-white line-clamp-2">{title}</h3>
        <p className="mt-1 text-sm text-white/60 line-clamp-2">{subtitle}</p>
        {progress !== undefined && (
          <>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#C4E27A] transition-all duration-500" style={{ width: `${Math.min(100, progress)}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#C4E27A]">S/{raised} <span className="font-normal text-white/50">de S/{goal}</span></span>
              <span className="text-white/50">{backers} backers</span>
            </div>
          </>
        )}
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#C4E27A] opacity-0 transition-opacity group-hover:opacity-100">
          Invertir en este proyecto <ArrowRight className="h-3 w-3" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block min-w-[200px] max-w-[220px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
        <div className="flex h-full w-full items-center justify-center">
          <Wrench className="h-8 w-8 text-[#F26A2E]/40" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium leading-snug text-[#0E0E10] line-clamp-2">{title}</h3>
        <p className="mt-1 text-xs text-[#909296] capitalize">{subtitle}</p>
      </div>
    </Link>
  );
}
