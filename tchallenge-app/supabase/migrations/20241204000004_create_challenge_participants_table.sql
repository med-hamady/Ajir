-- Create challenge_participants table
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

-- Create indexes for faster queries
CREATE INDEX idx_challenge_participants_challenge_id ON public.challenge_participants(challenge_id);
CREATE INDEX idx_challenge_participants_user_id ON public.challenge_participants(user_id);
CREATE INDEX idx_challenge_participants_joined_at ON public.challenge_participants(joined_at DESC);

-- Enable Row Level Security
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Participants are viewable by everyone"
  ON public.challenge_participants FOR SELECT
  USING (true);

CREATE POLICY "Users can join challenges"
  ON public.challenge_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation"
  ON public.challenge_participants FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own participation"
  ON public.challenge_participants FOR DELETE
  USING (auth.uid() = user_id);

-- Comments
COMMENT ON TABLE public.challenge_participants IS 'Tracks user participation in challenges';
COMMENT ON COLUMN public.challenge_participants.contribution_type IS 'Type of contribution: donation, volunteer, share, or participate';
