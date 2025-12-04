import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  // Mock data for challenges
  const challenges = [
    {
      id: 1,
      title: 'Community Food Drive',
      description: 'Help us collect non-perishable food items for local families in need. Your contribution can make a huge difference.',
      category: 'Solidarity',
      progress: 75,
      collected: 1500,
      goal: 2000,
      unit: 'kg',
      daysLeft: 12,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8xz4kpvbBvDCdWtQLLKiWUSrfm_D0Nu3acH6bqsmp2MRb7cvOGoLvEANlOk0nFNc1ZJ2o_67znD68mK5UyhJaha8Bnfx2HzFlIYojoiMc5D6s26XrlNxqJ9ThV06LnNAvgoyF2FAcHNiE0yqcKUQdqWvkws9LD-QH_3U5c2iIWyOEy3mbPAaVHU4KM_BUHrpVr-Zr-Os8v09AEwOpQSouxA3s4Otl5dz4IXzfGsYVwxgYRjj2hRWITJNXZjsKKZ3hgDXn74xjIZc'
    },
    {
      id: 2,
      title: 'Coastal Cleanup Day',
      description: 'Join us for a day of cleaning our beautiful beaches. Let\'s protect marine life and preserve our coastline.',
      category: 'Environment',
      progress: 40,
      volunteers: 40,
      goal: 100,
      startsIn: '3 days',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnjHfzlIlKUrXRXbn4kYrpW8Q9blbgWxq8GZTF_111Kvyv83CFfcpprKgttc5yxLTBTEkUOYLX1MZQobqA4ciLtD8qwbo3RUD4ixc3ETWo3KIP__xbm4A6O7EIAPUUfhK1uvzjXH4VehQXd7m-He_uCKOauw25A6J-aQZFsMGlO-lP1vrwS3Is44jh8V15BthAzZwnNlJ8O_WgVQEr8GBOgchcqfoNQab4-ra66J2rQkWsz7h6GOjG9awyjpJj9pV0mhdBJcW_pbg'
    },
    {
      id: 3,
      title: 'Mentor a Student',
      description: 'Become a mentor and guide a young student. Share your knowledge and inspire the next generation of leaders.',
      category: 'Education',
      progress: 60,
      mentors: 30,
      goal: 50,
      status: 'Ongoing',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW8BPE29SdEOTstE9YP_WcBTvFam08oYW-mFbNHQruyS4MU1rYDb4uLhh40nk4N8weDAteTuNl5qIFzndK7-WkNU0dJn0IzXiUfkKN4Y0aIVHt-5zsRugboAMP477ABvEZGhj2JOdHOhMbFinxBotw1Y_7FdRXncqBHYRF8U0bkgyLJdTC7Niz93MkbucpZcomb9vNDp2B6wOYKzRdldJ13o3Oq3w-UDlpzYcIDJIz6B_N2XUSqHMIw95T22drLGm90PK26uzovlg'
    }
  ];

  return (
    <div className="flex flex-col flex-1 pt-0">
      <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[1200px] flex-1 gap-10">
          {/* Hero Section */}
          <div className="@container">
            <div className="w-full">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcjtIvZ3I0MZ2n9q51RAgXzLONZwpAkXJEbOzP6kM6mVTpZxWNKBw_NRaFut-h8KJTwpxaQsUgf8Z9oxq5_1zWRiOFe_d0kcvIW67yogpJqR58ZsaGanT37dOoI0NemyU6lTRrvPiwOILUOnuUl7ket3OCvoEdMxaapBCmhGBSwQazaQqqURlViMMP3c35lNWJhBgIpfUt9pxT0VvR0k5cFHj4mTtWn7h430BA4wRd61eLblLysby2nQvNBABGEI38Me-mXab5LDo")'
                }}
              >
                <div className="flex flex-col gap-2 text-left max-w-2xl">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Your Action, Their Future.
                  </h1>
                  <h2 className="text-white/90 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Join a community making a real difference. Find a challenge and start your solidarity journey today.
                  </h2>
                </div>
                <Button variant="primary" size="lg">
                  Find Your Challenge
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap gap-4">
            <Card className="flex min-w-[158px] flex-1 flex-col gap-2 p-6">
              <p className="text-white/80 text-base font-medium leading-normal">Volunteers Engaged</p>
              <p className="text-white tracking-light text-3xl font-bold leading-tight">12,450</p>
            </Card>
            <Card className="flex min-w-[158px] flex-1 flex-col gap-2 p-6">
              <p className="text-white/80 text-base font-medium leading-normal">Trees Planted</p>
              <p className="text-white tracking-light text-3xl font-bold leading-tight">8,900</p>
            </Card>
            <Card className="flex min-w-[158px] flex-1 flex-col gap-2 p-6">
              <p className="text-white/80 text-base font-medium leading-normal">Meals Donated</p>
              <p className="text-white tracking-light text-3xl font-bold leading-tight">25,600</p>
            </Card>
            <Card className="flex min-w-[158px] flex-1 flex-col gap-2 p-6">
              <p className="text-white/80 text-base font-medium leading-normal">Hours Volunteered</p>
              <p className="text-white tracking-light text-3xl font-bold leading-tight">40,200</p>
            </Card>
          </div>

          {/* Challenges Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Current & Upcoming Challenges
            </h2>

            {/* Filter Buttons */}
            <div className="flex gap-3 px-4 flex-wrap">
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary px-4 transition-colors">
                <p className="text-sm font-bold leading-normal">All</p>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-4 transition-colors">
                <p className="text-sm font-medium leading-normal">Solidarity</p>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-4 transition-colors">
                <p className="text-sm font-medium leading-normal">Environment</p>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-4 transition-colors">
                <p className="text-sm font-medium leading-normal">Education</p>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-4 transition-colors">
                <p className="text-sm font-medium leading-normal">Health</p>
              </button>
            </div>

            {/* Challenge Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="flex flex-col gap-4 p-4 overflow-hidden">
                  <div
                    className="aspect-video w-full rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url('${challenge.image}')` }}
                  />
                  <div className="flex flex-col gap-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                        {challenge.category}
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg">{challenge.title}</h3>
                    <p className="text-white/70 text-sm">{challenge.description}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-black/20 rounded-full h-2 my-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>

                    {/* Challenge Stats */}
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>
                        {challenge.collected ? `${challenge.collected}/${challenge.goal} ${challenge.unit} collected` :
                         challenge.volunteers ? `${challenge.volunteers}/${challenge.goal} volunteers` :
                         `${challenge.mentors}/${challenge.goal} mentors`}
                      </span>
                      <span>{challenge.daysLeft ? `${challenge.daysLeft} days left` : challenge.startsIn || challenge.status}</span>
                    </div>

                    <Link to={`/challenge/${challenge.id}`}>
                      <Button
                        variant={challenge.id === 2 ? "primary" : "ghost"}
                        className="w-full mt-4"
                      >
                        {challenge.id === 2 ? 'Join Now' : 'View Details'}
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="flex flex-col gap-6 py-10">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4">
              Stories from Our Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
              <Card className="flex flex-col gap-4 p-8">
                <p className="text-white/90">
                  "Participating in the food drive was an incredibly rewarding experience. It's amazing to see how a small action can have such a big impact on your own community. TChallenge made it so easy to get involved."
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz0lYer12t8NkuJsZtUUacILObIQhEG7pEw6X47wPRCRsTnr2GVGp-4vJuRMZ7vH5TIHqyd_FZoYwCkKD2PhWuTKOm0c-YbUZ4BMZf_HGYMCX6nTlGKrUT7TfYuS2yVwZoRlVdbWbahf1Dn5_gzgO3r9p8Wv3r69bFwNc_VaTN6G6qzvGHD7ahEn_6zXCxwKRSsm0DzgvBIyCwwNUXdNgm9DcPP6WXSOFnBl_IP74ZUaPt7ryKrqkEFrUWlo6q5GysWqmTD5aa9So"
                    alt="John Doe"
                  />
                  <div>
                    <p className="font-bold text-white">John Doe</p>
                    <p className="text-sm text-white/70">Volunteer</p>
                  </div>
                </div>
              </Card>

              <Card className="flex flex-col gap-4 p-8">
                <p className="text-white/90">
                  "I never thought I could contribute to environmental causes, but the coastal cleanup challenge was so well-organized and fun. I met great people and we made a real difference together. Can't wait for the next one!"
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZw4lHxf1QRzH1eZEl-okhuO_JdCNfV_dUgKr9yrAvaYoLsE8qDvCIqOpDuvab_Nke4w_mnzkX3wOWr0H1ljYemSunaY5oQzBSnvvZU58pc4v9kExm6p10pxqbM0x7LsWSEh3mdZ-qoizJhj6mQC-bGZE7yNT9IBbEV9wtThn8-74EEaV_n5j97ZO4ph-VgufuzYm_vbhHVSIpgK0oFdT_uF6YZY5n0qowHi0JJZp3W_32Vs021CnX8V7twoD3k1JSrbp5xCgAMZA"
                    alt="Jane Smith"
                  />
                  <div>
                    <p className="font-bold text-white">Jane Smith</p>
                    <p className="text-sm text-white/70">Challenge Participant</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
