import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const ChallengeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('description');
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinChallenge = () => {
    if (!user) {
      // Rediriger vers la page de connexion si non connecté
      navigate('/login', { state: { from: `/challenge/${id}` } });
      return;
    }

    // Logique pour rejoindre le défi
    setHasJoined(true);
    alert('Félicitations ! Vous avez rejoint le défi. Vous recevrez bientôt plus d\'informations.');
  };

  const handleDonate = () => {
    if (!user) {
      // Rediriger vers la page de connexion si non connecté
      navigate('/login', { state: { from: `/challenge/${id}` } });
      return;
    }

    // Pour l'instant, afficher un message (plus tard, intégrer un système de paiement)
    alert('Fonctionnalité de don en cours de développement. Merci de votre intérêt !');
  };

  // Mock challenge data
  const challenge = {
    title: 'Défi Forêts pour l\'Avenir',
    description: 'Aidez-nous à reboiser 10 000 hectares de terrain pour lutter contre le changement climatique et restaurer des écosystèmes vitaux.',
    fullDescription: [
      'Ce défi est un appel à l\'action pour tous ceux qui sont passionnés par l\'avenir de notre planète. La déforestation est un problème critique, contribuant de manière significative au changement climatique et à la perte de biodiversité. L\'initiative "Forêts pour l\'Avenir" vise à inverser cette tendance en plantant des arbres dans les zones qui en ont le plus besoin.',
      'En rejoignant, vous ne plantez pas seulement un arbre ; vous aidez à restaurer les habitats de nombreuses espèces, à améliorer la qualité de l\'air et de l\'eau, et à fournir des moyens de subsistance durables aux communautés locales. Chaque contribution, grande ou petite, crée un effet d\'entraînement de changement positif. Construisons ensemble un avenir plus vert.'
    ],
    objectives: [
      'Planter 100 000 arbres dans les zones déforestées d\'ici la fin de l\'année',
      'Restaurer 10 000 hectares d\'écosystèmes forestiers vitaux',
      'Créer des emplois verts pour 500 membres de la communauté locale',
      'Réduire les émissions de CO2 de 50 000 tonnes par an',
      'Protéger et restaurer les habitats de 200 espèces menacées',
      'Former 1 000 volontaires aux pratiques de reforestation durable'
    ],
    howToParticipate: [
      {
        title: '1. Inscrivez-vous au Défi',
        description: 'Créez votre compte ou connectez-vous et cliquez sur "Rejoindre le Défi" pour vous inscrire officiellement.'
      },
      {
        title: '2. Choisissez votre Contribution',
        description: 'Vous pouvez contribuer par un don financier, du bénévolat sur le terrain, ou en sensibilisant votre communauté.'
      },
      {
        title: '3. Plantez des Arbres',
        description: 'Participez à nos événements de plantation organisés chaque week-end, ou plantez des arbres de manière indépendante et enregistrez votre contribution.'
      },
      {
        title: '4. Suivez votre Impact',
        description: 'Consultez votre tableau de bord pour voir combien d\'arbres vous avez plantés et l\'impact environnemental de votre contribution.'
      },
      {
        title: '5. Partagez votre Expérience',
        description: 'Inspirez d\'autres personnes en partageant vos photos et histoires sur les réseaux sociaux avec #ForêtsPourLAvenir.'
      },
      {
        title: '6. Gagnez des Badges',
        description: 'Débloquez des badges et récompenses en atteignant différents jalons de contribution et en engageant votre réseau.'
      }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ILNJ3LXQ_K-wiY_J4nK6DCQbCpA4c9mkOamrU8u6MEBycbOMGLfDT3Dvu3nEBZNbodgGmpdrrQwvOfMuDnNyBF-nSs8kDPgOBGRtLh__GZ3eooAcnRs2ILT2jiKN90M0YZ1ytfNhXPjFDqBjNufE4MyBbFstAeFccroH0GYMswgNaPGXoFr4xX8jUaWVaZiHcIxv4E5zd3ERMXzepKLrp99eyyiuh11Ly3t_xsd6oz4r4eqYNVYfHs93eMQgVn03v4wut3G0fGQ',
    fundsRaised: 7850,
    fundGoal: 10000,
    participants: 432,
    daysRemaining: 15,
    progress: 78,
    partners: ['GreenWorld Org', 'EcoWarriors', 'PlanetSavers Inc.'],
    recentActivity: [
      { name: 'Sarah J.', action: 'a fait un don de 50 €', time: 'il y a 2 minutes', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Ti3Ee1JkllOQa4wFnh4drOr4oUE-lI6byCRhpzLb7H3jbd3me3LuN0PzPJ5oQyZzrExqWYq1VQtqhjyOS1DnMTHX0fdmrqmnjcJCaxavnBiwBHL0ZYveGt2ALOtAvz5_iaEtBzfCrfYL5xRlW7cfWhw_DxIcZrYUkjStgNKojXT62dAAVJN-idNbdXuBs36TqqTz7JfREHA9Vav70L_YkwJjrAekymBdW5rs618fFoacjSZOUaddFJtAmUUDNRQDfKAsnhvPnM4' },
      { name: 'Mike L.', action: 'a rejoint le défi', time: 'il y a 15 minutes', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARBp47EU1fpoG5-tbxi25vfVsDEO-BPqd6b-DFyFGopDOyR0cE8aC-mnwrxbxEfxxwL5m_yfLPSiTnTQAkK6dHHx1BNqceR6n5hlRz6BFPuwO0JpjRcWspQIiHguyPRacZ3N4X6AuPK7EyFcY4vx7am64cjYDEfQbZn7Zp3PQ9dJwGsNqRbzOicgFyvsL1zQXNhTt1iCK-HRMOWzws-6CeudsxHEyB0CAYHS8z2lopFBBI5Cl7IrUt3x1ZV8e3yHQ2CcT0iPws-VE' },
      { name: 'Emily R.', action: 'a partagé le défi', time: 'il y a 1 heure', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCBiKdpKZyhmd4hpJAmp-rxgJxXbyNHlxZzRPojg9opU2_p7aROn3E-_w6LUnYteCjD-Uhil3_i0jioI6nByRO1UOwvNQkmhuVXR3ifR0nF1GzaNH3tY4_2VeRo4c2VMitEPmqstxN4cJwj1DNHCZHMLRYxxz6-Y3FHuxvVUIdsN-XLOaqO64YuMAE7cbz7ra14j778lAFrKJnyhPt66hYFQnhx41BnvZ55CLJOCjQCWYRKI86fIffRKlcN6qXd2hIRCDuAwOsmkc' }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Image */}
      <div className="w-full">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[320px] lg:min-h-[400px]"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url("${challenge.image}")`
          }}
        >
          <div className="p-6 md:p-8">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {challenge.title}
            </h1>
            <p className="text-gray-200 mt-2 max-w-2xl text-lg">{challenge.description}</p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-10">
        {/* Left Column: Challenge Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <div className="border-b border-border-dark mb-4">
              <nav aria-label="Tabs" className="flex space-x-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-1 py-3 text-sm font-semibold transition-colors ${
                    activeTab === 'description'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('objectives')}
                  className={`px-1 py-3 text-sm font-semibold transition-colors ${
                    activeTab === 'objectives'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Objectifs
                </button>
                <button
                  onClick={() => setActiveTab('howto')}
                  className={`px-1 py-3 text-sm font-semibold transition-colors ${
                    activeTab === 'howto'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Comment Participer
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'description' && (
              <div className="space-y-4 text-white/90">
                {challenge.fullDescription.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed">{paragraph}</p>
                ))}
              </div>
            )}

            {activeTab === 'objectives' && (
              <div className="space-y-3">
                {challenge.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                      check_circle
                    </span>
                    <p className="text-base text-white/90 leading-relaxed flex-1">{objective}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'howto' && (
              <div className="space-y-6">
                {challenge.howToParticipate.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-lg font-semibold text-primary">{step.title}</h4>
                    <p className="text-base text-white/90 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Nos Partenaires</h3>
            <div className="flex items-center justify-around flex-wrap gap-8">
              {challenge.partners.map((partner, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400">
                  <span className="material-symbols-outlined text-3xl">eco</span>
                  <span className="font-semibold text-lg">{partner}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Action & Progress Panel */}
        <div className="space-y-8">
          {/* Stats Card */}
          <Card className="p-6 space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm font-medium leading-normal">Fonds Collectés</p>
              <p className="text-white tracking-light text-2xl font-bold leading-tight">
                €{challenge.fundsRaised.toLocaleString()} / €{challenge.fundGoal.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="rounded-full bg-border-dark h-2.5">
                <div
                  className="h-2.5 rounded-full bg-primary"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1">
                <p className="text-gray-400 text-sm font-medium leading-normal">Participants</p>
                <p className="text-white tracking-light text-xl font-bold leading-tight">
                  {challenge.participants}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400 text-sm font-medium leading-normal">Jours Restants</p>
                <p className="text-white tracking-light text-xl font-bold leading-tight">
                  {challenge.daysRemaining}
                </p>
              </div>
            </div>
          </Card>

          {/* Action Panel */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-center text-white">Rejoignez le Mouvement !</h3>
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={handleJoinChallenge}
            >
              {hasJoined ? '✓ Défi Rejoint' : 'Rejoindre le Défi'}
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              size="lg"
              onClick={handleDonate}
            >
              Faire un Don
            </Button>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex-grow h-px bg-border-dark" />
              <span className="text-sm text-gray-400">ou partager</span>
              <div className="flex-grow h-px bg-border-dark" />
            </div>

            <div className="flex justify-center gap-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-border-dark text-white hover:bg-border-dark/70 transition-colors">
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-border-dark text-white hover:bg-border-dark/70 transition-colors">
                <span className="material-symbols-outlined text-xl">link</span>
              </button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Activité Récente</h3>
            <ul className="space-y-4">
              {challenge.recentActivity.map((activity, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{ backgroundImage: `url('${activity.avatar}')` }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {activity.name} {activity.action}.
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
