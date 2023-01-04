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
import { getAllGames } from "services/home";
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

const FirstPlay: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { hotGames, strategys, comingGames, timestamp , rewardedGames} = props

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
      isMounted && (address ?
        <TrialGame /> :
        <GudeStep />)
    }
    <RewardGames timestamp={timestamp} rewardGames={rewardedGames} />
    {!isMiddleSize && <JoinCommunity />}

    <Box className={styles.mainBox}>
      <HotGames hotGames={hotGames} timestamp={timestamp} />
      <GameStrategy gameStrategy={strategys} />
      {/* <ComingGames comingGames={comingGames} /> */}
      <Support />
    </Box>
    <Box className={styles.contactUs}>
      <Typography variant="h3">{t('title')}</Typography>
      <Typography>
        {t.rich('subTitle', {
          maillink: (children) => <a target="__blank" href="mailto:business@firstplay.app"><span>{children}</span></a>
        })}
      </Typography>
    </Box>
  </Box>
}

FirstPlay.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default FirstPlay

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  // 获取首页数据
  const result = await getAllGames()
  const { popular_games = [], banners = [], rewarded_games = [], strategies = [], upcoming_games = [] } = result.data || {}

  return {
    props: {
      // hotGames: reverse(popular_games),
      hotGames: popular_games,
      comingGames: upcoming_games,
      strategys: strategies,
      rewardedGames: rewarded_games,

      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default,
      timestamp: new Date().getTime()
    }
  }
}