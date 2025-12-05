# TChallenge - Le Défi de la Solidarité

A gamified solidarity platform that encourages citizen participation in humanitarian challenges through points, badges, and rewards.

## 🌟 Features

- **User Authentication**: Sign up with email/password or social providers (Google, Facebook)
- **Challenge Discovery**: Browse and filter solidarity challenges by category
- **Gamification**: Earn points and badges for participating in challenges
- **Leaderboard**: Compete with other users and climb the rankings
- **User Profiles**: Track your progress, achievements, and rewards
- **Real-time Updates**: See live activity on challenges
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **React** 18+ with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Material Symbols** for icons

### Backend
- **Supabase** for:
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- A Supabase account ([sign up here](https://supabase.com))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tchallenge-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project on [Supabase](https://supabase.com)
   - Run the database migrations:
     - **Option 1 (Recommended)**: Run individual migration files from `supabase/migrations/` folder in order
     - **Option 2**: Run the complete setup script `supabase/setup.sql` in SQL Editor
     - See `supabase/migrations/README.md` for detailed instructions
   - Copy your project URL and anon key from Project Settings

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🗂️ Project Structure

```
tchallenge-app/
├── src/
│   ├── components/
│   │   ├── common/        # Reusable components (Button, Card, Logo)
│   │   └── layout/        # Layout components (Header, Footer, Layout)
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── ChallengeDetails.jsx
│   │   ├── Leaderboard.jsx
│   │   └── Profile.jsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Third-party library configs
│   │   └── supabase.js
│   ├── utils/             # Utility functions
│   ├── config/            # App configuration
│   ├── data/              # Static data / mock data
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── .env.example           # Environment variables template
├── SUPABASE_SCHEMA.md     # Database schema documentation
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

## 🎨 Design System

The application uses a custom Tailwind theme based on the original design:

### Colors
- **Primary**: `#13ec5b` (Green - solidarity, hope)
- **Secondary**: `#FF7F50` (Orange - energy, action)
- **Background Light**: `#f6f8f6`
- **Background Dark**: `#102216`
- **Card Dark**: `#161B22`
- **Border Dark**: `#30363D`

### Typography
- **Font Family**: Plus Jakarta Sans

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Pages

### 1. Homepage (`/`)
- Hero section with call-to-action
- Statistics showcase
- Current and upcoming challenges
- Category filters
- Community testimonials

### 2. Registration (`/register`)
- Email/password signup
- Social authentication (Google, Facebook)
- Password strength indicator
- Terms and conditions

### 3. Challenge Details (`/challenge/:id`)
- Challenge description and objectives
- Progress tracker
- Participant statistics
- Call-to-action buttons (Join, Donate)
- Recent activity feed
- Partner information

### 4. Leaderboard (`/leaderboard`)
- Top 3 contributors showcase
- Complete rankings table
- Search functionality
- Time period filters (week, month, all-time)
- Current user highlighting

### 5. Profile (`/profile`)
- User information and mission statement
- Statistics (points, challenges, badges)
- Level progress bar
- Badge collection (earned and locked)
- Tabbed interface (Badges, Rewards, Activity)

## 🔐 Authentication

The app uses Supabase Auth for user management:

- Email/password authentication
- Social OAuth providers
- Session management
- Row Level Security (RLS) policies

## 📊 Database Schema

See `SUPABASE_SCHEMA.md` for detailed database structure including:
- Tables and relationships
- Row Level Security policies
- Functions and triggers
- Sample queries

## 🎯 Gamification System

### Points
- Earn points by:
  - Making donations
  - Volunteering for challenges
  - Sharing challenges
  - Completing challenges

### Badges
- Awarded automatically based on:
  - Challenges completed
  - Points earned
  - Category-specific achievements

### Rewards
- Redeem points for:
  - Physical products
  - Digital rewards
  - Partner discounts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed as part of the TChallenge initiative to promote solidarity and community engagement.

## 🙏 Acknowledgments

- Original design inspiration from the Ajir1 prototypes
- Icons from Material Symbols
- Fonts from Google Fonts
- Backend powered by Supabase

## 📞 Support

For questions or issues, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ for making a difference**
