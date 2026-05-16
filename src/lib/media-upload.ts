"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/logo-upload-server";

export async function uploadMediaAction(
  base64: string,
  fileName: string,
  fileType: string,
  folder: string,
): Promise<{ url?: string; error?: string }> {
  if (!base64 || !fileName) return { error: "Datos inválidos" };

  const allowed = ["image/png", "image/jpeg", "image/webp"];
  if (!allowed.includes(fileType)) return { error: "Formato no soportado. Usa PNG, JPG o WebP." };

  const sizeEstimate = Math.round((base64.length * 3) / 4);
  if (sizeEstimate > 500 * 1024) return { error: "La imagen no debe superar 500KB." };

  const validFolders = ["courses", "lives", "readings", "tools"];
  if (!validFolders.includes(folder)) return { error: "Carpeta inválida" };

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "No autorizado" };

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile?.is_admin) return { error: "No autorizado" };

    const srClient = createServiceClient();
    const ext = fileName.split(".").pop() ?? "png";
    const storageName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const buffer = Buffer.from(base64, "base64");
    const { error: uploadError } = await srClient.storage
      .from("media")
      .upload(storageName, buffer, { contentType: fileType, upsert: true });

    if (uploadError) return { error: `Error al subir: ${uploadError.message}` };

    const { data: urlData } = srClient.storage.from("media").getPublicUrl(storageName);
    return { url: urlData?.publicUrl ?? "" };
  } catch (err: any) {
    return { error: err.message ?? "Error desconocido" };
  }
}

export async function deleteMediaAction(url: string): Promise<{ success?: boolean; error?: string }> {
  if (!url) return { success: true };
  try {
    const srClient = createServiceClient();
    const path = url.split("/media/").pop();
    if (path) {
      await srClient.storage.from("media").remove([path]);
    }
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Error desconocido" };
  }
}
