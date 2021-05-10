// import path from 'path'
// import fs from 'fs'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'sideral2.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/style/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/vuelidate.js',
    '@/plugins/moment.js',
    '@/plugins/axios.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [

    ['@nuxtjs/fontawesome', {
      component: 'fa',
      icons: {
        solid: true,
        brands: [
          'faNode',
          'faVuejs'
        ]
      }
    }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    'nuxt-i18n',

    '@nuxtjs/auth-next'],

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true // recommended
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es.json'
      }
    ],
    defaultLocale: 'es',
    lazy: true,
    langDir: 'locales/'
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  auth: {
    // Options
    redirect: {
      login: '/login', // redirect user when not connected
      callback: '/auth/signed-in'
    },

    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENTID,
        logoutRedirectUri: process.env.AUTH0_LOGOUTURL,
        audience: process.env.AUTH0_AUDIENCE
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {

  },

  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'secrets', 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'secrets', 'server.crt'))
    // },

    port: process.env.PORT || 8000, // default: 3000
    host: process.env.HOST || '0.0.0.0' // default: localhost
  }, // other configs

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL
  }
  // privateRuntimeConfig: {
  //   apiSecret: process.env.API_SECRET
  // }
}
