import { BASE_BACKEND_API } from './../constants/index'
import qs from 'qs'

interface login2InviteCodeProps {
  address: string,
  inviteCode?: string
}
export const login2InviteCode = async (params: login2InviteCodeProps) => {
  const { address, inviteCode } = params

  const data = await fetch(`${BASE_BACKEND_API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      address,
      invite_code: inviteCode
    })
  })
  return data.json()
}


export const getInvitorInfo = async (inviteCode: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/invitor?invite_code=${inviteCode}`)
  return data.json()
}

export const getUserPoint = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/user-point?address=${address}`)
  return data.json()
}

export const getUserPointDetail = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/user-point-details?address=${address}`)
  return data.json()
}

export const getInviteePointDetail = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/invitee-point-details?address=${address}`)
  return data.json()
}

// Point task list
export const getPointTaskList = async (address: string) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/point-tasks?address=${address}`)
  return data.json()
}

// Point task twitter verify
export const verifyReTwitterPointTask = async ({ address, tweet_id }: { address: string, tweet_id: string }) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/twitter-verify?address=${address}&tweet_id=${tweet_id}`)
  return data.json()
}


export interface PointByPointTaskParams {
  address: string,
  type: 'register' | 'task' | 'tweet',
  task_id?: string,
  tweet_id?: string
}
export const getPointByPointTask = async (params: PointByPointTaskParams) => {
  const data = await fetch(`${BASE_BACKEND_API}/api/receive-point`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })

  return data.json()
}


/**
 * 获取每日签到积分
 * @returns 
 */
export const getWeeklyCheckinPoint = () => {

  return new Promise((resolve) => setTimeout(() => resolve({}), 600))
}