export const getModal = (data, type, id) => {
  for (let item of data) {
    if (item.id == id) {
      if (!item.type) {
        if (type === 'item') {
          return {
            ...item,
            type: 'item'
          }
        }
      } else {
        if (item.type === type) {
          return { ...item }
        }
      }
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
        return { ...result }
      }
    }
  }

  return null
}