/** @type {import('tailwindcss').Config} */
export default {
  content: ['./products/index.html', './src/products/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'], serif: ['Cormorant Garamond', 'Georgia', 'serif'] },
      colors: { sand: '#ffffff', ink: '#1c1917', clay: '#8a6a4f', gold: '#b8975a', night: '#14110f' },
      keyframes: {
        rise: { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fade: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pop: { '0%': { opacity: '0', transform: 'translateY(30px) scale(.97)' }, '100%': { opacity: '1', transform: 'translateY(0) scale(1)' } },
        slide: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        fade: 'fade .3s ease both',
        pop: 'pop .45s cubic-bezier(.2,.7,.2,1) both',
        slide: 'slide .45s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
