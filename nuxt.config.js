import colors from "vuetify/lib/util/colors"

export default {
  mode: "spa",

  head: {
    titleTemplate: "Starter template",
    title: "Starter template",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Starter template for Nuxt and 8base"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons"
      }
    ]
  },

  // Customize the progress-bar color
  loading: { color: "#fff" },

  // global CSS
  css: ["~/assets/main"],

  plugins: [{ src: "~/plugins/graphql.js" }, { src: "~/plugins/globals.js" }],

  modules: [
    // docs: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],

  devModules: [
    // docs: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
    "@nuxtjs/dotenv"
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: colors.cyan.base
        }
      }
    }
  },

  router: {
    middleware: "auth"
  },

  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_CLIENT_ID: process.env.API_CLIENT_ID,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN
  }
}
