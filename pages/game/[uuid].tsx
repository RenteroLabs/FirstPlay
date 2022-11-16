
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
import { isEmpty } from 'lodash'
import { useAccount, useContractRead } from 'wagmi'
import { MARKET_CONTRACT } from 'constants/contract'
import { FIRSTPLYA_MARKET_ABI } from 'constants/abi'
import { checkOwnPassNFT } from 'services/web3'
import CarnivalRewardItem from '@/components/PageCarnival/RewardItem'

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
const Game: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ gameInfo }) => {

  const router = useRouter()
  const { address } = useAccount()
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showQuickTrialModal, setShowQuickTrialModal] = useState<boolean>(false)

  const is700Width = useMediaQuery("(max-width: 700px)")
  const is600Width = useMediaQuery("(max-width: 600px)")

  const [chainId, setChainId] = useState<number>(0)
  const [gameContractInfo, setGameContractInfo] = useState<Record<string, any>>([])
  const [packageList, setPackageList] = useState<PackageRes[]>([])

  const [showTxLoading, setShowTxLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")

  const [ownPassNFt, setOwnPassNFT] = useState<boolean>(false)

  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])

  // 统计可试玩的 NFT package
  const trialablePackageList = useMemo(() => {
    return packageList.filter(item => Number(timestamp) > Number(item.expires))
  }, [packageList])

  // 判断用户在当前游戏链是否激活试玩权限
  const { data: isActived } = useContractRead({
    addressOrName: MARKET_CONTRACT[chainId],
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

  useEffect(() => {
    if (gameInfo) {
      setChainId(gameInfo?.game_chains[0]?.chain_id)
    }
  }, [gameInfo])

  // 获取当前游戏所有 NFT Packages
  const { loading, refetch: queryGamePackages } = useQuery(GET_GAME_PACKAGES, {
    variables: {
      gameId: gameInfo.game_id || router?.query?.uuid
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

  return <UserInfo.Provider
    value={{ isActived: isActived as unknown as boolean, ownPassNFt }}>
    <TxLoading.Provider value={{ txHash, setTxHash, showTxLoading, setShowTxLoading }}>
      {/* // @ts-ignore */}
      <PackageListRefresh.Provider value={{ refreshList: queryGamePackages }}>
        <Box className={styles.gameBox}>
          <Head>
            <title>Games | FirstPlay</title>
            <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Box className={styles.topCover}>
            {gameInfo?.cover && <Image src={gameInfo?.cover} layout='fill' objectFit='cover' />}
          </Box>
          <Box className={styles.gameInfoBox}>
            <GameInfo gameInfo={gameInfo} />
          </Box>
          {/* Carnival activity game detail style */}
          <Box className={styles.carnivalRewrads}>
            <Box className={styles.cardHeader}>
              <Typography>Rewards</Typography>
              <Box className={styles.mediaBox}>
                <Box className={styles.rewardIcon}>
                  <Image src={REWARD_ACTIVE_ICON} layout="fill" />
                </Box>
                3 Medals
              </Box>
            </Box>

            <Typography className={styles.rewardDesc}>
              After completing the corresponding task, you can register the address. After completing the verification, the reward will be sent to the address at 12:00 every day, and the game carnival medal reward will be obtained at the same time.
            </Typography>
            <CarnivalRewardItem
              index={1}
              medalNum={1}
              isClaimed={true}
              reward="Complete the game registration and get a ruby card reward worth 2U"
              claimLink=""
            />
            <CarnivalRewardItem
              index={2}
              medalNum={1}
              isClaimed={false}
              reward="Complete the game registration and get a ruby card reward worth 2U"
              claimLink=""
            />
          </Box>
          <Box className={styles.gameStrategy}>
            <Typography variant='h4'>Description</Typography>
            <Box className={styles.strategyDesc}>
              to download the game, or directly search for &#34;Big Time&#34; in the App Store to complete the downloadComplete the game download. Go to https://bigtime.gg/ to download the game, or directly search for &#34;Big Time&#34; in the App Store to complete the download

              2. Register in the game. After completing the registration, register the address information at the bottom of this page to get a ruby reward worth 20U.
              Register in the game. After completing the registration, register the address information at the bottom of this page to get a ruby reward worth 20U.

              3. Complete the game download. Go to https://bigtime.gg/ to download the game, or directly search for &#34;Big Time&#34; in the App Store to complete the download

              4. Register in the game. After completing the registration, register the address information at the bottom of this page to get a ruby reward worth 20U.
            </Box>
          </Box>

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
      </PackageListRefresh.Provider>
    </TxLoading.Provider>
  </UserInfo.Provider>
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

export const getStaticProps: GetStaticProps = async ({ locale, params }: GetStaticPropsContext) => {

  const res = await getGameInfo({ game_id: params?.uuid as string })

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../../i18n/${locale}.json`)).default,
      gameInfo: res.data
    }
  }
}