import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  target: 'static',

  /*
   ** Global CSS
   */
  css: ['@/assets/css/app.scss'],

  /*
   ** Headers of the page
   */
  meta: {
    title: process.env.npm_package_name || '',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: colors.amber[400] },

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxt/image-edge', '@nuxt/content', '@nuxtjs/tailwindcss'],

  image: {
    provider: 'auto',
    sizes: [320, 420, 768, 1024, 1200],
    domains: ['source.unsplash.com', 'images.unsplash.com', 'jkaraoke.com', '5dakot.com', 'hachambaruch.com'],
  },

  content: {
    liveEdit: false,
    highlight: {
      theme: 'one-dark-pro',
      preload: ['js', 'php', 'html', 'vue', 'batch', 'css', 'json', 'ruby'],
    },
  },

  /**
   * ENV vars
   */
  runtimeConfig: {
    public: {
      contactFormSubmissionUrl:
        process.env.NODE_ENV == 'production'
          ? 'https://portal.yiddishe-kop.com/api/contact'
          : 'http://yk-portal.test/api/contact',
    },
  },

  googleAnalytics: {
    id: 'UA-143315552-2',
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
})
