-- Create challenges table
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
  unit TEXT, -- 'kg', 'volunteers', 'hours', '€', etc.
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'upcoming', 'completed', 'archived')),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date > start_date)
);

-- Create indexes for faster queries
CREATE INDEX idx_challenges_category ON public.challenges(category);
CREATE INDEX idx_challenges_status ON public.challenges(status);
CREATE INDEX idx_challenges_slug ON public.challenges(slug);
CREATE INDEX idx_challenges_end_date ON public.challenges(end_date);

-- Enable Row Level Security
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Challenges are viewable by everyone"
  ON public.challenges FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create challenges"
  ON public.challenges FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Challenge creators can update their challenges"
  ON public.challenges FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Challenge creators can delete their challenges"
  ON public.challenges FOR DELETE
  USING (auth.uid() = created_by);

-- Comments
COMMENT ON TABLE public.challenges IS 'Solidarity challenges that users can participate in';
COMMENT ON COLUMN public.challenges.goal_type IS 'Type of goal: funds, volunteers, items, or hours';
COMMENT ON COLUMN public.challenges.current_amount IS 'Current progress towards the goal';
