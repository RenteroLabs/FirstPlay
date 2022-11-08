
export interface NFTsRes {
  id: string,
  nftAddress: string,
  tokenId: string
}

export interface PackageRes {
  id: string,
  playDays: number,
  supplier: string,
  player: string,
  status: 'listing' | 'renting',
  expires: string,
  nfts: NFTsRes[]
}

export interface GameRes {
  id: string,
  maxPlayTimes: number,
  nftAddresses: string[],
  listingPackageCount: number,
}

export interface GameDetailInfo extends GameRes {
  packages: PackageRes[]
}


export interface UserActivityItem {
  id: string,
  player: string,
  timestamp: string,
  type: string,
  packages: PackageRes & {
    game: GameRes
  }
}


export interface ProfilePackageRes extends PackageRes{
  game: GameRes
}