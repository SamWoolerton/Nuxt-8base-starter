<template>
  <v-dialog :value="show" @input="hide" max-width="650">
    <v-card>
      <v-card-title class="headline">Update {{ item }}</v-card-title>

      <div class="px-6 mt-6">
        <FormGenerator
          :value="value"
          :fields="fields"
          :loading="loading"
          @submit="edit"
        />
      </div>

      <v-card-actions>
        <div class="w-100">
          <div class="w-100 d-flex">
            <v-spacer></v-spacer>
            <v-btn v-if="!loading" @click="hide" text>Cancel</v-btn>
            <v-btn :loading="loading" @click="edit" color="primary"
              >Save changes</v-btn
            >
          </div>

          <slot />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FormGenerator from "~/components/FormGenerator"

export default {
  components: { FormGenerator },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    item: {
      type: String,
      required: true
    },
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
    }
  },
  methods: {
    hide() {
      this.$emit("hide")
    },
    edit() {
      this.$emit("edit")
    }
  }
}
</script>
