/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      body: ['Inter', 'sans-serif']
    },
    // screens: {
    //   sm: { min: '0px', max: '500px' },
    //   md: { min: '500px', max: '933px' },
    //   lg: { min: '933px', max: '1160px' },
    //   xl: { min: '1160px', max: '1280px' },
    //   '2xl': { min: '1280px' }
    // },
    extend: {}
  },
  plugins: []
}
