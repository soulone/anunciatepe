import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface PreviewCardProps {
  type: "course" | "project" | "tool";
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
      <Link href={href} className="group block min-w-[220px] max-w-[250px] flex-shrink-0 overflow-hidden rounded-[16px] bg-[#1F3A2E] p-4 transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">{category}</span>
          <TrendingUp className="h-4 w-4 text-[#C4E27A]" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-white line-clamp-2">{title}</h3>
        <p className="mt-1 text-xs text-white/60">{subtitle}</p>
        {progress !== undefined && (
          <>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#C4E27A] transition-all" style={{ width: `${Math.min(100, progress)}%` }} />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-white/50">
              <span>{raised} / {goal}</span>
              <span>{backers} backers</span>
            </div>
          </>
        )}
      </Link>
    );
  }

  return (
    <Link href={href} className="group block min-w-[200px] max-w-[220px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-2xl">{type === "course" ? "📹" : "🧰"}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium leading-snug text-[#0E0E10] line-clamp-2">{title}</h3>
        <p className="mt-1 text-xs text-[#909296]">{subtitle}</p>
      </div>
    </Link>
  );
}
