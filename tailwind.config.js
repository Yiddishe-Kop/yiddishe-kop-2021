const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    layers: ['utilities'],
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'content/**/*.md',
      'content/**/*.json',
      'nuxt.config.js',
    ]
  },
  darkMode: 'class',
  theme: {
    colors: {
      white: colors.white,
      brand: colors.amber[400],
      gray: colors.blueGray,
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
      siddur: ['siddur', ...defaultTheme.fontFamily.sans],
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
              color: theme('colors.amber.500'),
              '&:hover': {
                color: theme('colors.gray.500'),
              },
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            'pre code': {
              fontFamily: 'Cascadia'
            },
            code: {
              fontFamily: 'Cascadia',
              padding: '0.2em 0.5em',
              borderRadius: theme('borderRadius.md'),
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.white'),
            },
            'code::before': {
              content: ''
            },
            'code::after': {
              content: ''
            },
          }
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
            strong: {
              color: theme('colors.gray.100'),
            },
            blockquote: {
              color: theme('colors.gray.200'),
            },
            a: {
              color: theme('colors.amber.200'),
              '&:hover': {
                color: theme('colors.gray.100'),
              },
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      })
    }
  },
  variants: {
    extend: {
      backgroundOpacity: ['dark'],
      typography: ["responsive", "dark"],
      translate: ["hover", "group-hover"]
    }
  },
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: [],
    }),
    require('@tailwindcss/aspect-ratio'),
  ]
}
