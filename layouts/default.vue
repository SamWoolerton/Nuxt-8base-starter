<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" app>
      <v-list>
        <v-list-item
          v-for="(page, i) in availablePages"
          :key="i"
          :to="page.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="page.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar id="top-nav-bar" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" class="unstyled-link">
        <img src="/logo.png" class="logo mr-4" />
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <template v-if="mobile" v-slot:extension>
        <ChangeModeButtons
          :authenticated="authenticated"
          :mode="mode"
          @viewApp="changeMode('app')"
          @viewReports="changeMode('reports')"
        />
        <LogInOutButtons
          :authenticated="authenticated"
          @logout="logout"
          @login="login($route.path)"
        />
      </template>
      <v-spacer v-if="!mobile" />
      <div v-if="!mobile">
        <ChangeModeButtons
          :authenticated="authenticated"
          :mode="mode"
          @viewApp="changeMode('app')"
          @viewReports="changeMode('reports')"
        />
        <LogInOutButtons
          :authenticated="authenticated"
          @logout="logout"
          @login="login($route.path)"
        />
      </div>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!-- Snackbar -->
    <div>
      <v-snackbar
        :key="snackbar.key"
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="4000"
      >
        {{ snackbar.message }}
        <v-btn @click="snackbar.show = false" text>Close</v-btn>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import { debounce } from "lodash-es"

import { pages, notificationOptions } from "~/config.js"

const isMobile = w => w < 600

const ChangeModeButtons = {
  props: ["authenticated", "mode"],
  render() {
    const buttons = [
      ["viewApp", "App", "app"],
      ["viewReports", "Reports", "reports"]
    ]
    return (
      this.authenticated && (
        <div class="d-contents">
          {buttons.map(([event, copy, mode]) => (
            <button
              class={this.mode === mode && "active primary--text"}
              onClick={() => this.$emit(event)}
            >
              {copy}
            </button>
          ))}
        </div>
      )
    )
  }
}

const LogInOutButtons = {
  props: ["authenticated"],
  render() {
    const [event, copy] = this.authenticated
      ? ["logout", "Log out"]
      : ["login", "Log in"]
    return <button onClick={() => this.$emit(event)}>{copy}</button>
  }
}

export default {
  components: { ChangeModeButtons, LogInOutButtons },
  data: () => ({
    clipped: true,
    drawer: !isMobile(window.width),
    title: "Starter app",
    mode: "app",
    pages,
    activePages: {
      app: null,
      reports: null
    },
    windowWidth: window.innerWidth,
    resizeListener: null,
    snackbar: {
      show: false,
      key: 0,
      message: "",
      color: "success"
    }
  }),
  computed: {
    ...mapGetters("auth", ["authenticated"]),
    availablePages() {
      return this.authenticated
        ? this.pages[this.mode]
        : this.pages.app.filter(obj => obj.auth === false)
    },
    mobile() {
      return isMobile(this.windowWidth)
    },
    notificationType() {
      return this.$store.state.auth.notificationType
    }
  },
  watch: {
    notificationType: "handleNotificationType"
  },
  mounted() {
    const isReports = this.getCurrentRoute().startsWith("/reports")
    this.mode = isReports ? "reports" : "app"

    this.resizeListener = window.addEventListener(
      "resize",
      debounce(e => {
        this.windowWidth = e.target.innerWidth
      }, 100)
    )

    this.handleNotificationType(this.notificationType)
  },
  destroyed() {
    window.removeEventListener(this.resizeListener)
  },
  methods: {
    ...mapActions("auth", ["login", "logout"]),
    changeMode(mode) {
      if (mode === this.mode) return
      this.activePages[this.mode] = this.getCurrentRoute()
      this.mode = mode
      const nextPage = this.activePages[mode] || this.availablePages[0].to
      this.$router.push(nextPage)
    },
    getCurrentRoute() {
      return this.$router.currentRoute.fullPath
    },
    handleNotificationType(str) {
      if (str === "") return
      this.$store.commit("auth/notify", "")

      const { color, message } = notificationOptions[str] || {}
      if (!message) return
      this.snackbar = { color, message, key: Date.now(), show: true }
    }
  }
}
</script>

<style lang="scss">
header {
  .logo {
    height: 28px;
  }

  button {
    margin-left: 1rem;

    &.active {
      font-weight: bold;
    }
  }
}
</style>
