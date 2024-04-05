const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kilimanjaro: {
          50: "#fef2f2",
          100: "#fde3e3",
          200: "#fccccc",
          300: "#f9a8a8",
          400: "#f47575",
          500: "#ea4949",
          600: "#d62c2c",
          700: "#b42121",
          800: "#951f1f",
          900: "#7c2020",
          950: "#220606",
        },
        "cod-gray": {
          50: "#f6f5f5",
          100: "#e7e6e6",
          200: "#d2cfd0",
          300: "#b3adae",
          400: "#8c8485",
          500: "#71696a",
          600: "#605a5b",
          700: "#524c4d",
          800: "#474343",
          900: "#3e3b3b",
          950: "#100f0f",
        },
      },
      fontFamily: {
        sans: [
          '"Poppins"',
          '"Noto Color Emoji"',
          ...defaultTheme.fontFamily.sans,
        ],
        emoji: [
          '"Noto Color Emoji"',
          '"Poppins"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
