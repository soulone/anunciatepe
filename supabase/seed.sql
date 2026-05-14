-- Seed data: Kapitalizando
-- ⚠️ ANTES de ejecutar: registra 6 usuarios en tu app (o crea cuentas en Supabase Auth)
-- Luego reemplaza los IDs de abajo con los IDs reales de auth.users
-- Obtén los IDs en: Supabase Dashboard → Authentication → Users

-- Instrucciones rápidas:
-- 1. Ve a http://localhost:3000/auth/register y crea 6 cuentas (o 1 y duplicamos)
-- 2. Copia los UUIDs de Authentication > Users
-- 3. Reemplázalos aquí

-- Por ahora usamos IDs placeholder. Si ya tienes usuarios registrados,
-- actualiza los IDs abajo.

-- Instructors
INSERT INTO public.profiles (id, full_name, username, avatar_url, plan_type) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Don Pedro', 'donpedro', NULL, 'premium'),
  ('00000000-0000-0000-0000-000000000002', 'Carlos Mendoza', 'carlosm', NULL, 'premium'),
  ('00000000-0000-0000-0000-000000000003', 'Lucía Ramírez', 'luciar', NULL, 'premium'),
  ('00000000-0000-0000-0000-000000000004', 'Manuel Torres', 'manuelt', NULL, 'premium'),
  ('00000000-0000-0000-0000-000000000005', 'Tatiana Huerta', 'tatianah', NULL, 'premium'),
  ('00000000-0000-0000-0000-000000000006', 'Juvenal Quispe', 'juvenalq', NULL, 'premium')
ON CONFLICT (id) DO NOTHING;

-- Courses
INSERT INTO public.courses (id, title, slug, description, instructor_id, category, level, price, is_published) VALUES
  ('c0010000-0000-0000-0000-000000000001', 'El Secreto del Éxito de Barrio', 'el-secreto-del-exito', 'Don Pedro te enseña su sistema de préstamos seguro. 30 años prestando en V.E.S. sin caer en gota a gota. Aprende a prestar, cobrar y crecer.', '00000000-0000-0000-0000-000000000001', 'Finanzas', 'beginner', 0, true),
  ('c0010000-0000-0000-0000-000000000002', 'Recetas Financieras', 'recetas-financieras', 'Carlos te guía paso a paso para ordenar tus finanzas personales y de tu negocio. Presupuestos, ahorro e inversión simple.', '00000000-0000-0000-0000-000000000002', 'Finanzas', 'beginner', 0, true),
  ('c0010000-0000-0000-0000-000000000003', 'Cosé tu Futuro', 'cose-tu-futuro', 'Lucía te enseña a vender lo que haces. Desde costura básica hasta estrategias de precio y marketing para tu emprendimiento.', '00000000-0000-0000-0000-000000000003', 'Emprendimiento', 'beginner', 0, true),
  ('c0010000-0000-0000-0000-000000000004', 'Taller: Tu Primer Crédito Formal', 'taller-primer-credito', 'Manuel te explica todo sobre el sistema financiero formal: cómo calificar, qué documentos llevar y cómo negociar tu primera tarjeta o préstamo.', '00000000-0000-0000-0000-000000000004', 'Finanzas', 'intermediate', 29.90, true),
  ('c0010000-0000-0000-0000-000000000005', 'Salón Pro: Servicios con Valor', 'salon-pro', 'Tatiana comparte su método para cobrar lo que vales. Atención al cliente, precios justos y fidelización.', '00000000-0000-0000-0000-000000000005', 'Emprendimiento', 'beginner', 0, true),
  ('c0010000-0000-0000-0000-000000000006', 'Recicla y Gana', 'recicla-y-gana', 'Juvenal te muestra cómo convertir la basura en dinero. Economía circular aplicada al barrio.', '00000000-0000-0000-0000-000000000006', 'Emprendimiento', 'beginner', 0, true),
  ('c0010000-0000-0000-0000-000000000007', 'Marketing de Barrio', 'marketing-de-barrio', 'Aprende a promocionar tu negocio con poco presupuesto. Redes sociales, voz a voz y estrategias que funcionan en el barrio.', '00000000-0000-0000-0000-000000000002', 'Marketing', 'beginner', 19.90, true),
  ('c0010000-0000-0000-0000-000000000008', 'Ahorra S/100 en 30 Días', 'ahorra-100-en-30', 'Un reto práctico para transformar tus hábitos financieros. Un capítulo por día durante 30 días.', '00000000-0000-0000-0000-000000000001', 'Finanzas', 'beginner', 0, true);

