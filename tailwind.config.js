/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // BINOS Primary Brand Colors
        brand: {
          blue: '#1E88FF',
          green: '#43D000',
          orange: '#FF8A00',
          pink: '#FF2D95',
          purple: '#7A2CFF',
        },
        // Module accent colors
        module: {
          finance: '#1E88FF',
          properties: '#43D000',
          maintenance: '#FF8A00',
          communications: '#FF2D95',
          analytics: '#7A2CFF',
          contacts: '#00BFA5',
          documents: '#4B5BFF',
          tasks: '#FFD600',
          alerts: '#FF5A4D',
        },
        // Accent palette
        accent: {
          cyan: '#00C8FF',
          teal: '#00BFA5',
          yellow: '#FFD600',
          lime: '#A8FF00',
          indigo: '#4B5BFF',
          coral: '#FF5A4D',
          turquoise: '#00E0D4',
        },
        // Neutral palette
        neutral: {
          black: '#0D0D0D',
          slate: '#525666',
          gray: '#8A909C',
          light: '#C7CBD4',
          offwhite: '#F4F6F8',
          white: '#FFFFFF',
        },
        // Card tint backgrounds
        card: {
          properties: '#F3FFE9',
          finance: '#EEF7FF',
          maintenance: '#FFF5E8',
          analytics: '#F5EEFF',
          contacts: '#EAFBF8',
          tasks: '#FFFBE6',
          documents: '#EEF1FF',
          communications: '#FFF0F8',
          alerts: '#FFF0EE',
        },
        // Legacy primary palette for backward compatibility
        primary: {
          50: '#EEF7FF',
          100: '#D6EBFF',
          200: '#ADD6FF',
          300: '#84C2FF',
          400: '#5BADFF',
          500: '#1E88FF',
          600: '#1878E0',
          700: '#1267B8',
          800: '#0C5590',
          900: '#064368',
          950: '#032A40',
        },
        surface: {
          50: '#F4F6F8',
          100: '#EEF0F3',
          200: '#E6E9EE',
          800: '#0D0D0D',
          900: '#0A0A0A',
          950: '#070707',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(13,13,13,0.06)',
        'soft-lg': '0 8px 24px rgba(13,13,13,0.08)',
        primary: '0 10px 30px rgba(30,136,255,0.15)',
        'primary-lg': '0 20px 50px rgba(30,136,255,0.2)',
        'primary-dark': '0 10px 30px rgba(30,136,255,0.08)',
        emerald: '0 10px 30px rgba(67,208,0,0.15)',
        'emerald-dark': '0 10px 30px rgba(67,208,0,0.08)',
        amber: '0 10px 30px rgba(255,138,0,0.15)',
        'amber-dark': '0 10px 30px rgba(255,138,0,0.08)',
        rose: '0 10px 30px rgba(255,45,149,0.15)',
        'rose-dark': '0 10px 30px rgba(255,45,149,0.08)',
        purple: '0 10px 30px rgba(122,44,255,0.15)',
        'purple-dark': '0 10px 30px rgba(122,44,255,0.08)',
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
