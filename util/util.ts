import { random } from "lodash"

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