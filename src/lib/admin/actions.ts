"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ─── Courses ───────────────────────────────────────
export async function createCourse(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("courses").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/courses");
  return { success: true };
}

export async function updateCourse(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("courses").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/courses");
  return { success: true };
}

export async function deleteCourse(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/courses");
  return { success: true };
}

// ─── Lives ─────────────────────────────────────────
export async function createLive(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("lives").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/lives");
  return { success: true };
}

export async function updateLive(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("lives").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/lives");
  return { success: true };
}

export async function deleteLive(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lives").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/lives");
  return { success: true };
}

// ─── Tools ─────────────────────────────────────────
export async function createTool(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("tools").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/tools");
  return { success: true };
}

export async function updateTool(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("tools").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/tools");
  return { success: true };
}

export async function deleteTool(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("tools").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/tools");
  return { success: true };
}

// ─── Readings ──────────────────────────────────────
export async function createReading(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("readings").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/readings");
  return { success: true };
}

export async function updateReading(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("readings").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/readings");
  return { success: true };
}

export async function deleteReading(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("readings").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/readings");
  return { success: true };
}

// ─── Plans ─────────────────────────────────────────
export async function createPlan(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/plans");
  return { success: true };
}

export async function updatePlan(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/plans");
  return { success: true };
}

export async function deletePlan(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/plans");
  return { success: true };
}

// ─── Recordings ────────────────────────────────────
export async function toggleRecordingPublish(id: string, isPublished: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("recordings").update({ is_published: !isPublished }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/recordings");
  return { success: true };
}
