-- Seed data falsa para visualizar en CRUDs
-- Sin FK a auth.users (instructor_id, creator_id van NULL)

-- =============================================
-- CURSOS (8) - con UUIDs válidos
-- =============================================
INSERT INTO public.courses (id, title, slug, description, category, level, price, is_published) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'El Secreto del Éxito de Barrio', 'el-secreto-del-exito', 'Don Pedro te enseña su sistema de préstamos seguro. 30 años prestando en V.E.S.', 'Finanzas', 'beginner', 0, true),
  ('a0000000-0000-0000-0000-000000000002', 'Recetas Financieras', 'recetas-financieras', 'Carlos te guía para ordenar tus finanzas. Presupuestos, ahorro e inversión.', 'Finanzas', 'beginner', 0, true),
  ('a0000000-0000-0000-0000-000000000003', 'Cosé tu Futuro', 'cose-tu-futuro', 'Lucía te enseña a vender lo que haces. De la costura al marketing.', 'Emprendimiento', 'beginner', 0, true),
  ('a0000000-0000-0000-0000-000000000004', 'Taller: Tu Primer Crédito Formal', 'taller-primer-credito', 'Manuel te explica el sistema financiero formal: cómo calificar y qué documentos llevar.', 'Finanzas', 'intermediate', 29.90, true),
  ('a0000000-0000-0000-0000-000000000005', 'Salón Pro: Servicios con Valor', 'salon-pro', 'Tatiana comparte su método para cobrar lo que vales.', 'Emprendimiento', 'beginner', 0, true),
  ('a0000000-0000-0000-0000-000000000006', 'Marketing de Barrio', 'marketing-de-barrio', 'Aprende a promocionar tu negocio con poco presupuesto.', 'Marketing', 'beginner', 19.90, true),
  ('a0000000-0000-0000-0000-000000000007', 'Ahorra S/100 en 30 Días', 'ahorra-100-en-30', 'Un reto práctico para transformar tus hábitos financieros.', 'Finanzas', 'beginner', 0, true),
  ('a0000000-0000-0000-0000-000000000008', 'Recicla y Gana', 'recicla-y-gana', 'Convierte la basura en dinero. Economía circular para el barrio.', 'Emprendimiento', 'beginner', 0, true)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- CAPÍTULOS
-- =============================================
INSERT INTO public.chapters (course_id, title, description, duration, order_index, is_free) VALUES
  ('a0000000-0000-0000-0000-000000000001', '¿Por qué prestar?', 'Introducción al negocio del préstamo', 750, 1, true),
  ('a0000000-0000-0000-0000-000000000001', 'Conoce a tu prestatario', 'Las 5 preguntas clave antes de prestar', 1100, 2, true),
  ('a0000000-0000-0000-0000-000000000001', 'Las 5 reglas del préstamo seguro', 'Reglas de oro para protegerte', 1455, 3, false),
  ('a0000000-0000-0000-0000-000000000001', 'Qué hacer si no te pagan', 'Plan B, C y D para recuperar tu dinero', 1350, 4, false),
  ('a0000000-0000-0000-0000-000000000002', 'Tu dinero, tu mapa', 'Presupuesto simple que sí vas a seguir', 800, 1, true),
  ('a0000000-0000-0000-0000-000000000002', 'Ahorro sin dolor', 'Técnicas de ahorro automático', 900, 2, false),
  ('a0000000-0000-0000-0000-000000000002', 'Inversión para principiantes', 'Opciones reales con poco dinero', 1200, 3, false),
  ('a0000000-0000-0000-0000-000000000003', 'Cosiendo tu marca', 'Encuentra tu estilo y tu público', 650, 1, true),
  ('a0000000-0000-0000-0000-000000000003', 'Precios que venden', 'Cómo ponerle precio a tu trabajo', 720, 2, true),
  ('a0000000-0000-0000-0000-000000000004', '¿Qué es un crédito formal?', 'Diferencias con el préstamo informal', 540, 1, true),
  ('a0000000-0000-0000-0000-000000000004', 'Documentos necesarios', 'Todo lo que debes llevar al banco', 680, 2, false),
  ('a0000000-0000-0000-0000-000000000004', 'Negociando tu tasa', 'Cómo conseguir mejores condiciones', 810, 3, false),
  ('a0000000-0000-0000-0000-000000000005', 'Atención al cliente', 'Haz que vuelvan una y otra vez', 580, 1, true),
  ('a0000000-0000-0000-0000-000000000005', 'Fidelización', 'Programas simples para clientes leales', 620, 2, false),
  ('a0000000-0000-0000-0000-000000000006', 'Redes sociales gratis', 'Facebook, TikTok y WhatsApp para tu negocio', 900, 1, true),
  ('a0000000-0000-0000-0000-000000000006', 'Voz a voz digital', 'Cómo hacer que hablen de tu marca', 750, 2, false),
  ('a0000000-0000-0000-0000-000000000007', 'Diagnóstico financiero', '¿A dónde se va tu dinero?', 500, 1, true),
  ('a0000000-0000-0000-0000-000000000007', 'El método de los sobres', 'Versión moderna del ahorro clásico', 650, 2, true),
  ('a0000000-0000-0000-0000-000000000007', '30 días, 30 hábitos', 'Calendario de retos diarios', 800, 3, false),
  ('a0000000-0000-0000-0000-000000000008', 'Basura que vale oro', 'Identifica materiales reciclables valiosos', 600, 1, true),
  ('a0000000-0000-0000-0000-000000000008', 'Puntos de acopio', 'Dónde y cómo vender reciclaje', 550, 2, false)
