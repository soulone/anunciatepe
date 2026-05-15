"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ShoppingCart, ShieldCheck } from "lucide-react";

interface CheckoutButtonProps {
  productKey: string;
  productName: string;
  price: number;
  type: "course" | "plan";
  itemId: string;
  compact?: boolean;
}

export function CheckoutButton({ productName, price, type, itemId, compact }: CheckoutButtonProps) {
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
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ title: productName, quantity: 1, unit_price: price, currency_id: "PEN" }],
          externalReference: `${user.id}:${type}:${itemId}`,
        }),
      });

      const data = await response.json();

      if (data?.init_point) {
        window.location.href = data.init_point;
      } else {
        setError("Error al crear el pago");
      }
    } catch {
      setError("Error de conexión");
    }

    setLoading(false);
  }

  if (compact) {
    return (
      <div>
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F26A2E] px-6 text-sm font-bold text-white transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97] disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
          {loading ? "Procesando..." : `Comprar S/ ${price}`}
        </button>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border-2 border-[#F26A2E]/20 bg-gradient-to-br from-[#F26A2E]/5 to-transparent p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F26A2E]/10">
          <span className="text-base">💳</span>
        </div>
        <div>
          <p className="font-bold text-white">Obtener acceso completo</p>
          <p className="text-xs text-[#909296]">
            {type === "course" ? "Pago único · Acceso vitalicio" : "Suscripción mensual · Cancela cuando quieras"}
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-xs text-[#909296]">
        <ShieldCheck className="h-3.5 w-3.5 text-[#C4E27A]" />
        <span>Pago 100% seguro por Mercado Pago</span>
      </div>

      <button
        onClick={handlePurchase}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97] disabled:opacity-50"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Procesando...</>
        ) : (
          <><span className="text-base">🔓</span> Comprar por S/ {price}</>
        )}
      </button>

      <div className="mt-3 flex items-center justify-center gap-3 text-xs text-[#909296]/60">
        <span>Visa</span>
        <span className="h-3 w-px bg-white/10" />
        <span>Mastercard</span>
        <span className="h-3 w-px bg-white/10" />
        <span>Yape</span>
      </div>

      {error && <p className="mt-2 text-center text-xs text-red-400">{error}</p>}
    </div>
  );
}
