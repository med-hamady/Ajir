import { useState } from 'react';
import Card from '../components/common/Card';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');

  const topThree = [
    {
      rank: 2,
      name: 'Marc Antoine',
      points: 14230,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOYkN9jPGrGhoIXcRJYBeTLkvnNpVUoeCn1eezVQbKoefSHAZPRceUqUepjtPZn9JElQIws9Pv_PZBJx8isFD-lRuSbDX5Eu7pw-fJAi6_XIgTDgdY5kuL7w8Q8OGX4C-FjM5t0uNWm5a9UVblYy40lQKf9p3X8NQ-mzXe1NPGtvHFD_T8irenw10xzVKeXgvYQMq3hfQtB81O7Ji6z6mTF7XbCCMbzv5--RffQ2Vf_NnrTe5eQubCq07FENrcQ36vuGsK-HVATRk',
      borderColor: 'border-[#C0C0C0]',
      textColor: 'text-[#C0C0C0]',
      emoji: '🥈'
    },
    {
      rank: 1,
      name: 'Elodie Dubois',
      points: 15890,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsfH4wkBqmzoiFhyMWtEddmVq-bC6ktt7qpl-U28Z9MAXdFcc4jfyKQOzynpM8J_TTMShrNqWsGdhUvpwK6iFRMYzGi8GeSKvz79UZw09F-vVOEmCRHPcKQDVl_9VSoM3Z43BHz-dg34uivLZTDAZxgSFO8_j7E_5hsQziR4FocvpppzhFrYJ7FD360tFp_lI_HbHrkXwv7llgsL3OsVKmCh-8bHJjWa7HwfdYznug-gAldTlOGGdKV7fx0jlXFcuZJ-EP8MME_js',
      borderColor: 'border-[#FFD700]',
      textColor: 'text-[#FFD700]',
      emoji: '🥇'
    },
    {
      rank: 3,
      name: 'Sophie Lemaire',
      points: 13990,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbQy4wr306d0lPdyMXjbapIizqiJEH98NXucD-zISxiZwebWUs0mrSm7ge-L8zJiZfz4jcwYfsYSlBwLtWh4WO1etq7Uw-6vDkTFIviSTr9CmtqLG7XS-hLkJPWhbEpbuFE-jIPOqy9OKWqK5Jkre60eYlN58Z0YNisaer4WVK-xf3iskAdG84IwKJaPEtMEC6BcD9VF9S2nzCXjPZkJmg0KRB3c5Jbpi_QKTnuiSSVmzWPpovCvjhwlbMIEATvpCqLS73d0baOTk',
      borderColor: 'border-[#CD7F32]',
      textColor: 'text-[#CD7F32]',
      emoji: '🥉'
    }
  ];

  const otherUsers = [
    { rank: 4, name: 'Lucas Moreau', points: 12500, challenges: 32, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT3LdzO8P8HKLe6vOQkVKXR2apTGVWDehqye3-jgr3DhZGo5VU1se2iCXNekGefNaD65jG-q9zxPNGor4PfkKnaGeRWrxOG4x4cI65e9I8cbkdyXXsMPvHdnORejgDIyZlnWvQZLegSqaFCmuuMgsLVrJkTVKjkZ38T3oedV23f7dSM2CzFSA0hraCdO_OXAtjHaiJarEC04hVG4LFbJLjqrm5au2KsNbMhraNnYWtS3T97_vhCEmrY8-3BZl7RDPBkXwJXxOGkZs' },
    { rank: 5, name: 'You', points: 12110, challenges: 29, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ieQzg-DgWz38uZpbxx6GyZe7oueAd5g-0oyNkkBI2H5H18PyKhLO9wXkKzjQfZqtYLfkjGeSy2vB0qJ_qIIECz-y7CDBP-lRFPdMETSHuxA3EfaEQmQWfq00JJjc2eB9GIv0PNWNfz2tqRChIby6ZPcLazO_LPreX20FBQls17DqiR0XVguWI4IG5714g8eH0Z-6UheDIh6Vss6sPHspwCT2bIwVyGYgtAD415NTbP_qaCKXa3uyCfiZkGn8TGfM6LaQO-PFBzk', isCurrentUser: true },
    { rank: 6, name: 'Chloé Dubois', points: 11980, challenges: 28, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChDHMZD-QZQv5LTjToowMihdxIhHOytzRnBDrvq8Vtjz0wmUQm4_B2qsdzcLwjcajTA2r0O39qZt3qgYYBIjB7KvPsK9j0ChT0TyEvMCViB3p3ByUwu-HsPN2KZU6z9Ua4iuXnBrBDJvLP8SCHsKnsaxTPetV5d9Uj3KucHjEdHFUhzMJwlSFGc1hmN8ibAyWMarnRp35qlR2Pw9qIoLiqFo9Y6ZmqHYhfrkSkRSSIfqJ0lNLgB2pWnMdjTj9_phW79veAuNYHllw' },
    { rank: 7, name: 'Arthur Petit', points: 11540, challenges: 27, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDIhNDkHIjcp8Je9j99qg3XcbJ-Ipwp6_8drrcRDWfvf6AvrgQD4DNahtiyNo7q2EibJOQIzDHOsngrU8S058Et0M61hVXnrjsbWXhyw0Md4R1vIITjbOjMfRKQ9FzqSNSSiQMajixu5glYaT5ODK0qJSP83fJSAfOxx0Gwi-6v-LrqnAmcdpKueJGijd6tenfLt-AUYry-IV3fbQ5ULfOE2zn3bxPP6sPpDst2H0Cve92K6zjoJgcu_BdyHgqq4AOotkDNYKg0yg' },
    { rank: 8, name: 'Manon Girard', points: 11230, challenges: 25, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLBEtiOit1SRcgkldfeXVyD_3ovmqep2rD_jifrF5EpaHpXHA1qgormXAW1RNfI4kzjspH91Lgowwc-EB7wkxU1hNLXgfZZe9VRUTG3zILYukac4cUXZ-wNbJ1XBdsZXaqc3s_iy7P7heXRBtXlpPrPw0Ap_0YaOOBLtnwDwFioyD_kpvd59as0cv8d-ArCj-ht9AyYEtlMXLdq9gf9fpHW1beXPk3ZjReUjw0xVD4k7aiCZiHQaDFv4uA9vxwkvadG0ceV7OQHwo' }
  ];

  return (
    <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
      <div className="flex flex-col w-full max-w-[1200px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Classement Général
            </p>
            <p className="text-[#9db9a6] text-base font-normal leading-normal">
              See who is leading the charge in solidarity and humanitarian actions.
            </p>
          </div>
        </div>

        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Top Contributors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* Sort to show 2nd, 1st, 3rd */}
          {[topThree[0], topThree[1], topThree[2]].map((user, index) => (
            user.rank === 1 ? (
              // 1st Place - Featured Card
              <div key={user.rank} className="flex flex-col gap-4 rounded-lg bg-[#1c271f] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] order-first lg:order-none">
                <div className="flex flex-col gap-4 items-center">
                  <div
                    className={`w-32 h-32 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 ${user.borderColor}`}
                    style={{ backgroundImage: `url('${user.avatar}')` }}
                  />
                  <div className="flex flex-col gap-1 text-center">
                    <p className={`${user.textColor} text-lg font-bold leading-normal`}>{user.emoji} 1st Place</p>
                    <p className="text-white text-xl font-bold leading-tight">{user.name}</p>
                    <p className="text-[#9db9a6] text-base font-normal leading-normal">
                      {user.points.toLocaleString()} Points
                    </p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#28392e] text-white text-sm font-medium leading-normal w-fit hover:bg-opacity-80 transition-colors">
                    <span className="truncate">View Profile</span>
                  </button>
                </div>
                <div className="w-full bg-[#1c271f] border-t border-white/10 h-28 rounded-b-lg flex items-center justify-center -m-4 mt-4">
                  <p className={`${user.textColor} text-5xl font-bold`}>1</p>
                </div>
              </div>
            ) : (
              // 2nd and 3rd Place
              <div key={user.rank} className="flex flex-col gap-3 pb-3 items-center justify-end">
                <div
                  className={`w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 ${user.borderColor}`}
                  style={{ backgroundImage: `url('${user.avatar}')` }}
                />
                <div className="text-center">
                  <p className="text-white text-base font-medium leading-normal">
                    {user.emoji} {user.rank === 2 ? '2nd' : '3rd'} Place: {user.name}
                  </p>
                  <p className="text-[#9db9a6] text-sm font-normal leading-normal">
                    {user.points.toLocaleString()} Points
                  </p>
                </div>
                <div className="w-full bg-[#1c271f] h-20 rounded-lg flex items-center justify-center">
                  <p className={`${user.textColor} text-3xl font-bold`}>{user.rank}</p>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 py-6">
          <div className="relative w-full lg:w-1/3">
            <input
              className="w-full h-10 px-4 pl-10 rounded-lg bg-[#28392e] text-white border-none focus:ring-2 focus:ring-primary"
              placeholder="Search for a user..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-symbols-outlined text-white/50">search</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 bg-[#28392e] rounded-lg">
            <button
              onClick={() => setActiveTab('week')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'week' ? 'text-white bg-primary/20' : 'text-white hover:bg-primary/10'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveTab('month')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'month' ? 'text-white bg-primary/20' : 'text-white hover:bg-primary/10'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all' ? 'text-white bg-primary/20' : 'text-white hover:bg-primary/10'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="px-4 pb-4">
          <div className="overflow-hidden rounded-lg bg-[#1c271f]">
            <div className="flex flex-col">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[#9db9a6] font-medium text-sm border-b border-white/10">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">User</div>
                <div className="col-span-3 text-right">Points</div>
                <div className="col-span-3 text-right">Challenges</div>
              </div>

              <div className="divide-y divide-white/10">
                {otherUsers.map((user) => (
                  <div
                    key={user.rank}
                    className={`grid grid-cols-12 gap-4 items-center px-6 py-3 text-sm ${
                      user.isCurrentUser
                        ? 'bg-primary/10 border-y-2 border-primary text-white'
                        : 'text-white'
                    }`}
                  >
                    <div
                      className={`col-span-1 text-center font-bold ${
                        user.isCurrentUser ? 'text-primary' : ''
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div className="col-span-5 flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${user.avatar}')` }}
                      />
                      <span className={user.isCurrentUser ? 'font-bold' : ''}>
                        {user.name}
                      </span>
                    </div>
                    <div
                      className={`col-span-3 text-right ${
                        user.isCurrentUser ? 'font-bold text-primary' : 'font-medium'
                      }`}
                    >
                      {user.points.toLocaleString()}
                    </div>
                    <div
                      className={`col-span-3 text-right ${
                        user.isCurrentUser ? 'font-bold text-primary' : 'text-[#9db9a6]'
                      }`}
                    >
                      {user.challenges}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
