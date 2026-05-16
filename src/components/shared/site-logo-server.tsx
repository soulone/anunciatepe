import { createClient } from "@supabase/supabase-js";
import { SiteLogo } from "./site-logo";

export async function SiteLogoServer() {
  // Usar service_role para bypass RLS (el logo es público)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let logoSrc: string | null = null;

  if (key) {
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "SITE_LOGO_URL")
      .maybeSingle();
    if (data?.value) logoSrc = data.value;
  }

  return <SiteLogo src={logoSrc} />;
}
