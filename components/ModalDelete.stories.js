import { storiesOf } from "@storybook/vue"

import ModalDelete from "./ModalDelete"

const base = {
  item: "test",
  value: true,
  loading: false
}

storiesOf("ModalDelete", module)
  .add("Closed", () => ({
    components: { ModalDelete },
    data: () => ({ ...base, value: false }),
    template: `<div>
      <ModalDelete v-model="value" :loading="loading" :item="item" />
      <v-btn @click="value = true">Show modal</v-btn>
    </div>`
  }))
  .add("Open", () => ({
    components: { ModalDelete },
    data: () => ({ ...base }),
    template: `<ModalDelete v-model="value" :loading="loading" :item="item" />`
  }))
