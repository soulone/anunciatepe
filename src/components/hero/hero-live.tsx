import { Button } from "@/components/ui/button";
import { Bell, Info, Plus, Play } from "lucide-react";

interface HeroLiveProps {
  title: string;
  subtitle: string;
  description: string;
  time: string;
  duration: string;
  preregistered: number;
}

export function HeroLive({
  title,
  subtitle,
  description,
  time,
  duration,
  preregistered,
}: HeroLiveProps) {
  return (
    <section className="relative flex min-h-[75vh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-20 md:px-10 md:pb-32">
        <div className="inline-flex w-fit animate-pulse items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-white" />
          EN VIVO ESTA NOCHE · {time}
        </div>

        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl leading-tight text-white md:text-6xl">
            <span className="italic text-primary/90">{title}</span>
          </h1>
          <p className="mt-3 text-lg font-medium text-zinc-300 md:text-xl">
            {subtitle}
          </p>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
          &ldquo;{description}&rdquo;
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <span>🗓 Hoy {time}</span>
          <span>⏱ ~{duration} min</span>
          <span>👥 {preregistered} pre-agendados</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="gap-2 bg-primary px-6 py-6 text-base font-bold text-black shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40">
            <Play className="h-5 w-5 fill-black" />
            VER EVENTO EN VIVO
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 border-zinc-700 text-zinc-300 hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-zinc-400 hover:text-white"
          >
            <Info className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-12 gap-2 text-zinc-400 hover:text-white"
          >
            <Plus className="h-5 w-5" />
            Mi lista
          </Button>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500">
            🔊 16+
          </span>
        </div>

        <div className="flex gap-2">
          <span className="h-1.5 w-8 rounded-full bg-primary" />
          <span className="h-1.5 w-4 rounded-full bg-zinc-600" />
          <span className="h-1.5 w-4 rounded-full bg-zinc-600" />
          <span className="h-1.5 w-4 rounded-full bg-zinc-600" />
        </div>
      </div>
    </section>
  );
}
