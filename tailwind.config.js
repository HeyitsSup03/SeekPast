/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        'background-light': '#1e293b',
        'background-lighter': '#334155',
        primary: {
          DEFAULT: '#14b8a6',
          light: '#5eead4',
          dark: '#0f766e',
        },
        secondary: {
          DEFAULT: '#06b6d4',
          light: '#67e8f9',
          dark: '#0891b2',
        },
        text: {
          DEFAULT: '#f8fafc',
          muted: '#cbd5e1',
          dark: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        typing: 'typing 1s ease-in-out infinite alternate',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};