<template>
  <v-dialog :value="value" @input="cancel" max-width="320">
    <v-card>
      <v-card-title class="headline"
        >Are you sure you want to delete this {{ item }}?</v-card-title
      >
      <v-card-text>This can't be undone.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!loading" @click="cancel" text>Cancel</v-btn>
        <v-btn :loading="loading" @click="$emit('remove')" color="error"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    item: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    cancel() {
      this.$emit("input", false)
    }
  }
}
</script>
