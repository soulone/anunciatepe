-- Migration: 002_admin_role
-- Descripción: Agrega rol de administrador

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Índice para búsqueda rápida de admins
CREATE INDEX IF NOT EXISTS idx_profiles_admin ON public.profiles(is_admin) WHERE is_admin = true;

-- Trigger: asegurar que al menos un admin existe (opcional, solo para protección)
-- CREATE OR REPLACE FUNCTION public.prevent_last_admin_delete()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   IF OLD.is_admin = true AND NOT EXISTS (SELECT 1 FROM public.profiles WHERE is_admin = true AND id != OLD.id) THEN
--     RAISE EXCEPTION 'Cannot delete the last admin';
--   END IF;
--   RETURN OLD;
-- END;
-- $$ language plpgsql security definer;

-- Actualizar RLS policies para admin
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Admin policies for courses
CREATE POLICY "Admins can manage all courses" ON public.courses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );
