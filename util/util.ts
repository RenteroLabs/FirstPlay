import { random } from "lodash"
import moment from "moment"

/**
 * 从指定长度中随机选出一个，不包含上次被选中的数字
 */
export function randomIndex(count: number, lastSelect?: number) {
  lastSelect = lastSelect || -1

  let res = lastSelect
  while (res === lastSelect) {
    res = random(0, count - 1, false)
  }
  return res
}



// 获取本周7 天的日期
export function getCurrentWeekDays() {
  const dayList = [1, 2, 3, 4, 5, 6, 7]
  let weekDays: string[] = []

  dayList.forEach(item => weekDays.push(moment().day(item).format("M.DD")))

  return weekDays
}