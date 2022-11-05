export const getService = (data, id) => {
  for (let item of data) {
    if (item.type === 'service' && item.id === id) {
      return {
        ...item
      }
    }

    if (item.pages) {
      let result = getService(item.pages, id)
      if (result) {
        return {
          ...result
        }
      }
    }
  }

  return null
}