/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {

      },
      colors: {
        deepgreen: "#072B2B",
        btngreen: "#1DA189",
        btnyellow: "#F2CC90",
        popupgreen: "#D1FAE5",
        offwhitebg: "#EFF2F6",
        text1: "#1F2937",
        text2: "4B5563"
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
