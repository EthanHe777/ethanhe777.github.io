/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ecjtu: {
          50: '#eef5ff',
          100: '#dbeafe',
          600: '#1f5fbf',
          700: '#174a97',
          800: '#123b76'
        }
      }
    }
  },
  plugins: []
};
