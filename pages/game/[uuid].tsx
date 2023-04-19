
import { Box, Typography, useMediaQuery } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import styles from "../../styles/game.module.scss"
import Layout from '@/components/Layout'
import { NextPageWithLayout } from '../_app'
import GameInfo from '@/components/GameInfo'
import { MONEY_ICON, REWARD_ACTIVE_ICON, REWARD_ICON } from 'constants/static'
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import TrialNFTCard from '@/components/TrialNFTCard'
import TrialNFTCardSkeleton from '@/components/TrialNFTCard/TrialNFTCardSkeleton'
import QuickTrialNFT from '@/components/PageModals/quickTrialNFT'
import Head from 'next/head'
import { useRequest } from 'ahooks'
import { getAllGamesInfo, getGameInfo } from 'services/home'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_GAME_PACKAGES } from 'services/documentNode'
import { goerliGraph } from 'services/graphql'
import { PackageRes } from 'types/graph'
import ContractTxLoading from '@/components/PageModals/ContractTxLoading'
import { createContext } from 'react'
import { isEmpty, sumBy } from 'lodash'
import { useAccount, useContractRead } from 'wagmi'
import { MARKET_CONTRACT } from 'constants/contract'
import { FIRSTPLYA_MARKET_ABI } from 'constants/abi'
import { checkOwnPassNFT } from 'services/web3'
import Link from 'next/link'
import { queryCarnivalGamesInfo } from 'services/carnival'
import { Carnival_Games, SUPPORT_LANGUAGE } from 'constants/index'
import CampaignIcon from '@mui/icons-material/Campaign';
import { useTranslations } from "next-intl";
import { useIsMounted } from 'hooks/useIsMounted'
import GameNewsVideoCard from '@/components/PageGame/GameNewsVideoCard'
import GameNewsTwitterCard from '@/components/PageGame/GameNewsTwitterCard'
import { Tabs } from 'antd'
import HomeTab from '@/components/PageGame/GameHomeTab.tsx/HomeTab'
import GameNewsTab from '@/components/PageGame/GameNewsTab.tsx'
import GameProxyTab from '@/components/PageGame/GameProxyTab'

// 图片预览组件 CSS 样式
import 'react-photo-view/dist/react-photo-view.css';

import classNames from 'classnames/bind'
import { getAllHotGameList, getBountiesByGame, getGameBaseInfo, getUserArticleCollection } from 'services/cms'

const cx = classNames.bind(styles)

export interface TxLoadingParams {
  txHash: string,
  setTxHash: (arg: string) => any
  showTxLoading: boolean,
  setShowTxLoading: (arg: boolean) => any
}

export const TxLoading = createContext<TxLoadingParams>({ txHash: "", setTxHash: (arg) => { }, showTxLoading: false, setShowTxLoading: (arg) => { } })

export const PackageListRefresh = createContext<{ refreshList: (arg?: any) => any }>({ refreshList: () => { } })

export interface UserInfoParams {
  ownPassNFt: boolean,
  isActived: boolean,
}
export const UserInfo = createContext<UserInfoParams>({ ownPassNFt: false, isActived: false })

