import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          page: "#080909",
          base: "#0E1010",
          raised: "#151818",
          inset: "#1C2020",
          border: "#252A29",
          strong: "#3A413F",
        },
        signal: "#D7F75B",
        ink: {
          primary: "#F3F0E8",
          secondary: "#B9B5AA",
          muted: "#77766E",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        signal: "0 24px 80px rgba(0, 0, 0, 0.38)",
        "signal-sm": "0 12px 40px rgba(0, 0, 0, 0.28)",
      },
      screens: {
        xs: "375px",
        mobile: "430px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        wide: "1440px",
        cinema: "1728px",
      },
    },
  },
  plugins: [],
};

export default config;
