"use client";

import { createContext, useContext, type ReactNode } from "react";

const LogoContext = createContext<string | null>(null);

export function LogoProvider({ src, children }: { src: string | null; children: ReactNode }) {
  return <LogoContext.Provider value={src}>{children}</LogoContext.Provider>;
}

export function useLogoSrc() {
  return useContext(LogoContext);
}
