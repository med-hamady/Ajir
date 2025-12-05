-- Create rewards table
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

-- Create indexes for faster queries
CREATE INDEX idx_rewards_is_available ON public.rewards(is_available);
CREATE INDEX idx_rewards_category ON public.rewards(category);
CREATE INDEX idx_rewards_points_cost ON public.rewards(points_cost);

-- Enable Row Level Security
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Rewards are viewable by everyone"
  ON public.rewards FOR SELECT
  USING (true);

-- Comments
COMMENT ON TABLE public.rewards IS 'Rewards that users can redeem with their points';
COMMENT ON COLUMN public.rewards.points_cost IS 'Number of points required to redeem this reward';
COMMENT ON COLUMN public.rewards.stock_quantity IS 'Available quantity (NULL = unlimited)';
