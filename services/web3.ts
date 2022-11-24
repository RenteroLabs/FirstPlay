import { PASS_NFT_CHAIN } from './../constants/contract';
import { PASS_NFT_CONTRACT } from 'constants/contract'
import qs from 'qs'


interface PassNFTParams {
  contractAddresses: string[],
  withMetadata: boolean,
  owner: string,
  chainId?: number
}
export const getPassNFTByAddress = async (params: PassNFTParams) => {
  const baseUrl: Record<number, string> = {
    5: "https://eth-goerli.g.alchemy.com/nft/v2",
    137: "https://polygon-mainnet.g.alchemy.com/nft/v2"
  }
  const data = await fetch(`${baseUrl[PASS_NFT_CHAIN]}/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs?${qs.stringify(params, { arrayFormat: 'brackets' })}`, {
    headers: {
      'accept': 'application/json'
    }
  })

  return data.json()
}

/**
 * 判断指定地址是否持有 PassNFT
 * @param address 
 * @returns 
 */
export const checkOwnPassNFT = async (address: string) => {
  const baseUrl: Record<number, string> = {
    5: "https://eth-goerli.g.alchemy.com/nft/v2",
    137: "https://polygon-mainnet.g.alchemy.com/nft/v2"
  }

  const params = {
    contractAddresses: [PASS_NFT_CONTRACT],
    owner: address,
    withMetadata: false,
  }

  const data = await fetch(`${baseUrl[PASS_NFT_CHAIN]}/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs?${qs.stringify(params, { arrayFormat: 'brackets' })}`, {
    headers: {
      'accept': 'application/json'
    }
  })

  return data.json()
}