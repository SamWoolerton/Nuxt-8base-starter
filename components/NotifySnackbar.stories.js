import { storiesOf } from "@storybook/vue"

import NotifySnackbar from "./NotifySnackbar"

const base = {
  show: true,
  key: "placeholder",
  color: "success",
  message: "Example message",
  timeout: 3000
}

storiesOf("NotifySnackbar", module)
  .add("Closed", () => ({
    components: { NotifySnackbar },
    data: () => ({ snackbar: { ...base, show: false } }),
    template: `<div>
      <NotifySnackbar v-model="snackbar.show" :snackbar="snackbar" />
      <v-btn @click="snackbar.show = true">Show snackbar</v-btn>
    </div>`
  }))
  .add("Open success", () => ({
    components: { NotifySnackbar },
    data: () => ({ snackbar: { ...base } }),
    template: `<NotifySnackbar v-model="snackbar.show" :snackbar="snackbar" />`
  }))
  .add("Open info", () => ({
    components: { NotifySnackbar },
    data: () => ({ snackbar: { ...base, color: "info" } }),
    template: `<NotifySnackbar v-model="snackbar.show" :snackbar="snackbar" />`
  }))
  .add("Open error", () => ({
    components: { NotifySnackbar },
    data: () => ({ snackbar: { ...base, color: "error" } }),
    template: `<NotifySnackbar v-model="snackbar.show" :snackbar="snackbar" />`
  }))
