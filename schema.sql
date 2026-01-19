-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector"; -- pgvector for embeddings

-- 1. Users & Auth Managed by Supabase Auth, but we extend public profile
create table public.users (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Learner DNA (The Core Intelligence)
create table public.learner_dna (
  user_id uuid references public.users(id) primary key,
  learning_style jsonb, -- ['visual', 'auditory']
  current_skills jsonb, -- { 'python': 50, 'sql': 30 }
  career_aspirations uuid[], -- Array of role_ids
  constraints jsonb, -- { 'hours': 10, 'device': 'mobile' }
  behavioral_signals jsonb, -- { 'consistency': 0.8 }
  dna_embedding vector(768), -- For similarity search
  updated_at timestamptz default now()
);

-- 3. Skills Master (NSQF Aligned)
create table public.skills_master (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  nsqf_level int check (nsqf_level between 1 and 10),
  domain text,
  description text
);

-- 4. Career Roles & Market Data
create table public.career_roles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  nsqf_level int,
  demand_score float, -- 0-100 derived from job_market_signals
  salary_range_min int,
  salary_range_max int,
  growth_rate float, -- Year over Year
  required_skill_ids uuid[]
);

-- 5. Learning Paths
create table public.learning_paths (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  target_role_id uuid references public.career_roles(id),
  status text default 'active', -- active, completed, paused
  progress float default 0.0,
  created_at timestamptz default now()
);

-- 6. Path Nodes (Graph Structure)
create table public.path_nodes (
  id uuid default uuid_generate_v4() primary key,
  path_id uuid references public.learning_paths(id),
  sequence_order int,
  node_type text, -- course, assessment, internship
  content_ref_id uuid, -- link to course_catalog
  status text default 'locked',
  ai_justification text -- Explainability
);

-- 7. Job Market Signals (Time Series)
create table public.job_market_signals (
  id uuid default uuid_generate_v4() primary key,
  role_id uuid references public.career_roles(id),
  signal_date date default current_date,
  job_volume int,
  avg_salary int,
  location_hotspots text[] -- ['Bangalore', 'Pune']
);

-- Indexes for scale
create index idx_learner_dna_embedding on public.learner_dna using ivfflat (dna_embedding vector_cosine_ops);
create index idx_path_user on public.learning_paths(user_id);
create index idx_market_signals_role on public.job_market_signals(role_id, signal_date);

-- RLS Policies (Example)
alter table public.learner_dna enable row level security;
create policy "Users can view own DNA" on public.learner_dna for select using (auth.uid() = user_id);
