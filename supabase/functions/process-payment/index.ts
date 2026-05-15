import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createServiceClient } from "../_shared/supabase.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";

serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const body = await req.json();
    const { action, data } = body;

    // Solo procesar pagos aprobados
    if (action !== "payment.created" && action !== "payment.updated") {
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payment = data;
    if (payment.status !== "approved") {
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const externalRef = payment.external_reference as string ?? "";
    const [userId, itemType, itemId] = externalRef.split(":");

    if (!userId || !itemType) {
      return new Response(JSON.stringify({ error: "invalid external_reference" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();

    // Guardar compra
    await supabase.from("purchases").insert({
      user_id: userId,
      item_type: itemType,
      item_id: itemId || null,
      amount: payment.transaction_amount ?? 0,
      currency: "PEN",
      status: "completed",
      culqi_charge_id: String(payment.id ?? ""),
    });

    // Si es suscripción, activar user_subscriptions
    if (itemType === "plan" || itemType === "battle_pass") {
      const now = new Date();
      const end = new Date(now);
      end.setMonth(end.getMonth() + 1);

      await supabase.from("user_subscriptions").insert({
        user_id: userId,
        plan_key: itemId || itemType,
        status: "active",
        current_period_start: now.toISOString(),
        current_period_end: end.toISOString(),
        mp_subscription_id: String(payment.id ?? ""),
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("process-payment error:", error);
    return new Response(JSON.stringify({ error: "internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
