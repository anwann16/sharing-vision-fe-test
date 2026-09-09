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
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        border: "#E2E8F0",
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        card: "#FFFFFF",
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#EEF2FF",
          foreground: "#4338CA",
        },
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        card: "0 4px 6px -1px rgb(0 0 0 / 0.03), 0 2px 4px -2px rgb(0 0 0 / 0.03)",
        glow: "0 0 20px -5px rgba(79, 70, 229, 0.3)",
      },
      borderRadius: {
        DEFAULT: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
