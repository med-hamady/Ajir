import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { value: '10,000+', label: 'Volontaires Actifs' },
    { value: '50,000+', label: 'Arbres Plantés' },
    { value: '25,000+', label: 'Repas Fournis' },
    { value: '1,000+', label: 'Heures Contribuées' }
  ];

  const values = [
    {
      icon: 'favorite',
      title: 'Solidarité',
      description: 'Nous croyons au pouvoir de la communauté et de l\'action collective pour créer un changement positif.'
    },
    {
      icon: 'eco',
      title: 'Durabilité',
      description: 'La protection de l\'environnement et le développement durable sont au cœur de notre mission.'
    },
    {
      icon: 'school',
      title: 'Éducation',
      description: 'Autonomiser les communautés par l\'éducation et le partage des connaissances.'
    },
    {
      icon: 'health_and_safety',
      title: 'Bien-être',
      description: 'Soutenir les initiatives de santé et améliorer la qualité de vie pour tous.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Fondatrice & PDG',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      description: 'Passionnée par la création de changements significatifs dans les communautés du monde entier.'
    },
    {
      name: 'Ahmed Hassan',
      role: 'Directeur des Programmes',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Expert en développement communautaire et initiatives de solidarité.'
    },
    {
      name: 'Maria Garcia',
      role: 'Responsable Environnement',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description: 'Dédiée à la conservation de l\'environnement et à l\'action climatique.'
    },
    {
      name: 'David Chen',
      role: 'Directeur Technologie',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      description: 'Construire des plateformes qui connectent les volontaires à des causes significatives.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="px-4 py-16 sm:px-8 md:px-10 lg:px-20 xl:px-40 bg-gradient-to-b from-card-dark to-background-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
            À Propos de TChallenge
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed mb-8">
            Nous sommes une plateforme dédiée à connecter des individus passionnés avec des défis significatifs qui font une réelle différence dans le monde.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/challenges">
              <Button variant="primary" size="lg">
                Voir les Défis
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                Rejoignez-Nous
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 py-16 sm:px-8 md:px-10 lg:px-20 xl:px-40 bg-background-dark">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-primary text-4xl font-black mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="px-4 py-16 sm:px-8 md:px-10 lg:px-20 xl:px-40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-3xl font-black mb-6 text-center">
            Notre Mission
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center mb-12">
            TChallenge existe pour combler le fossé entre ceux qui veulent aider et ceux qui en ont besoin.
            Nous créons des défis significatifs qui abordent des problèmes réels en matière de solidarité, d'environnement,
            d'éducation et de santé. En gamifiant l'impact social, nous rendons la contribution au changement positif
            engageante, gratifiante et accessible à tous.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="px-4 py-16 sm:px-8 md:px-10 lg:px-20 xl:px-40 bg-card-dark/30">
        <h2 className="text-white text-3xl font-black mb-12 text-center">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {value.icon}
                  </span>
                </div>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 py-16 sm:px-8 md:px-10 lg:px-20 xl:px-40">
        <h2 className="text-white text-3xl font-black mb-12 text-center">
          Rencontrez Notre Équipe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div
                className="w-full h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${member.image})` }}
              />
              <div className="p-5">
                <h3 className="text-white text-lg font-bold mb-1">
                  {member.name}
                </h3>
                <div className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-400 text-sm">
                  {member.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-16 sm:px-8 md:px-10 lg:px-20 xl:px-40 bg-gradient-to-b from-card-dark to-background-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white text-3xl font-black mb-6">
            Prêt à Faire la Différence ?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Rejoignez des milliers de volontaires qui créent déjà un changement positif dans leurs communautés.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Commencez Aujourd'hui
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
