import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: { extend: {} },
  plugins: []
} satisfies Config;
