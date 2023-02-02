export const isClose = (from, to, time) => {
  let now = time ? new Date(time) : new Date()

  let fromMin = from[0] * 60 + from[1] * 1
  let toMin = to[0] * 60 + to[1] * 1
  let nowMin = now.getHours() * 60 + now.getMinutes() * 1

  if ((toMin > fromMin && nowMin < fromMin || nowMin >= toMin) || (toMin < fromMin && (nowMin < fromMin && nowMin >= toMin))) {
    return true
  }

  return false
}