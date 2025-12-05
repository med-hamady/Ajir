# Setup Instructions for TChallenge

## Problem: Cannot Sign Up or Login

This issue occurs because the database migrations haven't been run yet in Supabase.

## Solution: Run Database Migrations

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `vllrdckwyuqegljzdbqy`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "+ New query"

3. **Run migrations in order**

   Copy and paste each migration file content into the SQL Editor and run them in this exact order:

   ```
   supabase/migrations/20241204000001_enable_extensions.sql
   supabase/migrations/20241204000002_create_profiles_table.sql
   supabase/migrations/20241204000003_create_challenges_table.sql
   supabase/migrations/20241204000004_create_challenge_participants_table.sql
   supabase/migrations/20241204000005_create_badges_table.sql
   supabase/migrations/20241204000006_create_user_badges_table.sql
   supabase/migrations/20241204000007_create_challenge_updates_table.sql
   supabase/migrations/20241204000008_create_rewards_table.sql
   supabase/migrations/20241204000009_create_user_rewards_table.sql
   supabase/migrations/20241204000010_create_functions_and_triggers.sql
   supabase/migrations/20241204000011_create_leaderboard_view.sql
   supabase/migrations/20241204000012_seed_badges.sql
   supabase/migrations/20241204000013_seed_sample_data.sql
   ```

4. **Disable Email Confirmation (for development)**
   - Go to "Authentication" → "Providers" → "Email"
   - Toggle OFF "Confirm email"
   - Save changes

### Option 2: Using Supabase CLI (Faster)

If you have Supabase CLI installed:

```bash
cd tchallenge-app
npx supabase login
npx supabase link --project-ref vllrdckwyuqegljzdbqy
npx supabase db push
```

## Quick Fix: Disable Email Confirmation

1. Go to: https://supabase.com/dashboard/project/vllrdckwyuqegljzdbqy/auth/providers
2. Click on "Email" provider
3. Toggle OFF "Confirm email"
4. Click "Save"

This allows users to sign up without email verification (good for development).

## After Setup

Once migrations are run:

1. Try to register a new account at: http://localhost:5173/register
2. You should see a success message
3. You can then login at: http://localhost:5173/login

## Troubleshooting

If you still have issues:

1. **Check browser console** (F12) for error messages
2. **Check Supabase logs**: Dashboard → Logs → select "Auth"
3. **Verify tables exist**: Dashboard → Table Editor

### Common Errors:

**Error: "relation 'profiles' does not exist"**
- Solution: Run migrations (see above)

**Error: "Email not confirmed"**
- Solution: Disable email confirmation (see Quick Fix above)

**Error: "Invalid login credentials"**
- Solution: Make sure you're using the exact email/password you registered with
