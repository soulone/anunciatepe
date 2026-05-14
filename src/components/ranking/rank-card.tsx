interface RankCardProps {
  rank: number;
  title: string;
  subtitle: string;
}

export function RankCard({ rank, title, subtitle }: RankCardProps) {
  return (
    <div className="group relative min-w-[170px] max-w-[190px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] font-black leading-none text-[rgba(0,0,0,0.04)]"
          style={{
            WebkitTextStroke: "2px rgba(0,0,0,0.06)",
          }}
        >
          {String(rank).padStart(2, "0")}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">🎬</span>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-xs font-medium text-[#101012] line-clamp-1">
          {title}
        </h3>
        <p className="text-[10px] text-[#6B6F72]">{subtitle}</p>
      </div>
    </div>
  );
}
