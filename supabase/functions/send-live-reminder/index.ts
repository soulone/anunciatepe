// Follows: supabase/functions/send-live-reminder/index.ts
// Cron: "0 * * * *" (cada hora)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createServiceClient } from "../_shared/supabase.ts";

serve(async (_req) => {
  try {
    const supabase = createServiceClient();

    // Buscar lives programados dentro de la próxima hora
    const enUnaHora = new Date();
    enUnaHora.setHours(enUnaHora.getHours() + 1);

    const dentroDeUnaHora = new Date();
    dentroDeUnaHora.setMinutes(dentroDeUnaHora.getMinutes() + 59);

    const { data: upcoming, error } = await supabase
      .from("lives")
      .select("*, live_reminders!inner(user_id)")
      .eq("status", "scheduled")
      .gte("scheduled_at", new Date().toISOString())
      .lte("scheduled_at", enUnaHora.toISOString());

    if (error) {
      console.error("Error fetching upcoming lives:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    if (!upcoming || upcoming.length === 0) {
      return new Response(JSON.stringify({ notified: 0, message: "no upcoming lives" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(`Encontrados ${upcoming.length} lives próximos con recordatorios`);

    // Aquí se integraría el envío de notificaciones (email, push, etc.)
    // Por ahora solo registramos en log
    for (const live of upcoming) {
      console.log(`Recordatorio: "${live.title}" - Usuarios: ${live.live_reminders.length}`);
    }

    return new Response(JSON.stringify({
      notified: upcoming.length,
      lives: upcoming.map((l: any) => ({ title: l.title, reminders: l.live_reminders.length })),
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-live-reminder error:", error);
    return new Response(JSON.stringify({ error: "internal error" }), { status: 500 });
  }
});
