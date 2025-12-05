-- Create badges table
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

-- Create index for faster queries
CREATE INDEX idx_badges_requirement_type ON public.badges(requirement_type);

-- Enable Row Level Security
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Badges are viewable by everyone"
  ON public.badges FOR SELECT
  USING (true);

-- Comments
COMMENT ON TABLE public.badges IS 'Achievement badges that users can earn';
COMMENT ON COLUMN public.badges.requirement_type IS 'Type of requirement to earn this badge';
COMMENT ON COLUMN public.badges.requirement_value IS 'Numeric value needed to earn the badge';
COMMENT ON COLUMN public.badges.requirement_category IS 'Optional category requirement for category-specific badges';
