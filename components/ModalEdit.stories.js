import { storiesOf } from "@storybook/vue"

import ModalEdit from "./ModalEdit"

import contact from "~/test/unit/fixtures/form/contact"

const fixtures = {
  contact,
  default: {
    value: {},
    fields: []
  }
}

const base = ({ diff = {}, dataDiff = {}, resource = "default" } = {}) => ({
  components: { ModalEdit },
  data: () => ({
    ...fixtures[resource],
    loading: false,
    show: true,
    ...dataDiff
  }),
  template: `<div>
      <ModalEdit :show="show" :fields="fields" :value="value" :loading="loading" @hide="show = false" />
      <v-btn @click="show = true">Show modal</v-btn>
    </div>`,
  ...diff
})

storiesOf("ModalEdit", module)
  .add("Loading", () => ({
    ...base({ dataDiff: { loading: true }, resource: "contact" })
  }))
  .add("Closed", () => ({
    ...base({ dataDiff: { show: false }, resource: "contact" })
  }))
  .add("Contacts", () => ({
    ...base({ resource: "contact" })
  }))
