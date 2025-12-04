const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'flex items-center justify-center overflow-hidden rounded-lg font-bold leading-normal tracking-[0.015em] transition-colors cursor-pointer';

  const variants = {
    primary: 'bg-primary text-background-dark hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    ghost: 'bg-gray-200 dark:bg-[#28392e] text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3b5443]',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
