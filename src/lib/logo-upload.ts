"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/logo-upload-server";

export async function uploadLogoAction(base64: string, fileName: string, fileType: string): Promise<{ url?: string; error?: string }> {
  if (!base64 || !fileName) return { error: "Datos inválidos" };

  const allowed = ["image/png", "image/jpeg", "image/webp"];
  if (!allowed.includes(fileType)) return { error: "Formato no soportado. Usa PNG, JPG o WebP." };

  // Verificar tamaño (base64 length ≈ 1.37 × binary size)
  const sizeEstimate = Math.round((base64.length * 3) / 4);
  if (sizeEstimate > 500 * 1024) return { error: "La imagen no debe superar 500KB." };

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "No autorizado" };

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    if (!profile?.is_admin) return { error: "No autorizado" };

    const srClient = createServiceClient();
    const ext = fileName.split(".").pop() ?? "png";
    const storageName = `logo-${Date.now()}.${ext}`;

    const buffer = Buffer.from(base64, "base64");
    const { error: uploadError } = await srClient.storage
      .from("logos")
      .upload(storageName, buffer, {
        contentType: fileType,
        upsert: true,
      });

    if (uploadError) return { error: `Error al subir: ${uploadError.message}` };

    const { data: urlData } = srClient.storage.from("logos").getPublicUrl(storageName);
    const publicUrl = urlData?.publicUrl ?? "";

    if (publicUrl) {
      await supabase.from("settings").upsert(
        { key: "SITE_LOGO_URL", value: publicUrl },
        { onConflict: "key" }
      );
    }

    return { url: publicUrl };
  } catch (err: any) {
    return { error: err.message ?? "Error desconocido" };
  }
}

export async function deleteLogoAction(): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const srClient = createServiceClient();

    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "SITE_LOGO_URL")
      .maybeSingle();

    if (data?.value) {
      const path = data.value.split("/logos/").pop();
      if (path) {
        await srClient.storage.from("logos").remove([path]);
      }
    }

    await supabase.from("settings").upsert(
      { key: "SITE_LOGO_URL", value: "" },
      { onConflict: "key" }
    );

    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Error desconocido" };
  }
}
