// @ts-nocheck

import { storiesOf } from "@storybook/vue"

import GeneratedFormField from "./GeneratedFormField"

storiesOf("GeneratedFormField", module).add("As a component", () => ({
  components: { GeneratedFormField },
  data: () => ({
    field: {
      field: "name",
      label: "Name",
      component: "VTextField",
      outlined: true
    }
  }),
  template: `<GeneratedFormField :loading="false" :field="field" />`
}))
