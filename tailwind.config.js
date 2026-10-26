/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009D4E',
          hover: '#008542',
          light: '#E6F7EF',
          dark: '#007A3D'
        },
        starken: {
          green: {
            DEFAULT: '#009D4E',
            dark: '#007A3D',
            medium: '#008542',
            light: '#E6F7EF',
            badge: '#D1F2E2',
          },
          dark: '#303030',
          gray: {
            bg: '#F8FAFC',
            border: '#E2E8F0',
            text: '#64748B',
            dark: '#303030'
          },
          partner: {
            purple: '#551A8B',
            hover: '#3E1B6B',
            light: '#F3E8FF',
          },
          empresas: {
            cyan: '#2D7282',
            hover: '#16424C',
            light: '#EBF3F5',
          },
          orange: {
            DEFAULT: '#FF8400',
            dark: '#EA580C',
            light: '#FFF7ED'
          }
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        din: ['"DIN 2014"', '"DIN Alternate"', '"DIN Condensed"', 'DIN', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '16px',
        'badge': '12px',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 28px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'green': '0 8px 24px -4px rgba(0, 166, 81, 0.25)',
      }
    },
  },
  plugins: [],
}
