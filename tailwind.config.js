const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    colors: {
      white: colors.white,
      brand: colors.amber[400],
      gray: colors.blueGray,
      amber: colors.amber,
      lime: colors.lime,
      green: colors.emerald,
      green: colors.emerald,
      blue: colors.cyan,
      purple: colors.fuchsia,
      red: colors.rose,
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      mono: ['Cascadia', ...defaultTheme.fontFamily.mono],
      siddur: ['siddur', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            'pre code': {
              fontFamily: 'Cascadia'
            },
            code: {
              fontFamily: 'Cascadia',
              padding: '0.2em 0.5em',
              borderRadius: theme('borderRadius.md'),
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
            'code::before': {
              content: ''
            },
            'code::after': {
              content: ''
            },
          }
        },
      })
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ]
}
