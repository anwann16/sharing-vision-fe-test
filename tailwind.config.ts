import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        background: "#F5F3EC",
        foreground: "#221F19",
        border: "#DDD8C9",
        muted: {
          DEFAULT: "#F0EDE2",
          foreground: "#7A7566",
        },
        card: "#FBFAF6",
        primary: {
          DEFAULT: "#2F6F5E",
          hover: "#255A4C",
          foreground: "#FBFAF6",
        },
        destructive: "#B5493D",
        accent: "#EAE6DA",
      },
      borderRadius: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
