/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        "primary-light": "#6366F1",
        "primary-dark": "#4338CA",
        "primary-text": "#ffffff",
        "primary-darktext": "#000077",

        secondary: "#10B981",
        "secondary-light": "#34D399",
        "secondary-dark": "#059669",

        "neutral-white": "#ffffff",
        "neutral-light": "#f3f4f6",
        neutral: "#e5e7eb",
        "neutral-dark": "#9ca3af",
        "neutral-darkest": "#6b7280",

        danger: "#ef4444",
        "danger-dark": "#cc0000",

        success: "#22c55e",
        warning: "#eab308",
        info: "#3b82f6",
      },
      boxShadow: {
        glow: '0 0 15px rgba(0, 0, 0, 0.15)',
        'glow-hover': '0 0 25px rgba(59, 130, 246, 0.5)',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'fade-in-slide': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-down-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down-out': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s infinite',
        'fade-in-slide': 'fade-in-slide 0.6s ease-out forwards',
        'slide-in': 'slide-in 0.4s ease-out forwards',
        'slide-out': 'slide-out 0.4s ease-in forwards',
        'slide-down-in': 'slide-down-in 0.4s ease-out forwards',
        'slide-down-out': 'slide-down-out 0.4s ease-in forwards',
      },
    },
  },
  plugins: [],
};
