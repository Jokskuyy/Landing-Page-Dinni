/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',        // File HTML utama
    './**/*.html',         // Semua file HTML di folder
    './src/**/*.{js,ts,jsx,tsx,vue}', // File JS/TS/Vue jika Anda menggunakan framework
  ],
  theme: {
    extend: {
      colors: {
        "bookmark-purple": "#5267DF",
        "bookmark-red": "#FA5959",
        "bookmark-blue": "#242A45",
        "bookmark-grey": "#9194A2",
        "bookmark-white": "#f7f7f7",
        "ld_yellow": "#FFD929",
        "ld-green": "#006B7B",
        "ld-white": "#FAF9F6", 
      }
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      Inter: ["Inter", "sans-serif"]
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
  plugins: [],
}

