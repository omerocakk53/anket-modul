/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}', // Tüm bileşen dosyalarını tarar
  ],
  theme: {
    extend: {
      // Renklerini buraya ekleyebilirsin
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
          text: '#ffffff',
        },
        secondary: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        neutral: {
          light: '#F9FAFB',
          DEFAULT: '#E5E7EB',
          dark: '#6B7280',
          darkest: '#111827',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // veya senin tercih ettiğin font
      },
    },
  },
  plugins: [],
};
