export const getModal = (data, type, id) => {
  for (let item of data) {
    if (item.type === type && item.id === id) {
      return { ...item }
    }

    if (item.pages) {
      let result = getModal(item.pages, type, id)
      if (result) {
        return { ...result }
      }
    }
  }

  return null
}