"use client";

import { type ReactNode } from "react";
import { Check, ArrowRight, Save, ArrowLeft } from "lucide-react";

interface Step {
  icon: ReactNode;
  title: string;
}

interface WizardLayoutProps {
  steps: Step[];
  currentStep: number;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  nextLabel?: string;
  backLabel?: string;
  onFinish?: () => void;
  loading?: boolean;
}

export function WizardLayout({
  steps,
  currentStep,
  children,
  onBack,
  onNext,
  isFirst,
  isLast,
  nextLabel = "Siguiente",
  backLabel = "Atrás",
  onFinish,
  loading,
}: WizardLayoutProps) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i < currentStep
                  ? "bg-[#C4E27A] text-[#0E0E10]"
                  : i === currentStep
                  ? "bg-[#F26A2E] text-white"
                  : "bg-white/10 text-[#909296]"
              }`}>
                {i < currentStep ? <Check className="h-4 w-4" /> : step.icon}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${
                i === currentStep ? "text-white" : "text-[#909296]"
              }`}>
                {step.title}
              </span>
              {i < steps.length - 1 && (
                <div className={`h-0.5 flex-1 rounded-full ${
                  i < currentStep ? "bg-[#C4E27A]" : "bg-white/10"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card-dark rounded-[24px] p-6 md:p-8">
        {children}
      </div>

      <div className="mt-6 flex items-center justify-between">
        {!isFirst ? (
          <button onClick={onBack} disabled={loading}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50 active:scale-[0.97]">
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </button>
        ) : (
          <div />
        )}
        {isLast ? (
          <button onClick={onFinish} disabled={loading}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 disabled:opacity-50 active:scale-[0.97]">
            <Save className="h-4 w-4" /> {loading ? "Guardando..." : "Guardar"}
          </button>
        ) : (
          <button onClick={onNext}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26A2E] px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
            {nextLabel} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
