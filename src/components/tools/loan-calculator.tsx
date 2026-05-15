"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

interface LoanCalculatorProps {
  config?: {
    fields?: string[];
    defaults?: Record<string, number>;
  };
}

export function LoanCalculator({ config }: LoanCalculatorProps) {
  const defaults = config?.defaults ?? {};
  const [monto, setMonto] = useState(defaults.monto ?? 1000);
  const [interes, setInteres] = useState(defaults.interes ?? 15);
  const [plazo, setPlazo] = useState(defaults.plazo ?? 12);
  const [resultado, setResultado] = useState<{
    cuota: number;
    total: number;
    interesTotal: number;
  } | null>(null);

  function calcular() {
    const tasaMensual = interes / 100 / 12;
    const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    const total = cuota * plazo;
    setResultado({
      cuota: Math.round(cuota * 100) / 100,
      total: Math.round(total * 100) / 100,
      interesTotal: Math.round((total - monto) * 100) / 100,
    });
  }

  return (
    <div className="card-dark rounded-[24px] p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F26A2E]/10">
          <Calculator className="h-6 w-6 text-[#F26A2E]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Calculadora de Préstamos</h2>
          <p className="text-sm text-[#909296]">Simula tu préstamo en segundos</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm text-[#909296]">Monto (S/)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#909296]">S/</span>
            <input type="number" value={monto} onChange={(e) => setMonto(Number(e.target.value))}
              className="h-12 w-full rounded-[12px] bg-white/5 pl-9 pr-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[#909296]">Interés anual (%)</label>
          <input type="number" value={interes} onChange={(e) => setInteres(Number(e.target.value))} step={0.1}
            className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[#909296]">Plazo (meses)</label>
          <input type="number" value={plazo} onChange={(e) => setPlazo(Number(e.target.value))}
            className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#F26A2E]/50" />
        </div>
      </div>

      <button onClick={calcular}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] px-8 text-sm font-bold text-white transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
        Calcular cuota
      </button>

      {resultado && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-[16px] bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-[#F5C53D]">S/ {resultado.cuota}</p>
            <p className="mt-1 text-xs text-[#909296]">Cuota mensual</p>
          </div>
          <div className="rounded-[16px] bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-white">S/ {resultado.total}</p>
            <p className="mt-1 text-xs text-[#909296]">Total a pagar</p>
          </div>
          <div className="rounded-[16px] bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-[#F04A8A]">S/ {resultado.interesTotal}</p>
            <p className="mt-1 text-xs text-[#909296]">Intereses totales</p>
          </div>
        </div>
      )}
    </div>
  );
}
