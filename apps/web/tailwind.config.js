/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'bg-dark': '#020712',
        'bg-dark-secondary': '#0a0f1d', 
        'bg-dark-tertiary': '#111827',
        'accent-purple': '#6B4EFF',
        'accent-cyan': '#00FFD1',
        'accent-pink': '#FF4ECD',
        'accent-gold': '#FFD700',
      },
    },
  },
  plugins: [],
}
