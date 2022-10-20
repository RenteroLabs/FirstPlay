import { BASE_BACKEND_API } from './../constants/index';
import qs from 'qs'


export const getHomeInfo = async () => {
  const data = await fetch(`${BASE_BACKEND_API}/api/home`)
  return data.json()
}


export const getGameInfo = async (params: Record<string, any>) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/game?${qs.stringify(params)}`)
  return data.json()
}