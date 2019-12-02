export const count = ls => ls.length

export const pivot = (data, key, aggregate = count) => {
  const grouped = data.reduce((acc, next) => {
    const k = next[key]
    acc[k] = [...(acc[k] || []), next]
    return acc
  }, {})

  return Object.entries(grouped).map(([key, arr]) => ({
    key,
    aggregate: aggregate(arr)
  }))
}
