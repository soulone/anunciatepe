-- Fix: eliminar policies recursivas de admin
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all courses" ON public.courses;

-- Función helper para verificar admin SIN recursión
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- Nuevas policies usando la función helper
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR public.is_admin()
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id OR public.is_admin()
  );

CREATE POLICY "Admins can manage all courses" ON public.courses
  FOR ALL USING (public.is_admin());

-- Dar acceso a la función
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;
