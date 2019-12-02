<template>
  <v-data-table
    :headers="headers"
    :items="pivotTable"
    :search="filter"
    :hide-default-footer="hideFooter"
  />
</template>

<script>
import { count, pivot } from "~/utility/pivot"

export default {
  props: {
    pivotOn: {
      type: String,
      required: true
    },
    aggregate: {
      type: Function,
      default: count
    },
    data: {
      type: Array,
      required: true
    },
    headerNames: {
      type: Object,
      required: true
    },
    filter: {
      type: String,
      default: ""
    }
  },
  computed: {
    pivotTable() {
      return pivot(this.data, this.pivotOn, this.aggregate)
    },
    headers() {
      if (this.data.length === 0) return []
      const headers = Object.keys(this.pivotTable[0])
      return headers.map(h => ({ value: h, text: this.headerNames[h] }))
    },
    hideFooter() {
      return this.pivotTable.length <= 10
    }
  }
}
</script>
