import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const Footer = () => {
  return (
    <footer className="bg-background-dark border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 xl:px-40 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-white">
              <div className="text-primary">
                <Logo />
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                TChallenge
              </h2>
            </div>
            <p className="text-white/70 text-sm">
              Rejoignez une communauté qui fait vraiment la différence.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition text-sm">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition text-sm">
                  Découvrir
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-white transition text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition text-sm">
                  Nous Contacter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white transition text-sm">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white transition text-sm">
                  Conditions d'Utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Suivez-Nous</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/70 hover:text-white transition" title="Facebook">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition" title="Twitter">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition" title="Instagram">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://github.com/med-hamady/Ajir" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition" title="GitHub">
                <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © 2025 TChallenge. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
