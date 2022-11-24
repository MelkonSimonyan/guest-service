export const getPage = (data, id) => {
  for (let item of data) {
    if (item.id == id) {
      return {
        ...item,
        parentLink: '/'
      }
    }

    if (item.pages) {
      let result = getPage(item.pages, id)
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