"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

interface WizardConfig {
  steps?: string[];
  fields?: string[][];
}

export function WizardComponent({ config }: { config?: WizardConfig }) {
  const steps = config?.steps ?? [];
  const fields = config?.fields ?? [];
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);

  if (steps.length === 0) {
    return <p className="text-center text-[#909296] py-8">Sin pasos configurados.</p>;
  }

  function update(key: string, value: string) {
    setData({ ...data, [key]: value });
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else setFinished(true);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  if (finished) {
    return (
      <div className="card-dark rounded-[24px] p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C4E27A]/10">
          <span className="text-2xl">🎉</span>
        </div>
        <h2 className="mt-4 text-xl font-bold text-white">¡Completaste el wizard!</h2>
        <p className="mt-2 text-sm text-[#909296]">Toda la información ha sido registrada.</p>
        <button onClick={() => { setStep(0); setData({}); setFinished(false); }}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-colors hover:bg-[#F5C53D]/90 active:scale-[0.97]">
          Empezar de nuevo
        </button>
      </div>
    );
  }

  const currentFields = fields[step] ?? [];

  return (
    <div className="card-dark rounded-[24px] p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#C8B6E2]/20">
          <FileText className="h-6 w-6 text-[#C8B6E2]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{steps[step]}</h2>
          <p className="text-sm text-[#909296]">Paso {step + 1} de {steps.length}</p>
        </div>
      </div>

      <div className="mb-4 h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#C8B6E2] transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="space-y-3">
        {currentFields.map((field) => (
          <div key={field}>
            <label className="mb-1.5 block text-sm capitalize text-[#909296]">{field}</label>
            <input value={data[field] ?? ""} onChange={(e) => update(field, e.target.value)}
              placeholder={`Ingresa tu ${field}...`}
              className="h-12 w-full rounded-[12px] bg-white/5 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-[#C8B6E2]/50 placeholder:text-[#909296]/30" />
          </div>
        ))}
        {currentFields.length === 0 && (
          <p className="py-4 text-center text-sm text-[#909296]">Revisa la información antes de continuar.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={back} disabled={step === 0}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50 active:scale-[0.97]">
          ← Atrás
        </button>
        <button onClick={next}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#C8B6E2] px-8 text-sm font-bold text-[#0E0E10] transition-all hover:bg-[#C8B6E2]/90 active:scale-[0.97]">
          {step < steps.length - 1 ? "Siguiente →" : "🚀 Finalizar"}
        </button>
      </div>
    </div>
  );
}
