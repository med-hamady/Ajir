-- TChallenge Complete Database Setup Script
-- Run this entire file in Supabase SQL Editor to set up the database in one go
-- Alternatively, run individual migration files in the migrations/ folder

-- ============================================================================
-- 1. ENABLE EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. CREATE TABLES
-- ============================================================================

-- Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  mission_statement TEXT,
  total_points INTEGER DEFAULT 0 CHECK (total_points >= 0),
  level TEXT DEFAULT 'Beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges Table
CREATE TABLE public.challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Solidarity', 'Environment', 'Education', 'Health')),
  image_url TEXT,
  goal_type TEXT NOT NULL CHECK (goal_type IN ('funds', 'volunteers', 'items', 'hours')),
  goal_amount NUMERIC NOT NULL CHECK (goal_amount > 0),
  current_amount NUMERIC DEFAULT 0 CHECK (current_amount >= 0),
  unit TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'upcoming', 'completed', 'archived')),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date > start_date)
);

-- Challenge Participants Table
CREATE TABLE public.challenge_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  contribution_amount NUMERIC DEFAULT 0 CHECK (contribution_amount >= 0),
  contribution_type TEXT CHECK (contribution_type IN ('donation', 'volunteer', 'share', 'participate')),
  message TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(challenge_id, user_id)
);

-- Badges Table
CREATE TABLE public.badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('challenges_completed', 'points_earned', 'category_specific', 'hours_volunteered')),
  requirement_value INTEGER NOT NULL CHECK (requirement_value > 0),
  requirement_category TEXT CHECK (requirement_category IN ('Solidarity', 'Environment', 'Education', 'Health')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Badges Table
CREATE TABLE public.user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Challenge Updates Table
CREATE TABLE public.challenge_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  update_type TEXT NOT NULL CHECK (update_type IN ('donation', 'join', 'share', 'milestone', 'comment')),
  amount NUMERIC CHECK (amount >= 0),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rewards Table
CREATE TABLE public.rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  points_cost INTEGER NOT NULL CHECK (points_cost > 0),
  stock_quantity INTEGER CHECK (stock_quantity >= 0),
  category TEXT CHECK (category IN ('physical', 'digital', 'discount', 'experience')),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Rewards Table
CREATE TABLE public.user_rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reward_id UUID REFERENCES public.rewards(id) ON DELETE SET NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'used', 'cancelled')),
  tracking_info TEXT,
  delivery_address TEXT,
  notes TEXT
);

-- ============================================================================
-- 3. CREATE INDEXES
-- ============================================================================

CREATE INDEX idx_profiles_total_points ON public.profiles(total_points DESC);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_challenges_category ON public.challenges(category);
CREATE INDEX idx_challenges_status ON public.challenges(status);
CREATE INDEX idx_challenges_slug ON public.challenges(slug);
CREATE INDEX idx_challenge_participants_challenge_id ON public.challenge_participants(challenge_id);
CREATE INDEX idx_challenge_participants_user_id ON public.challenge_participants(user_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_challenge_updates_challenge_id ON public.challenge_updates(challenge_id);

-- ============================================================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. CREATE RLS POLICIES
-- ============================================================================

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Challenges policies
CREATE POLICY "Challenges are viewable by everyone" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create challenges" ON public.challenges FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Participants policies
CREATE POLICY "Participants are viewable by everyone" ON public.challenge_participants FOR SELECT USING (true);
CREATE POLICY "Users can join challenges" ON public.challenge_participants FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Badges policies
CREATE POLICY "Badges are viewable by everyone" ON public.badges FOR SELECT USING (true);

-- User badges policies
CREATE POLICY "User badges are viewable by everyone" ON public.user_badges FOR SELECT USING (true);

-- Challenge updates policies
CREATE POLICY "Challenge updates are viewable by everyone" ON public.challenge_updates FOR SELECT USING (true);

-- Rewards policies
CREATE POLICY "Rewards are viewable by everyone" ON public.rewards FOR SELECT USING (true);

-- User rewards policies
CREATE POLICY "Users can view their own rewards" ON public.user_rewards FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- 6. CREATE FUNCTIONS AND TRIGGERS
-- ============================================================================

-- See migrations/20241204000010_create_functions_and_triggers.sql for full implementation
-- This section is abbreviated for brevity - run the individual migration file for complete setup

-- ============================================================================
-- 7. SEED INITIAL DATA
-- ============================================================================

-- This setup script doesn't include seed data
-- Run migrations/20241204000012_seed_badges.sql and
-- migrations/20241204000013_seed_sample_data.sql separately for sample data

-- ============================================================================
-- SETUP COMPLETE
-- ============================================================================

-- Verify installation
SELECT 'Setup complete! Total tables created: ' || COUNT(*)::TEXT
FROM information_schema.tables
WHERE table_schema = 'public';
