/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f8ff',
          100: '#eef1ff',
          200: '#dde4ff',
          300: '#c4ceff',
          400: '#a3b2ff',
          500: '#7b8cff',
          600: '#5b6bf0',
          700: '#4554db',
          800: '#3845b0',
          900: '#303c8a',
          950: '#1e2360',
        },
        slate: {
          850: '#1f2937',
          900: '#0f172a',
          950: '#020617',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
      boxShadow: {
        soft: '0 2px 12px rgba(16,24,40,0.06)',
        'soft-lg': '0 8px 24px rgba(16,24,40,0.08)',
        primary: '0 10px 30px rgba(91,107,240,0.18)',
        'primary-lg': '0 20px 50px rgba(91,107,240,0.22)',
        'primary-dark': '0 10px 30px rgba(123,140,255,0.12)',
        emerald: '0 10px 30px rgba(16,185,129,0.18)',
        'emerald-dark': '0 10px 30px rgba(52,211,153,0.12)',
        amber: '0 10px 30px rgba(245,158,11,0.18)',
        'amber-dark': '0 10px 30px rgba(251,191,36,0.12)',
        rose: '0 10px 30px rgba(244,63,94,0.18)',
        'rose-dark': '0 10px 30px rgba(251,113,133,0.12)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-in-left': {
          '0%': { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in .3s ease-out',
        'slide-in-left': 'slide-in-left .25s ease-out',
      },
    },
  },
  plugins: [],
};