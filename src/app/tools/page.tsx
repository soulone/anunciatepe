import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import {
  Calculator,
  FileText,
  Target,
  Brain,
  Route,
  Hash,
  PiggyBank,
  TrendingUp,
  Shield,
  Handshake,
  Scale,
  ChartBar,
} from "lucide-react";

const ALL_TOOLS = [
  { icon: Calculator, title: "Calculadora", subtitle: "Simula tu préstamo en 3 pasos. Interés compuesto, cuotas y más.", color: "amber", label: "WIZARD 3P" },
  { icon: FileText, title: "Formato", subtitle: "Plantilla para tu plan de negocio. Descargable y editable.", color: "morado", label: "WIZARD 7P" },
  { icon: Target, title: "Metas", subtitle: "Define tu objetivo financiero en 5 min con nuestro asistente.", color: "coral", label: "RUTA 5MIN" },
  { icon: Brain, title: "Quiz", subtitle: "¿Qué tan financieramente inteligente eres? Descúbrelo.", color: "cyan", label: "QUIZ 2MIN" },
  { icon: Route, title: "Ruta", subtitle: "Plan personalizado de ahorro según tus ingresos.", color: "teal", label: "RUTA 8CAP" },
  { icon: Hash, title: "Calculadora", subtitle: "Interés compuesto fácil. Mira cómo crece tu dinero.", color: "orange", label: "CALC 1MIN" },
  { icon: PiggyBank, title: "Ahorro", subtitle: "Calcula cuánto puedes ahorrar cada mes.", color: "teal", label: "CALC 2MIN" },
  { icon: TrendingUp, title: "Inversión", subtitle: "Simulador de inversiones con interés compuesto.", color: "cyan", label: "WIZARD 5P" },
  { icon: Shield, title: "Seguros", subtitle: "Encuentra el seguro ideal para tu negocio.", color: "morado", label: "QUIZ 3MIN" },
  { icon: Handshake, title: "Negocio", subtitle: "Evalúa la rentabilidad de tu emprendimiento.", color: "amber", label: "WIZARD 4P" },
  { icon: Scale, title: "Comparador", subtitle: "Compara opciones de crédito y elige la mejor.", color: "coral", label: "TOOL 2MIN" },
  { icon: ChartBar, title: "Dashboard", subtitle: "Visualiza tus finanzas en un solo lugar.", color: "orange", label: "APP" },
] as const;

export default function ToolsPage() {
  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <SectionHeader
          title="Herramientas instantáneas"
          subtitle="Aplica lo aprendido en minutos · gratis"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {ALL_TOOLS.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
