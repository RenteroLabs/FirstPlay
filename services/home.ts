import { BASE_BACKEND_API } from './../constants/index';

export const getHomeInfo = async () => {
  const data = await fetch(`${BASE_BACKEND_API}/api/home`)
  return data.json()
}