import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FDFBF9',
          card: '#FFFFFF',
        },
        brand: {
          pink:   { DEFAULT: '#FBAEAE', light: '#FDE4E4', hover: '#F99595' },
          mint:   { DEFAULT: '#B1E5D5', light: '#E2F6EF' },
          blue:   { DEFAULT: '#B0DDF0', light: '#E5F3FA' },
          yellow: { DEFAULT: '#FDE29F', light: '#FFF6E0' },
        },
        text: {
          main:  '#5C5251',
          muted: '#9A8F8E',
        },
        action: {
          primary: '#FBAEAE',
          hover:   '#F99595',
          text:    '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['var(--font-fredoka)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      boxShadow: {
        soft:    '0 10px 30px -5px rgba(92, 82, 81, 0.08)',
        'soft-lg': '0 20px 40px -8px rgba(92, 82, 81, 0.12)',
        'soft-pink': '0 10px 30px -5px rgba(251, 174, 174, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pop-in': 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'confetti': 'confetti 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        popIn: {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        confetti: {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
