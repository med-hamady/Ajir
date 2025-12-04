/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#13ec5b',
        'secondary': '#FF7F50',
        'background-light': '#f6f8f6',
        'background-dark': '#102216',
        'card-light': '#FFFFFF',
        'card-dark': '#161B22',
        'text-light': '#333333',
        'text-dark': '#E6EDF3',
        'border-light': '#D0D7DE',
        'border-dark': '#30363D',
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'Noto Sans', 'sans-serif']
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px'
      },
    },
  },
  plugins: [],
}
