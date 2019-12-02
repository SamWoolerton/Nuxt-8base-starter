<template>
  <div>
    <v-snackbar
      :key="snackbar.key"
      :value="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      @input="hide"
    >
      {{ snackbar.message }}
      <v-btn @click="hide" text>Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    snackbar: {
      type: Object,
      required: true
    }
  },
  methods: {
    hide() {
      this.$emit("input", false)
    }
  }
}
</script>
