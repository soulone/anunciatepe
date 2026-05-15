import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { BookOpen, Clock, User } from "lucide-react";
import Link from "next/link";

export default async function ReadingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: reading } = await supabase.from("readings").select("*").eq("slug", slug).single();

  if (!reading) notFound();

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[800px] px-6 py-12 md:px-10">
        <Link href="/readings" className="mb-6 inline-flex items-center gap-1 text-sm text-[#A8AAAE] transition-colors hover:text-white">
          ← Volver a lecturas
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F26A2E]/10">
              <BookOpen className="h-6 w-6 text-[#F26A2E]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{reading.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#A8AAAE]">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {reading.author}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {reading.duration_min} min de lectura</span>
                <span>·</span>
                <span className="rounded-full bg-[#F26A2E]/10 px-2.5 py-0.5 text-xs text-[#F26A2E]">{reading.category}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          {reading.excerpt && (
            <p className="text-lg leading-relaxed text-[#A8AAAE]">{reading.excerpt}</p>
          )}

          <div className="mt-8 space-y-4 text-[#A8AAAE]/80 leading-relaxed">
            <p>
              Bienvenido a esta guía de Kapitalizando. A continuación encontrarás 
              información práctica y directa para aplicar en tu día a día.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">¿Por qué es importante?</h2>
            <p>
              En el barrio, el conocimiento financiero es poder. Saber cómo manejar tu dinero,
              evitar estafas y hacer crecer tu negocio marca la diferencia entre sobrevivir y prosperar.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Puntos clave</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identifica oportunidades donde otros ven problemas</li>
              <li>Aplica el conocimiento de los maestros del barrio</li>
              <li>Comparte lo aprendido con tu comunidad</li>
              <li>Toma decisiones informadas sobre tu dinero</li>
            </ul>

            <div className="mt-8 rounded-[16px] bg-[#F5C53D]/10 p-5 text-sm text-[#F5C53D]">
              <strong className="block mb-1">💡 Consejo Kapitalista</strong>
              <p className="text-[#F5C53D]/80">
                La mejor inversión que puedes hacer es en tu educación financiera.
                Cada minuto que dedicas a aprender, multiplica tus posibilidades de éxito.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-8 text-center">
          <p className="text-sm text-[#A8AAAE]/60">¿Te gustó esta lectura?</p>
          <Link
            href="/readings"
            className="mt-2 inline-flex h-9 items-center gap-2 rounded-full bg-[#F5C53D] px-5 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
          >
            Explorar más lecturas →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
