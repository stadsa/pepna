/** @type {import('tailwindcss').Config} */
module.exports = {
  // `overline` adalah utility Tailwind; tanpa ini, class kustom "eyebrow" bisa ikut bergaris atas.
  blocklist: ["overline"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
