import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollRow } from "@/components/shared/scroll-arrows";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const READINGS = [
  { title: "Guía rápida: Cómo abrir tu primera cuenta bancaria", category: "Finanzas básicas", duration: "8 min", excerpt: "Todo lo que necesitas saber para abrir tu cuenta sin complicaciones." },
  { title: "Los 5 errores más comunes al pedir un préstamo", category: "Crédito", duration: "12 min", excerpt: "Aprende de los errores de otros para no caer en las mismas trampas." },
  { title: "¿Qué es el interés compuesto y cómo funciona?", category: "Inversión", duration: "15 min", excerpt: "El interés compuesto es la octava maravilla del mundo. Te explicamos por qué." },
  { title: "Cómo negociar con tus proveedores", category: "Negocios", duration: "10 min", excerpt: "Técnicas simples para conseguir mejores precios en tu bodega." },
  { title: "Guía de ahorro para emprendedores", category: "Ahorro", duration: "20 min", excerpt: "Estrategias probadas para ahorrar incluso en meses difíciles." },
  { title: "Cómo detectar billetes falsos", category: "Seguridad", duration: "7 min", excerpt: "Señales clave para no caer en estafas con dinero falso." },
  { title: "Calculando tu margen de ganancia", category: "Negocios", duration: "14 min", excerpt: "La fórmula simple que todo emprendedor debe conocer." },
  { title: "¿Qué es un gota a gota y cómo evitarlo?", category: "Seguridad", duration: "11 min", excerpt: "Identifica las señales de alerta y alternativas seguras." },
] as const;

function ReadingCard({ title, category, duration, excerpt }: typeof READINGS[number]) {
  return (
    <div className="group min-w-[300px] max-w-[340px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-[#141414] p-5 transition-all duration-300 hover:scale-[1.02] hover:bg-[#1a1a1a]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-1 text-xs text-zinc-600">
          <Clock className="h-3 w-3" />
          {duration}
        </div>
      </div>
      <h3 className="mt-3 text-sm font-semibold leading-snug text-white">{title}</h3>
      <p className="mt-1 text-xs text-zinc-500">{category}</p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">{excerpt}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Leer más
        <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  );
}

export default function ReadingsPage() {
  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <SectionHeader
          title="Lecturas"
          subtitle="Artículos y guías para kapitalistas"
        />

        <div className="mt-6 space-y-3">
          {READINGS.map((reading) => (
            <ReadingCard key={reading.title} {...reading} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
