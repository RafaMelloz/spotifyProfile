import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        spotify: "#3be477",
        spotifyGray: "#1F1F1F",
      },
      height: {
        screen80: "calc(100vh - 96px)",
      }
    },
  },
  plugins: [],
};
export default config;
