const colors = require('tailwindcss/colors')
const shiki = require('shiki')

export default {
  components: true,
  target: 'static',

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: colors.amber[400] },

  /**
   * ENV vars
   */
  publicRuntimeConfig: {
    contactFormSubmissionUrl: process.env.NODE_ENV == 'production' ? 'https://indesign.yiddishe-kop.com/api/contact' : 'http://indesign.test/api/contact'
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/fonts.scss',
    '~/assets/css/global.scss',
    '~/assets/css/transitions.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/lib.js',
    '~/plugins/lightbox.js',
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/feed',
  ],

  image: {
    sizes: [320, 420, 768, 1024, 1200],
  },

  content: {
    liveEdit: false,
    markdown: {
      async highlighter() {
        const theme = await shiki.loadTheme('./assets/OneDark-Pro.json')
        const highlighter = await shiki.getHighlighter({
          // Complete themes: https://github.com/shikijs/shiki/tree/master/packages/themes
          theme,
        })
        return (rawCode, lang) => {
          return highlighter.codeToHtml(rawCode, lang)
        }
      }
    }
  },

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {

        const hostname = process.NODE_ENV === 'production' ? 'https://yiddishe-kop.com' : 'http://localhost:3000';

        feed.options = {
          title: "Yiddishe-Kop tech blog",
          description: "Deep dives into programming topics",
          link: `${hostname}/feed.xml`
        };

        const { $content } = require('@nuxt/content');

        const posts = await $content('articles')
          .sortBy('createdAt', 'desc')
          .fetch();

        posts.forEach((post) => {
          const url = `${hostname}/articles/${post.slug}`;
          feed.addItem({
            title: post.title,
            id: url,
            link: url,
            date: new Date(post.createdAt),
            description: post.description,
            content: post.bodyPlainText.slice(0, 50),
          });
        });

        feed.addContributor({
          name: 'Yehuda Neufeld',
          email: 'dont@email.me',
          link: 'https://yiddishe-kop.com/'
        })

      }, cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],

  googleAnalytics: {
    id: 'UA-143315552-2',
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
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
    }
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { text } = require('reading-time')(document.text)
        document.readingTime = text
        document.bodyPlainText = document.text
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
