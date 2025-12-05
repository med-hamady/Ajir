import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

const Register = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    termsAccepted: false
  });

  const [passwordStrength, setPasswordStrength] = useState('weak');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      // Simple password strength logic
      if (value.length < 6) setPasswordStrength('weak');
      else if (value.length < 10) setPasswordStrength('medium');
      else setPasswordStrength('strong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data, error } = await signUp(formData.email, formData.password, formData.fullName);

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Compte créé avec succès ! Veuillez vérifier votre email pour confirmer votre compte.');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          password: '',
          termsAccepted: false
        });
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    setError('');
    const { error } = await signInWithFacebook();
    if (error) {
      setError(error.message);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-red-500';
    }
  };

  const getStrengthWidth = () => {
    switch (passwordStrength) {
      case 'weak': return 'w-1/3';
      case 'medium': return 'w-2/3';
      case 'strong': return 'w-full';
      default: return 'w-1/3';
    }
  };

  return (
    <div className="px-4 py-8 sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        {/* Image Section */}
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl lg:aspect-auto lg:h-[600px]"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkVvyIfDZ-SfcfOXCcN1FXv1d2XUKyaq5oC-V9DK_qTMfM-M20evD-IkzgJKgnIWZlYkiowkQhaxJrS68A9gaejfLq17wsF2S7AXIccpzd1-yELU6mZE7VOM0g5tU69_ctjsf1_Qpwmgr_mKnorii4n4uzX9S5y7JnD_1wWCHa5Rn8decrZXw28BM4HPBAV0faoLHBDb-PmaNnoAYZC-oGnXyPTplpZjkEyMSq5sRnz1GM01Nr9eCQgIUYu0Vf4AfG1NYYG2cZUTY")'
          }}
        />

        {/* Form Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
              Rejoignez le Défi
            </h1>
            <h2 className="text-gray-300 text-base font-normal leading-normal">
              Commencez à faire la différence aujourd'hui.
            </h2>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
              <p className="text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg p-4">
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Social Sign Up Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="ghost"
              className="w-full gap-2"
              onClick={handleGoogleSignUp}
              type="button"
            >
              <img
                alt="Google logo"
                className="h-6 w-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIIGZIM7Q7K45Dq09ov-XQDdGKSNFl1LQLtLe8WubbgzemM9S96mn6fJV-0zsgMz3SY1sf5KhCoPVwfotPSPDjX7eUuCIv9TYoiuR3jSS3UsQXm6VjTm_j3SzS7clb1XaJ7XnIN477TmRXV5z-OWHTOvSJ3sQyzGwbWAdvHaOXe9L_xcCN26wN7i1_7XnOOYKehOgDcgGP22k4iaDzb6jm5bYaTZaF24J04cPUfm3g4FeQPvnTbYb3a2CMmeoOE_45l9U8KIT34kA"
              />
              <span className="truncate">S'inscrire avec Google</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full gap-2"
              onClick={handleFacebookSignUp}
              type="button"
            >
              <img
                alt="Facebook logo"
                className="h-6 w-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpL3KavlMsZl2CF6nt8P1X95u0BR2j_zAFfctp7vp6olnAXknU9Bl6EooEiTycem_pZMS5nykqyDIdOafUupeg0F-LQJDM8fXzY8wa0kJt9mO1d_E1hxhsw7_tgK6HbtbrMGDQzVG_wHn7jtqsLly3B-sQCV87TVbZFBRpPqMDa2lAj2FW7W9djWwEKLLLu4b6jm9q-sNf_r-QzO68zKNc251yj8qBSs57IB6lmFdalJHOpPzDNlNIuRRQtB5rX14_GZGoDV7XTZE"
              />
              <span className="truncate">S'inscrire avec Facebook</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <hr className="w-full border-gray-700" />
            <p className="text-[#9db9a6] text-sm font-normal leading-normal">OU</p>
            <hr className="w-full border-gray-700" />
          </div>

          {/* Registration Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Nom Complet</p>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b5443] bg-[#1c271f] h-14 placeholder:text-[#9db9a6] p-[15px] text-base font-normal leading-normal"
                placeholder="Entrez votre nom complet"
                type="text"
                required
              />
            </label>

            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Adresse Email</p>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b5443] bg-[#1c271f] h-14 placeholder:text-[#9db9a6] p-[15px] text-base font-normal leading-normal"
                placeholder="Entrez votre adresse email"
                type="email"
                required
              />
            </label>

            <div className="flex flex-col gap-2">
              <label className="flex flex-col flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Mot de passe</p>
                <div className="relative">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b5443] bg-[#1c271f] h-14 placeholder:text-[#9db9a6] p-[15px] pr-12 text-base font-normal leading-normal"
                    placeholder="Entrez votre mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </label>

              {/* Password Strength Indicator */}
              <div className="flex items-center gap-2 pt-1">
                <div className="h-1.5 flex-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${getStrengthWidth()} ${getStrengthColor()} rounded-full transition-all`} />
                </div>
                <p className={`text-sm capitalize ${passwordStrength === 'weak' ? 'text-red-500' : passwordStrength === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {passwordStrength === 'weak' ? 'Faible' : passwordStrength === 'medium' ? 'Moyen' : 'Fort'}
                </p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 py-2">
              <input
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="form-checkbox mt-0.5 h-5 w-5 rounded border-gray-600 text-primary focus:ring-primary/50 bg-gray-800"
                id="terms-checkbox"
                type="checkbox"
                required
              />
              <label className="text-sm text-gray-300" htmlFor="terms-checkbox">
                En vous inscrivant, vous acceptez nos{' '}
                <Link to="/terms" className="font-medium text-primary hover:underline">
                  Conditions d'Utilisation
                </Link>{' '}
                et notre{' '}
                <Link to="/privacy" className="font-medium text-primary hover:underline">
                  Politique de Confidentialité
                </Link>
                .
              </label>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              type="submit"
              disabled={!formData.termsAccepted || !formData.fullName || !formData.email || !formData.password || loading}
            >
              {loading ? 'Création du compte...' : 'Créer un Compte'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
