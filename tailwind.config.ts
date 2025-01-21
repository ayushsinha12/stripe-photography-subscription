import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    tailwindTypography, // Adds typography plugin
    daisyui, // Adds DaisyUI plugin
  ],
} satisfies Config;
