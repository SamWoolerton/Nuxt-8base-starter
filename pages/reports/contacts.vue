<template>
  <div>
    <h2 class="mt-12">Count contacts by type</h2>
    <v-card class="px-6 py-4 mt-8">
      <v-data-table
        v-if="$apollo.isLoading()"
        loading
        loading-text="Loading..."
        hide-default-footer
      />
      <BasicPivotTable
        v-else
        :data="items"
        :header-names="pivotHeaders"
        pivot-on="type"
      />
    </v-card>
  </div>
</template>

<script>
import BasicPivotTable from "~/components/BasicPivotTable"

import { fields, relations } from "~/models/contacts"

export default {
  components: { BasicPivotTable },
  data: () => ({
    items: [],
    error: null,
    pivotHeaders: { key: "TYPE", aggregate: "COUNT" }
  }),
  mounted() {
    this.getItems()
  },
  methods: {
    async getItems() {
      const { data, err } = await this.$apollo.getAll("contact", [
        fields,
        relations
      ])

      if (data) {
        this.items = data.items
      } else {
        this.error = err
      }
    }
  }
}
</script>
