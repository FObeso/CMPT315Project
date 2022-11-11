/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#127F4A",
        primaryLight: "#006639",
        primaryText: "#169a5a",
        lightOpacity: "rgba(18, 127, 74, 0.3)",
        lightgrey: "#f7f7f8",
      },
    },
  },
  plugins: [],
};
