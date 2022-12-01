export const getModal = (data, type, id, storeId) => {
  for (let item of data) {
    if (item.id == id) {
      if (type === 'item' && !item.type) {
        return {
          ...item,
          type: 'item',
          storeId: storeId
        }
      }

      if (item.type === type) {
        return { ...item }
      }
    }

    if (item.pages) {
      let result = getModal(item.pages, type, id, storeId)
      if (result) {
        return { ...result }
      }
    }

    if (item.items && item.storeId == storeId) {
      let result = getModal(item.items, type, id, storeId)
      if (result) {
        return { ...result }
      }
    }
  }

  return null
}