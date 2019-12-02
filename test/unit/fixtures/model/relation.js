export const fields = {
  sku: { type: "String!", label: "SKU" },
  cost: { type: "Float!", label: "Cost" },
  state: {
    type: "String!",
    input: "switch",
    id: "placeholder",
    label: "State"
  },
}

export const relations = [
  { table: "supplier", key: "name", rel: "PartSupplier", label: "Supplier" }
]
