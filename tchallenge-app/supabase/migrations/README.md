# Database Migrations

This folder contains SQL migration files for the TChallenge Supabase database.

## Migration Files

Migrations are numbered sequentially and should be run in order:

1. **20241204000001_enable_extensions.sql** - Enable UUID and cryptographic extensions
2. **20241204000002_create_profiles_table.sql** - User profiles table
3. **20241204000003_create_challenges_table.sql** - Challenges table
4. **20241204000004_create_challenge_participants_table.sql** - Challenge participation tracking
5. **20241204000005_create_badges_table.sql** - Achievement badges
6. **20241204000006_create_user_badges_table.sql** - User badge awards
7. **20241204000007_create_challenge_updates_table.sql** - Challenge activity feed
8. **20241204000008_create_rewards_table.sql** - Redeemable rewards
9. **20241204000009_create_user_rewards_table.sql** - User reward redemptions
10. **20241204000010_create_functions_and_triggers.sql** - Database functions and triggers
11. **20241204000011_create_leaderboard_view.sql** - Materialized view for leaderboard
12. **20241204000012_seed_badges.sql** - Initial badge data
13. **20241204000013_seed_sample_data.sql** - Sample challenges and rewards

## How to Run Migrations

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste each migration file content in order
4. Click **Run** for each migration
5. Verify success before moving to the next migration

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Initialize Supabase in your project
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref

# Run all migrations
supabase db push
```

### Option 3: Manual Execution

1. Connect to your Supabase PostgreSQL database
2. Run each migration file in numerical order:

```bash
psql -h your-db-host -U postgres -d postgres -f 20241204000001_enable_extensions.sql
psql -h your-db-host -U postgres -d postgres -f 20241204000002_create_profiles_table.sql
# ... and so on
```

## Key Features Implemented

### Tables
- **profiles** - User information and stats
- **challenges** - Solidarity challenges
- **challenge_participants** - User participation tracking
- **badges** - Achievement badges
- **user_badges** - User badge collection
- **challenge_updates** - Activity feed
- **rewards** - Redeemable rewards
- **user_rewards** - Reward redemptions

### Security
- Row Level Security (RLS) enabled on all tables
- Policies to control access based on user authentication
- Protected user data with proper permissions

### Automation
- Automatic profile creation on user signup
- Automatic points calculation based on contributions
- Automatic badge awards when requirements are met
- Automatic challenge progress updates
- Automatic activity feed entries
- Automatic reward stock management

### Performance
- Indexed columns for faster queries
- Materialized view for leaderboard
- Optimized query patterns

## Triggers and Functions

### Key Triggers

1. **update_updated_at** - Auto-updates timestamps on record changes
2. **update_challenge_progress** - Updates challenge completion on participation
3. **award_points_trigger** - Awards points to users based on contributions
4. **check_badges_on_profile_update** - Checks and awards badges automatically
5. **create_challenge_update_trigger** - Creates activity feed entries
6. **decrease_reward_stock_trigger** - Manages reward inventory
7. **on_auth_user_created** - Auto-creates profile for new users

### Key Functions

- `update_updated_at_column()` - Timestamp updater
- `update_challenge_progress()` - Challenge progress calculator
- `award_points_on_participation()` - Points calculation engine
- `check_and_award_badges()` - Badge award system
- `create_challenge_update()` - Activity feed generator
- `decrease_reward_stock()` - Inventory management
- `handle_new_user()` - New user profile creation
- `refresh_leaderboard()` - Leaderboard cache refresh

## Points System

Points are awarded automatically when users participate in challenges:

- **Donation**: 1 point per 10€ donated
- **Volunteer**: 50 points per volunteering action
- **Share**: 10 points per share
- **Participate**: 25 points per general participation

## Badge System

Badges are awarded automatically based on:

- **Points Earned**: First Steps (10), Rising Star (500), Solidarity Champion (1000), etc.
- **Challenges Completed**: Challenge Starter (1), Enthusiast (5), Master (10), etc.
- **Category Specific**: Complete 3-5 challenges in specific categories

## Refreshing the Leaderboard

The leaderboard is a materialized view that needs periodic refreshing:

```sql
-- Manually refresh
SELECT refresh_leaderboard();

-- Or directly
REFRESH MATERIALIZED VIEW CONCURRENTLY public.leaderboard;
```

For automatic refresh, enable pg_cron extension and run:

```sql
SELECT cron.schedule('refresh-leaderboard', '*/5 * * * *', 'SELECT refresh_leaderboard();');
```

## Testing the Setup

After running all migrations, test with these queries:

```sql
-- Check all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Verify badges were seeded
SELECT COUNT(*) FROM public.badges;

-- Verify challenges were seeded
SELECT COUNT(*) FROM public.challenges;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

## Rollback (if needed)

To rollback, drop tables in reverse order:

```sql
DROP MATERIALIZED VIEW IF EXISTS public.leaderboard CASCADE;
DROP TABLE IF EXISTS public.user_rewards CASCADE;
DROP TABLE IF EXISTS public.rewards CASCADE;
DROP TABLE IF EXISTS public.challenge_updates CASCADE;
DROP TABLE IF EXISTS public.user_badges CASCADE;
DROP TABLE IF EXISTS public.badges CASCADE;
DROP TABLE IF EXISTS public.challenge_participants CASCADE;
DROP TABLE IF EXISTS public.challenges CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
```

⚠️ **Warning**: This will delete all data!

## Next Steps

After running migrations:

1. Configure authentication providers in Supabase dashboard
2. Update `.env` file with your Supabase credentials
3. Test user registration and profile creation
4. Create test challenges through the application
5. Test the points and badge award system

## Support

For issues or questions:
- Check Supabase logs in the dashboard
- Review RLS policies if access issues occur
- Verify triggers are executing correctly
- Check function error logs

## Notes

- All timestamps are in UTC
- UUIDs are auto-generated
- Constraints ensure data integrity
- Triggers handle most automation
- RLS policies protect user data
