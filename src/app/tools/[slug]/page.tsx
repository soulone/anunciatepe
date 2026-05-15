import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { LoanCalculator } from "@/components/tools/loan-calculator";
import { QuizComponent } from "@/components/tools/quiz-component";
import { WizardComponent } from "@/components/tools/wizard-component";
import { notFound } from "next/navigation";
import { Construction } from "lucide-react";
import Link from "next/link";

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: tool } = await supabase.from("tools").select("*").eq("slug", slug).single();

  if (!tool) notFound();

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[800px] px-6 py-8 md:px-10">
        <nav className="mb-6 flex items-center gap-2 text-sm text-[#909296]">
          <Link href="/tools" className="transition-colors hover:text-white">Apps</Link>
          <span className="text-[#909296]/50">/</span>
          <span className="truncate text-white">{tool.title}</span>
        </nav>

        {tool.type === "calculator" && <LoanCalculator config={tool.config} />}
        {tool.type === "quiz" && <QuizComponent config={tool.config} />}
        {tool.type === "wizard" && <WizardComponent config={tool.config} />}

        {!["calculator", "quiz", "wizard"].includes(tool.type) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F26A2E]/10">
              <Construction className="h-10 w-10 text-[#F26A2E]" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-white">{tool.title}</h1>
            <p className="mt-2 text-[#909296]">{tool.description}</p>
            <div className="mt-8 rounded-[16px] bg-[#141416] p-6">
              <p className="text-sm text-[#909296]">🚧 Esta herramienta estará disponible próximamente.</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
