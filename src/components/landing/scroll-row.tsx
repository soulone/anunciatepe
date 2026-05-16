"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollRowProps {
  children: ReactNode;
  className?: string;
}

export function ScrollRow({ children, className = "" }: ScrollRowProps) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.6;
    ref.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <div className="group relative">
      <button onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#0E0E10] shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div ref={ref} className={`no-scrollbar flex gap-3 overflow-x-auto scroll-smooth ${className}`}>
        {children}
      </div>
      <button onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#0E0E10] shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
