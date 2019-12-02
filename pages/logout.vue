<template>
  <div>Logging you out...</div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("auth/notify", "logoutComplete")
    this.$router.push("/")
  }
}
</script>
