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


export function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt: Record<string, any> = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}