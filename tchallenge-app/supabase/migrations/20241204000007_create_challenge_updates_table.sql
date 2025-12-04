-- Create challenge_updates table
CREATE TABLE public.challenge_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  update_type TEXT NOT NULL CHECK (update_type IN ('donation', 'join', 'share', 'milestone', 'comment')),
  amount NUMERIC CHECK (amount >= 0),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_challenge_updates_challenge_id ON public.challenge_updates(challenge_id);
CREATE INDEX idx_challenge_updates_created_at ON public.challenge_updates(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.challenge_updates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Challenge updates are viewable by everyone"
  ON public.challenge_updates FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create updates"
  ON public.challenge_updates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Comments
COMMENT ON TABLE public.challenge_updates IS 'Activity feed for challenges (donations, joins, shares, etc.)';
COMMENT ON COLUMN public.challenge_updates.update_type IS 'Type of activity: donation, join, share, milestone, or comment';
