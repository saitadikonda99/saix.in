import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
         background: "var(--background)",
         orange: "var(--orange)",
         textPrimary: "var(--text-primary)",
         textSecondary: "var(--text-secondary)"
      },
    },
  },
  plugins: [],
}

export default config
