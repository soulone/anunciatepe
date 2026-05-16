import { createClient } from "@/lib/supabase/server";

export async function uploadLogo(file: File): Promise<string | null> {
  const supabase = await createClient();

  // Validar tipo y tamaño
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Formato no soportado. Usa PNG, JPG o WebP.");
  }
  if (file.size > 500 * 1024) {
    throw new Error("La imagen no debe superar 500KB.");
  }

  const ext = file.name.split(".").pop() ?? "png";
  const fileName = `logo-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("logos")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (error) throw new Error(`Error al subir: ${error.message}`);

  const { data: urlData } = supabase.storage.from("logos").getPublicUrl(fileName);
  const publicUrl = urlData?.publicUrl ?? null;

  if (publicUrl) {
    await supabase.from("settings").upsert(
      { key: "SITE_LOGO_URL", value: publicUrl },
      { onConflict: "key" }
    );
  }

  return publicUrl;
}

export async function deleteLogo(): Promise<void> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "SITE_LOGO_URL")
    .single();

  if (data?.value) {
    const path = data.value.split("/logos/").pop();
    if (path) {
      await supabase.storage.from("logos").remove([path]);
    }
  }

  await supabase.from("settings").upsert(
    { key: "SITE_LOGO_URL", value: "" },
    { onConflict: "key" }
  );
}
