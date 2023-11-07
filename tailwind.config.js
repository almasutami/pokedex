/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      body: ['Inter', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
