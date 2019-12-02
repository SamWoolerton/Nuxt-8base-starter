import * as basic from "./fixtures/model/basic"
import * as relation from "./fixtures/model/relation"

import { processModel, getBaseForm, getFormFields } from "~/utility/models"

describe("Basic model", () => {
  const { fields, relations } = basic

  test("Processes as expected", () => {
    const expected = {
      name: { type: "String!", input: "text", label: "Name" },
      type: {
        type: "String",
        input: "switch",
        id: "placeholder",
        label: "Type"
      }
    }
    expect(processModel(fields)).toEqual(expected)
  })

  test("Base form", () => {
    const expected = {
      name: "",
      type: ""
    }
    expect(getBaseForm(fields, relations)).toEqual(expected)
  })

  test("Form fields", () => {
    const expected = [
      {
        field: "name",
        label: "Name",
        component: "VTextField",
        outlined: true
      },
      {
        field: "type",
        input: "switch",
        label: "Type",
        component: "VSelect",
        outlined: true
      }
    ]
    expect(getFormFields(fields, relations)).toEqual(expected)
  })
})

describe("Model with a relation", () => {
  const { fields, relations } = relation

  test("Processes as expected", () => {
    const expected = {
      sku: { type: "String!", input: "text", label: "SKU" },
      cost: { type: "Float!", input: "number", label: "Cost" },
      state: {
        type: "String!",
        input: "switch",
        id: "placeholder",
        label: "State"
      }
    }
    expect(processModel(relation.fields)).toEqual(expected)
  })

  test("Base form", () => {
    const expected = {
      supplier: "",
      sku: "",
      cost: "",
      state: ""
    }
    expect(getBaseForm(fields, relations)).toEqual(expected)
  })

  test("Form fields", () => {
    const expected = [
      {
        field: "supplier",
        input: "switch",
        label: "Supplier",
        component: "VSelect",
        outlined: true
      },
      {
        field: "sku",
        input: undefined,
        label: "SKU",
        component: "VTextField",
        outlined: true
      },
      {
        field: "cost",
        input: undefined,
        label: "Cost",
        component: "VTextField",
        outlined: true
      },
      {
        field: "state",
        input: "switch",
        label: "State",
        component: "VSelect",
        outlined: true
      }
    ]
    expect(getFormFields(fields, relations)).toEqual(expected)
  })
})
