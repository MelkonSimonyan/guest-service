export const getStore = (data, id) => {
  for (let item of data) {
    if (item.type === 'store' && item.storeId == id) {
      return {
        ...item,
        parentLink: '/'
      }
    }

    if (item.pages) {
      let result = getStore(item.pages, id)
      if (result) {
        return {
          ...result,
          parentLink: '/page/' + item.id
        }
      }
    }
  }

  return null
}