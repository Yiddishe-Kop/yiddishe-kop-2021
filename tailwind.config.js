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
    extend: {
      colors: {
        current: 'currentColor',
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
        mono: ['iAWriterMono', ...defaultTheme.fontFamily.mono],
        quattro: ['Quattro', ...defaultTheme.fontFamily.mono],
        siddur: ['siddur', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 8px 30px 0 #071f4430, 0 4px 8px 0 #0a1e3c17, 0 0 1px 0 #09152f4d',
        'soft-lg': '0 8px 88px 0 #071f4430, 0 4px 8px 0 #0a1e3c17, 0 0 1px 0 #09152f4d',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              padding: '2px 4px',
              borderRadius: theme('borderRadius.sm'),
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
