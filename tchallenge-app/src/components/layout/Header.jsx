import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Header = () => {
  const { user, signOut } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (user) {
      loadAvatar();
    }
  }, [user]);

  const loadAvatar = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setAvatarUrl(data?.avatar_url);
    } catch (error) {
      console.error('Error loading avatar:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 bg-background-dark/80 backdrop-blur-sm px-4 md:px-10 lg:px-20 xl:px-40 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="text-primary">
          <Logo />
        </div>
        <Link to="/">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            TChallenge
          </h2>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center gap-9">
        <Link to="/" className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors">
          Découvrir
        </Link>
        <Link to="/challenges" className="text-white/70 hover:text-white transition-colors text-sm font-medium leading-normal">
          Mes Défis
        </Link>
        <Link to="/leaderboard" className="text-white/70 hover:text-white transition-colors text-sm font-medium leading-normal">
          Classement
        </Link>
        <Link to="/about" className="text-white/70 hover:text-white transition-colors text-sm font-medium leading-normal">
          À Propos
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          // Utilisateur connecté - afficher le profil et déconnexion
          <>
            <button
              onClick={signOut}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Déconnexion
            </button>
            <Link to="/profile">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/50 hover:border-primary transition-colors"
                style={{
                  backgroundImage: avatarUrl
                    ? `url("${avatarUrl}")`
                    : 'linear-gradient(135deg, #13ec5b 0%, #0a7f2f 100%)',
                }}
                title={user.email}
              />
            </Link>
          </>
        ) : (
          // Utilisateur non connecté - afficher Login et Sign Up
          <>
            <Link to="/login" className="hidden md:block">
              <Button variant="outline" size="md">
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="md">
                S'inscrire
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
