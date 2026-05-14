# SPEC.md — Kapitalizando

## 1. 🏗️ Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js | 15 (App Router) |
| Lenguaje | TypeScript | 5.x |
| UI Kit | shadcn/ui + Tailwind CSS | v4 |
| Iconos | Lucide React + Phosphor Icons | latest |
| Fonts | Inter (body) + Playfair Display (headings serif) | Google Fonts |
| Auth | Supabase Auth | v2 |
| DB | Supabase PostgreSQL | latest |
| Storage/Video | Google Drive embebido (iframe) | — |
| Pagos | Culqi JS SDK | v3 |
| Hosting | Vercel | Pro |
| Deploy | Vercel CLI + GitHub Actions | — |

---

## 2. 🎨 Design Tokens

```css
--color-bg: #0A0A0A;
--color-bg-card: #141414;
--color-primary: #FFD700;
--color-primary-hover: #FFC107;
--color-accent-teal: #00BFA5;
--color-accent-morado: #7C3AED;
--color-accent-coral: #FF6B6B;
--color-accent-cyan: #00BCD4;
--color-accent-orange: #FF9800;
--color-text: #FFFFFF;
--color-text-secondary: #A0A0A0;
--color-danger: #EF4444;
--color-success: #10B981;

--font-body: 'Inter', sans-serif;
--font-heading: 'Playfair Display', serif;
--font-mono: 'JetBrains Mono', monospace;

--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

---

## 3. 🧩 Estructura de Componentes

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── auth/login/page.tsx
│   ├── auth/register/page.tsx
│   ├── courses/page.tsx
│   ├── courses/[slug]/page.tsx
│   ├── lives/page.tsx
│   ├── tools/page.tsx
│   ├── readings/page.tsx
│   ├── community/page.tsx
│   └── profile/page.tsx
├── components/
│   ├── ui/                     # shadcn/ui overrides
│   ├── layout/                 # topbar, footer, mobile-nav
│   ├── hero/                   # hero-live, hero-slider
│   ├── content/                # video-card, course-card, live-card
│   ├── tools/                  # tool-card, tool-grid
│   ├── reading/                # reading-card, reading-list
│   ├── community/              # project-card, stats-bar
│   ├── learning-path/          # path-card, path-progress
│   ├── ranking/                # rank-card, rank-number
│   └── shared/                 # section-header, scroll-arrows, etc
├── lib/
│   └── supabase/               # client, server, middleware, types
├── hooks/                      # use-user, use-auth, use-courses, etc
├── stores/                     # auth-store, player-store, ui-store
└── styles/
    └── globals.css
```

---

## 4. 📊 Esquema DB (Supabase)

Tablas: profiles, courses, chapters, lives, recordings, tools, readings, projects, enrollments, purchases, battle_pass_progress

Cada tabla con RLS policies. Auth via Supabase Auth (Google + Email).

---

## 5. 🗓️ Sprints

### Sprint 1 — Fundación (Día 1-3)
Scaffold Next.js → Tailwind + shadcn/ui → Supabase config → Auth → Layout global → Deploy Vercel

### Sprint 2 — Home + Hero (Día 4-6)
HeroLive → VideoRow → VideoCard → Sections: Continuá, Grabaciones, Cursos destacados

### Sprint 3 — Contenido (Día 7-9)
CourseCard hover → Course page + Player → Lives → Tools → ToolGrid

### Sprint 4 — Comunidad + Gamificación (Día 10-12)
PathCard → Ranking → Kickstarter Community → Battle Pass → Culqi

### Sprint 5 — Refinamiento (Día 13-15)
Profile → Readings → Skeletons → Animations → Responsive → SEO
```
