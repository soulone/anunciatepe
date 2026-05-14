import { NextResponse } from "next/server";
import { createPreference } from "@/lib/mercadopago/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, externalReference } = body;

    const origin = request.headers.get("origin") || "https://kapitalizando.vercel.app";

    const preference = await createPreference({
      items,
      successUrl: `${origin}/payment/success`,
      failureUrl: `${origin}/payment/failure`,
      pendingUrl: `${origin}/payment/pending`,
      externalReference,
    });

    return NextResponse.json({
      init_point: preference.init_point,
      preference_id: preference.id,
    });
  } catch (error: any) {
    console.error("Error creating preference:", error);
    return NextResponse.json(
      { error: error.message || "Error creating preference" },
      { status: 500 },
    );
  }
}
