import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral palette — not tied to any provider's brand
        brand: {
          50: "#f0f7f4",
          100: "#dceee5",
          200: "#b8ddcb",
          300: "#86c5aa",
          400: "#4fa584",
          500: "#2f8666",
          600: "#1f6a52",
          700: "#175443",
          800: "#124337",
          900: "#0f382e",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
