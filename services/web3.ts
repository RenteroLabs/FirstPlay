import qs from 'qs'


export const getPassNFTByAddress = async (params: Record<string, any>) => {
  const data = await fetch(`https://polygon-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs?${qs.stringify(params)}`, {
    headers: {
      'accept': 'application/json'
    }
  })

  return data.json()
}