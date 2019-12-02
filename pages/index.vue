<template>
  <div>
    <v-layout column justify-center align-center>
      <v-sheet :elevation="4" color="white" class="mt-8 pa-8">
        <h2 class="headline">Starter template for Nuxt with 8base</h2>
        <div class="mt-2">
          <p v-if="authenticated">
            Check out the quick links below (change these in config.js in the
            root of the project).
          </p>
          <p v-else>Log in to use the app.</p>
        </div>
        <div>
          <v-btn v-if="authenticated" @click="logout" color="primary"
            >Log out</v-btn
          >
          <v-btn v-else @click="login($route.path)" color="primary"
            >Log in</v-btn
          >
        </div>
      </v-sheet>
    </v-layout>

    <div v-if="authenticated" class="mt-12 px-0 px-sm-8">
      <h4 class="mb-2">App</h4>
      <NavLinks :links="links.app" />

      <h4 class="mt-8 mb-2">Reporting</h4>
      <NavLinks :links="links.reports" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import { pages } from "~/config.js"

const { app, reports } = pages

// inline JSX component
// really useful to cut down on duplicated markup when making another SFC would be overkill (i.e. nothing else would import it)
const NavLinks = {
  props: ["links"],
  render() {
    return (
      <div class="d-flex flex-wrap">
        {this.links.map(link => (
          <nuxt-link
            v-for="link in links.reports"
            key={link.to}
            to={link.to}
            class="mr-4 mb-4 unstyled-link"
          >
            <v-card>
              <v-card-title class="title font-weight-regular">
                {link.title}
              </v-card-title>
            </v-card>
          </nuxt-link>
        ))}
      </div>
    )
  }
}

export default {
  components: { NavLinks },
  data: () => ({
    links: {
      app: app.filter(({ title }) => title !== "Welcome"),
      reports
    }
  }),
  computed: {
    ...mapGetters("auth", ["authenticated"])
  },
  methods: {
    ...mapActions("auth", ["login", "logout"])
  }
}
</script>
