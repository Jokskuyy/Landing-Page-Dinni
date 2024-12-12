/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',        // File HTML utama
    './**/*.html',         // Semua file HTML di folder
    './src/**/*.{js,ts,jsx,tsx,vue}', // File JS/TS/Vue jika Anda menggunakan framework
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-left': 'fadeInLeft 1s ease-out',
        'fade-in-right': 'fadeInRight 1s ease-out',
        'fade-in-top': 'fadeInTop 1s ease-out',
        'fade-in-bottom': 'fadeInBottom 1s ease-out',
      },
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInTop: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInBottom: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        "bookmark-white": "#f7f7f7",
        "ld-yellow": "#FFD929",
        "ld-green": "#006B7B",
        "ld-white": "#FAF9F6",
      }
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      alata: ['Alata'],
      },
      letterSpacing: {
        widest: '.3em',
      },
    container: {
      center: true,
      padding: '1rem',
      screens : {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}