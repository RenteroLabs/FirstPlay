import { Chain } from "wagmi"
import { bsc, bscTestnet, mainnet, polygon, polygonMumbai, goerli } from '@wagmi/core/chains'

const MAIN_NETWORK: Chain[] = [
  mainnet,
  polygon,
  bsc,
]

export const SUPPORT_CHAINS =
  process.env.NEXT_PUBLIC_ENV === 'PRO' ?
    MAIN_NETWORK :
    [
      mainnet,
      goerli,
      polygon,
      polygonMumbai,
      bsc,
      bscTestnet
    ]

export enum CHAIN_ID_NAME {
  Ethereum = 1,
  Goerli = 5,
  BSC = 56,
  BSC_test = 97,
  Polygon = 137,
  PolygonMumbai = 80001,
}


const TEST_BACKEND_API = 'https://testapi.firstplay.app'
const PRODUCTION_BACKEND_API = 'https://api.firstplay.app'
export const BASE_BACKEND_API = process.env.NEXT_PUBLIC_ENV === 'PRO' ? PRODUCTION_BACKEND_API : TEST_BACKEND_API

// 暂时关闭，支持多语言时需要开启
// export const SUPPORT_LANGUAGE: string[] = ["en-US", "zh-CN", "id-ID", "vi-VN"]
export const SUPPORT_LANGUAGE: string[] = ["en-US", "id-ID", "vi-VN"]
// export const SUPPORT_LANGUAGE: string[] = ["en-US"]


// 后端 metadata 服务地址
export const METADATA_SERVICE = "https://metadata.rentero.io"





export const Carnival_Games = [
  "8489b4b1-ed82-451d-96b6-46fe199b2fe8",
  'a10fe616-6da7-4f88-bb5b-8e27b3adedad',
  '740a1e44-fd84-433e-98df-be90d650eb51',
  '11ec241d-c889-4f54-8656-b5f7b1598300',
  'd56f4b3a-d7b7-4abf-935f-574546d4e958',
  '32605c7c-45d3-49f4-9923-b3a51816d1df',
  "51037586-1947-4bab-9ad8-4c8eb4791050",
  "5ea1344a-c025-4009-a848-ae4644a1b608",
  "3cefa0c3-d277-4799-9ff1-03b8d8aa0e3b",
]

export const Reward_Games = [
  // '11ec241d-c889-4f54-8656-b5f7b1598300',
  'd56f4b3a-d7b7-4abf-935f-574546d4e958',
  'a10fe616-6da7-4f88-bb5b-8e27b3adedad',
  "8489b4b1-ed82-451d-96b6-46fe199b2fe8",
  "51037586-1947-4bab-9ad8-4c8eb4791050",
  "5ea1344a-c025-4009-a848-ae4644a1b608"
]


export const GAME_EVENT_NAME: Record<string, string> = {
  "8489b4b1-ed82-451d-96b6-46fe199b2fe8": "Dark_Claim",
  'a10fe616-6da7-4f88-bb5b-8e27b3adedad': "BigTime_Claim",
  '740a1e44-fd84-433e-98df-be90d650eb51': "NEO_Claim",
  '11ec241d-c889-4f54-8656-b5f7b1598300': "Mirror_Claim",
  'd56f4b3a-d7b7-4abf-935f-574546d4e958': "Matr1x_Claim",
  '32605c7c-45d3-49f4-9923-b3a51816d1df': "Bless_Claim"
}

export const GAME_TASK_MODAL_NAME: Record<string, string> = {
  "8489b4b1-ed82-451d-96b6-46fe199b2fe8": "Dark_Modal",
  'a10fe616-6da7-4f88-bb5b-8e27b3adedad': "BigTime_Modal",
  '740a1e44-fd84-433e-98df-be90d650eb51': "NEO_Modal",
  '11ec241d-c889-4f54-8656-b5f7b1598300': "Mirror_Modal",
  'd56f4b3a-d7b7-4abf-935f-574546d4e958': "Matr1x_Modal",
  '32605c7c-45d3-49f4-9923-b3a51816d1df': "Bless_Modal"
}



export const MetamaskDeeplink: string =
  process.env.NEXT_PUBLIC_ENV === 'PRO' ?
    "https://metamask.app.link/dapp/firstplay.app" :
    "https://metamask.app.link/dapp/test.firstplay.app"




export const WEB3AUTH_CLIENT_ID: string =
  process.env.NEXT_PUBLIC_ENV === 'PRO' ?
    process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID_PROD as string
    : process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID_TEST as string