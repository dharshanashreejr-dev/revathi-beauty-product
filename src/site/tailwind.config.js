/** @type {import('tailwindcss').Config} */
export default {
  content: ['./site/index.html', './src/site/**/*.{ts,tsx}'],
  theme: { extend: { colors: { sand: '#f6f5f1', ink: '#151915', stone: '#2a2e29', gold: '#c9a96a' },
    fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'], display: ['Outfit', 'system-ui', 'sans-serif'] } } },
  plugins: [],
}
