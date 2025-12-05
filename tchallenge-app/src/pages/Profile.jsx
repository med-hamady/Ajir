import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('badges');
  const [profile, setProfile] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      loadProfile();
      loadBadges();
    }
  }, [user, authLoading, navigate]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          id,
          earned_at,
          badges (
            id,
            name,
            description,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setBadges(data || []);
    } catch (error) {
      console.error('Error loading badges:', error);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const avatarUrl = urlData.publicUrl;

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update local state
      setProfile({ ...profile, avatar_url: avatarUrl });
      alert('Photo de profil mise à jour avec succès !');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Erreur lors du téléchargement de la photo. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Profil introuvable</div>
      </div>
    );
  }

  const challengesCompleted = 0; // TODO: Load from database
  const levelProgress = (profile.total_points % 1000) / 10; // Simple calculation
  const pointsToNextLevel = 1000 - (profile.total_points % 1000);

  const lockedBadges = [
    { name: 'Éco-Innovateur', requirement: 'Complétez 5 défis écologiques' },
    { name: 'Maître Mentor', requirement: 'Donnez 10 heures de tutorat' }
  ];

  return (
    <div className="flex-1 px-4 sm:px-8 lg:px-10 xl:px-20 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Mon Profil & Récompenses
            </p>
            <p className="text-[#9db9a6] text-base font-normal leading-normal">
              Consultez vos progrès, vos réalisations et échangez vos points durement gagnés.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Profile Card */}
            <Card className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 mb-4"
                    style={{ backgroundImage: profile.avatar_url ? `url('${profile.avatar_url}')` : 'linear-gradient(135deg, #13ec5b 0%, #0a7f2f 100%)' }}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-4 right-0 bg-primary hover:bg-primary/80 text-white rounded-full p-2 cursor-pointer transition-all shadow-lg"
                    title="Changer la photo"
                  >
                    <span className="material-symbols-outlined text-xl">photo_camera</span>
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                  />
                </div>
                {uploading && (
                  <p className="text-primary text-sm mb-2">Téléchargement en cours...</p>
                )}
                <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  {profile.full_name}
                </p>
                <p className="text-[#9db9a6] text-base font-normal leading-normal mt-1">
                  {profile.mission_statement || 'Rejoignez des défis et faites la différence !'}
                </p>
                <Button variant="ghost" className="mt-4 w-full max-w-[480px]">
                  Partager Mon Profil
                </Button>
              </div>
            </Card>

            {/* Stats Panel */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-[#102216] border border-[#3b5443]">
                  <p className="text-white text-base font-medium leading-normal">Points Totaux</p>
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">
                    {profile.total_points.toLocaleString()}
                  </p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-[#102216] border border-[#3b5443]">
                  <p className="text-white text-base font-medium leading-normal">Défis Complétés</p>
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">
                    {challengesCompleted}
                  </p>
                </div>
                <div className="flex min-w-[158px] w-full flex-1 flex-col gap-2 rounded-lg p-4 bg-[#102216] border border-[#3b5443]">
                  <p className="text-white text-base font-medium leading-normal">Badges Gagnés</p>
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">
                    {badges.length}
                  </p>
                </div>
              </div>
            </Card>

            {/* Progress Bar */}
            <Card className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between">
                  <p className="text-white text-base font-medium leading-normal">
                    Niveau Suivant: {profile.level}
                  </p>
                </div>
                <div className="rounded-full bg-[#3b5443]">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <p className="text-[#9db9a6] text-sm font-normal leading-normal">
                  {pointsToNextLevel} points pour le niveau suivant
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
                    Mes Badges
                  </button>
                  <button
                    onClick={() => setActiveTab('rewards')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'rewards'
                        ? 'text-primary border-primary'
                        : 'text-gray-400 hover:text-gray-200 hover:border-gray-500 border-transparent'
                    }`}
                  >
                    Boutique Récompenses
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'activity'
                        ? 'text-primary border-primary'
                        : 'text-gray-400 hover:text-gray-200 hover:border-gray-500 border-transparent'
                    }`}
                  >
                    Historique d'Activité
                  </button>
                </nav>
              </div>

              {/* Tab Content: My Badges */}
              {activeTab === 'badges' && (
                <div className="py-6">
                  {badges.length === 0 && lockedBadges.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400 text-lg">Aucun badge pour le moment. Commencez à participer aux défis pour gagner des badges !</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {/* Earned Badges */}
                      {badges.map((userBadge, index) => (
                        <Card key={index} className="flex flex-col items-center text-center p-4">
                          <div className="w-20 h-20 rounded-full mb-3 bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-primary">
                              {userBadge.badges.image_url || 'emoji_events'}
                            </span>
                          </div>
                          <p className="font-bold text-sm text-white">{userBadge.badges.name}</p>
                          <p className="text-xs text-gray-400">
                            Obtenu le : {new Date(userBadge.earned_at).toLocaleDateString('fr-FR')}
                          </p>
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
                  )}
                </div>
              )}

              {/* Tab Content: Rewards Store */}
              {activeTab === 'rewards' && (
                <div className="py-6">
                  <p className="text-center text-white text-lg">Boutique de récompenses bientôt disponible !</p>
                </div>
              )}

              {/* Tab Content: Activity History */}
              {activeTab === 'activity' && (
                <div className="py-6">
                  <p className="text-center text-white text-lg">Historique d'activité bientôt disponible !</p>
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
