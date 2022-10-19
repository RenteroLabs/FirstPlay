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
// TODO: 后续需把其中的测试网移除
const MAIN_NETWORK: Chain[] = [
  chain.mainnet,
  chain.rinkeby,
  BSC_CHAIN,
  BSC_TEST
]

export const SUPPORT_CHAINS =
  process.env.NEXT_PUBLIC_ENV === 'PRO' ?
    MAIN_NETWORK :
    [
      chain.mainnet,
      chain.rinkeby,
      BSC_CHAIN,
      BSC_TEST
    ]

const TEST_BACKEND_API = 'https://testapi.firstplay.app'
const PRODUCTION_BACKEND_API = ''
export const BASE_BACKEND_API = process.env.NEXT_PUBLIC_ENV === 'PRO' ? PRODUCTION_BACKEND_API : TEST_BACKEND_API

// 暂时关闭，支持多语言时需要开启
// export const SUPPORT_LANGUAGE: string[] = ["en-US", "zh-CN"]
export const SUPPORT_LANGUAGE: string[] = ["en-US"]