import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f5f0e8", bg2: "#ede8de",
        ink: "#0e0d0a", ink2: "#2a2820",
        muted: "#9a9080", gold: "#b8922a",
      },
      fontFamily: {
        display: ["Bebas Neue","sans-serif"],
        serif:   ["DM Serif Display","serif"],
        mono:    ["Space Mono","monospace"],
        sans:    ["DM Sans","sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
