import Vue from "vue"

import DisplayTable from "~/components/DisplayTable"
import TabAdd from "~/components/TabAdd"
import ModalEdit from "~/components/ModalEdit"
import ModalDelete from "~/components/ModalDelete"
import NotifySnackbar from "~/components/NotifySnackbar"

const components = {
  DisplayTable,
  TabAdd,
  ModalEdit,
  ModalDelete,
  NotifySnackbar
}

Object.entries(components).forEach(([name, component]) =>
  Vue.component(name, component)
)
