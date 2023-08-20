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
        "open-sans": "var(--open-sans-font)",
        "montserrat": "var(--montserrat-font)",
        "playfair-display": "var(--playfair-display-font)",
      },
      colors: {
        facebook: "#4267B2",
        twitter: "#1DA1F2",
        whatsapp: "#25D366",
        pinterest: "#E60023",
        sanskrutiRed: "#ED1C24",
        sanskrutiRedLight: "#da233555",
      },
      boxShadow: {
        top: "0 -5px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
