/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white-lite': 'rgba(255, 255, 255, 0.91)',
        'gray-lite': 'rgb(38 38 38)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      
      
    },
  },
  plugins: [],
};