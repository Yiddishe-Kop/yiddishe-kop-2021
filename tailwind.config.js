const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'content/**/*.md',
    'content/**/*.json',
  ],

  darkMode: 'class',

  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      brand: colors.amber[400],
      gray: colors.slate,
      amber: colors.amber,
      lime: colors.lime,
      green: colors.emerald,
      blue: colors.cyan,
      purple: colors.fuchsia,
      red: colors.rose,
      pink: colors.pink,
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      mono: ['Cascadia', ...defaultTheme.fontFamily.mono],
      siddur: ['siddur', 'Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              textDecoration: 'none',
              borderRadius: '0',
              borderBottom: `.125em dashed ${theme('colors.amber.500')}`,
              '&:hover': {
                borderBottom: `.125em dashed ${theme('colors.gray.500')}`,
                color: theme('colors.amber.500'),
              },
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            'pre code': {
              fontFamily: 'Cascadia',
            },
            code: {
              fontFamily: 'Cascadia',
              padding: '0.2em 0.5em',
              borderRadius: theme('borderRadius.md'),
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.200'),
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            h2: {
              color: theme('colors.gray.200'),
            },
            h3: {
              color: theme('colors.gray.300'),
            },
            h4: {
              color: theme('colors.gray.300'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            blockquote: {
              color: theme('colors.gray.200'),
            },
            a: {
              color: theme('colors.gray.100'),
              textDecoration: 'none',
              borderRadius: '0',
              borderBottom: `.125em dashed ${theme('colors.amber.500')}`,
              '&:hover': {
                borderBottom: `.125em dashed ${theme('colors.gray.500')}`,
                color: theme('colors.amber.500'),
              },
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.700'),
            },
            pre: {
              backgroundColor: '#101a2b !important',
              code: {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: [],
    }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
