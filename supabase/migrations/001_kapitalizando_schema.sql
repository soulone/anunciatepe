-- Migration: 001_kapitalizando_schema
-- Descripción: Schema completo de Kapitalizando

-- 1. Profiles (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'premium', 'battle_pass')),
  battle_pass_level INT DEFAULT 0,
  battle_pass_xp INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Courses
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES public.profiles,
  thumbnail_url TEXT,
  cover_url TEXT,
  category TEXT,
  level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  price DECIMAL(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Chapters
CREATE TABLE public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration INT DEFAULT 0,
  order_index INT DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Lives
CREATE TABLE public.lives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES public.profiles,
  thumbnail_url TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration INT DEFAULT 0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished', 'cancelled')),
  stream_url TEXT,
  preregistered_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Recordings (VOD)
CREATE TABLE public.recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_id UUID REFERENCES public.lives,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  duration INT DEFAULT 0,
  views INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tools
CREATE TABLE public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_name TEXT,
  color_theme TEXT,
  type TEXT CHECK (type IN ('calculator', 'quiz', 'wizard', 'game', 'app')),
  config JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Readings
CREATE TABLE public.readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author TEXT,
  excerpt TEXT,
  content_url TEXT,
  cover_url TEXT,
  duration_min INT DEFAULT 5,
  category TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Community Projects (Kickstarter-style)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES public.profiles,
  goal_amount DECIMAL(10,2),
  raised_amount DECIMAL(10,2) DEFAULT 0,
  backers_count INT DEFAULT 0,
  deadline TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'funded', 'failed', 'cancelled')),
  category TEXT,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Project backers
CREATE TABLE public.project_backers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- 10. Enrollments
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles,
  course_id UUID REFERENCES public.courses,
  progress DECIMAL(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  last_watched_chapter_id UUID REFERENCES public.chapters,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- 11. Purchases
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles,
  item_type TEXT CHECK (item_type IN ('course', 'plan', 'battle_pass')),
  item_id UUID,
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'PEN',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  culqi_charge_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Battle Pass Progress
CREATE TABLE public.battle_pass_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles UNIQUE,
  level INT DEFAULT 0,
  xp INT DEFAULT 0,
  unlocked_courses UUID[] DEFAULT '{}',
  claimed_rewards JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Live reminders
CREATE TABLE public.live_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles,
  live_id UUID REFERENCES public.lives ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, live_id)
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_courses_published ON public.courses(is_published) WHERE is_published = true;
CREATE INDEX idx_courses_category ON public.courses(category);
CREATE INDEX idx_chapters_course ON public.chapters(course_id, order_index);
CREATE INDEX idx_lives_scheduled ON public.lives(scheduled_at) WHERE status = 'scheduled';
CREATE INDEX idx_recordings_published ON public.recordings(is_published) WHERE is_published = true;
CREATE INDEX idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX idx_purchases_user ON public.purchases(user_id);
CREATE INDEX idx_projects_status ON public.projects(status);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Courses (public read for published)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published courses" ON public.courses
  FOR SELECT USING (is_published = true OR auth.uid() = instructor_id);
CREATE POLICY "Instructors can manage own courses" ON public.courses
  FOR ALL USING (auth.uid() = instructor_id);

-- Chapters
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view free chapters" ON public.chapters
  FOR SELECT USING (
    is_free = true OR
    EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.instructor_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.enrollments e WHERE e.course_id = course_id AND e.user_id = auth.uid())
  );

-- Enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own enrollments" ON public.enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- Lives
ALTER TABLE public.lives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view lives" ON public.lives
  FOR SELECT USING (true);

-- Recordings
ALTER TABLE public.recordings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published recordings" ON public.recordings
  FOR SELECT USING (is_published = true);

-- Tools
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view tools" ON public.tools
  FOR SELECT USING (is_published = true);

-- Readings
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view readings" ON public.readings
  FOR SELECT USING (is_published = true);

-- Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active projects" ON public.projects
  FOR SELECT USING (status = 'active' OR auth.uid() = creator_id);
CREATE POLICY "Users can create projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- Purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Battle Pass
ALTER TABLE public.battle_pass_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own BP" ON public.battle_pass_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own BP" ON public.battle_pass_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ language plpgsql security definer;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
