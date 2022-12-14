import { BASE_BACKEND_API } from './../constants/index';

/**
 * query user carnival task progress
 * @param param0 address
 * @returns 
 */
export const queryCarnivalProgress = async ({ address }: { address: string }) => {
  const res = await fetch(`${BASE_BACKEND_API}/api/carnival?address=${address}`)
  return res.json()
}


/**
 * query user medals for specifl game
 * @param param0 
 * @returns 
 */
export const queryCarnivalGamesInfo = async ({ address, game_id }: { address: string, game_id: string }) => {
  const res = await fetch(`${BASE_BACKEND_API}/api/game?address=${address}&game_id=${game_id}`)
  return res.json()
}



export const queryGameGiftCode = async ({ game_id }: { game_id: string }) => {
  const res = await fetch(`${BASE_BACKEND_API}/api/game-key?game_id=${game_id}`)
  return res.json()
}