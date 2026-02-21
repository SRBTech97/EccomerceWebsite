import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff3f6c',
          dark: '#e2335e',
          light: '#ff6f90',
        },
      },
      boxShadow: {
        card: '0 10px 25px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
