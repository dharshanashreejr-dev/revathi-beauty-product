/** @type {import('tailwindcss').Config} */
export default {
  content: ['./products/index.html', './src/products/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'], serif: ['Cormorant Garamond', 'Georgia', 'serif'] },
      colors: {
        sand: '#f4f0fc', paper: '#f7f4fd', ink: '#4b1d91', clay: '#5922ab', gold: '#c4b5fd', night: '#4b1d90',
        stone: { 50: '#f6f2fd', 100: '#f1ebfc', 200: '#e3d7f9', 300: '#d4bff3', 400: '#8b6fd0', 500: '#7a5cc2', 600: '#6b4bb8', 700: '#5b34a8', 800: '#4c1d95', 900: '#3b1478' },
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
