<template>
  <div>
    <v-data-table
      v-if="$apollo.isLoading()"
      loading
      loading-text="Loading..."
      hide-default-footer
    />
    <div v-else>
      <v-text-field
        :value="value"
        @input="updateFilter"
        class="mt-4"
        outlined
        label="Filter table"
        prepend-inner-icon="search"
      />
      <v-data-table
        :headers="headers"
        :items="items"
        :search="filter"
        :hide-default-footer="items.length <= 10"
      >
        <template v-slot:item.action="{ item }">
          <v-icon @click="showEdit(item)" small class="mr-2">edit</v-icon>
          <v-icon @click="showRemove(item)" small>delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    filter() {
      return this.value
    }
  },
  methods: {
    showEdit(item) {
      this.$emit("showEdit", item)
    },
    showRemove(item) {
      this.$emit("showRemove", item)
    },
    updateFilter(filter) {
      this.$emit("input", filter)
    }
  }
}
</script>
