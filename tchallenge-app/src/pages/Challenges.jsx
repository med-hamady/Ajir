import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Challenges = () => {
  // Mock data - will be replaced with real data from Supabase
  const challenges = [
    {
      id: 1,
      title: 'Planter 1000 Arbres',
      category: 'Environment',
      description: 'Aidez-nous à atteindre notre objectif de planter 1000 arbres ce mois-ci',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      progress: 75,
      goal: 1000,
      current: 750,
      unit: 'arbres',
      participants: 234,
      daysLeft: 12
    },
    {
      id: 2,
      title: 'Nourrir 500 Familles',
      category: 'Solidarity',
      description: 'Fournir des repas aux familles dans le besoin dans toute la région',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      progress: 60,
      goal: 500,
      current: 300,
      unit: 'familles',
      participants: 156,
      daysLeft: 8
    },
    {
      id: 3,
      title: 'Collecte de Fournitures Scolaires',
      category: 'Education',
      description: 'Collecter des fournitures scolaires pour les enfants défavorisés',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      progress: 45,
      goal: 200,
      current: 90,
      unit: 'kits',
      participants: 89,
      daysLeft: 15
    },
    {
      id: 4,
      title: 'Campagne d\'Aide Médicale',
      category: 'Health',
      description: 'Collecter des fonds pour équipement médical pour les cliniques rurales',
      image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800',
      progress: 82,
      goal: 50000,
      current: 41000,
      unit: '€',
      participants: 312,
      daysLeft: 5
    },
    {
      id: 5,
      title: 'Initiative Océan Propre',
      category: 'Environment',
      description: 'Rejoignez le nettoyage des plages et protégez la vie marine',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      progress: 30,
      goal: 100,
      current: 30,
      unit: 'volontaires',
      participants: 45,
      daysLeft: 20
    },
    {
      id: 6,
      title: 'Programme de Soutien aux Réfugiés',
      category: 'Solidarity',
      description: 'Fournir des articles essentiels et un soutien aux familles de réfugiés',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
      progress: 55,
      goal: 150,
      current: 82,
      unit: 'familles',
      participants: 178,
      daysLeft: 10
    }
  ];

  const categories = ['All', 'Environment', 'Solidarity', 'Education', 'Health'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const translateCategory = (category) => {
    const translations = {
      'All': 'Tous',
      'Environment': 'Environnement',
      'Solidarity': 'Solidarité',
      'Education': 'Éducation',
      'Health': 'Santé'
    };
    return translations[category] || category;
  };

  const filteredChallenges = selectedCategory === 'All'
    ? challenges
    : challenges.filter(c => c.category === selectedCategory);

  return (
    <div className="px-4 py-8 sm:px-8 md:px-10 lg:px-20 xl:px-40">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
          Défis Actifs
        </h1>
        <p className="text-gray-300 text-base">
          Rejoignez un défi et commencez à faire la différence aujourd'hui
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-black'
                : 'bg-card-dark text-gray-300 hover:bg-gray-700'
            }`}
          >
            {translateCategory(category)}
          </button>
        ))}
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => (
          <Card key={challenge.id} className="overflow-hidden flex flex-col">
            {/* Challenge Image */}
            <div
              className="w-full h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${challenge.image})` }}
            />

            {/* Challenge Content */}
            <div className="p-5 flex flex-col gap-3 flex-1">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                  {translateCategory(challenge.category)}
                </span>
                <span className="text-gray-400 text-xs">
                  {challenge.daysLeft} jour{challenge.daysLeft > 1 ? 's' : ''} restant{challenge.daysLeft > 1 ? 's' : ''}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white text-xl font-bold leading-tight">
                {challenge.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm line-clamp-2">
                {challenge.description}
              </p>

              {/* Progress Bar */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">
                    {challenge.current.toLocaleString()} / {challenge.goal.toLocaleString()} {challenge.unit}
                  </span>
                  <span className="text-primary font-bold">
                    {challenge.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    group
                  </span>
                  <span>{challenge.participants} participant{challenge.participants > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link to={`/challenge/${challenge.id}`} className="mt-auto">
                <Button variant="primary" className="w-full">
                  Voir le Défi
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-lg">
            Aucun défi trouvé dans cette catégorie
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