-- Chapters for Course 1: El Secreto del Éxito
INSERT INTO public.chapters (course_id, title, description, duration, order_index, is_free) VALUES
  ('c0010000-0000-0000-0000-000000000001', '¿Por qué prestar?', 'Introducción: el negocio del préstamo en el barrio. Por qué Don Pedro decidió prestar y cómo empezó.', 750, 1, true),
  ('c0010000-0000-0000-0000-000000000001', 'Conoce a tu prestatario', 'Las 5 preguntas que Don Pedro hace antes de prestar. Cómo evaluar la confianza y la capacidad de pago.', 1100, 2, true),
  ('c0010000-0000-0000-0000-000000000001', 'Las 5 reglas del préstamo seguro', 'Nunca prestes más de lo que puedes perder. Las reglas de oro que te protegen a ti y a tu cliente.', 1455, 3, false),
  ('c0010000-0000-0000-0000-000000000001', 'Cómo calcular intereses justos', 'La matemática simple detrás de un préstamo justo. Calcula tasas que funcionen para ambos.', 942, 4, false),
  ('c0010000-0000-0000-0000-000000000001', 'El contrato verbal que sí funciona', 'No necesitas un abogado. El sistema de Don Pedro para acuerdos que se cumplen sin papeles.', 1208, 5, false),
  ('c0010000-0000-0000-0000-000000000001', 'Qué hacer si no te pagan', 'Plan B, C y D. Cómo recuperar tu dinero sin violencia ni perder la relación.', 1350, 6, false),
  ('c0010000-0000-0000-0000-000000000001', 'El método completo de Don Pedro', 'Recapitulemos todo el sistema. Bonus: cómo escalar tu negocio de préstamos.', 2100, 7, false);

-- Chapters for Course 2: Recetas Financieras
INSERT INTO public.chapters (course_id, title, description, duration, order_index, is_free) VALUES
  ('c0010000-0000-0000-0000-000000000002', 'Tu dinero, tu mapa', 'Aprende a hacer un presupuesto simple que sí vas a seguir. La regla 50/30/20 explicada para el barrio.', 800, 1, true),
  ('c0010000-0000-0000-0000-000000000002', 'El sobre mágico', 'El método de los sobres para controlar gastos. Versión moderna y digital.', 650, 2, true),
  ('c0010000-0000-0000-0000-000000000002', 'Ahorro sin dolor', 'Técnicas de ahorro automático. Cómo ahorrar sin sentirlo.', 900, 3, false),
  ('c0010000-0000-0000-0000-000000000002', 'Inversión para principiantes', 'Opciones reales de inversión con poco dinero. Depósitos a plazo, fondos y más.', 1200, 4, false),
  ('c0010000-0000-0000-0000-000000000002', 'Protege tu dinero', 'Seguros, emergencias y cómo construir un colchón financiero.', 750, 5, false);

