-- Create leaderboard materialized view
CREATE MATERIALIZED VIEW public.leaderboard AS
SELECT
  p.id,
  p.full_name,
  p.avatar_url,
  p.total_points,
  COUNT(DISTINCT cp.challenge_id) as challenges_completed,
  ROW_NUMBER() OVER (ORDER BY p.total_points DESC, p.created_at ASC) as rank
FROM public.profiles p
LEFT JOIN public.challenge_participants cp ON p.id = cp.user_id
GROUP BY p.id, p.full_name, p.avatar_url, p.total_points, p.created_at
ORDER BY p.total_points DESC, p.created_at ASC;

-- Create indexes for faster queries
CREATE UNIQUE INDEX idx_leaderboard_id ON public.leaderboard(id);
CREATE INDEX idx_leaderboard_rank ON public.leaderboard(rank);
CREATE INDEX idx_leaderboard_points ON public.leaderboard(total_points DESC);

-- Function to refresh the leaderboard
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.leaderboard;
END;
$$ LANGUAGE plpgsql;

-- Schedule automatic refresh (requires pg_cron extension - optional)
-- Run this command in Supabase dashboard to enable pg_cron:
-- SELECT cron.schedule('refresh-leaderboard', '*/5 * * * *', 'SELECT refresh_leaderboard();');

-- Comments
COMMENT ON MATERIALIZED VIEW public.leaderboard IS 'Cached leaderboard rankings for performance';
COMMENT ON FUNCTION refresh_leaderboard() IS 'Refreshes the leaderboard materialized view';
