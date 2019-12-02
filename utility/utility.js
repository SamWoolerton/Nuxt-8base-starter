import { cloneDeepWith, upperCase } from "lodash-es"

export const getTableHeaders = (firstRow, remap = {}) => [
  ...Object.keys(firstRow || {})
    .filter(k => k !== "__typename" && k !== "id")
    .map(key => {
      const k = remap[key] || key
      return {
        value: k,
        text: upperCase(k)
      }
    }),
  { text: "ACTIONS", value: "action", sortable: false }
]

export const omitDeep = (arr, excludeKey) =>
  cloneDeepWith(arr, val => {
    if (val && typeof val === "object") delete val[excludeKey]
  })

export const pluck = key => obj => obj[key]

export const mapObject = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(fn))

export const flattenItem = config => obj =>
  mapObject(obj, ([key, value]) =>
    config.map(pluck("key")).includes(key)
      ? [key, config.find(({ key: k }) => k === key).fn(value)]
      : [key, value]
  )

export const groupObjects = (arr, groupKey, fn) =>
  Object.entries(
    arr.reduce((total, next) => {
      total[next[groupKey]] = fn(total[next[groupKey]], next)
      return total
    }, {})
  ).map(([key, val]) => ({ [groupKey]: key, val }))

export const isObject = val => val instanceof Object && !Array.isArray(val)

export const unique = arr => [...new Set(arr)]

export const renameKeys = (obj, fn) =>
  mapObject(obj, ([key, val]) => [fn(key), val])

export const prefixWith = prefix => str => prefix + str

export const prefixKeys = (obj, prefix) =>
  renameKeys(obj, prefixWith(prefix + "_"))

export const flattenObject = obj =>
  Object.entries(obj).reduce(
    (acc, [key, val]) =>
      isObject(val)
        ? { ...acc, ...prefixKeys(val, key) }
        : { ...acc, [key]: val },
    {}
  )
