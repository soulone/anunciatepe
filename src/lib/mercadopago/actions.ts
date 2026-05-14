import { createClient } from "@/lib/supabase/server";

function getMPToken(token: string) {
  return `Bearer ${token}`;
}

interface PreferenceItem {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
}

interface CreatePreferenceParams {
  items: PreferenceItem[];
  successUrl: string;
  failureUrl: string;
  pendingUrl: string;
  externalReference: string;
}

export async function createPreference(params: CreatePreferenceParams) {
  const supabase = await createClient();
  const { data: tokenRow } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "MERCADO_PAGO_ACCESS_TOKEN")
    .single();

  if (!tokenRow?.value) {
    throw new Error("Mercado Pago no configurado");
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: getMPToken(tokenRow.value),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: params.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: item.currency_id ?? "PEN",
      })),
      back_urls: {
        success: params.successUrl,
        failure: params.failureUrl,
        pending: params.pendingUrl,
      },
      auto_return: "approved",
      external_reference: params.externalReference,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error MP: ${error}`);
  }

  return response.json();
}

export async function getPaymentInfo(paymentId: string) {
  const supabase = await createClient();
  const { data: tokenRow } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "MERCADO_PAGO_ACCESS_TOKEN")
    .single();

  if (!tokenRow?.value) return null;

  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: getMPToken(tokenRow.value),
      },
    },
  );

  if (!response.ok) return null;
  return response.json();
}