ON CONFLICT DO NOTHING;

-- =============================================
-- LIVES (6)
-- =============================================
INSERT INTO public.lives (id, title, description, scheduled_at, duration, status, preregistered_count) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'El Secreto del Éxito - Cap. 1', 'Estreno del primer capítulo en vivo', NOW() - INTERVAL '2 days', 84, 'finished', 312),
  ('b0000000-0000-0000-0000-000000000002', 'Lucía: Crédito para Emprendedoras', 'Tus dudas sobre créditos respondidas', NOW() - INTERVAL '7 days', 107, 'finished', 245),
  ('b0000000-0000-0000-0000-000000000003', 'Manuel: Cómo Hacer un Pitch', 'Presenta tu negocio en 3 minutos', NOW() - INTERVAL '4 days', 72, 'finished', 178),
  ('b0000000-0000-0000-0000-000000000004', 'El Secreto Cap. 2 - ESTRENO', 'No te lo pierdas', NOW() + INTERVAL '6 hours', 90, 'scheduled', 412),
  ('b0000000-0000-0000-0000-000000000005', 'Carlos: Control de Caja', 'Lleva la caja de tu negocio', NOW() + INTERVAL '3 days', 75, 'scheduled', 134),
  ('b0000000-0000-0000-0000-000000000006', 'Lucía: Vende lo que Cosas', 'Estrategias de venta para costura', NOW() + INTERVAL '5 days', 60, 'scheduled', 98)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- GRABACIONES (5)
-- =============================================
INSERT INTO public.recordings (title, description, duration, views, is_published, published_at) VALUES
  ('El Secreto del Éxito - Capítulo 1', 'Don Pedro revela su sistema de préstamos', 84, 1542, true, NOW() - INTERVAL '1 days'),
  ('Lucía: Crédito para Emprendedoras', 'Todo sobre créditos para mujeres', 107, 892, true, NOW() - INTERVAL '6 days'),
  ('Comunidad Q&A - Marzo', 'Sesión de preguntas y respuestas', 58, 456, true, NOW() - INTERVAL '29 days'),
  ('Manuel: Cómo Hacer un Pitch', 'Presenta tu negocio en 3 minutos', 72, 723, true, NOW() - INTERVAL '3 days'),
  ('Carlos: Recetas para tu Bodega', 'Consejos prácticos para tu bodega', 91, 1102, true, NOW() - INTERVAL '7 days')
ON CONFLICT DO NOTHING;

