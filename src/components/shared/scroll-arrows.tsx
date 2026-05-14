"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

interface ScrollRowProps {
  children: ReactNode;
}

export function ScrollRow({ children }: ScrollRowProps) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="group relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#101012] shadow-lg opacity-0 backdrop-blur-sm transition-opacity hover:bg-white group-hover:opacity-100 group-hover:lg:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={ref}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth"
      >
        {children}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#101012] shadow-lg opacity-0 backdrop-blur-sm transition-opacity hover:bg-white group-hover:opacity-100 group-hover:lg:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
