import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://kapitalizando.vercel.app";

export default async function sitemap() {
  const supabase = await createClient();

  const [{ data: courses }, { data: lives }, { data: tools }, { data: readings }] = await Promise.all([
    supabase.from("courses").select("slug, updated_at").eq("is_published", true),
    supabase.from("lives").select("id, scheduled_at").eq("status", "scheduled"),
    supabase.from("tools").select("slug, created_at").eq("is_published", true),
    supabase.from("readings").select("slug, created_at").eq("is_published", true),
  ]);

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/lives`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/readings`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE_URL}/comunidad`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
  ];

  const coursePages = (courses ?? []).map((c: any) => ({
    url: `${BASE_URL}/courses/${c.slug}`,
    lastModified: new Date(c.updated_at ?? Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const livePages = (lives ?? []).map((l: any) => ({
    url: `${BASE_URL}/lives/${l.id}`,
    lastModified: new Date(l.scheduled_at ?? Date.now()),
    changeFrequency: "hourly" as const,
    priority: 0.6,
  }));

  const toolPages = (tools ?? []).map((t: any) => ({
    url: `${BASE_URL}/tools/${t.slug}`,
    lastModified: new Date(t.created_at ?? Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const readingPages = (readings ?? []).map((r: any) => ({
    url: `${BASE_URL}/readings/${r.slug}`,
    lastModified: new Date(r.created_at ?? Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...coursePages, ...livePages, ...toolPages, ...readingPages];
}
