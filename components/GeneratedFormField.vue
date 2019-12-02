<template>
  <!-- unsure why, but eslint is throwing an error that components need v-bind:is, even though it already has :is -->
  <!-- eslint-disable-next-line -->
  <component
    :is="field.component"
    :value="field.value"
    v-bind="field"
    :type="field.input === 'number' ? 'number' : undefined"
    :disabled="loading || disabled || field.disabled"
    @input="handleInput"
    @keydown.enter="$emit('submit')"
  />
</template>

<script>
import { VSelect, VTextField } from "vuetify/lib"

export default {
  // vue-loader dynamically imports from Vuetify, and dynamically selecting components above means that the components get stripped from the production build.
  // registering locally fixes this, but eslint throws an error
  // eslint-disable-next-line
  components: { VSelect, VTextField },
  props: {
    field: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(event) {
      this.$emit("input", this.field.input === "number" ? Number(event) : event)
    }
  }
}
</script>
