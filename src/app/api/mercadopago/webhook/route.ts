import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    // Solo procesar pagos aprobados
    if (action !== "payment.created" && action !== "payment.updated") {
      return NextResponse.json({ received: true });
    }

    const payment = data;
    if (payment.status !== "approved") {
      return NextResponse.json({ received: true });
    }

    const supabase = await createClient();
    const externalRef = payment.external_reference; // user_id:item_type:item_id

    if (!externalRef) {
      return NextResponse.json({ error: "no external reference" }, { status: 400 });
    }

    const [userId, itemType, itemId] = externalRef.split(":");

    // Guardar la compra
    await supabase.from("purchases").insert({
      user_id: userId,
      item_type: itemType,
      item_id: itemId,
      amount: payment.transaction_amount,
      currency: "PEN",
      status: "completed",
      culqi_charge_id: payment.id.toString(),
    });

    // Si es suscripción, activar user_subscriptions
    if (itemType === "plan" || itemType === "battle_pass") {
      const now = new Date();
      const end = new Date(now);
      end.setMonth(end.getMonth() + 1);

      await supabase.from("user_subscriptions").insert({
        user_id: userId,
        plan_key: itemId,
        status: "active",
        current_period_start: now.toISOString(),
        current_period_end: end.toISOString(),
        mp_subscription_id: payment.id.toString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
