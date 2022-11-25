import { Chain, chain } from "wagmi"

const BSC_CHAIN: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'Binance Smart Chain Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB'
  },
  rpcUrls: {
    default: 'https://bsc-dataseed1.binance.org',
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com/"
    }
  },
  testnet: false
}

const BSC_TEST: Chain = {
  id: 97,
  name: 'BSC Test',
  network: 'Binance Smart Chain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB'
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545'
  },
  blockExplorers: {
    default: {
      name: 'BscScan Test',
      url: "https://testnet.bscscan.com"
    }
  }
}

const MAIN_NETWORK: Chain[] = [
  chain.mainnet,
  chain.polygon,
  BSC_CHAIN,
]

export const SUPPORT_CHAINS =
  process.env.NEXT_PUBLIC_ENV === 'PRO' ?
    MAIN_NETWORK :
    [
      chain.mainnet,
      chain.goerli,
      chain.polygon,
      chain.polygonMumbai,
      BSC_CHAIN,
      BSC_TEST
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
// export const SUPPORT_LANGUAGE: string[] = ["en-US", "zh-CN"]
export const SUPPORT_LANGUAGE: string[] = ["en-US"]


// 后端 metadata 服务地址
export const METADATA_SERVICE = "https://metadata.rentero.io"









export const Carnival_Games = [
  'a10fe616-6da7-4f88-bb5b-8e27b3adedad',

  '740a1e44-fd84-433e-98df-be90d650eb51',

  '8489b4b1-ed82-451d-96b6-46fe199b2fe8',

  '11ec241d-c889-4f54-8656-b5f7b1598300',

  'd56f4b3a-d7b7-4abf-935f-574546d4e958',

  '32605c7c-45d3-49f4-9923-b3a51816d1df'
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