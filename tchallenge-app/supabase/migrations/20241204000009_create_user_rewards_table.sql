-- Create user_rewards table
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

-- Create indexes for faster queries
CREATE INDEX idx_user_rewards_user_id ON public.user_rewards(user_id);
CREATE INDEX idx_user_rewards_status ON public.user_rewards(status);
CREATE INDEX idx_user_rewards_redeemed_at ON public.user_rewards(redeemed_at DESC);

-- Enable Row Level Security
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own rewards"
  ON public.user_rewards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can redeem rewards"
  ON public.user_rewards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Comments
COMMENT ON TABLE public.user_rewards IS 'Tracks rewards redeemed by users';
COMMENT ON COLUMN public.user_rewards.status IS 'Status of the reward redemption';
