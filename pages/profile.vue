<template>
  <div class="about">
    <h1>This is a protected route.</h1>

    <div v-if="user">
      <p>ID: {{user.id}}</p>
      <p>EMAIL: {{user.email}}</p>
    </div>

    <span v-else>Loading...</span>
  </div>
</template>

<script>
import gql from "graphql-tag"

export default {
  data() {
    return {
      user: undefined
    }
  },
  async mounted() {
    const response = await this.$apollo.query({
      query: gql`
        query {
          user {
            id
            email
          }
        }
      `
    })

    this.user = response.data.user
  }
}
</script>
