/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sullimax: {
          canvas: "#FFFFFF",
          surface: "#F8FAFC",
          subtle: "#F1F5F9",
          border: "#E2E8F0",
          navy: "#0F172A",
          muted: "#475569",
          emerald: "#0D5C46",
          emeraldHover: "#0A4837",
          emeraldLight: "#ECFDF5",
        },
      },
    },
  },
  plugins: [],
};