-- Lives (past and upcoming)
INSERT INTO public.lives (title, description, instructor_id, scheduled_at, duration, status, preregistered_count) VALUES
  ('El Secreto del Éxito de Barrio - Cap. 1', 'Estreno del primer capítulo en vivo. Don Pedro presenta su sistema.', '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '2 days', 84, 'finished', 312),
  ('Lucía: Crédito para Emprendedoras', 'Lucía responde todas tus dudas sobre créditos para mujeres emprendedoras.', '00000000-0000-0000-0000-000000000003', NOW() - INTERVAL '7 days', 107, 'finished', 245),
  ('Comunidad Q&A - Marzo', 'Sesión de preguntas y respuestas con toda la comunidad.', NULL, NOW() - INTERVAL '30 days', 58, 'finished', 189),
  ('Manuel: Cómo Hacer un Pitch', 'Manuel enseña a presentar tu negocio en 3 minutos.', '00000000-0000-0000-0000-000000000004', NOW() - INTERVAL '4 days', 72, 'finished', 178),
  ('Tatiana: Detecta Oportunidades', 'Tatiana comparte su método para encontrar nuevos mercados.', '00000000-0000-0000-0000-000000000005', NOW() - INTERVAL '6 days', 68, 'finished', 156),
  ('Carlos: Recetas para tu Bodega', 'Carlos da consejos prácticos para mejorar tu bodega.', '00000000-0000-0000-0000-000000000002', NOW() - INTERVAL '8 days', 91, 'finished', 203),
  ('El Secreto Cap. 2 - ESTRENO', 'Capítulo 2: Cómo prestarte sin que te coman vivo. ¡No te lo pierdas!', '00000000-0000-0000-0000-000000000001', NOW() + INTERVAL '6 hours', 90, 'scheduled', 412),
  ('Carlos: Control de Caja', 'Aprende a llevar la caja de tu negocio sin complicaciones.', '00000000-0000-0000-0000-000000000002', NOW() + INTERVAL '3 days', 75, 'scheduled', 134),
  ('Lucía: Vende lo que Cosas', 'Estrategias de venta para emprendedoras de moda y costura.', '00000000-0000-0000-0000-000000000003', NOW() + INTERVAL '5 days', 60, 'scheduled', 98),
  ('Manuel: Tu Primer Crédito', 'Guía completa para obtener tu primer crédito formal.', '00000000-0000-0000-0000-000000000004', NOW() + INTERVAL '7 days', 80, 'scheduled', 167);

-- Recordings from finished lives
INSERT INTO public.recordings (live_id, title, description, duration, views, is_published, published_at) VALUES
  ((SELECT id FROM public.lives WHERE title LIKE '%Cap. 1%' AND status = 'finished' LIMIT 1), 'El Secreto del Éxito - Capítulo 1', 'Don Pedro revela su sistema de préstamos.', 84, 1542, true, NOW() - INTERVAL '1 days'),
  ((SELECT id FROM public.lives WHERE title LIKE '%Lucía%Crédito%' LIMIT 1), 'Lucía: Crédito para Emprendedoras', 'Todo sobre créditos para mujeres.', 107, 892, true, NOW() - INTERVAL '6 days'),
  ((SELECT id FROM public.lives WHERE title LIKE '%Q&A%' LIMIT 1), 'Comunidad Q&A - Marzo 2026', 'Sesión de preguntas y respuestas.', 58, 456, true, NOW() - INTERVAL '29 days'),
  ((SELECT id FROM public.lives WHERE title LIKE '%Pitch%' LIMIT 1), 'Manuel: Cómo Hacer un Pitch', 'Presenta tu negocio en 3 minutos.', 72, 723, true, NOW() - INTERVAL '3 days'),
  ((SELECT id FROM public.lives WHERE title LIKE '%Detecta%' LIMIT 1), 'Tatiana: Detecta Oportunidades', 'Encuentra nuevos mercados.', 68, 634, true, NOW() - INTERVAL '5 days'),
  ((SELECT id FROM public.lives WHERE title LIKE '%Recetas%' LIMIT 1), 'Carlos: Recetas para tu Bodega', 'Consejos prácticos para tu bodega.', 91, 1102, true, NOW() - INTERVAL '7 days');

-- Tools
INSERT INTO public.tools (title, slug, description, icon_name, color_theme, type, config, is_published) VALUES
  ('Calculadora de Préstamos', 'calculadora-prestamos', 'Simula tu préstamo en 3 pasos. Interés compuesto, cuotas, cronograma.', 'Calculator', 'amber', 'calculator', '{"steps": 3, "fields": ["monto", "interes", "plazo"]}', true),
  ('Plan de Negocio Express', 'plan-negocio-express', 'Plantilla interactiva para crear tu plan de negocio en 7 pasos.', 'FileText', 'morado', 'wizard', '{"steps": 7}', true),
  ('Meta Financiera', 'meta-financiera', 'Define tu objetivo financiero en 5 minutos.', 'Target', 'coral', 'wizard', '{"duration_min": 5}', true),
  ('Quiz Financiero', 'quiz-financiero', '¿Qué tan financieramente inteligente eres? Descúbrelo en 2 minutos.', 'Brain', 'cyan', 'quiz', '{"questions": 10, "duration_min": 2}', true),
  ('Ruta de Ahorro', 'ruta-ahorro', 'Plan personalizado de ahorro según tus ingresos y gastos.', 'Route', 'teal', 'wizard', '{"duration_min": 8}', true),
  ('Calculadora de Interés', 'calculadora-interes', 'El interés compuesto explicado fácil. Mira cómo crece tu dinero.', 'Hash', 'orange', 'calculator', '{"fields": ["capital", "tasa", "periodo"]}', true);

-- Readings
INSERT INTO public.readings (title, slug, author, excerpt, duration_min, category, is_published) VALUES
  ('Guía: Abre tu Primera Cuenta Bancaria', 'guia-primera-cuenta', 'Equipo Kapitalizando', 'Todo lo que necesitas saber para abrir tu cuenta sin complicaciones. Requisitos, tipos de cuenta y bancos recomendados.', 8, 'Finanzas básicas', true),
  ('5 Errores al Pedir un Préstamo', '5-errores-prestamo', 'Don Pedro', 'Aprende de los errores de otros para no caer en las mismas trampas. Basado en 30 años de experiencia.', 12, 'Crédito', true),
  ('¿Qué es el Interés Compuesto?', 'que-es-interes-compuesto', 'Carlos Mendoza', 'El interés compuesto es la octava maravilla del mundo. Te explicamos por qué y cómo usarlo a tu favor.', 15, 'Inversión', true),
  ('Negocia con tus Proveedores', 'negocia-con-proveedores', 'Manuel Torres', 'Técnicas simples para conseguir mejores precios en tu bodega o negocio.', 10, 'Negocios', true),
  ('Guía de Ahorro para Emprendedores', 'guia-ahorro-emprendedores', 'Lucía Ramírez', 'Estrategias probadas para ahorrar incluso en meses difíciles. El método de los sobres digital.', 20, 'Ahorro', true),
  ('Cómo Detectar Billetes Falsos', 'detectar-billetes-falsos', 'Tatiana Huerta', 'Señales clave para no caer en estafas con dinero falso. Guía visual y táctil.', 7, 'Seguridad', true),
  ('Calcula tu Margen de Ganancia', 'margen-ganancia', 'Carlos Mendoza', 'La fórmula simple que todo emprendedor debe conocer. Ejemplos prácticos para tu negocio.', 14, 'Negocios', true),
  ('Gota a Gota: Cómo Evitarlo', 'gota-a-gota-como-evitarlo', 'Equipo Kapitalizando', 'Identifica las señales de alerta y conoce alternativas seguras de financiamiento.', 11, 'Seguridad', true);

-- Community projects (Kickstarter-style)
INSERT INTO public.projects (title, description, creator_id, goal_amount, raised_amount, backers_count, deadline, status, category) VALUES
  ('Bodega Don Carlos', 'Ampliación de mi bodega en V.E.S. Necesito estantes, refrigeración y más variedad de productos.', '00000000-0000-0000-0000-000000000002', 5000, 3200, 48, NOW() + INTERVAL '12 days', 'active', 'Negocio'),
  ('Taller de Costura Lucía', 'Comprar máquinas de coser industriales para crecer mi taller y emplear a más mujeres del barrio.', '00000000-0000-0000-0000-000000000003', 8000, 6500, 73, NOW() + INTERVAL '5 days', 'active', 'Emprendimiento'),
  ('Puesto de Jugos La Rosa', 'Renovar mi puesto con equipos modernos y abrir un segundo punto de venta.', NULL, 3000, 1800, 29, NOW() + INTERVAL '20 days', 'active', 'Comida'),
  ('Recicladora Juvenal', 'Centro de acopio y reciclaje en San Juan de Lurigancho. Crear empleo verde.', '00000000-0000-0000-0000-000000000006', 12000, 4200, 67, NOW() + INTERVAL '25 days', 'active', 'Ambiente'),
  ('Panadería Doña Rosa', 'Horno industrial y nuevos equipos para producir más pan y emplear a 3 personas más.', NULL, 6000, 6000, 91, NOW() - INTERVAL '2 days', 'funded', 'Comida'),
  ('Lavadero Ecológico', 'Sistema de lavado que ahorra agua y jabón. Emprendimiento sostenible.', NULL, 4000, 400, 12, NOW() + INTERVAL '30 days', 'active', 'Ambiente');

-- Learning paths (tracked via special course groupings)
INSERT INTO public.readings (title, slug, author, excerpt, duration_min, category, is_published) VALUES
  ('Ruta: Tu Primer Crédito Formal', 'ruta-primer-credito', 'Manuel Torres', '7 capítulos para obtener tu primer crédito formal. Desde cero hasta tu primera aprobación.', 45, 'Ruta', true),
  ('Ruta: Vende Más en tu Bodega', 'ruta-vende-bodega', 'Carlos Mendoza', '5 capítulos para impulsar tu bodega y aumentar tus ventas.', 35, 'Ruta', true),
  ('Ruta: Ahorra S/100 en 30 Días', 'ruta-ahorra-100', 'Don Pedro', '4 capítulos con el reto de ahorrar S/100 en 30 días. Hábitos financieros que cambian tu vida.', 25, 'Ruta', true);

-- Battle pass levels
INSERT INTO public.battle_pass_progress (user_id, level, xp, unlocked_courses, claimed_rewards) VALUES
  ('00000000-0000-0000-0000-000000000001', 5, 1250, ARRAY['c0010000-0000-0000-0000-000000000003', 'c0010000-0000-0000-0000-000000000005'], '[]'::jsonb),
  ('00000000-0000-0000-0000-000000000002', 3, 800, ARRAY['c0010000-0000-0000-0000-000000000001'], '[]'::jsonb);
