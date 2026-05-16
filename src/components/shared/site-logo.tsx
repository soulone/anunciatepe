"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SiteLogo({ className = "" }: { className?: string }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("settings")
      .select("value")
      .eq("key", "SITE_LOGO_URL")
      .maybeSingle()
      .then(({ data, error }) => {
        if (data?.value && !error) setLogoUrl(data.value);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#F26A2E]/10 ${className}`}>
      <span className="font-heading text-lg font-bold text-[#F26A2E]">K</span>
    </div>;
  }

  if (logoUrl) {
    return (
      <div className={`flex h-10 w-10 items-center justify-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
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
