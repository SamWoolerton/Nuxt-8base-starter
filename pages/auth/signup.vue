<template>
  <div>
    <v-layout column justify-center align-center>
      <v-sheet :elevation="4" color="white" class="mt-8 pa-8 container">
        <h2 class="headline">Sign up</h2>
        <p class="mt-2">Sign up now to start using the app!</p>
        <div v-if="error.status" class="mt-2 px-4 py-3 error-message">{{ error.message }}</div>
        <div class="mt-6">
          <v-form v-model="formValid">
            <v-text-field v-model="form.email" :rules="[rules.required]" label="Email" outlined />
            <v-text-field
              v-model="form.password"
              :type="show.password ? 'text' : 'password'"
              :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              @click:append="show.password = !show.password"
              label="Password"
              outlined
            />
            <div>
              <v-btn
                :loading="loading"
                :disabled="!formValid"
                @click="signup"
                color="primary"
              >Sign up</v-btn>
            </div>
          </v-form>
        </div>
      </v-sheet>
    </v-layout>
  </div>
</template>

<script>
import gql from "graphql-tag"

export default {
  data: () => ({
    form: {
      email: "",
      password: ""
    },
    formValid: false,
    loading: false,
    error: {
      status: false,
      message:
        "Error signing up, please ensure you are using a valid email and try again."
    },
    show: {
      password: false
    },
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    async signup() {
      try {
        await this.$apollo.noAuthClient.mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              userSignUpWithPassword(
                user: { email: $email }
                password: $password
              ) {
                email
              }
            }
          `,
          variables: {
            email: this.form.email,
            password: this.form.password
          }
        })

        this.$store.dispatch("auth/login")
      } catch (err) {
        return (this.error.status = true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
}

.error-message {
  background: var(--v-error-lighten5);
  color: var(--v-error-darken4);
}
</style>
