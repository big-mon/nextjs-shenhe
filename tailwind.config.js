/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-noto-serif)"],
        mono: ["var(--font-m-plus-1-code)"],
      },
    },
  },
  variants: {
    flexDirection: ["responsive", "even"],
    scale: ["group-hover"],
    extend: {},
  },
  plugins: [],
};
