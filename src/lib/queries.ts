import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCourses = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("courses").select("*").eq("is_published", true).limit(20);
  return data ?? [];
});

export const getLives = cache(async (status?: string) => {
  const supabase = await createClient();
  const query = supabase.from("lives").select("*");
  if (status) query.eq("status", status);
  const { data } = await query.order("scheduled_at").limit(20);
  return data ?? [];
});

export const getRecordings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("recordings").select("*").order("published_at", { ascending: false }).limit(20);
  return data ?? [];
});

export const getTools = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("tools").select("*").eq("is_published", true);
  return data ?? [];
});

export const getReadings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("readings").select("*").eq("is_published", true).order("created_at", { ascending: false });
  return data ?? [];
});

export const getProjects = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").in("status", ["active", "funded"]).order("raised_amount", { ascending: false });
  return data ?? [];
});

export const getPlans = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("is_active", true).order("sort_order");
  return data ?? [];
});
