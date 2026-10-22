/** @type {import('tailwindcss').Config} */
export default {
  content: ['./site/index.html', './src/site/**/*.{ts,tsx}'],
  theme: { extend: { colors: { sand: '#f4f0fc', paper: '#f7f4fd', ink: '#4b1d91', stone: '#4a1c8f', gold: '#c4b5fd' },
    fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'], display: ['Outfit', 'system-ui', 'sans-serif'] } } },
  plugins: [],
}
