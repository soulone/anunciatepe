-- Migration: 008_storage_policies
-- Descripción: Permite a usuarios autenticados subir logos al bucket

-- Habilitar RLS en storage.objects si no está
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy para INSERT (subir archivos) - solo autenticados
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'logos');

-- Policy para SELECT (leer archivos) - público (ya es bucket público)
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

-- Policy para DELETE - solo autenticados
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'logos');
