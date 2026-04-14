import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'steel-blue': '#426A82',
        'morning-cream': '#F6F4F0',
        'charcoal': '#333333',
        'golden-ochre': '#EEB134',
        'burnt-orange': '#E87A1E',
      },
      fontFamily: {
        heading: ["'Outfit'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'load': 'load 1.5s infinite ease-in-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        load: {
            '0%': { left: '-100%' },
            '100%': { left: '100%' }
        }
      },
    },
  },
  plugins: [],
};
export default config;