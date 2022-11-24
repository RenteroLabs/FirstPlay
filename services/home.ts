import { BASE_BACKEND_API } from './../constants/index';
import qs from 'qs'


// 获取首页全部游戏
export const getAllGames= async () => {
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


