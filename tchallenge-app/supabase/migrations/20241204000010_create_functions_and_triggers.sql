-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for challenges table
CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for rewards table
CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON public.rewards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update challenge progress when user participates
CREATE OR REPLACE FUNCTION update_challenge_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the challenge's current_amount
  UPDATE public.challenges
  SET current_amount = current_amount + COALESCE(NEW.contribution_amount, 0)
  WHERE id = NEW.challenge_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update challenge progress
CREATE TRIGGER update_challenge_on_participation
  AFTER INSERT ON public.challenge_participants
  FOR EACH ROW EXECUTE FUNCTION update_challenge_progress();

-- Function to award points to users based on their contributions
CREATE OR REPLACE FUNCTION award_points_on_participation()
RETURNS TRIGGER AS $$
DECLARE
  points_earned INTEGER;
BEGIN
  -- Calculate points based on contribution type
  IF NEW.contribution_type = 'donation' THEN
    points_earned := FLOOR(COALESCE(NEW.contribution_amount, 0) / 10)::INTEGER; -- 1 point per 10 EUR
  ELSIF NEW.contribution_type = 'volunteer' THEN
    points_earned := 50; -- Fixed points for volunteering
  ELSIF NEW.contribution_type = 'share' THEN
    points_earned := 10; -- Points for sharing
  ELSIF NEW.contribution_type = 'participate' THEN
    points_earned := 25; -- Points for general participation
  ELSE
    points_earned := 0;
  END IF;

  -- Update user's total points
  UPDATE public.profiles
  SET total_points = total_points + points_earned
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to award points
CREATE TRIGGER award_points_trigger
  AFTER INSERT ON public.challenge_participants
  FOR EACH ROW EXECUTE FUNCTION award_points_on_participation();

-- Function to automatically create challenge update entry
CREATE OR REPLACE FUNCTION create_challenge_update()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.challenge_updates (
    challenge_id,
    user_id,
    update_type,
    amount,
    message
  ) VALUES (
    NEW.challenge_id,
    NEW.user_id,
    NEW.contribution_type,
    NEW.contribution_amount,
    NEW.message
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create activity update
CREATE TRIGGER create_challenge_update_trigger
  AFTER INSERT ON public.challenge_participants
  FOR EACH ROW EXECUTE FUNCTION create_challenge_update();

-- Function to check and award badges based on achievements
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  badge RECORD;
  user_challenge_count INTEGER;
  user_category_count INTEGER;
BEGIN
  -- Get total challenges completed by user
  SELECT COUNT(DISTINCT challenge_id) INTO user_challenge_count
  FROM public.challenge_participants
  WHERE user_id = NEW.id;

  -- Check for badges based on challenges completed
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

  -- Check for category-specific badges
  FOR badge IN
    SELECT * FROM public.badges
    WHERE requirement_type = 'category_specific'
    AND requirement_category IS NOT NULL
  LOOP
    -- Count challenges in specific category
    SELECT COUNT(DISTINCT cp.challenge_id) INTO user_category_count
    FROM public.challenge_participants cp
    JOIN public.challenges c ON c.id = cp.challenge_id
    WHERE cp.user_id = NEW.id
    AND c.category = badge.requirement_category;

    IF user_category_count >= badge.requirement_value THEN
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.id, badge.id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check badges on profile update
CREATE TRIGGER check_badges_on_profile_update
  AFTER UPDATE OF total_points ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION check_and_award_badges();

-- Function to decrease reward stock when redeemed
CREATE OR REPLACE FUNCTION decrease_reward_stock()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.rewards
  SET stock_quantity = stock_quantity - 1
  WHERE id = NEW.reward_id
  AND stock_quantity IS NOT NULL
  AND stock_quantity > 0;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to decrease stock
CREATE TRIGGER decrease_reward_stock_trigger
  AFTER INSERT ON public.user_rewards
  FOR EACH ROW EXECUTE FUNCTION decrease_reward_stock();

-- Function to handle new user creation (auto-create profile)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users to create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Comments
COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically updates the updated_at timestamp';
COMMENT ON FUNCTION update_challenge_progress() IS 'Updates challenge progress when user participates';
COMMENT ON FUNCTION award_points_on_participation() IS 'Awards points to users based on their contributions';
COMMENT ON FUNCTION check_and_award_badges() IS 'Automatically checks and awards badges to users';
COMMENT ON FUNCTION handle_new_user() IS 'Automatically creates a profile when a new user signs up';
