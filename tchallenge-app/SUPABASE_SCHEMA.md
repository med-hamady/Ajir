# TChallenge Supabase Database Schema

This document outlines the database schema for the TChallenge application.

## Tables

### 1. users (extends Supabase Auth)
```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  mission_statement TEXT,
  total_points INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 2. challenges
```sql
CREATE TABLE public.challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  category TEXT NOT NULL, -- 'Solidarity', 'Environment', 'Education', 'Health'
  image_url TEXT,
  goal_type TEXT NOT NULL, -- 'funds', 'volunteers', 'items'
  goal_amount NUMERIC NOT NULL,
  current_amount NUMERIC DEFAULT 0,
  unit TEXT, -- 'kg', 'volunteers', 'hours', etc.
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active', -- 'active', 'upcoming', 'completed', 'archived'
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Challenges are viewable by everyone"
  ON public.challenges FOR SELECT
  USING (true);
```

### 3. challenge_participants
```sql
CREATE TABLE public.challenge_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  contribution_amount NUMERIC DEFAULT 0,
  contribution_type TEXT, -- 'donation', 'volunteer', 'share'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(challenge_id, user_id)
);

ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants are viewable by everyone"
  ON public.challenge_participants FOR SELECT
  USING (true);

CREATE POLICY "Users can join challenges"
  ON public.challenge_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 4. badges
```sql
CREATE TABLE public.badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  requirement_type TEXT NOT NULL, -- 'challenges_completed', 'points_earned', 'category_specific'
  requirement_value INTEGER NOT NULL,
  requirement_category TEXT, -- Optional: for category-specific badges
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges are viewable by everyone"
  ON public.badges FOR SELECT
  USING (true);
```

### 5. user_badges
```sql
CREATE TABLE public.user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User badges are viewable by everyone"
  ON public.user_badges FOR SELECT
  USING (true);

CREATE POLICY "Users can view their own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);
```

### 6. challenge_updates
```sql
CREATE TABLE public.challenge_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  update_type TEXT NOT NULL, -- 'donation', 'join', 'share', 'milestone'
  amount NUMERIC,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.challenge_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Challenge updates are viewable by everyone"
  ON public.challenge_updates FOR SELECT
  USING (true);
```

### 7. rewards
```sql
CREATE TABLE public.rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  points_cost INTEGER NOT NULL,
  stock_quantity INTEGER,
  category TEXT, -- 'physical', 'digital', 'discount'
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rewards are viewable by everyone"
  ON public.rewards FOR SELECT
  USING (true);
```

### 8. user_rewards
```sql
CREATE TABLE public.user_rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES public.rewards(id),
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending', -- 'pending', 'shipped', 'delivered', 'used'
  tracking_info TEXT
);

ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rewards"
  ON public.user_rewards FOR SELECT
  USING (auth.uid() = user_id);
```

### 9. leaderboard (Materialized View)
```sql
CREATE MATERIALIZED VIEW public.leaderboard AS
SELECT
  p.id,
  p.full_name,
  p.avatar_url,
  p.total_points,
  COUNT(DISTINCT cp.challenge_id) as challenges_completed,
  ROW_NUMBER() OVER (ORDER BY p.total_points DESC) as rank
FROM public.profiles p
LEFT JOIN public.challenge_participants cp ON p.id = cp.user_id
GROUP BY p.id, p.full_name, p.avatar_url, p.total_points
ORDER BY p.total_points DESC;

-- Create index for faster queries
CREATE INDEX idx_leaderboard_rank ON public.leaderboard(rank);

-- Refresh the view periodically (can be done via a cron job or trigger)
REFRESH MATERIALIZED VIEW public.leaderboard;
```

## Functions and Triggers

### Update profile timestamp
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Update challenge progress
```sql
CREATE OR REPLACE FUNCTION update_challenge_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.challenges
  SET current_amount = current_amount + NEW.contribution_amount
  WHERE id = NEW.challenge_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_challenge_on_participation
  AFTER INSERT ON public.challenge_participants
  FOR EACH ROW EXECUTE FUNCTION update_challenge_progress();
```

### Award points to user
```sql
CREATE OR REPLACE FUNCTION award_points_on_participation()
RETURNS TRIGGER AS $$
DECLARE
  points_earned INTEGER;
BEGIN
  -- Award points based on contribution (customize logic as needed)
  IF NEW.contribution_type = 'donation' THEN
    points_earned := FLOOR(NEW.contribution_amount / 10); -- 1 point per 10 EUR
  ELSIF NEW.contribution_type = 'volunteer' THEN
    points_earned := 50; -- Fixed points for volunteering
  ELSIF NEW.contribution_type = 'share' THEN
    points_earned := 10; -- Points for sharing
  ELSE
    points_earned := 0;
  END IF;

  UPDATE public.profiles
  SET total_points = total_points + points_earned
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_points_trigger
  AFTER INSERT ON public.challenge_participants
  FOR EACH ROW EXECUTE FUNCTION award_points_on_participation();
```

### Check and award badges
```sql
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  badge RECORD;
  user_challenge_count INTEGER;
BEGIN
  -- Check for badges based on challenges completed
  SELECT COUNT(DISTINCT challenge_id) INTO user_challenge_count
  FROM public.challenge_participants
  WHERE user_id = NEW.id;

  FOR badge IN
    SELECT * FROM public.badges
    WHERE requirement_type = 'challenges_completed'
    AND requirement_value <= user_challenge_count
  LOOP
    INSERT INTO public.user_badges (user_id, badge_id)
    VALUES (NEW.id, badge.id)
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END LOOP;

  -- Check for badges based on total points
  FOR badge IN
    SELECT * FROM public.badges
    WHERE requirement_type = 'points_earned'
    AND requirement_value <= NEW.total_points
  LOOP
    INSERT INTO public.user_badges (user_id, badge_id)
    VALUES (NEW.id, badge.id)
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_badges_on_profile_update
  AFTER UPDATE OF total_points ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION check_and_award_badges();
```

## Setup Instructions

1. **Create a new Supabase project** at [https://supabase.com](https://supabase.com)

2. **Run the SQL commands** above in the Supabase SQL Editor in this order:
   - Tables (users, challenges, etc.)
   - Policies
   - Functions and Triggers
   - Materialized View

3. **Enable UUID extension** (if not already enabled):
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

4. **Insert sample data** (optional, for testing)

5. **Configure your `.env` file** with Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## API Access

Use the Supabase JavaScript client to interact with these tables:

```javascript
import { supabase } from './lib/supabase';

// Example: Fetch all active challenges
const { data, error } = await supabase
  .from('challenges')
  .select('*')
  .eq('status', 'active');

// Example: Join a challenge
const { data, error } = await supabase
  .from('challenge_participants')
  .insert({
    challenge_id: 'challenge-uuid',
    user_id: 'user-uuid',
    contribution_type: 'volunteer'
  });
```
