<template>
  <v-tab-item>
    <v-card class="px-6 py-4">
      <div class="mt-6">
        <FormGenerator
          :value="value"
          :fields="fields"
          :loading="loading"
          @submit="submit"
        />
        <v-btn :loading="loading" @click="submit" color="primary" large
          >Add {{ item }}</v-btn
        >
      </div>
    </v-card>
  </v-tab-item>
</template>

<script>
import FormGenerator from "~/components/FormGenerator"

export default {
  components: { FormGenerator },
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
      required: true
    },
    item: {
      type: String,
      required: true
    }
  },
  methods: {
    submit() {
      this.$emit("submit")
    }
  }
}
</script>
