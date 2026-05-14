import { Play } from "lucide-react";

interface CourseCardProps {
  title: string;
  subtitle?: string;
  instructor: string;
  thumbnail?: string;
}

export function CourseCard({
  title,
  subtitle,
  instructor,
  thumbnail,
}: CourseCardProps) {
  return (
    <div className="group relative min-w-[200px] max-w-[220px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white text-[#101012] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.03]">
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-2xl font-bold tracking-wider text-[#F26A2E]/30">
              {title.split(" ")[0]}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {subtitle && (
            <p className="text-center text-xs text-white">{subtitle}</p>
          )}
          <button className="inline-flex items-center gap-1.5 rounded-full bg-[#F26A2E] px-4 py-1.5 text-xs font-bold text-white">
            <Play className="h-3 w-3 fill-white" />
            Empezar
          </button>
        </div>
      </div>
      <div className="p-2.5">
        <p className="text-xs text-[#6B6F72]">{instructor}</p>
      </div>
    </div>
  );
}
