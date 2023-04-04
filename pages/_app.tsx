import '../styles/globals.css'
import "../styles/rc-image.scss"
import type { AppInitialProps, AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { SUPPORT_CHAINS } from 'constants/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { NextAdapter } from 'next-query-params';
import { QueryParamProvider } from 'use-query-params';

import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { AbstractIntlMessages, NextIntlProvider } from 'next-intl'
import { NextComponentType, NextPage } from 'next/types'
import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'

import { Analytics } from '@vercel/analytics/react';
import ConnectWallet from '@/components/ConnectWallet'
import { useRouter } from 'next/router';

import { PopupSDKOption, UniPassPopupSDK } from '@unipasswallet/popup-sdk'

import TagManager from 'react-gtm-module'

import * as ga from '../util/ga'
import { UnipassConnector } from 'lib/UnipassConnector'

import 'antd/dist/reset.css'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// connect wallet config
const { chains, provider, webSocketProvider } = configureChains(SUPPORT_CHAINS, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
  publicProvider()
])

const unipassOption: PopupSDKOption = {
  env: 'prod',
  chainType: "polygon",
  appSettings: {
    appName: "UniPass Wallet",
    appIcon: "https://firstplay.app/favicon.ico",
  },
}

export const unipassInstance = new UniPassPopupSDK(unipassOption) 

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new WalletConnectConnector({
      chains,
      options: {
        showQrModal: true,
        projectId: 'ee2b39154b521ae33c8750a1716e3107'
      }
    }),
    // @ts-ignore
    new UnipassConnector({
      chains,
      options: unipassOption,
      unipass: unipassInstance
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

export interface WalletConnectParams {
  showConnect: boolean,
  setShowConnect: (args: boolean) => any
}
export const WalletConnet = createContext<WalletConnectParams>({ showConnect: false, setShowConnect: () => { } })

function MyApp({ Component, pageProps }: AppPropsWithMessages) {
  const router = useRouter()

  const [showConnect, setShowConnect] = useState<boolean>(false)

  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER as string})
  }, [])

  return <WagmiConfig client={client}>
    <NextIntlProvider messages={pageProps.messages}>
      <QueryParamProvider adapter={NextAdapter}>
        <WalletConnet.Provider value={{ showConnect: showConnect, setShowConnect: setShowConnect }}>
          {getLayout(<Component {...pageProps} />)}
          <Analytics />
          <ConnectWallet showConnect={showConnect} setShowConnect={setShowConnect} />
          <ToastContainer />
        </WalletConnet.Provider>
      </QueryParamProvider>
    </NextIntlProvider>
  </WagmiConfig>
}

export default MyApp
