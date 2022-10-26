import '../styles/globals.css'
import type { AppInitialProps, AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { SUPPORT_CHAINS } from 'constants/index'

import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { AbstractIntlMessages, NextIntlProvider } from 'next-intl'
import { NextComponentType, NextPage } from 'next/types'
import { ReactElement, ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react';

// connect wallet config
const { chains, provider, webSocketProvider } = configureChains(SUPPORT_CHAINS, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
  publicProvider()
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true
      }
    })
  ],
  provider,
  webSocketProvider
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithMessages = AppProps & {
  Component: NextPageWithLayout,
  pageProps: AppInitialProps & {
    messages: AbstractIntlMessages
  },
}

function MyApp({ Component, pageProps }: AppPropsWithMessages) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return <WagmiConfig client={client}>
    <NextIntlProvider messages={pageProps.messages}>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </NextIntlProvider>
  </WagmiConfig>
}

export default MyApp
