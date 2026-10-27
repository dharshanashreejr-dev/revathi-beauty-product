/** @type {import('tailwindcss').Config} */
export default {
  content: ['./site/index.html', './src/site/**/*.{ts,tsx}'],
  theme: { extend: { colors: { sand: '#FFFFFF', paper: '#FFFFFF', ink: '#7A2E4D', stone: '#7A2E4D', gold: '#F2C6C2' },
    fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'], display: ['Outfit', 'system-ui', 'sans-serif'] } } },
  plugins: [],
}
