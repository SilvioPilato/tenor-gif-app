/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        grow: 'grow 0.3s ease-in-out forwards',
        gradient: 'gradient 15s ease infinite'
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        gradient: {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          }
        }
        
      }
    },
  },
  plugins: [],
}
