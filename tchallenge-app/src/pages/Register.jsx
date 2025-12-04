import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    termsAccepted: false
  });

  const [passwordStrength, setPasswordStrength] = useState('weak');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would integrate with Supabase auth
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
              Join the Challenge
            </h1>
            <h2 className="text-gray-300 text-base font-normal leading-normal">
              Start making a difference today.
            </h2>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="ghost" className="w-full gap-2">
              <img
                alt="Google logo"
                className="h-6 w-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIIGZIM7Q7K45Dq09ov-XQDdGKSNFl1LQLtLe8WubbgzemM9S96mn6fJV-0zsgMz3SY1sf5KhCoPVwfotPSPDjX7eUuCIv9TYoiuR3jSS3UsQXm6VjTm_j3SzS7clb1XaJ7XnIN477TmRXV5z-OWHTOvSJ3sQyzGwbWAdvHaOXe9L_xcCN26wN7i1_7XnOOYKehOgDcgGP22k4iaDzb6jm5bYaTZaF24J04cPUfm3g4FeQPvnTbYb3a2CMmeoOE_45l9U8KIT34kA"
              />
              <span className="truncate">Sign up with Google</span>
            </Button>
            <Button variant="ghost" className="w-full gap-2">
              <img
                alt="Facebook logo"
                className="h-6 w-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpL3KavlMsZl2CF6nt8P1X95u0BR2j_zAFfctp7vp6olnAXknU9Bl6EooEiTycem_pZMS5nykqyDIdOafUupeg0F-LQJDM8fXzY8wa0kJt9mO1d_E1hxhsw7_tgK6HbtbrMGDQzVG_wHn7jtqsLly3B-sQCV87TVbZFBRpPqMDa2lAj2FW7W9djWwEKLLLu4b6jm9q-sNf_r-QzO68zKNc251yj8qBSs57IB6lmFdalJHOpPzDNlNIuRRQtB5rX14_GZGoDV7XTZE"
              />
              <span className="truncate">Sign up with Facebook</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <hr className="w-full border-gray-700" />
            <p className="text-[#9db9a6] text-sm font-normal leading-normal">OR</p>
            <hr className="w-full border-gray-700" />
          </div>

          {/* Registration Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Full Name</p>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b5443] bg-[#1c271f] h-14 placeholder:text-[#9db9a6] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your full name"
                type="text"
                required
              />
            </label>

            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Email Address</p>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b5443] bg-[#1c271f] h-14 placeholder:text-[#9db9a6] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your email address"
                type="email"
                required
              />
            </label>

            <div className="flex flex-col gap-2">
              <label className="flex flex-col flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
                <div className="relative">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b5443] bg-[#1c271f] h-14 placeholder:text-[#9db9a6] p-[15px] pr-12 text-base font-normal leading-normal"
                    placeholder="Enter your password"
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
                  {passwordStrength}
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
                By signing up, you agree to our{' '}
                <Link to="/terms" className="font-medium text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              type="submit"
              disabled={!formData.termsAccepted || !formData.fullName || !formData.email || !formData.password}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
