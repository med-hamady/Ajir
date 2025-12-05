# TChallenge Database Schema

## Entity Relationship Diagram

```
┌─────────────────────┐
│   auth.users        │
│  (Supabase Auth)    │
└──────────┬──────────┘
           │
           │ 1:1
           │
┌──────────▼──────────────────────────────────────────┐
│                  profiles                           │
├─────────────────────────────────────────────────────┤
│ • id (PK, FK → auth.users)                         │
│ • full_name                                         │
│ • email                                             │
│ • avatar_url                                        │
│ • mission_statement                                 │
│ • total_points                                      │
│ • level                                             │
│ • created_at, updated_at                           │
└───────────┬─────────────────┬───────────────────────┘
            │                 │
            │ 1:N             │ 1:N
            │                 │
┌───────────▼─────────┐   ┌──▼──────────────────────┐
│   user_badges       │   │ challenge_participants  │
├─────────────────────┤   ├─────────────────────────┤
│ • id (PK)          │   │ • id (PK)              │
│ • user_id (FK)     │   │ • challenge_id (FK)    │
│ • badge_id (FK)    │   │ • user_id (FK)         │
│ • earned_at        │   │ • contribution_amount   │
└──────────┬──────────┘   │ • contribution_type    │
           │              │ • message              │
           │ N:1          │ • joined_at            │
           │              └──────────┬──────────────┘
┌──────────▼──────────┐              │
│      badges         │              │ N:1
├─────────────────────┤              │
│ • id (PK)          │   ┌──────────▼──────────────────────┐
│ • name             │   │        challenges               │
│ • description      │   ├─────────────────────────────────┤
│ • image_url        │   │ • id (PK)                      │
│ • requirement_type │   │ • title, slug                  │
│ • requirement_value│   │ • description, full_description│
│ • requirement_cat  │   │ • category                     │
└────────────────────┘   │ • image_url                    │
                         │ • goal_type, goal_amount        │
┌────────────────────┐   │ • current_amount, unit         │
│   user_rewards     │   │ • start_date, end_date         │
├────────────────────┤   │ • status                       │
│ • id (PK)         │   │ • created_by (FK → profiles)   │
│ • user_id (FK)    │   │ • created_at, updated_at       │
│ • reward_id (FK)  │   └──────────┬──────────────────────┘
│ • redeemed_at     │              │
│ • status          │              │ 1:N
│ • tracking_info   │              │
│ • delivery_addr   │   ┌──────────▼──────────────────────┐
└──────┬─────────────┘   │    challenge_updates           │
       │                 ├─────────────────────────────────┤
       │ N:1             │ • id (PK)                      │
       │                 │ • challenge_id (FK)            │
┌──────▼─────────────┐   │ • user_id (FK → profiles)     │
│     rewards        │   │ • update_type                  │
├────────────────────┤   │ • amount, message              │
│ • id (PK)         │   │ • created_at                   │
│ • name            │   └─────────────────────────────────┘
│ • description     │
│ • image_url       │
│ • points_cost     │   ┌─────────────────────────────────┐
│ • stock_quantity  │   │    leaderboard (VIEW)          │
│ • category        │   ├─────────────────────────────────┤
│ • is_available    │   │ • id                           │
└───────────────────┘   │ • full_name                    │
                        │ • avatar_url                    │
                        │ • total_points                  │
                        │ • challenges_completed          │
                        │ • rank                          │
                        └─────────────────────────────────┘
```

## Tables Overview

### Core Tables

#### 1. **profiles** (extends auth.users)
User profile information and statistics.

**Key Fields:**
- `total_points` - Accumulated points from challenges
- `level` - User tier (Beginner, Solidarity Star, etc.)

**Relationships:**
- One-to-many with `challenge_participants`
- One-to-many with `user_badges`
- One-to-many with `user_rewards`

---

#### 2. **challenges**
Solidarity challenges that users can participate in.

**Key Fields:**
- `category` - Solidarity, Environment, Education, Health
- `goal_type` - funds, volunteers, items, hours
- `current_amount` / `goal_amount` - Progress tracking
- `status` - draft, active, upcoming, completed, archived

**Relationships:**
- Many-to-many with `profiles` through `challenge_participants`
- One-to-many with `challenge_updates`

---

#### 3. **challenge_participants**
Junction table tracking user participation in challenges.

**Key Fields:**
- `contribution_type` - donation, volunteer, share, participate
- `contribution_amount` - Numeric contribution value

**Triggers:**
- Awards points to user
- Updates challenge progress
- Creates activity feed entry

---

### Gamification Tables

#### 4. **badges**
Achievement badges that can be earned.

**Requirement Types:**
- `points_earned` - Based on total points
- `challenges_completed` - Based on challenge count
- `category_specific` - Based on category participation

---

#### 5. **user_badges**
Tracks which badges each user has earned.

**Auto-awarded** when users meet badge requirements through triggers.

---

### Rewards Tables

#### 6. **rewards**
Items users can redeem with points.

**Categories:**
- Physical (t-shirts, bottles, etc.)
- Digital (certificates, badges)
- Discount (vouchers, coupons)
- Experience (events, activities)

---

#### 7. **user_rewards**
Tracks reward redemptions.

**Statuses:**
- pending → processing → shipped → delivered
- Or: pending → used (for digital/discounts)

---

### Activity Tables

#### 8. **challenge_updates**
Activity feed for challenges (donations, joins, shares).

**Auto-generated** when users participate in challenges.

---

### Views

#### 9. **leaderboard** (Materialized View)
Cached rankings for performance.

**Features:**
- Sorted by points and creation date
- Includes challenge completion count
- Needs periodic refresh

---

## Key Features

### Automated Triggers

1. **Profile Creation** (`on_auth_user_created`)
   - Auto-creates profile when user signs up

2. **Points Award** (`award_points_trigger`)
   - Donation: 1 point per 10€
   - Volunteer: 50 points
   - Share: 10 points
   - Participate: 25 points

3. **Badge Award** (`check_badges_on_profile_update`)
   - Automatically awards badges when requirements met

4. **Progress Update** (`update_challenge_on_participation`)
   - Updates challenge current_amount

5. **Activity Feed** (`create_challenge_update_trigger`)
   - Creates update entries automatically

6. **Stock Management** (`decrease_reward_stock_trigger`)
   - Decreases available reward quantity

### Row Level Security

All tables have RLS enabled with policies:
- Public read access for most data
- Authenticated write access where appropriate
- User-specific access for personal data (rewards, etc.)

### Indexes

Performance indexes on:
- User points (leaderboard queries)
- Challenge categories and status
- Participation tracking
- Badge awards
- Activity feeds

---

## Database Statistics

Total Tables: **9**
Total Views: **1** (materialized)
Total Functions: **8**
Total Triggers: **7**
Total Indexes: **15+**

---

## Migration Files

All tables, functions, triggers, and seed data are available in:
`supabase/migrations/`

See migration README for setup instructions.
