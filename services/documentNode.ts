import { gql } from '@apollo/client'


export const GET_USER_TRIALING = gql`
  query($player: String!, $expires: String!) {
    packages(
      where: {
        player: $player,
        expires_gt: $expires
      }
    ) {
      id
      playDays
      player
      supplier
      expires
      nfts {
        id
        nftAddress
        tokenId
      }
    }
  }
`


export const GET_GAME_PACKAGES = gql`
  query($gameId: String!) {
    game(id: $gameId) {
      listingPackageCount
      id
      maxPlayTimes
      nftAddresses
      packages {
        expires
        id
        playDays
        player
        status
        supplier
        nfts {
          tokenId
          id
          nftAddress
        }
      }
    }
  }
`