import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14231C",
        paper: "#F6F1E4",
        savanna: {
          DEFAULT: "#1B4332",
          light: "#2D6A4F",
          dark: "#0F2A1D",
        },
        marigold: {
          DEFAULT: "#E8A33D",
          dark: "#C9821E",
        },
        clay: "#B5502D",
        mist: "#D8D2C0",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};

export default config;