/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#FAFAFA',
        smoke: '#F4F1EE',
        charcoal: '#1A1A1A',
        steel: '#2E2E2E',
        champagne: '#C5A880',
        champagneSoft: '#E8D9BF',
        warm: '#B5976B',
        mist: '#D3D3D3',
        ink: '#111111',
        slateLuxe: '#888888'
      },
      boxShadow: {
        luxe: '0 22px 60px rgba(17, 17, 17, 0.15)',
        soft: '0 16px 40px rgba(17, 17, 17, 0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Cinzel', 'serif']
      }
    }
  },
  plugins: []
};
