// ##########################
// fields
const getFieldsFromRelations = relations =>
  relations.map(({ table, key }) => `${table} { ${key} }`).join(" ")

export const getFields = ([fields, relations]) =>
  "id " +
  getFieldsFromRelations(relations) +
  " " +
  Object.keys(fields).join(" ")

// ##########################
// types
const getTypes = (str = "") => ([fields, relations]) =>
  Object.entries(fields)
    .map(([key, { type }]) => `$${key}: ${type}`)
    .join(" ") +
  " " +
  relations.map(({ table, rel }) => `$${table}: ${rel}${str}RelationInput`)
export const getAddTypes = getTypes()
export const getEditTypes = model => "$id: ID! " + getTypes("Update")(model)

// ##########################
// data
export const getDataFields = ([fields, relations]) =>
  Object.entries(fields).map(([key]) => `${key}: $${key}`) +
  " " +
  relations.map(({ table }) => `${table}: $${table}`).join(" ")

// ##########################
// variables
export const getVariables = method => (item, relations) => ({
  ...item,
  ...relations.reduce((acc, { table, key }) => {
    acc[table] = {
      [method]: {
        [key]: item[table]
      }
    }
    return acc
  }, {})
})
export const getAddVariables = getVariables("connect")
export const getEditVariables = getVariables("reconnect")

// ##########################
// switches
export const getSwitches = fields =>
  Object.entries(fields).reduce((acc, [key, { input, id }]) => {
    if (input === "switch") acc.push({ key, id })
    return acc
  }, [])
