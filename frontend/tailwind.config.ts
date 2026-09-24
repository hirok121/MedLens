import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clinical: {
          50: "#f0f7fa",
          100: "#dbeaf1",
          500: "#0f7490",
          600: "#0c5f75",
          700: "#0a4b5c",
          900: "#062f3a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
