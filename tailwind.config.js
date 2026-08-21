/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    { pattern: /(bg|text|border)-(coral|sky|grape|sun|ink)(\/\d{1,3})?/ },
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FBF7EF',
        ink: '#211C16',
        coral: '#FF6B4A',
        sun: '#FFC93C',
        sky: '#4EA8DE',
        grape: '#8B5CF6',
      },
      fontFamily: {
        display: ['"Fredoka"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        pin: '0 10px 25px -8px rgba(33,28,22,0.25)',
        pinHover: '0 18px 35px -10px rgba(33,28,22,0.35)',
      },
    },
  },
  plugins: [],
}
