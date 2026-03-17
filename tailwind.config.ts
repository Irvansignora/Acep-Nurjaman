import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0906",
        surface: "#111009",
        gold: "#c9a84c",
        "gold-lt": "#e8c97a",
        cream: "#f2e8d6",
        muted: "#6b6254",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        mono: ["Space Mono", "monospace"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
