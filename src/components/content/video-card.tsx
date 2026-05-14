import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  instructor: string;
  duration: string;
  timeAgo: string;
  thumbnail?: string;
}

export function VideoCard({
  title,
  instructor,
  duration,
  timeAgo,
  thumbnail,
}: VideoCardProps) {
  return (
    <div className="group relative min-w-[260px] max-w-[300px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white text-[#101012] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F26A2E]/10">
              <Play className="h-4 w-4 fill-[#F26A2E] text-[#F26A2E]" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-[#101012]">
          {duration}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium leading-snug text-[#101012] line-clamp-2">
          {title}
        </h3>
        <p className="mt-1 text-xs text-[#6B6F72]">{instructor}</p>
        <p className="mt-0.5 text-[11px] text-[#6B6F72]/60">{timeAgo}</p>
      </div>
    </div>
  );
}
