"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ShoppingCart } from "lucide-react";

interface CheckoutButtonProps {
  productKey: string;
  productName: string;
  price: number;
  type: "plan" | "course";
  itemId: string;
}

export function CheckoutButton({ productKey, productName, price, type, itemId }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  async function handlePurchase() {
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Debes iniciar sesión");
      setLoading(false);
      return;
    }

    // Obtener el public key de settings
    const { data: pkRow } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "MERCADO_PAGO_PUBLIC_KEY")
      .single();

    if (!pkRow?.value) {
      setError("Mercado Pago no configurado");
      setLoading(false);
      return;
    }

    try {
      // Crear preferencia en el servidor
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              title: productName,
              quantity: 1,
              unit_price: price,
              currency_id: "PEN",
            },
          ],
          externalReference: `${user.id}:${type}:${itemId}`,
        }),
      });

      const data = await response.json();

      if (data?.init_point) {
        // Redirigir al checkout de Mercado Pago
        window.location.href = data.init_point;
      } else {
        setError("Error al crear el pago");
      }
    } catch {
      setError("Error de conexión");
    }

    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        {loading ? "Procesando..." : `Comprar S/ ${price}`}
      </button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
