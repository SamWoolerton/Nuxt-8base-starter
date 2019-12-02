<template>
  <div v-if="formData !== undefined">
    <div v-for="f in fields" :key="f.field">
      <GeneratedFormField
        :field="{ ...f, value: formData[f.field] }"
        :loading="loading"
        @submit="$emit('submit')"
        @input="updateField(f.field, $event)"
      />
    </div>
  </div>
</template>

<script>
// Initially inspired by https://rangle.io/blog/how-to-create-data-driven-user-interfaces-in-vue/

import GeneratedFormField from "~/components/GeneratedFormField"

export default {
  components: { GeneratedFormField },
  props: {
    value: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    formData: undefined
  }),
  mounted() {
    // this is actually copying by reference, normally something we'd strongly avoid
    this.formData = this.value
  },
  methods: {
    updateField(fieldName, value) {
      // because this was copied by reference, updating formData also updates the value prop from parent
      this.$set(this.formData, fieldName, value)
    }
  }
}
</script>