// 游戏详情页
const Game: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ init_timestamp, gameBase, locale }) => {
  const router = useRouter()
  const { address } = useAccount()
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showQuickTrialModal, setShowQuickTrialModal] = useState<boolean>(false)

  const t = useTranslations('Game')

  const is700Width = useMediaQuery("(max-width: 700px)")
  const is600Width = useMediaQuery("(max-width: 600px)")

  const [chainId, setChainId] = useState<number>(0)
  const [gameContractInfo, setGameContractInfo] = useState<Record<string, any>>([])
  const [packageList, setPackageList] = useState<PackageRes[]>([])

  const [showTxLoading, setShowTxLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")

  const [ownPassNFt, setOwnPassNFT] = useState<boolean>(false)

  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])

  const isMounted = useIsMounted()

  const [taskType, setTaskType] = useState<'Ongoing' | 'Ended'>('Ongoing')

  /**
   * Carnival Part Start
   */
  const [carnivalGame, setCarnivalGame] = useState<Record<string, any>>({})

  const [bountiesList, setBountiesList] = useState<Record<string, any>[]>([])

  useEffect(() => {
    if (router.query.taskType) {
      // @ts-ignore
      setTaskType(router.query.taskType)
    }
  }, [router.query?.taskType])

  useEffect(() => {
    if (router.query?.uuid) {
      getCarnivalGameInfo({ address: address || '0x00', game_id: router.query?.uuid as string })

      queryBountiesList({
        gameId: router.query?.uuid as string,
        status: !(taskType === 'Ended'),
        locale: locale
      })
    }

    getUserArticleCollection({ gameId: router.query?.uuid as string })
  }, [router.query?.uuid, address, locale, taskType])

  const { run: getCarnivalGameInfo } = useRequest(queryCarnivalGamesInfo, {
    manual: true,
    onSuccess: ({ data }) => {
      setCarnivalGame(data)
    }
  })

  const { run: queryBountiesList } = useRequest(getBountiesByGame, {
    manual: true,
    onSuccess: ({ data }) => {
      let content
      if (locale === 'en-US') {
        content = data
      } else {
        content = data.map((item: Record<string, any>) => item?.attributes?.localizations?.data[0])
      }
      setBountiesList(content || [])
    }
  })

  /**
   * Carnival Part End
   */











  // 统计可试玩的 NFT package
  const trialablePackageList = useMemo(() => {
    return packageList.filter(item => Number(timestamp) > Number(item.expires))
  }, [packageList])

  // 判断用户在当前游戏链是否激活试玩权限
  const { data: isActived } = useContractRead({
    // @ts-ignore
    address: MARKET_CONTRACT[chainId],
    contractInterface: FIRSTPLYA_MARKET_ABI,
    functionName: 'playerWhitelist',
    chainId: chainId,
    args: [address],
    enabled: Boolean(address),
  })

  // 判断用户持有 NFT 数量
  const { run: queryPassNFT } = useRequest(checkOwnPassNFT, {
    manual: true,
    onSuccess: ({ totalCount }) => {
      if (totalCount > 0) {
        setOwnPassNFT(true)
      }
    }
  })

  useEffect(() => {
    if (address) {
      queryPassNFT(address)
    }
  }, [address])

  useEffect(() => {
    if (!showTxLoading) setTxHash("")
  }, [showTxLoading])

  // 更新游戏链数据
  // useEffect(() => {
  //   if (gameInfo && gameInfo?.game_chains) {
  //     setChainId(gameInfo?.game_chains[0]?.chain_id)
  //   }
  // }, [gameInfo])

  // 获取当前游戏所有 NFT Packages
  // const { loading, refetch: queryGamePackages } = useQuery(GET_GAME_PACKAGES, {
  //   variables: {
  //     gameId: gameInfo.game_id || router?.query?.uuid
  //   },
  //   // TODO: 此处需要根据游戏所处链来调用不同的 graph 服务
  //   client: goerliGraph,
  //   onCompleted({ game }) {
  //     const { packages, ...rest } = game
  //     setGameContractInfo({ ...rest })
  //     setPackageList(packages)
  //   }
  // })


  return <UserInfo.Provider
    value={{ isActived: isActived as unknown as boolean, ownPassNFt }}>
    <TxLoading.Provider value={{ txHash, setTxHash, showTxLoading, setShowTxLoading }}>
      {/* // @ts-ignore */}
      {/* <PackageListRefresh.Provider value={{ refreshList: queryGamePackages }}> */}
      <Box className={styles.gameBox}>
        <Head>
          <title>Games | FirstPlay {gameBase?.GameName && `| ${gameBase?.GameName}`}</title>
          <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
          <meta
            property="og:title"
            content={`Play ${gameBase?.GameName} on FirstPlay`}
          />
          <meta
            property="og:description"
            content={gameBase?.Description}
          />
          <meta
            property="og:image"
            content={gameBase?.cover?.data?.attributes?.url || gameBase?.background?.data?.attributes?.url}
          />
          {isMounted && <meta
            property="og:url"
            content={window.location.href}
          />}
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="icon" href="/favicon.ico" />
          {/* <script async src="https://platform.twitter.com/widgets.js"></script> */}
        </Head>
        <Box className={styles.topCover}>
          {gameBase?.background?.data &&
            <Image
              src={gameBase?.background?.data?.attributes?.url}
              layout='fill'
              objectFit='cover'
              quality={100}
              loader={({ src }) => `${src}?timestamp=${init_timestamp}`}
            />}
        </Box>
        <Box className={styles.gameInfoBox}>
          <GameInfo gameInfo={gameBase} timestamp={init_timestamp} />
        </Box>

        {<Box className={styles.gameContent}>
          <Tabs className={cx({ tabsBox: true, mobileTabsBox: is600Width, pcTabsStyle: !is600Width })} items={[
            {
              key: '1',
              label: t('homeTab'),
              children: <HomeTab
                gameBase={gameBase}
                gameBounties={bountiesList}
                gameId={router?.query?.uuid as string}
              />
            }, {
              key: "2",
              label: t("newsTab"),
              children: <GameNewsTab
                twitterHandler={gameBase.TwitterLink}
                videoList={gameBase?.Videos}
              />
            }, {
              key: "3",
              label: t('proplayTab'),
              children: <GameProxyTab proxyPlayList={gameBase?.pro_players?.data || []} />
            }
          ]}>
          </Tabs>
        </Box>}

        {/* {!isCarnivalGame && !is600Width &&
            <Box className={styles.gameStrategy}>
              <Box className={styles.comingSoonTip}>
                <CampaignIcon sx={{ mr: '2rem' }} fontSize="large" /> {t('comingSoonTip')}
              </Box>
            </Box>} */}

        {/* {
            is700Width ?
              <Box className={styles.rewardMobileBox}>
                <Box className={styles.cardHeader}>
                  <Typography variant='h4'>Reward:</Typography>
                  <img src={REWARD_ICON} />
                </Box>
                <Typography className={styles.rewardDesc}>{gameInfo?.reward_requirement}</Typography>
                <Typography className={styles.rewardVal}>{gameInfo?.reward} <img src={MONEY_ICON} /></Typography>
              </Box>
              :
              <Box className={styles.rewardBox}>
                <Typography variant='h4'>Rewards</Typography>
                <Box className={styles.rewardItem}>
                  <Box className={styles.rewardName}>
                    <Box className={styles.rewardIcon}>
                      <Image src={REWARD_ICON} layout="fill" />
                    </Box>
                    <Typography>{gameInfo?.reward_requirement}</Typography>
                  </Box>
                  <Box className={styles.rewardValue}>
                    <Typography>{gameInfo?.reward}</Typography>
                  </Box>
                </Box>
              </Box>
          } */}
        {/* {
            is600Width ?
              <Box className={styles.btnMobileBox}>
                <Box className={styles.gameStrategyBtn}>Game Strategy</Box>
                {
                  (isEmpty(trialablePackageList) && !loading) ?
                    <Box className={styles.noTrialBtn}>
                      No NFT Available
                    </Box> :
                    <Box className={styles.trialBtn} onClick={() => setShowQuickTrialModal(true)}>Start Free Trial</Box>
                }
              </Box>
              :
              <Box className={styles.btnBox}>
                {
                  (isEmpty(trialablePackageList) && !loading) ?
                    <Box className={styles.noTrialBtn}>No NFT available yet</Box>
                    :
                    <Box className={styles.trialBtn} onClick={() => setShowQuickTrialModal(true)}> Start Free Trial </Box>
                }

                <Box className={styles.downIcon} onClick={() => { }}>
                  <KeyboardDoubleArrowDownOutlinedIcon />
                </Box>
              </Box>
          } */}

        {/* 
          <Box className={styles.cardBox}>
            <Box className={styles.cardContent}>
              <Typography variant='h3'>All Items</Typography>
              <Typography variant='h4'>Choose your own favorite NFT to trial.</Typography>

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
                  </> : packageList.map((item, index) =>
                    <TrialNFTCard
                      key={index}
                      chainId={chainId}
                      packageInfo={item}
                    />)
                }
              </Box>
            </Box>
          </Box> */}
        <QuickTrialNFT
          showModal={showQuickTrialModal}
          setShowModal={setShowQuickTrialModal}
          packageList={trialablePackageList}
          chainId={chainId}
        />
        <ContractTxLoading txHash={txHash} showModal={showTxLoading} />
      </Box>
      {/* </PackageListRefresh.Provider> */}
    </TxLoading.Provider>
  </UserInfo.Provider>
}

Game.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Game

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getAllHotGameList({})

  const gamePaths = data?.map((item: any) => ({ params: { uuid: item?.attributes?.GameUUID } }))

  let allLanguageGamePaths: { params: any }[] = []

  SUPPORT_LANGUAGE.forEach((language) =>
    gamePaths?.forEach((item: Record<string, any>) => {
      allLanguageGamePaths.push({
        params: { uuid: item.params.uuid },
        // @ts-ignore
        locale: language
      })
    })
  )

  return {
    paths: allLanguageGamePaths,
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
  // const res = await queryCarnivalGamesInfo({ address: "0x00", game_id: params?.uuid as string })

  const gameBase = await getGameBaseInfo({ gameId: params?.uuid as string, locale: locale as string })
  // console.log(gameBase)

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../../i18n/${locale}.json`)).default,
      // gameInfo: res?.data,
      gameBase: gameBase || {},
      locale: locale,
      init_timestamp: new Date().getTime()
    }
  }
}