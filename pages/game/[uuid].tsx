
import { Box, Typography, useMediaQuery } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import styles from "../../styles/game.module.scss"
import Layout from '@/components/Layout'
import { NextPageWithLayout } from '../_app'
import GameInfo from '@/components/GameInfo'
import { MONEY_ICON, REWARD_ICON } from 'constants/static'
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import TrialNFTCard from '@/components/TrialNFTCard'
import TrialNFTCardSkeleton from '@/components/TrialNFTCard/TrialNFTCardSkeleton'
import TrialSuccessModal from '@/components/PageModals/TrialSuccess'
import QuickTrialNFT from '@/components/PageModals/quickTrialNFT'
import Head from 'next/head'
import { useRequest } from 'ahooks'
import { getAllGamesInfo, getGameInfo } from 'services/home'
import { useLazyQuery } from '@apollo/client'
import { GET_GAME_PACKAGES } from 'services/documentNode'
import { goerliGraph } from 'services/graphql'
import { PackageRes } from 'types/graph'
import ContractTxLoading from '@/components/PageModals/ContractTxLoading'
import { createContext } from 'react'

export interface TxLoadingParams {
  txHash: string,
  setTxHash: (arg: string) => any
  showTxLoading: boolean,
  setShowTxLoading: (arg: boolean) => any
}

export const TxLoading = createContext<TxLoadingParams>({ txHash: "", setTxHash: (arg) => { }, showTxLoading: false, setShowTxLoading: (arg) => { } })

// 游戏详情页
const Game: NextPageWithLayout = () => {

  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showQuickTrialModal, setShowQuickTrialModal] = useState<boolean>(false)

  const is700Width = useMediaQuery("(max-width: 700px)")
  const is600Width = useMediaQuery("(max-width: 600px)")

  const [chainId, setChainId] = useState<number>(0)
  const [gameInfo, setGameInfo] = useState<Record<string, any>>([])
  const [gameContractInfo, setGameContractInfo] = useState<Record<string, any>>([])
  const [packageList, setPackageList] = useState<PackageRes[]>([])
  // const [trialablePackageList, setTrialablePackageList] = useState<PackageRes[]>([])

  const [showTxLoading, setShowTxLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")

  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])

  // 统计可试玩的 NFT package
  const trialablePackageList = useMemo(() => {
    return packageList.filter(item => Number(timestamp) > Number(item.expires))
  }, [packageList])

  useEffect(() => {
    if (!showTxLoading) setTxHash("")
  }, [showTxLoading])

  const { run: queryGameInfo } = useRequest(getGameInfo, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setGameInfo(data)
      setChainId(data?.game_chains[0]?.chain_id)
    }
  })

  const [queryGamePackages, { loading }] = useLazyQuery(GET_GAME_PACKAGES, {
    variables: {
      gameId: router?.query?.uuid
    },
    // TODO: 此处需要根据游戏所处链来调用不同的 graph 服务
    client: goerliGraph,
    onCompleted({ game }) {
      console.log(game)
      const { packages, ...rest } = game
      setGameContractInfo({ ...rest })
      setPackageList(packages)
    }
  })

  useEffect(() => {
    // 根据路由参数，获取当前游戏信息
    if (router?.query?.uuid) {
      queryGameInfo({ game_id: router?.query?.uuid as string })
      queryGamePackages()
    }
  }, [router])

  return <Box className={styles.gameBox}>
    <Head>
      <title>Games | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.topCover}>
      <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xhds6ikrj20zo0ibtcv.jpg" layout='fill' objectFit='cover' />
    </Box>
    <Box className={styles.gameInfoBox}>
      <GameInfo gameInfo={gameInfo} />
    </Box>
    {
      is700Width ?
        <Box className={styles.rewardMobileBox}>
          <Box className={styles.cardHeader}>
            <Typography variant='h4'>Reward:</Typography>
            <img src={REWARD_ICON} />
          </Box>
          <Typography className={styles.rewardDesc}>You can have more rights after upgrading in the future;</Typography>
          <Typography className={styles.rewardVal}>200U / 3D <img src={MONEY_ICON} /></Typography>
        </Box>
        :
        <Box className={styles.rewardBox}>
          <Typography variant='h4'>Rewards</Typography>
          <Box className={styles.rewardItem}>
            <Box className={styles.rewardName}>
              <Box className={styles.rewardIcon}>
                <Image src={REWARD_ICON} layout="fill" />
              </Box>
              <Typography>Continue to rent after the trial to get rewards during the trial.</Typography>
            </Box>
            <Box className={styles.rewardValue}>
              <Typography>{gameInfo?.reward}</Typography>
            </Box>
          </Box>
        </Box>
    }
    {
      is600Width ?
        <Box className={styles.btnMobileBox}>
          <Box className={styles.gameStrategyBtn}>Game Strategy</Box>
          <Box className={styles.trialBtn}>Start Free Trial</Box>
        </Box>
        :
        <Box className={styles.btnBox}>
          <Box className={styles.trialBtn} onClick={() => setShowQuickTrialModal(true)}> Start Free Trial </Box>
          {/* TODO: 点击后，滚动到指定位置 */}
          <Box className={styles.downIcon} onClick={() => { }}>
            <KeyboardDoubleArrowDownOutlinedIcon />
          </Box>
        </Box>
    }


    <Box className={styles.cardBox}>
      <Box className={styles.cardContent}>
        <Typography variant='h3'>All Items</Typography>
        <Typography variant='h4'>Choose your own favorite NFT to trial.</Typography>
        <TxLoading.Provider value={{ txHash, setTxHash, showTxLoading, setShowTxLoading }}>
          <Box className={styles.cardList}>
            {
              loading ? <>
                <TrialNFTCardSkeleton />
                <TrialNFTCardSkeleton />
                <TrialNFTCardSkeleton />
                <TrialNFTCardSkeleton />
                <TrialNFTCardSkeleton />
                <TrialNFTCardSkeleton />
                <TrialNFTCardSkeleton />
                <TrialNFTCardSkeleton />
              </> : packageList.map((item, index) => <TrialNFTCard key={index} chainId={chainId} packageInfo={item} />)
            }
          </Box>
        </TxLoading.Provider>

      </Box>
    </Box>
    <QuickTrialNFT
      showModal={showQuickTrialModal}
      setShowModal={setShowQuickTrialModal}
      packageList={trialablePackageList}
      chainId={chainId}
    />
    {/* <TrialSuccessModal showModal={showSuccessModal} setShowModal={setShowSuccessModal} /> */}

    <ContractTxLoading txHash={txHash} showModal={showTxLoading} />
  </Box>
}

Game.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Game

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getAllGamesInfo()
  const gamePaths = data.map((item: any) => ({ params: { uuid: item.game_id } }))

  return {
    paths: gamePaths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../../i18n/${locale}.json`)).default
    }
  }
}