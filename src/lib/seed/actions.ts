"use server";

import { createClient } from "@/lib/supabase/server";

export async function seedDatabase() {
  const supabase = await createClient();

  const { error: coursesErr } = await supabase.from("courses").upsert([
    { id: "a0000000-0000-0000-0000-000000000001", title: "El Secreto del Éxito de Barrio", slug: "el-secreto-del-exito", description: "Don Pedro te enseña su sistema de préstamos seguro.", category: "Finanzas", level: "beginner", price: 0, is_published: true },
    { id: "a0000000-0000-0000-0000-000000000002", title: "Recetas Financieras", slug: "recetas-financieras", description: "Carlos te guía para ordenar tus finanzas.", category: "Finanzas", level: "beginner", price: 0, is_published: true },
    { id: "a0000000-0000-0000-0000-000000000003", title: "Cosé tu Futuro", slug: "cose-tu-futuro", description: "Lucía te enseña a vender lo que haces.", category: "Emprendimiento", level: "beginner", price: 0, is_published: true },
    { id: "a0000000-0000-0000-0000-000000000004", title: "Taller: Tu Primer Crédito Formal", slug: "taller-primer-credito", description: "Manuel te explica el sistema financiero formal.", category: "Finanzas", level: "intermediate", price: 29.90, is_published: true },
    { id: "a0000000-0000-0000-0000-000000000005", title: "Salón Pro: Servicios con Valor", slug: "salon-pro", description: "Tatiana comparte su método para cobrar lo que vales.", category: "Emprendimiento", level: "beginner", price: 0, is_published: true },
    { id: "a0000000-0000-0000-0000-000000000006", title: "Marketing de Barrio", slug: "marketing-de-barrio", description: "Promociona tu negocio con poco presupuesto.", category: "Marketing", level: "beginner", price: 19.90, is_published: true },
    { id: "a0000000-0000-0000-0000-000000000007", title: "Ahorra S/100 en 30 Días", slug: "ahorra-100-en-30", description: "Reto práctico de 30 días.", category: "Finanzas", level: "beginner", price: 0, is_published: true },
    { id: "a0000000-0000-0000-0000-000000000008", title: "Recicla y Gana", slug: "recicla-y-gana", description: "Convierte la basura en dinero.", category: "Emprendimiento", level: "beginner", price: 0, is_published: true },
  ], { onConflict: "id" });
  if (coursesErr) return { error: `courses: ${coursesErr.message}` };

  const { error: chErr } = await supabase.from("chapters").upsert([
    { course_id: "a0000000-0000-0000-0000-000000000001", title: "¿Por qué prestar?", duration: 750, order_index: 1, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000001", title: "Conoce a tu prestatario", duration: 1100, order_index: 2, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000001", title: "Las 5 reglas del préstamo seguro", duration: 1455, order_index: 3, is_free: false },
    { course_id: "a0000000-0000-0000-0000-000000000002", title: "Tu dinero, tu mapa", duration: 800, order_index: 1, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000002", title: "Ahorro sin dolor", duration: 900, order_index: 2, is_free: false },
    { course_id: "a0000000-0000-0000-0000-000000000003", title: "Cosiendo tu marca", duration: 650, order_index: 1, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000004", title: "¿Qué es un crédito formal?", duration: 540, order_index: 1, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000005", title: "Atención al cliente", duration: 580, order_index: 1, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000006", title: "Redes sociales gratis", duration: 900, order_index: 1, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000007", title: "Diagnóstico financiero", duration: 500, order_index: 1, is_free: true },
    { course_id: "a0000000-0000-0000-0000-000000000008", title: "Basura que vale oro", duration: 600, order_index: 1, is_free: true },
  ]);
  if (chErr) return { error: `chapters: ${chErr.message}` };

  const { error: livesErr } = await supabase.from("lives").upsert([
    { id: "b0000000-0000-0000-0000-000000000001", title: "El Secreto del Éxito - Cap. 1", description: "Estreno del primer capítulo", scheduled_at: new Date(Date.now() - 172800000).toISOString(), duration: 84, status: "finished", preregistered_count: 312 },
    { id: "b0000000-0000-0000-0000-000000000004", title: "El Secreto Cap. 2 - ESTRENO", description: "No te lo pierdas", scheduled_at: new Date(Date.now() + 21600000).toISOString(), duration: 90, status: "scheduled", preregistered_count: 412 },
    { id: "b0000000-0000-0000-0000-000000000005", title: "Carlos: Control de Caja", description: "Lleva la caja de tu negocio", scheduled_at: new Date(Date.now() + 259200000).toISOString(), duration: 75, status: "scheduled", preregistered_count: 134 },
  ], { onConflict: "id" });
  if (livesErr) return { error: `lives: ${livesErr.message}` };

  const { error: recErr } = await supabase.from("recordings").upsert([
    { title: "El Secreto del Éxito - Capítulo 1", description: "Don Pedro revela su sistema", duration: 84, views: 1542, is_published: true, published_at: new Date(Date.now() - 86400000).toISOString() },
    { title: "Lucía: Crédito para Emprendedoras", description: "Todo sobre créditos", duration: 107, views: 892, is_published: true, published_at: new Date(Date.now() - 604800000).toISOString() },
    { title: "Manuel: Cómo Hacer un Pitch", description: "Presenta tu negocio", duration: 72, views: 723, is_published: true, published_at: new Date(Date.now() - 345600000).toISOString() },
    { title: "Carlos: Recetas para tu Bodega", description: "Consejos prácticos", duration: 91, views: 1102, is_published: true, published_at: new Date(Date.now() - 691200000).toISOString() },
  ]);
  if (recErr) return { error: `recordings: ${recErr.message}` };

  const { error: toolsErr } = await supabase.from("tools").upsert([
    { title: "Calculadora de Préstamos", slug: "calculadora-prestamos", description: "Simula tu préstamo en 3 pasos.", icon_name: "Calculator", color_theme: "amber", type: "calculator", config: { steps: 3 }, is_published: true },
    { title: "Plan de Negocio Express", slug: "plan-negocio-express", description: "Crea tu plan de negocio en 7 pasos.", icon_name: "FileText", color_theme: "morado", type: "wizard", config: { steps: 7 }, is_published: true },
    { title: "Meta Financiera", slug: "meta-financiera", description: "Define tu objetivo financiero.", icon_name: "Target", color_theme: "coral", type: "wizard", config: {}, is_published: true },
    { title: "Quiz Financiero", slug: "quiz-financiero", description: "¿Qué tan financiero eres?", icon_name: "Brain", color_theme: "cyan", type: "quiz", config: { questions: 10 }, is_published: true },
    { title: "Ruta de Ahorro", slug: "ruta-ahorro", description: "Plan personalizado de ahorro.", icon_name: "Route", color_theme: "teal", type: "wizard", config: {}, is_published: true },
    { title: "Calculadora de Interés", slug: "calculadora-interes", description: "Interés compuesto fácil.", icon_name: "Hash", color_theme: "orange", type: "calculator", config: {}, is_published: true },
  ], { onConflict: "slug" });
  if (toolsErr) return { error: `tools: ${toolsErr.message}` };

  const { error: readErr } = await supabase.from("readings").upsert([
    { title: "Guía: Abre tu Primera Cuenta Bancaria", slug: "guia-primera-cuenta", author: "Equipo Kapitalizando", excerpt: "Todo para abrir tu cuenta sin complicaciones.", duration_min: 8, category: "Finanzas básicas", is_published: true },
    { title: "5 Errores al Pedir un Préstamo", slug: "5-errores-prestamo", author: "Don Pedro", excerpt: "Aprende de los errores de otros.", duration_min: 12, category: "Crédito", is_published: true },
    { title: "¿Qué es el Interés Compuesto?", slug: "que-es-interes-compuesto", author: "Carlos Mendoza", excerpt: "El interés compuesto explicado.", duration_min: 15, category: "Inversión", is_published: true },
    { title: "Negocia con tus Proveedores", slug: "negocia-con-proveedores", author: "Manuel Torres", excerpt: "Técnicas para mejores precios.", duration_min: 10, category: "Negocios", is_published: true },
    { title: "Guía de Ahorro para Emprendedores", slug: "guia-ahorro-emprendedores", author: "Lucía Ramírez", excerpt: "Estrategias para ahorrar.", duration_min: 20, category: "Ahorro", is_published: true },
    { title: "Cómo Detectar Billetes Falsos", slug: "detectar-billetes-falsos", author: "Tatiana Huerta", excerpt: "Señales clave.", duration_min: 7, category: "Seguridad", is_published: true },
    { title: "Calcula tu Margen de Ganancia", slug: "margen-ganancia", author: "Carlos Mendoza", excerpt: "La fórmula que debes conocer.", duration_min: 14, category: "Negocios", is_published: true },
    { title: "Gota a Gota: Cómo Evitarlo", slug: "gota-a-gota-como-evitarlo", author: "Equipo Kapitalizando", excerpt: "Alternativas seguras.", duration_min: 11, category: "Seguridad", is_published: true },
    { title: "Ruta: Tu Primer Crédito Formal", slug: "ruta-primer-credito", author: "Manuel Torres", excerpt: "7 capítulos para tu primer crédito.", duration_min: 45, category: "Ruta", is_published: true },
    { title: "Ruta: Vende Más en tu Bodega", slug: "ruta-vende-bodega", author: "Carlos Mendoza", excerpt: "5 capítulos para impulsar tu bodega.", duration_min: 35, category: "Ruta", is_published: true },
    { title: "Ruta: Ahorra S/100 en 30 Días", slug: "ruta-ahorra-100", author: "Don Pedro", excerpt: "4 capítulos para ahorrar.", duration_min: 25, category: "Ruta", is_published: true },
  ], { onConflict: "slug" });
  if (readErr) return { error: `readings: ${readErr.message}` };

  const { error: projErr } = await supabase.from("projects").upsert([
    { title: "Bodega Don Carlos", description: "Ampliación con estantes y refrigeración.", goal_amount: 5000, raised_amount: 3200, backers_count: 48, deadline: new Date(Date.now() + 1036800000).toISOString(), status: "active", category: "Negocio" },
    { title: "Taller de Costura Lucía", description: "Máquinas industriales para emplear mujeres.", goal_amount: 8000, raised_amount: 6500, backers_count: 73, deadline: new Date(Date.now() + 432000000).toISOString(), status: "active", category: "Emprendimiento" },
    { title: "Recicladora Juvenal", description: "Centro de acopio en SJL.", goal_amount: 12000, raised_amount: 4200, backers_count: 67, deadline: new Date(Date.now() + 2160000000).toISOString(), status: "active", category: "Ambiente" },
    { title: "Puesto de Jugos La Rosa", description: "Renovar y abrir segundo punto.", goal_amount: 3000, raised_amount: 1800, backers_count: 29, deadline: new Date(Date.now() + 1728000000).toISOString(), status: "active", category: "Comida" },
  ]);
  if (projErr) return { error: `projects: ${projErr.message}` };

  const { error: prodErr } = await supabase.from("products").upsert([
    { key: "battle_pass", name: "Battle Pass", description: "Desbloquea contenido premium", price: 19.90, type: "subscription", interval: "month", is_active: true, sort_order: 1 },
    { key: "plan_premium", name: "Plan Premium", description: "Acceso a TODO", price: 39.90, type: "subscription", interval: "month", is_active: true, sort_order: 2 },
  ], { onConflict: "key" });
  if (prodErr) return { error: `products: ${prodErr.message}` };

  return { success: true };
}
