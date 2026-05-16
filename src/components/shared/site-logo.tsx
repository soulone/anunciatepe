"use client";

import { useLogoSrc } from "@/components/providers/logo-provider";

interface SiteLogoProps {
  src?: string | null;
  className?: string;
}

export function SiteLogo({ src: propSrc, className = "" }: SiteLogoProps) {
  const contextSrc = useLogoSrc();
  const src = propSrc ?? contextSrc;

  if (src) {
    return (
      <div className={`flex h-10 w-10 items-center justify-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Kapitalizando"
          className="h-full w-full rounded-[10px] object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#F26A2E]/20 to-[#F5C53D]/10 ${className}`}>
      <span className="font-heading text-lg font-bold text-[#F26A2E]">K</span>
    </div>
  );
}
