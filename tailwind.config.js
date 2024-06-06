/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'nerve-dark': '#0F172A',
        'nerve-light': '#1E293B',
        'nerve-purple': '#7C3AED',
        'nerve-blue': '#38BDF8',
        'nerve-pink': '#EC4899',
        'nerve-indigo': '#6366F1',
        'nerve-cyan': '#06B6D4',
        'blue-fond': '#03045e'
      },
      spacing: {
        '128': '32rem',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: []
}
