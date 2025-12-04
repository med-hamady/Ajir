import { useState } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('badges');

  const userProfile = {
    name: 'Elara Vance',
    mission: 'My Mission: Fostering community through collective action and sustainable living.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPtLAZ4my7jkYaZINv5XNuhVyNgoNtfXlraZtDRYPpXlVE160HFnHl72hjbUvHM90zdqqXa73lgzbNNz2FoZnQLQIHH9OCa18f37qClxAzQ8w2R3Fh3ryS106WeKke2fKikd5EKagy-RzfGTxTCu9p_gP-GaXiaagjVCD4kc02mMvRsz89QbB21XwQewP_d_w-JWKdGxm8dFP8p0g0Nrn_H7k4DB9PgeYSmHqCAikj2OW8oRj0QBymOZ2ziC0zGdz6XAHEnBd6HYA',
    totalPoints: 12450,
    challengesCompleted: 28,
    badgesEarned: 6,
    nextLevel: 'Solidarity Star',
    pointsToNextLevel: 550,
    levelProgress: 75
  };

  const badges = [
    { name: 'Solidarité écologique', earned: '15/03/24', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANhoVnn-It5soFBik7nRmtdUG8d0prj7c7kw4qgNbQ2pBx_JXX9sJ_rbKNqsSW6WrsAPtl2Cs0ZasByMst6a-c_06WY5JlskpM856pOUOMUhjRIKUT0PuqUaHUbIaCjNjorP_tW9WPzcv_8TAHVp7Z5Johza3iwsP4-HCkfiTLbEQE6I68Qib2JpMr94tGOCPCXKyDBd8vdJgiNbPbVrWdOVh5kiFwLS4f-Um3O5q2jVAfIQcO9UXNUKmWd2s4A1K6c9Gu0JOa7TI' },
    { name: 'Champion de l\'éducation', earned: '02/02/24', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABYkfkTgwWFBI3XKs7OqMoGQCZfQAfremYuqATp5sIS6nCeJRG_oeEHsKYLABHvBK9nN5JCKeFALZ309DAnQOeXJQ5wfvBckaCwgoC_zgEmdhzns5E1y7_dQkjAP8pvJCt80O3sArD03gmDtMJxd9TIUtbdGAHGJYq6l7CmLj0soPRfQpX0of3FuTjXOljUCq0G6BtwFUMPS4adARLccoDVQHWWM29hA_tHvkFREnZEJOZqz7OOrqdtSUm0u8ArE7M89ge5RYTuW4' },
    { name: 'Community Helper', earned: '11/01/24', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlRookJWifC2YjsVfwN50NCX8Qh_tyVU_WGR7N5tghQPLKvySFMJOHGW6SoCWnEcFvIVgUiRYw02Ox9F8XgLiRTU54qZC7qXUwozYUd9Hqs4M45UaInZe6Y3FOm5hMA72CckS9y2we5c8PnsGI0xIwh1r5QDXX5mhgS9qkYKfW1No7KXXHW2iSmPlN-QTRPplCZe4q7TroQnOaTg0oDrsONzColC7zeXEQSSu2qeiBLwi0ZfRwCP53JRiTJBLxdOLrXUv6KfpHzvg' },
    { name: 'Health Advocate', earned: '25/12/23', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFS82NDDT2pIORuL0ItJZoaT5-afiRZsxFAcg-0P_r5041QjZ2raSVVtpa-1ZzwKU_Bduvs7oryeMlAnJY2IeDIQcM9zeEXha-tQ41Il27vxmr2AQboXkfmWNNk4OmEoZjLR-fa3roIzmyOZJ-Be3SvC4PgL4UWJmzrLJMUSmjLYjjkTZ00trJMBE70r7nEZ0SQzME37p4UVHumahb71-z84fyuc20SV3Bo0782I3z_vEOxnPfXFH7FKNVdNyZU55dylQIn-mvLow' },
    { name: 'Animal Ally', earned: '10/11/23', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX1qbIXnshFv3_i7z8tx8nVVePi1euYQ1kPgncCyuxp5s_tDx7P8ecO9V1BvxFvyUd2ahX7ysjQlY5kx7E1dhjZTNNwAqy4IY0kSDICoW_TwsUcrwjLzsMLgiT8ePczFbOKI6wmRqh4FcWPtdw0XrXZlL_VtNqATTk5PMzElbYVB6IFxsqA1r959TqUlnAwG_jCT3fplnDaOyz-6TgV9XpUI7x4zxEMJsGABtFg_kZlK59PCCxRO_-M1udBgThc8ExX1pQ5KNQ6e4' },
    { name: 'First Steps', earned: '01/10/23', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoAdg_5mySRSSvNGDJ2NttFYsb5q71DMWSuJxXsw-DSkxAkTc-WPZFaVRSzNr-o83yqb7e72fZSHZGfnLKCv35pLt_Fnf_wv-d7htujvbjUCcQf-fHzsKNwB833DPRs5153Or731EsaD6NKWumNb-92l5AfHnd4A4RjfzpXYl5lJmHklLevHa0a2mvzoG3meyA01Z_9UDMh_kV4uCxxxjWHS1V7UMY1CXh0SGOLV1p8yfwCePnYNcYVfJz-wsrZEEhjXctJ55Znec' }
  ];

  const lockedBadges = [
    { name: 'Eco-Innovator', requirement: 'Complete 5 eco challenges' },
    { name: 'Mentor Master', requirement: 'Tutor 10 hours' }
  ];

  return (
    <div className="flex-1 px-4 sm:px-8 lg:px-10 xl:px-20 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              My Profile & Rewards
            </p>
            <p className="text-[#9db9a6] text-base font-normal leading-normal">
              View your progress, achievements, and redeem your hard-earned points.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Profile Card */}
            <Card className="p-4">
              <div className="flex flex-col items-center text-center">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 mb-4"
                  style={{ backgroundImage: `url('${userProfile.avatar}')` }}
                />
                <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  {userProfile.name}
                </p>
                <p className="text-[#9db9a6] text-base font-normal leading-normal mt-1">
                  {userProfile.mission}
                </p>
                <Button variant="ghost" className="mt-4 w-full max-w-[480px]">
                  Share My Profile
                </Button>
              </div>
            </Card>

            {/* Stats Panel */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-[#102216] border border-[#3b5443]">
                  <p className="text-white text-base font-medium leading-normal">Total Points</p>
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">
                    {userProfile.totalPoints.toLocaleString()}
                  </p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-[#102216] border border-[#3b5443]">
                  <p className="text-white text-base font-medium leading-normal">Challenges Completed</p>
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">
                    {userProfile.challengesCompleted}
                  </p>
                </div>
                <div className="flex min-w-[158px] w-full flex-1 flex-col gap-2 rounded-lg p-4 bg-[#102216] border border-[#3b5443]">
                  <p className="text-white text-base font-medium leading-normal">Badges Earned</p>
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">
                    {userProfile.badgesEarned}
                  </p>
                </div>
              </div>
            </Card>

            {/* Progress Bar */}
            <Card className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between">
                  <p className="text-white text-base font-medium leading-normal">
                    Next Level: {userProfile.nextLevel}
                  </p>
                </div>
                <div className="rounded-full bg-[#3b5443]">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${userProfile.levelProgress}%` }}
                  />
                </div>
                <p className="text-[#9db9a6] text-sm font-normal leading-normal">
                  {userProfile.pointsToNextLevel} points to the next level
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            {/* Tabs */}
            <div className="flex flex-col">
              <div className="border-b border-[#28392e]">
                <nav aria-label="Tabs" className="-mb-px flex space-x-6">
                  <button
                    onClick={() => setActiveTab('badges')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'badges'
                        ? 'text-primary border-primary'
                        : 'text-gray-400 hover:text-gray-200 hover:border-gray-500 border-transparent'
                    }`}
                  >
                    My Badges
                  </button>
                  <button
                    onClick={() => setActiveTab('rewards')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'rewards'
                        ? 'text-primary border-primary'
                        : 'text-gray-400 hover:text-gray-200 hover:border-gray-500 border-transparent'
                    }`}
                  >
                    Rewards Store
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'activity'
                        ? 'text-primary border-primary'
                        : 'text-gray-400 hover:text-gray-200 hover:border-gray-500 border-transparent'
                    }`}
                  >
                    Activity History
                  </button>
                </nav>
              </div>

              {/* Tab Content: My Badges */}
              {activeTab === 'badges' && (
                <div className="py-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {/* Earned Badges */}
                    {badges.map((badge, index) => (
                      <Card key={index} className="flex flex-col items-center text-center p-4">
                        <img
                          className="w-20 h-20 rounded-full mb-3 object-cover"
                          src={badge.image}
                          alt={badge.name}
                        />
                        <p className="font-bold text-sm text-white">{badge.name}</p>
                        <p className="text-xs text-gray-400">Earned: {badge.earned}</p>
                      </Card>
                    ))}

                    {/* Locked Badges */}
                    {lockedBadges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center p-4 rounded-lg bg-[#102216] border border-[#28392e] opacity-60"
                      >
                        <div className="w-20 h-20 rounded-full mb-3 bg-gray-700 flex items-center justify-center">
                          <span className="material-symbols-outlined text-4xl text-gray-400">
                            lock
                          </span>
                        </div>
                        <p className="font-bold text-sm text-gray-300">{badge.name}</p>
                        <p className="text-xs text-gray-400">{badge.requirement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content: Rewards Store */}
              {activeTab === 'rewards' && (
                <div className="py-6">
                  <p className="text-center text-white text-lg">Rewards store coming soon!</p>
                </div>
              )}

              {/* Tab Content: Activity History */}
              {activeTab === 'activity' && (
                <div className="py-6">
                  <p className="text-center text-white text-lg">Activity history coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
