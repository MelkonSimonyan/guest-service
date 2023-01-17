export const isClose = (fromArr, toArr) => {
  let today = new Date()

  let from = fromArr[0] * 60 + fromArr[1] * 1
  let to = toArr[0] * 60 + toArr[1] * 1
  let now = today.getHours() * 60 + today.getMinutes() * 1

  if ((to > from && now < from || now >= to) || (to < from && (now < from && now >= to))) {
    return true
  }

  return false
}