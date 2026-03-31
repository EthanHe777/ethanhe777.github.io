import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nostalgia: {
          50: '#fff9ef',
          500: '#b57b50',
          700: '#7c4d2f'
        }
      }
    }
  },
  plugins: []
};

export default config;
