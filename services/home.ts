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