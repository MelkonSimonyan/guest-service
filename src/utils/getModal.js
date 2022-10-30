export const getModal = (data, type, id) => {
  for (let item of data) {
    if ((item.type === type || !item.type) && item.id == id) {
      return { ...item }
    }

    if (item.pages) {
      let result = getModal(item.pages, type, id)
      if (result) {
        return { ...result }
      }
    }

    if (item.items) {
      let result = getModal(item.items, type, id)
      if (result) {
        return {
          ...result,
          type: 'order'
        }
      }
    }
  }

  return null
}