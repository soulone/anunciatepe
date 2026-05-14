import { Bell } from "lucide-react";

interface LiveCardProps {
  when: string;
  instructor: string;
  title: string;
  subtitle: string;
  duration: string;
}

export function LiveCard({
  when,
  instructor,
  title,
  subtitle,
  duration,
}: LiveCardProps) {
  return (
    <div className="group relative min-w-[280px] max-w-[320px] flex-shrink-0 overflow-hidden rounded-[16px] bg-[#17181B] transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden rounded-[16px] bg-gradient-to-br from-zinc-800 to-zinc-900">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-4xl">🎬</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute left-2 top-2 rounded-full bg-[#F04A8A]/20 px-2 py-0.5 text-[11px] font-medium text-[#F04A8A]">
          {when}
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-[#F04A8A]">{instructor}</p>
        <h3 className="mt-1 text-sm font-medium leading-snug text-white line-clamp-2">
          {title}
        </h3>
        <p className="mt-1 text-xs text-[#A8AAAE] line-clamp-1">{subtitle}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] text-[#A8AAAE]/60">{duration}</span>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-full px-2 text-xs text-[#F04A8A] transition-colors hover:bg-[#F04A8A]/10">
            <Bell className="h-3.5 w-3.5" />
            Recordar
          </button>
        </div>
      </div>
    </div>
  );
}
