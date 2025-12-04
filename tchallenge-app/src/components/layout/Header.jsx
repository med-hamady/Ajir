import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Header = () => {
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
          Discover
        </Link>
        <Link to="/challenges" className="text-white/70 hover:text-white transition-colors text-sm font-medium leading-normal">
          My Challenges
        </Link>
        <Link to="/leaderboard" className="text-white/70 hover:text-white transition-colors text-sm font-medium leading-normal">
          Leaderboard
        </Link>
        <Link to="/about" className="text-white/70 hover:text-white transition-colors text-sm font-medium leading-normal">
          About Us
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/login" className="hidden md:block">
          <Button variant="outline" size="md">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="primary" size="md">
            Sign Up
          </Button>
        </Link>
        <Link to="/profile" className="hidden md:block">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBmCR2pSEyRy-F4sBdrrR1n7Eni5lKU7_Mj7QHGcjJ1TbQBcB0f8cq3AC1CgB2thNGd4kjM4pi2gp6UQ6zp10I8ZdyMfgxDEYe_eIuEMqWI85alpIu8ZmEWb2pxPzJ3K6BWdE-LM3mmBtfPQPi0VEWq3M1VnEmwjUccMeO-1Cl1xRu1MvbmJ7hDNBVFBbH36bXBpW8mx807CTsWeNi4XjWqlrxR9xAc6MEhRDowvM8QSpNilJa_5adEzjJgc_w69nOBLvkYrmodR54")',
            }}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
