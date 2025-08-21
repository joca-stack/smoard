import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
    extend: {
      colors: {
        'navy': '#1e3a8a',
        'charcoal': '#2d3748',
        'teal': '#0d9488',
        'accent-yellow': '#fbbf24'
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
