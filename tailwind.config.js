/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['Caveat', 'Patrick Hand', 'cursive'],
        body: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        notebook: {
          cream: '#fdf8f0',
          creamDark: '#f0e8d8',
          charcoal: '#2c2c2c',
          ruled: '#c5d0e6',
          margin: '#e8a0a0',
        },
      },
    },
  },
  plugins: [],
};
