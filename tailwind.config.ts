import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

export default {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif', 'system-ui' ],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        display: ['var(--font-lobster-two)', 'Brush Script MT', 'cursive'],
        body: ['var(--font-open-sans)', 'sans-serif', 'system-ui' ],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography,
    daisyui,
  ],
  daisyui: {
    themes: ['emerald']
  }
} satisfies Config;
