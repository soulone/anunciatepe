// Follows: supabase/functions/renew-subscriptions/index.ts
// Cron: "0 0 * * *" (cada día a medianoche)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createServiceClient } from "../_shared/supabase.ts";

serve(async (_req) => {
  try {
    const supabase = createServiceClient();

    // Buscar suscripciones activas que vencen en menos de 3 días
    const tresDias = new Date();
    tresDias.setDate(tresDias.getDate() + 3);

    const { data: expiring, error: fetchError } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("status", "active")
      .lte("current_period_end", tresDias.toISOString());

    if (fetchError) {
      console.error("Error fetching expiring subs:", fetchError);
      return new Response(JSON.stringify({ error: fetchError.message }), { status: 500 });
    }

    if (!expiring || expiring.length === 0) {
      return new Response(JSON.stringify({ renewed: 0, message: "no expiring subscriptions" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    let renewed = 0;
    let expired = 0;

    for (const sub of expiring) {
      const now = new Date();
      const periodEnd = new Date(sub.current_period_end);

      if (periodEnd < now) {
        // Ya venció → marcar como expired
        await supabase
          .from("user_subscriptions")
          .update({ status: "expired" })
          .eq("id", sub.id);
        expired++;
      } else {
        // Renovar por 30 días más
        const newEnd = new Date(periodEnd);
        newEnd.setDate(newEnd.getDate() + 30);

        const { error: updateError } = await supabase
          .from("user_subscriptions")
          .update({
            current_period_start: periodEnd.toISOString(),
            current_period_end: newEnd.toISOString(),
          })
          .eq("id", sub.id);

        if (!updateError) renewed++;
      }
    }

    console.log(`Renovadas: ${renewed}, Expiradas: ${expired}`);

    return new Response(JSON.stringify({ renewed, expired }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("renew-subscriptions error:", error);
    return new Response(JSON.stringify({ error: "internal error" }), { status: 500 });
  }
});
