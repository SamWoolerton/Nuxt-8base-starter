import Vue from "vue"
import Vuex from "vuex"

import * as _Vuetify from "vuetify/lib"
import colors from "vuetify/lib/util/colors"

import { configure, addDecorator } from "@storybook/vue"
import { action } from "@storybook/addon-actions"

Vue.use(Vuex)

const Vuetify = _Vuetify.default

const isVueComponent = obj => obj.name === "VueComponent"
const VComponents = Object.keys(_Vuetify).reduce((acc, key) => {
  if (isVueComponent(_Vuetify[key])) acc[key] = _Vuetify[key]
  return acc
}, {})

const vuetifyConfig = {
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
  },
  components: {
    ...VComponents
  }
}

Vue.use(Vuetify, vuetifyConfig)
addDecorator(() => ({
  vuetify: new Vuetify(vuetifyConfig),
  template: `<v-app><story/></v-app>`
}))

Vue.component("nuxt-link", {
  props: ["to"],
  methods: {
    log() {
      action("link target")(this.to)
    }
  },
  template: '<a href="#" @click.prevent="log()"><slot>NuxtLink</slot></a>'
})

function loadStories() {
  const req = require.context("../components", true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
