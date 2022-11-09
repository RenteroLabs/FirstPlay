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
      game {
        id
        listingPackageCount
        maxPlayTimes
        nftAddresses
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
      packages(orderBy: expires, orderDirection: asc) {
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


export const GET_USER_ACTIVITYS = gql`
  query($player: String!) {
    activities(where: {
      player: $player
    }) {
      id
      player
      timestamp
      type
      packages {
        expires
        id
        playDays
        status
        player
        supplier
        game {
          id
          listingPackageCount
          maxPlayTimes
          nftAddresses
        }
        nfts {
          id
          nftAddress
          tokenId
        }
      }
    }
  }
`