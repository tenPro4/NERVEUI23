export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  publicRuntimeConfig:{
    // API_URL: process.env.API_URL
    UI_BASE_URL:process.env.UI_BASE_URL,
    API_BASE_URL:process.env.UI_BASE_URL,
  },

  privateRunTimeConfig:{
    UI_BASE_URL:process.env.UI_BASE_URL,
    API_BASE_URL:process.env.UI_BASE_URL,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Nerve System',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/scss/config/irms/app.scss',
    'vuejs-noty/dist/vuejs-noty.css',
    'aos/dist/aos.css',
    'assets/scss/config/irms/element-main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/v-select.js' },
    { src: '~/plugins/simplebar.js' },
    { src: '~/plugins/count-to.js' },
    // { src: "~/plugins/syncfusionPDFViewer"},
    { src: '~/plugins/apexchart.js', ssr: false },
    { src: '~/plugins/vue-tooltip.js'},
    { src: '~/plugins/vuelidate.js' },
    { src: '~/plugins/vuejs-smart-table' },
    { src: '~/plugins/vuejs-noty' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/lodash' },
    { src: '~/plugins/aos' },
    { src: '~/plugins/element-ui' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:process.env.API_URL
  },

  dayjs: {
    locales: ['en', 'en-nz'],
    defaultLocale: 'en-nz',
    defaultTimeZone: 'Asia/Kuala_Lumpur',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
      'localizedFormat',
    ], // Your Day.js plugin
  },

  router: {
    // base: '/intelTowerLight_UI',
    // base: '/',
    base: process.env.ROUTE_URL,
    linkActiveClass: 'active',
  },

  // auth: {
  //   redirect: {
  //     login: '/login',
  //     logout: '/login',
  //     callback: '/login',
  //     home: false,
  //   },
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'token',
  //       },
  //       user: {
  //         property: false,
  //       },
  //       endpoints: {
  //         login: { url: '/auth/login', method: 'post' },
  //         user: { url: '/auth/me', method: 'get' },
  //         logout: false,
  //       },
  //     },
  //   },
  // },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },

  loading: {
    color: '#528cc7',
    height: '4px',
  },

  server: {
    host: '0.0.0.0',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        sassOptions: {
          quietDeps: true,
        },
      },
    },
  },
}
