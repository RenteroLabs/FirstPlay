import { BASE_BACKEND_API } from './../constants/index';
import qs from 'qs'


// 获取首页数据
// export const getHomeData = async () => {
//   const data = await fetch(`${BASE_BACKEND_API}/api/home`)
//   return data.json()
// }

// v1 首页数据
// export const getHomeDataV1 = async () => {
//   const data = await fetch(`${BASE_BACKEND_API}/api/v1/home`)
//   return data.json()
// }


// games hot game 集合页数据
// export const getHotGameList = async (params: { offset: number, limit: number }) => {
//   const data = await fetch(`${BASE_BACKEND_API}/api/v1/games?${qs.stringify(params)}`)
//   return data.json()
// }

// bounties 集合页数据
export const getBountiesList = async (params: { offset: number, limit: number, status: 'on' | 'off' }) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/bounties?${qs.stringify(params)}`)
  return data.json()
}

// activit 集合页数据
// export const getActivityList = async (params: { offset: number, limit: number }) => {
//   const data = await fetch(`${BASE_BACKEND_API}/api/activities?${qs.stringify(params)}`)
//   return data.json()
// }




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
// export const getAllGamesInfo = async () => {
//   const data = await fetch(`${BASE_BACKEND_API}/api/games`)
//   return data.json()
// }

interface TaskStatusParams {
  address: string,
  task_ids: string[]
}
export const getTaskStatus = async (params: TaskStatusParams) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })

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
 * 提交游戏任务表单
 */
interface SubmitGameTaskParams {
  address: string,
  task_id: string,
  form: {
    address?: string,
    email?: string,
    link?: string,
    text?: string,
  }
}
export const submitGameTask = async (params: SubmitGameTaskParams) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/submit-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
  return data.json()
}





/**
 * ------------------------------------------------
 * Profile page api
 * ------------------------------------------------
 */

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
  timestamp: number,
  wallet?: string
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






/**
 * ------------------------------------------------
 * Business user manage api
 * ------------------------------------------------
 */

interface DepositParams {
  address: string,
  task_id: string,
  token: string,
  amount: string,
  timestamp: number,
  signature: string
  wallet?: string
}
// 将 B 端用户余额存入指定任务项中作为奖励
export const depositTokenToTask = async (params: DepositParams) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/deposit-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  })
  return data.json()
}

// 校验地址是否有管理员访问权限
export const checkAddressAuthority = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/master-game?address=${address}`)
  return data.json()
}

// B 端管理页 代币余额列表
export const businessTokenBalanceList = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/master-balances?address=${address}`)
  return data.json()
}

// 余额变动列表
export const balanceChangeRecordList = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/master-balance-details?address=${address}`)
  return data.json()
}

// 项目方管理 task 任务列表（正在进行中、已结束）
export const businessTaskList = async (address: string, status: 'on' | 'off') => {
  const data = await fetch(`${BASE_BACKEND_API}/api/master-tasks?address=${address}&status=${status}`)
  return data.json()
}