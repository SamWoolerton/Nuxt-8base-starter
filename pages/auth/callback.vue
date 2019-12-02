<template>
  <div>Authenticating...</div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  async mounted() {
    await this.handleAuthentication()
    this.$store.commit("auth/notify", "loginComplete")
    this.$router.push(localStorage.getItem("startPage") || "/")
  },
  methods: mapActions("auth", ["handleAuthentication"])
}
</script>
