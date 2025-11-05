/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.css", // ⬅️ tambahkan baris ini
  ],
  theme: {
    extend: {
      colors: {
        leaf: "#2E8B57",
        moss: "#A3B18A",
        sky: "#BDE0FE",
        cream: "#F9F7F3",
        darkleaf: "#264653",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
