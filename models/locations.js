import { processModel, getBaseForm, getFormFields } from "~/utility/models"

export const fields = processModel({
  firstName: { type: "String!", label: "First name" },
  lastName: { type: "String", label: "Last name" },
  email: { type: "String", label: "Email" },
  type: {
    type: "String",
    input: "switch",
    id: "",
    label: "Type"
  }
})

export const relations = []

export const baseForm = getBaseForm(fields, relations)

export const formFields = getFormFields(fields, relations)
