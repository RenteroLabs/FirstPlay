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
  const data = await fetch(`${baseUrl[params?.chainId || 137]}/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs?${qs.stringify(params, { arrayFormat: 'brackets' })}`, {
    headers: {
      'accept': 'application/json'
    }
  })

  return data.json()
}