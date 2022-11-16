import LayoutWithoutFooter from '@/components/LayoutWithoutFooter'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from './_app'
import styles from '../styles/dashboard.module.scss'
import { erc721ABI, useAccount, useContract, useContractWrite, useNetwork, usePrepareContractWrite, useSigner } from 'wagmi'
import ConnectWallet from '@/components/ConnectWallet'
import { useRouter } from 'next/router'
import Moralis from 'moralis'
import { AXE_NFT_CONTRACT, FIRSTPLAY_MARKET_CONTRACT } from 'constants/contract'
import { FIRSTPLYA_MARKET_ABI } from 'constants/abi'
import Head from 'next/head'

Moralis.start({
  apiKey: process.env.NEXT_PUBLIC_MORALIS_ID
})

const AXE_GAME_ID = "78b8ebb2-2b16-44ab-ad02-a3a24c77b359"

enum TabItem {
  Items,
  Listings,
  Activity
}

const Dashboard: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

  const router = useRouter()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { data: signer } = useSigner()
  const [showConnect, setShowConnect] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(TabItem.Items)

  const NFT_CONTRACT = useContract({
    addressOrName: AXE_NFT_CONTRACT,
    contractInterface: erc721ABI,
    signerOrProvider: signer
  })

  const MARKET_CONTRACT = useContract({
    addressOrName: FIRSTPLAY_MARKET_CONTRACT,
    contractInterface: FIRSTPLYA_MARKET_ABI,
    signerOrProvider: signer
  })

  const { config } = usePrepareContractWrite({
    addressOrName: FIRSTPLAY_MARKET_CONTRACT,
    contractInterface: FIRSTPLYA_MARKET_ABI,
    functionName: "supply",
    args: [
      [AXE_NFT_CONTRACT],
      [22],
      AXE_GAME_ID,
      1
    ]
  })

  // 合约上架 NFT 操作
  const { data, isLoading, isSuccess, write, isError } = useContractWrite(config)
  console.log(isLoading, isSuccess, isError)



  useEffect(() => {
    if (address) {
      // 钱包登录后，
      // 1：判断当前地址，是否是项目方管理员地址，是否有权限登录

      // 2：获取该有效地址对应的游戏信息和游戏包含的 NFT Collection 地址、链

      // 3: 展示当前地址中包含的所有指定合约地址下的所有 NFT

      // 4：判断当前是否处于正确链中

    } else {
      setShowConnect(true)
    }

  }, [address])


  // 临时逻辑，直接读取钱包地址下 goerli 测试链斧子合约 NFT 数据
  const queryNFTsByAddress = async () => {
    try {
      const { result } = await Moralis.EvmApi.nft.getWalletNFTs({
        address: address as string,
        chain: chain?.id,
        tokenAddresses: [
          AXE_NFT_CONTRACT
        ]
      })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  // 授权 NFT 合约给 market 合约
  const approveToMarket = async () => {
    try {
      await NFT_CONTRACT.setApprovalForAll(FIRSTPLAY_MARKET_CONTRACT, true)
    } catch (err) {
      console.log(err)
    }
  }

  // 上架 NFT
  const uploadNFTToMarket = async () => {
    try {
      await write?.()
    } catch (err) {
      console.log(err)
    }
  }

  // 试玩 NFT
  const trialNFT = async () => {
    await MARKET_CONTRACT.play("0x99e3852eff14ab51ed97fcbde76445c9a6fab0f7b3ffda40539e51bad7d942c4")
  }

  return <Box className={styles.dashboardBox} >

    <Head>
      <title>Dashboard | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.dashboard}>
      <Box className={styles.leftNavBox}>
        <Typography>NFT Manage</Typography>
      </Box>
      <Box className={styles.contentBox}>
        <Tabs
          className={styles.tabsHeader}
          value={activeTab}
          onChange={(_: any, newItem: number) => setActiveTab(newItem)} >
          <Tab label="Items" value={TabItem.Items} disableRipple />
          <Tab label="Listings" value={TabItem.Listings} disableRipple />
          <Tab label="Activity" value={TabItem.Activity} disableRipple />
        </Tabs>
        <Box className={styles.itemBox}>
          <Button onClick={queryNFTsByAddress}>Query NFT</Button>
          <Button onClick={approveToMarket}>Approve to Market</Button>
          <Button onClick={uploadNFTToMarket}>Upload NFT</Button>
          <Button onClick={trialNFT}>Trial NFT</Button>
        </Box>

      </Box>
      <Box className={styles.listingBox}>
        <Typography>Listing</Typography>
      </Box>
    </Box>


    <ConnectWallet
      showConnect={showConnect}
      setShowConnect={setShowConnect}
      errorCallback={() => { if (!address) { router.push("/") } }}
    />
  </Box>
}


Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>
}

export default Dashboard



export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}

