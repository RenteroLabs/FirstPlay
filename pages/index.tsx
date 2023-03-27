import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { Box, Typography, useMediaQuery } from '@mui/material'
import styles from '../styles/home.module.scss'
import Image from "next/image";
import HotGames from "@/components/PageHome/HotGames";
import ComingGames from "@/components/PageHome/ComingGames";
import Support from "@/components/PageHome/Support";
import GameStrategy from "@/components/PageHome/GameStrategy";
import GudeStep from "@/components/PageHome/GuideStep";
import TrialGame from "@/components/PageHome/TrialingGame";
import { getAllGamesInfo, getHomeData } from "services/home";
import { useTranslations } from "next-intl";
import { ReactElement, useMemo } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "./_app";
import { reverse } from 'lodash'
import Head from "next/head";
import JoinCommunity from "@/components/PageHome/JoinCommunity";
import RewardGames from "@/components/PageHome/RewardGames";
import { useAccount } from "wagmi";
import { useIsMounted } from "hooks/useIsMounted";
import Partner from "@/components/PageHome/Partners";
import Activities from "@/components/PageHome/Activities"

const FirstPlay: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { hotGames, strategys, comingGames, timestamp, rewardedGames, partnerGames, activityList } = props

  const { address } = useAccount()
  const isMounted = useIsMounted()

  const isMiddleSize = useMediaQuery("(max-width: 900px)")
  const isMobileSize = useMediaQuery("(max-width: 450px)")
  const is600Size = useMediaQuery("(max-width: 600px)")
  const t = useTranslations('Index.Contact')

  const coverSize = useMemo(() => {
    if (isMobileSize) return 375
    if (isMiddleSize) return 900
    return 1920
  }, [isMiddleSize, isMobileSize])

  return <Box>
    <Head>
      <title>FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.coverBox}>
      {coverSize === 1920 && <Image priority src={`/headerCover1920.jpg`} layout="fill" objectFit="cover" />}
      {coverSize === 900 && <Image priority src={`/headerCover900.jpg`} layout="fill" objectFit="cover" />}
      {coverSize === 375 && <Image priority src={`/headerCover375.jpg`} layout="fill" objectFit="cover" />}
    </Box>
    {
      isMounted && address &&
      <TrialGame />
    }
    <RewardGames timestamp={timestamp} rewardGames={rewardedGames} />
    {!isMiddleSize && <JoinCommunity />}

    <Box className={styles.mainBox}>
      {is600Size && <Activities activityList={activityList} />}
      <HotGames hotGames={hotGames} timestamp={timestamp} />
      <GameStrategy gameStrategy={strategys} />
      {/* <ComingGames comingGames={comingGames} /> */}
      {is600Size && <Partner gameList={partnerGames} />}
      <Support />
    </Box>
    {/* <Box className={styles.contactUs}>
      <Typography variant="h3">{t('title')}</Typography>
      <Typography>
        {t.rich('subTitle', {
          maillink: (children) => <a target="__blank" href="mailto:business@firstplay.app"><span>{children}</span></a>
        })}
      </Typography>
    </Box> */}
  </Box>
}

FirstPlay.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default FirstPlay

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  // 获取首页数据
  let result
  try {
    result = await getHomeData()
  } catch (err) {
    console.log(err)
  }
  const { popular_games = [], banners = [], rewarded_games = [], strategies = [], upcoming_games = [] } = result?.data || {}


  // 获取所有游戏数据
  const { data } = await getAllGamesInfo()
  const partnerList = data?.map(({ name, logo }: any) => ({ name, logo }))
  // console.log(partnerList)
  return {
    props: {
      // hotGames: reverse(popular_games),
      hotGames: popular_games,
      comingGames: upcoming_games,
      strategys: strategies,
      rewardedGames: rewarded_games,

      // partnerGames
      partnerGames: partnerList,

      activityList: [
        {
          "title": "PLAY MORE AND PAY LESS",
          "description": "We're celebrating our multiple award WINS with you, Mortals! 25% rebate in $GODS on all pack purchases begins 𝗡𝗢𝗪 - for 1 week only ",
          "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/activity/Gods+Unchained.jpg",
          "time_range": "2023/03/10~2023/03/16",
          "link": "https://twitter.com/GodsUnchained/status/1634011199082774531?s=20",
          "steps": [],
          "status": "on"
        },
        {
          "title": "Airdrop reward $800 + 150 MATIC wait for you",
          "description": "Participate in Twitter activity, follow twitters, like&RT, tag friends.You will get airdrop rewards",
          "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/activity/Oil+War.jpg",
          "time_range": "Until 2023/03/21 21:00",
          "link": "https://twitter.com/goodfriend0906/status/1631879293319127041?s=20",
          "steps": [],
          "status": "on"
        }
      ],


      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default,
      timestamp: new Date().getTime()
    }
  }
}