import { startsWith } from "lodash-es"

if (!Object.fromEntries) {
  Object.fromEntries = iterable =>
    [...iterable].reduce((obj, [key, val]) => {
      obj[key] = val
      return obj
    }, {})
}

export const processModel = model =>
  Object.fromEntries(
    Object.entries(model).map(([field, { type, input, id, label }]) => [
      field,
      input === "switch"
        ? { type, input, id, label }
        : startsWith(type, "Float") || startsWith(type, "Int")
        ? { type, input: "number", label }
        : { type, input: "text", label }
    ])
  )

const baseFormProcessing = (fields, relations, subtables = []) => [
  ...relations.map(({ table, label }) => ({
    field: table,
    input: "switch",
    label
  })),
  ...Object.entries(fields).map(([field, { input, label }]) => ({
    field,
    input,
    label
  }))
]

const augmentField = field => ({
  ...field,
  component: field.input === "switch" ? "VSelect" : "VTextField",
  outlined: true
})

export const getBaseForm = (fields, relations) =>
  baseFormProcessing(fields, relations).reduce((acc, { field, input }) => {
    acc[field] = input === "number" ? null : ""
    return acc
  }, {})

export const getFormFields = (fields, relations, subtables = []) =>
  baseFormProcessing(fields, relations)
    .map(augmentField)
