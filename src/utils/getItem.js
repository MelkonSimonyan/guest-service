import { getStore } from './getStore'

export const getItem = (data, id, storeId) => {
  const item = getStore(data, storeId).items.find(x => x.id == id)

  return {
    ...item,
    storeId
  }
}