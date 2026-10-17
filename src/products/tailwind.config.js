/** @type {import('tailwindcss').Config} */
export default {
  content: ['./products/index.html', './src/products/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'], serif: ['Cormorant Garamond', 'Georgia', 'serif'] },
      colors: {
        sand: '#e8eddb', paper: '#eef2e4', ink: '#1b1f16', clay: '#69783f', gold: '#8f9a5c', night: '#141810',
        stone: { 50: '#eef2dc', 100: '#ecefdf', 200: '#d1daae', 300: '#b9c590', 400: '#8f9b6c', 500: '#5f6b46', 600: '#4a5536', 700: '#37402a', 800: '#262c1d', 900: '#1b1f16' },
      },
      keyframes: {
        rise: { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fade: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pop: { '0%': { opacity: '0', transform: 'translateY(30px) scale(.97)' }, '100%': { opacity: '1', transform: 'translateY(0) scale(1)' } },
        slide: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) backwards',
        fade: 'fade .3s ease both',
        pop: 'pop .45s cubic-bezier(.2,.7,.2,1) both',
        slide: 'slide .45s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
