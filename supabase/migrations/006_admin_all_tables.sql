-- Agregar policies INSERT/ALL para admin en tablas faltantes
CREATE POLICY "Admins can manage tools" ON public.tools FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage readings" ON public.readings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage recordings" ON public.recordings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage lives" ON public.lives FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage chapters" ON public.chapters FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (public.is_admin());
