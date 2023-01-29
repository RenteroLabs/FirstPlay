import { BASE_BACKEND_API } from './../constants/index';
import qs from 'qs'


// 获取首页全部游戏
export const getAllGames = async () => {
  const data = await fetch(`${BASE_BACKEND_API}/api/home`)
  return data.json()
}

interface GameInfoParams {
  game_id: string
}
export const getGameInfo = async (params: GameInfoParams) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/game?${qs.stringify(params)}`)
  return data.json()
}

/**
 * 获取平台全部游戏数据
 * @returns 
 */
export const getAllGamesInfo = async () => {
  const data = await fetch(`${BASE_BACKEND_API}/api/games`)
  return data.json()
}

/**
 * 开始游戏 task 任务
 */
interface GameTaskParams {
  address: string
  task_id: string
}
export const startGameTask = async (params: GameTaskParams) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/start-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
  return data.json()
}

/**
 * 获取正在试玩游戏
 * @param address 
 * @returns 
 */
export const getTrialingTasks = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/home?address=${address}`)
  return data.json()
}

/**
 * 历史进行游戏 Task 记录
 */
export const getTrialTaskRecordList = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/user-task-details?address=${address}`)
  return data.json()
}


/**
 * 获取个人页正在试玩任务列表
 */
export const getProfileTrialingTaskList = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/user-tasks?address=${address}`)
  return data.json()
}

/**
 * 获取个人页余额变动历史记录列表
 */
export const getProfileBalanceRecordList = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/user-balance-details?address=${address.toLowerCase()}`)
  return data.json()
}


/**
 * 用户余额列表
 */
export const getUserTokenBalances = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/user-balances?address=${address.toLowerCase()}`)
  return data.json()
}


export interface withdrawTokenParams {
  signature: string,
  address: string,
  token: string,
  timestamp: number 
}
/**
 * 用户提现余额
 */
export const withdrawTokenBalance = async (params: withdrawTokenParams) => {
  // const { signature, ...bodyParams } = params

  const data = await fetch(`${BASE_BACKEND_API}/api/withdraw-balance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  })

  return data.json()
}