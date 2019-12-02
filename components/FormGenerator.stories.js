import { storiesOf } from "@storybook/vue"

import FormGenerator from "./FormGenerator"

import contact from "~/test/unit/fixtures/form/contact"

const fixtures = {
  contact,
  default: {
    value: {},
    fields: []
  }
}

const base = ({ diff = {}, dataDiff = {}, resource = "default" } = {}) => ({
  components: { FormGenerator },
  data: () => ({
    loading: false,
    ...fixtures[resource],
    ...dataDiff
  }),
  template: `<v-container><v-card class="pa-4"><FormGenerator :loading="loading" :fields="fields" :value="value" /></v-card></v-container>`,
  ...diff
})

storiesOf("FormGenerator", module)
  .add("Loading", () => ({
    ...base({ dataDiff: { loading: true }, resource: "contact" })
  }))
  .add("Contacts", () => ({
    ...base({ resource: "contact" })
  }))
