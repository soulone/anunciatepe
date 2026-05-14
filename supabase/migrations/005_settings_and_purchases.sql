-- Migration: 005_settings_and_purchases
-- Tabla settings para credenciales MP + ajustes de suscripciones

CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;
CREATE POLICY "Admins can manage settings" ON public.settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

INSERT INTO public.settings (key, value) VALUES
  ('MERCADO_PAGO_PUBLIC_KEY', ''),
  ('MERCADO_PAGO_ACCESS_TOKEN', ''),
  ('MERCADO_PAGO_ENABLED', 'false')
ON CONFLICT (key) DO NOTHING;

-- Asegurar que purchases tenga item_type para cursos
ALTER TABLE public.purchases ADD COLUMN IF NOT EXISTS item_type TEXT
  CHECK (item_type IN ('course', 'plan', 'battle_pass'));

-- Tabla user_subscriptions
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles,
  plan_key TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start TIMESTAMPTZ DEFAULT NOW(),
  current_period_end TIMESTAMPTZ,
  mp_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admins can manage subscriptions" ON public.user_subscriptions
  FOR ALL USING (public.is_admin());