-- =============================================
-- HERRAMIENTAS (6)
-- =============================================
INSERT INTO public.tools (title, slug, description, icon_name, color_theme, type, config, is_published) VALUES
  ('Calculadora de Préstamos', 'calculadora-prestamos', 'Simula tu préstamo en 3 pasos.', 'Calculator', 'amber', 'calculator', '{"steps":3}', true),
  ('Plan de Negocio Express', 'plan-negocio-express', 'Crea tu plan de negocio en 7 pasos.', 'FileText', 'morado', 'wizard', '{"steps":7}', true),
  ('Meta Financiera', 'meta-financiera', 'Define tu objetivo financiero en 5 min.', 'Target', 'coral', 'wizard', '{"duration_min":5}', true),
  ('Quiz Financiero', 'quiz-financiero', '¿Qué tan financiero eres?', 'Brain', 'cyan', 'quiz', '{"questions":10}', true),
  ('Ruta de Ahorro', 'ruta-ahorro', 'Plan de ahorro personalizado.', 'Route', 'teal', 'wizard', '{"duration_min":8}', true),
  ('Calculadora de Interés', 'calculadora-interes', 'Interés compuesto explicado fácil.', 'Hash', 'orange', 'calculator', '{}', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- LECTURAS (8)
-- =============================================
INSERT INTO public.readings (title, slug, author, excerpt, duration_min, category, is_published) VALUES
  ('Guía: Abre tu Primera Cuenta Bancaria', 'guia-primera-cuenta', 'Equipo Kapitalizando', 'Todo para abrir tu cuenta sin complicaciones.', 8, 'Finanzas básicas', true),
  ('5 Errores al Pedir un Préstamo', '5-errores-prestamo', 'Don Pedro', 'Aprende de los errores de otros.', 12, 'Crédito', true),
  ('¿Qué es el Interés Compuesto?', 'que-es-interes-compuesto', 'Carlos Mendoza', 'El interés compuesto explicado.', 15, 'Inversión', true),
  ('Negocia con tus Proveedores', 'negocia-con-proveedores', 'Manuel Torres', 'Técnicas para mejores precios.', 10, 'Negocios', true),
  ('Guía de Ahorro para Emprendedores', 'guia-ahorro-emprendedores', 'Lucía Ramírez', 'Estrategias para ahorrar.', 20, 'Ahorro', true),
  ('Cómo Detectar Billetes Falsos', 'detectar-billetes-falsos', 'Tatiana Huerta', 'Señales clave para no caer en estafas.', 7, 'Seguridad', true),
  ('Calcula tu Margen de Ganancia', 'margen-ganancia', 'Carlos Mendoza', 'La fórmula que todo emprendedor debe conocer.', 14, 'Negocios', true),
  ('Gota a Gota: Cómo Evitarlo', 'gota-a-gota-como-evitarlo', 'Equipo Kapitalizando', 'Alternativas seguras al préstamo informal.', 11, 'Seguridad', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PROYECTOS COMUNITARIOS (4)
-- =============================================
INSERT INTO public.projects (title, description, goal_amount, raised_amount, backers_count, deadline, status, category) VALUES
  ('Bodega Don Carlos', 'Ampliación con estantes y refrigeración.', 5000, 3200, 48, NOW() + INTERVAL '12 days', 'active', 'Negocio'),
  ('Taller de Costura Lucía', 'Máquinas industriales para emplear mujeres.', 8000, 6500, 73, NOW() + INTERVAL '5 days', 'active', 'Emprendimiento'),
  ('Recicladora Juvenal', 'Centro de acopio en SJL.', 12000, 4200, 67, NOW() + INTERVAL '25 days', 'active', 'Ambiente'),
  ('Puesto de Jugos La Rosa', 'Renovar y abrir segundo punto.', 3000, 1800, 29, NOW() + INTERVAL '20 days', 'active', 'Comida')
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PLANES (2)
-- =============================================
INSERT INTO public.products (key, name, description, price, type, interval, is_active, sort_order) VALUES
  ('battle_pass', 'Battle Pass', 'Desbloquea contenido premium progresivamente', 19.90, 'subscription', 'month', true, 1),
  ('plan_premium', 'Plan Premium', 'Acceso a TODO el contenido', 39.90, 'subscription', 'month', true, 2)
ON CONFLICT (key) DO NOTHING;
