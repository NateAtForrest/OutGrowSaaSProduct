/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5100',
        white: '#EDECE8',
        'gray-light': '#BFB7B0',
        'gray-dark': '#7A6E66',
        black: '#222222',
      },
      backgroundColor: {
        primary: '#FF5100',
        white: '#EDECE8',
        'gray-light': '#BFB7B0',
        'gray-dark': '#7A6E66',
        black: '#222222',
      },
      textColor: {
        primary: '#FF5100',
        white: '#EDECE8',
        'gray-light': '#BFB7B0',
        'gray-dark': '#7A6E66',
        black: '#222222',
      },
      borderColor: {
        primary: '#FF5100',
        white: '#EDECE8',
        'gray-light': '#BFB7B0',
        'gray-dark': '#7A6E66',
        black: '#222222',
      }
    },
  },
  plugins: [],
}