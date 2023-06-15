/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: "var(--quicksand-font)",
      },
      colors: {
        facebook: "#4267B2",
      },
      boxShadow: {
        top: "0 -5px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
