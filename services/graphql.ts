import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'


const GOERLI_THEGRAPH = "https://goerli.rentero.io/subgraphs/name/john-rentero/first-play-market"


const goerliGraph = new ApolloClient({
  uri: GOERLI_THEGRAPH,
  cache: new InMemoryCache(),
  name: 'goerli'
})


const GRAPH_SERVICE_MAP: Record<number, ApolloClient<NormalizedCacheObject>> = {
  5: goerliGraph,
  // 97: bsctestGraph,
  // 9527: rangersTestGraph,
}

export {
  goerliGraph,
  GRAPH_SERVICE_MAP
}