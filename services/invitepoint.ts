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