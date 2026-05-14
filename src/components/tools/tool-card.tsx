import { type LucideIcon, Play } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  label: string;
}

const colorConfig: Record<string, { bg: string; text: string; hover: string }> = {
  amber: { bg: "bg-[#F26A2E]/10", text: "text-[#F26A2E]", hover: "hover:bg-[#F26A2E]" },
  morado: { bg: "bg-[#C8B6E2]/20", text: "text-[#C8B6E2]", hover: "hover:bg-[#C8B6E2]" },
  coral: { bg: "bg-[#F09BB8]/20", text: "text-[#F09BB8]", hover: "hover:bg-[#F09BB8]" },
  cyan: { bg: "bg-[#C4E27A]/20", text: "text-[#C4E27A]", hover: "hover:bg-[#C4E27A]" },
  teal: { bg: "bg-[#C8E6C9]/20", text: "text-[#C8E6C9]", hover: "hover:bg-[#C8E6C9]" },
  orange: { bg: "bg-[#F26A2E]/10", text: "text-[#F26A2E]", hover: "hover:bg-[#F26A2E]" },
};

export function ToolCard({
  icon: Icon,
  title,
  subtitle,
  color,
  label,
}: ToolCardProps) {
  const cfg = colorConfig[color] ?? colorConfig.amber;

  return (
    <div className="group relative min-w-[200px] max-w-[220px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[16px] bg-white text-[#101012] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-3 p-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${cfg.bg} ${cfg.text} transition-colors`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="aspect-[4/3] overflow-hidden rounded-[12px] bg-gradient-to-br from-zinc-100 to-zinc-200">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl">📸</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <p className="text-xs leading-relaxed text-[#6B6F72]">{subtitle}</p>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#F26A2E] px-3 text-xs font-bold text-white">
            <Play className="h-3 w-3 fill-white" />
            Empezar
          </button>
        </div>
      </div>

      <div className="relative z-10 border-t border-[rgba(0,0,0,0.06)] px-4 py-2.5 transition-opacity group-hover:opacity-0">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#6B6F72]">
          {label}
        </span>
      </div>
    </div>
  );
}
