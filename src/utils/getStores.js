export const getStores = (data) => {
  const result = []

  const get = (data) => {
    for (let item of data) {
      if (item.type === 'store') {
        result.push({
          storeId: item.id,
          products: []
        })
      }

      if (item.pages) {
        get(item.pages)
      }
    }
  }

  get(data)

  return result
}