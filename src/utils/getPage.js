export const getPage = (data, id) => {
  for (let item of data) {
    if (item.id === id) {
      return {
        ...item,
        parentId: '/'
      }
    }

    if (item.pages) {
      let result = getPage(item.pages, id)
      if (result) {
        return {
          ...result,
          parentId: item.id
        }
      }
    }
  }

  return null
}