<template>
  <div>
    <v-tabs v-model="tab" background-color="primary" class="my-8">
      <v-tabs-slider></v-tabs-slider>

      <v-tab>View all</v-tab>
      <v-tab>Add new</v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card class="px-6 py-4">
            <DisplayTable
              v-model="filter"
              :headers="viewHeaders"
              :items="items"
              @showEdit="showEditItem"
              @showRemove="showRemoveItem"
            />
          </v-card>
        </v-tab-item>

        <TabAdd
          :value="addItemDetails"
          :fields="formFields"
          :loading="loading.add"
          :item="copy.common"
          @submit="addItem"
        />
      </v-tabs-items>
    </v-tabs>

    <div>
      <!-- Dialogs -->
      <div>
        <ModalEdit
          :show="dialogs.update"
          :value="editItemDetails"
          :fields="formFields"
          :loading="loading.edit"
          :item="copy.common"
          @edit="editItem"
          @hide="dialogs.update = false"
        />

        <ModalDelete
          v-model="dialogs.removal"
          :item="copy.common"
          :loading="loading.remove"
          @remove="removeItem"
        />
      </div>

      <NotifySnackbar v-model="snackbar.show" :snackbar="snackbar" />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es"

import { getTableHeaders, omitDeep } from "~/utility/utility"
import { getSwitches } from "~/utility/graphql"

import { fields, relations, baseForm, formFields } from "~/models/contacts"
const { log } = console

const copy = {
  main: "Contact",
  common: "contact",
  gql: "contact"
}

export default {
  data: () => ({
    items: [],
    error: null,
    tab: null,
    loading: {
      add: false,
      edit: false,
      remove: false
    },
    formFieldsBase: formFields,
    addItemDetails: { ...baseForm },
    editItemDetails: { ...baseForm, id: "" },
    switchFields: {
      type: []
    },
    itemIdToRemove: "",
    dialogs: {
      update: false,
      removal: false
    },
    snackbar: {
      show: false,
      key: 0,
      message: "",
      color: "success"
    },
    filter: "",
    copy
  }),
  computed: {
    viewHeaders() {
      return getTableHeaders(this.items[0])
    },
    formFields() {
      return this.formFieldsBase.map(f => ({
        ...f,
        items: f.input === "switch" ? this.switchFields[f.field] : []
      }))
    }
  },
  mounted() {
    this.getItems()
    this.getSwitchOptions()
  },
  methods: {
    async getItems() {
      const { data, err } = await this.$apollo.getAll(copy.gql, [
        fields,
        relations
      ])

      if (data) {
        this.items = omitDeep(data.items, "__typename")
      } else {
        this.error = err
      }
    },
    addItem() {
      const item = { ...this.addItemDetails }
      this.loading.add = true

      this.$apollo
        .addItem(copy.gql, item, [fields, relations])
        .then(({ data }) => {
          this.showSnackbar("success", `${data.name} created successfully`)
          Object.entries(this.addItemDetails).forEach(
            ([key]) => (this.addItemDetails[key] = baseForm[key])
          )
          this.items.push({ ...item, id: data.id })
          this.loading.add = false
        })
        .catch(err => {
          log(`Error creating ${copy.common}`, err)
          this.showSnackbar("error", `Error creating ${copy.common}`)
          this.loading.add = false
        })
    },
    showEditItem({ id }) {
      this.editItemDetails = cloneDeep(this.items.find(item => item.id === id))
      this.dialogs.update = true
    },
    editItem() {
      const item = { ...this.editItemDetails }
      this.loading.edit = true

      this.$apollo
        .updateItem(copy.gql, item, [fields, relations])
        .then(({ data }) => {
          this.$set(
            this.items,
            this.items.findIndex(item => item.id === data.id),
            { ...item, id: data.id }
          )
          this.showSnackbar("success", `${data.name} updated successfully`)
          this.dialogs.update = false
          this.loading.edit = false
        })
        .catch(err => {
          log(
            `Error updating ${copy.common}. No ${copy.common} matching given ID.`,
            err
          )
          this.showSnackbar("error", `Error updating ${copy.common}`)
          this.loading.edit = false
        })
    },
    showRemoveItem({ id }) {
      this.itemIdToRemove = id
      this.dialogs.removal = true
    },
    removeItem() {
      this.loading.remove = true
      this.$apollo
        .removeItem(copy.gql, this.itemIdToRemove)
        .then(({ data, err }) => {
          // short-circuit to the catch branch
          if (err) throw new Error(err)

          this.showSnackbar("success", `${copy.main} removed successfully`)
          this.items = this.items.filter(({ id }) => id !== this.itemIdToRemove)
          this.dialogs.removal = false
          this.itemIdToRemove = ""
          this.loading.remove = false
        })
        .catch(err => {
          log(
            `Error deleting ${copy.common}. No ${copy.common} matching given ID.`,
            err
          )
          this.showSnackbar("error", `Error removing ${copy.common}`)
          this.loading.remove = false
        })
    },
    getSwitchOptions() {
      getSwitches(fields).forEach(async ({ key, id }) => {
        const { data, err } = await this.$apollo.getSwitchOptions(id)
        if (data) {
          this.switchFields[key] = data
          this.addItemDetails[key] = data[0]
        } else {
          this.error = err
        }
      })
    },
    showSnackbar(color, message) {
      this.snackbar = {
        show: true,
        key: Date.now(),
        message,
        color
      }
    }
  }
}
</script>
