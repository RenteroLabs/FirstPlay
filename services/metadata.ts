import { METADATA_SERVICE } from '../constants/index'

enum META_CHAIN_NAME {
  eth = 1,
  goerli = 5,
  matic = 137,
  mumbai = 80001,
  bsc = 56,
  bsc_testnet = 97,
  rpg = 2025,
  rpg_testnet = 9527
}

type META_SUPPORT_CHAINS = "eth" | "goerli" | "matic" | "mumbai" | "bsc" | "bsc_testnet" | "rpg" | "rpg_testnet"

interface NFTMetadataProps {
  chain: META_SUPPORT_CHAINS
  nfts: { contract: string, token_id: string }[]
}

export const getNFTsMetadata = async (params: NFTMetadataProps) => {
  const data = await fetch(`${METADATA_SERVICE}/api/metadatas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })

  return data.json()
}


interface RefreshNFTMetaParams {
  chain: META_SUPPORT_CHAINS,
  contract: string,
  token_id: string
}
export const refreshNFTMetadata = async (params: RefreshNFTMetaParams) => {
  const data = await fetch(`${METADATA_SERVICE}/api/metadata/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }) 
  return data.json()
}
