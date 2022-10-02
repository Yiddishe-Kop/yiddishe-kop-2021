import colors from 'tailwindcss/colors'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
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

  /**
   * ENV vars
   */
  publicRuntimeConfig: {
    contactFormSubmissionUrl:
      process.env.NODE_ENV == 'production'
        ? 'https://portal.yiddishe-kop.com/api/contact'
        : 'http://yk-portal.test/api/contact',
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/fonts.scss', '~/assets/css/global.scss', '~/assets/css/transitions.scss'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxt/image-edge',
    '@nuxt/content',
    '@nuxtjs/feed',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

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

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        const hostname = process.NODE_ENV === 'production' ? 'https://yiddishe-kop.com' : 'http://localhost:3000'

        feed.options = {
          title: 'Yiddishe-Kop tech blog',
          description: 'Deep dives into programming topics',
          link: `${hostname}/feed.xml`,
        }

        const { $content } = require('@nuxt/content')

        const posts = await $content('articles').sort({ createdAt: -1 }).sort({ createdAt: -1 }).fetch()

        posts.forEach(post => {
          const url = `${hostname}/articles/${post.slug}`
          feed.addItem({
            title: post.title,
            id: url,
            link: url,
            date: new Date(post.createdAt),
            description: post.description,
            content: post.bodyPlainText.slice(0, 50),
          })
        })

        feed.addContributor({
          name: 'Yehuda Neufeld',
          email: 'dont@email.me',
          link: 'https://yiddishe-kop.com/',
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],

  googleAnalytics: {
    id: 'UA-143315552-2',
  },

  /**
   * PWA config
   */
  pwa: {
    meta: {
      name: 'Yiddishe Kop',
      description: 'Cutting edge software development',
      author: 'Yehuda Neufeld',
    },
    manifest: {
      name: 'Yiddishe Kop',
      short_name: 'Yiddishe Kop',
      description: 'Cutting edge software development',
      background_color: colors.amber[400],
    },
  },

  nitro: {
    plugins: ['~/server/plugins/content.ts'],
  },

  /*
   ** Build configuration
   */
  build: {},
})
