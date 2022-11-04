// short address length
export function formatAddress(address: string | undefined, length: number) {
  if (!address) return
  return `${address.substring(0, length + 2)}…${address.substring(
    address.length - length
  )}`
}


export function formatLeftTime(expireTime: number, currentTime: number) {
  const leftTime = expireTime - currentTime
  if (leftTime < 0) {
    return [0, 0, 0]
  }

  const MINUTE = 60
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  const leftDay = leftTime / DAY
  const leftHour = (leftTime % DAY) / HOUR
  const leftMinute = ((leftTime % DAY) % HOUR) / MINUTE

  return [Math.floor(leftDay), Math.floor(leftHour), Math.floor(leftMinute)]
}