/** @type {import('tailwindcss').Config} */
export default {
  content: ['./site/index.html', './src/site/**/*.{ts,tsx}'],
  theme: { extend: { colors: { sand: '#e8eddb', paper: '#eef2e4', ink: '#1b1f16', stone: '#2e3424', gold: '#8f9a5c' },
    fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'], display: ['Outfit', 'system-ui', 'sans-serif'] } } },
  plugins: [],
}
