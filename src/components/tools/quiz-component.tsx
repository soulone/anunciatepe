"use client";

import { useState } from "react";
import { Brain, CheckCircle, XCircle } from "lucide-react";

interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

interface QuizConfig {
  questions?: QuizQuestion[];
}

export function QuizComponent({ config }: { config?: QuizConfig }) {
  const questions = config?.questions ?? [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return <p className="text-center text-[#909296] py-8">No hay preguntas configuradas.</p>;
  }

  function handleAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers([...answers, idx === questions[current].correct]);
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const correctas = answers.filter(Boolean).length;
    return (
      <div className="card-dark rounded-[24px] p-6 text-center">
        <Brain className="mx-auto h-12 w-12 text-[#C4E27A]" />
        <h2 className="mt-4 text-xl font-bold text-white">¡Quiz completado!</h2>
        <p className="mt-2 text-3xl font-bold text-[#F5C53D]">{correctas}/{questions.length}</p>
        <p className="mt-1 text-sm text-[#909296]">{correctas === questions.length ? "¡Perfecto!" : correctas >= questions.length / 2 ? "¡Buen trabajo!" : "Sigue practicando"}</p>
        <button onClick={restart} className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#0E0E10] transition-colors hover:bg-[#F5C53D]/90 active:scale-[0.97]">
          Reintentar
        </button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="card-dark rounded-[24px] p-6">
      <div className="mb-2 flex items-center justify-between">
        <Brain className="h-6 w-6 text-[#C4E27A]" />
        <span className="text-xs text-[#909296]">{current + 1} / {questions.length}</span>
      </div>

      <div className="mb-2 h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#C4E27A] transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">{q.q}</h3>

      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correct;
          const showResult = selected !== null;
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
              className={`flex w-full items-center gap-3 rounded-[12px] border-2 p-4 text-left text-sm transition-all active:scale-[0.98] ${
                showResult && isCorrect ? "border-[#C4E27A] bg-[#C4E27A]/10" :
                showResult && isSelected && !isCorrect ? "border-red-500 bg-red-500/10" :
                isSelected ? "border-[#F26A2E] bg-[#F26A2E]/10" :
                "border-transparent bg-white/5 hover:bg-white/10"
              }`}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-white">{opt}</span>
              {showResult && isCorrect && <CheckCircle className="h-5 w-5 text-[#C4E27A]" />}
              {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400" />}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button onClick={next} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] px-8 text-sm font-bold text-white transition-all hover:bg-[#F26A2E]/90 active:scale-[0.97]">
          {current < questions.length - 1 ? "Siguiente pregunta →" : "Ver resultados"}
        </button>
      )}
    </div>
  );
}
