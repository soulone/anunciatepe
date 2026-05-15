-- Migration: 007_performance_indexes
-- Creado: 4 índices de rendimiento para escalar a 10k+ usuarios
-- Ejecutado via Management API

CREATE INDEX IF NOT EXISTS idx_lives_status 
ON public.lives(status);

CREATE INDEX IF NOT EXISTS idx_recordings_views_desc 
ON public.recordings(views DESC);

CREATE INDEX IF NOT EXISTS idx_readings_category 
ON public.readings(category);

CREATE INDEX IF NOT EXISTS idx_profiles_full_name_search 
ON public.profiles USING gin(to_tsvector('spanish', coalesce(full_name, '')));
