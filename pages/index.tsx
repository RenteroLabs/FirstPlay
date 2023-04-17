import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { Box, Typography, useMediaQuery } from '@mui/material'
import styles from '../styles/home.module.scss'
import Image from "next/image";
import HotGames from "@/components/PageHome/HotGames";
import Support from "@/components/PageHome/Support";
import GameStrategy from "@/components/PageHome/GameStrategy";
import GudeStep from "@/components/PageHome/GuideStep";
import TrialGame from "@/components/PageHome/TrialingGame";
import { getAllGamesInfo } from "services/home";
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
import TopBanner from "@/components/PageHome/TopBanner";
import { getAllHotGameList, getHomeConfigData } from "services/cms";
import WeeklyRank from "@/components/PageHome/WeeklyRank";

const FirstPlay: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { hotGames, strategys, timestamp, rewardedGames, partnerGames, activityList, weeklynews, bannerList } = props

  const { address } = useAccount()
  const isMounted = useIsMounted()

  const is1200Size = useMediaQuery("(max-width: 1200px)")

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
      {
        bannerList.map((item: { coverlarge: any; }, index: number) => {
          const { coverlarge } = item
          const imageUrl = coverlarge?.data?.attributes?.url
          return <link
            key={index}
            rel="preload"
            href={imageUrl}
            as="image"
            media="(min-width: 601px)"
          />
        })
      }
    </Head>
    <TopBanner bannerList={bannerList} />
    {/* <Box className={styles.coverBox}>
      {coverSize === 1920 && <Image priority src={`/headerCover1920.jpg`} layout="fill" objectFit="cover" />}
      {coverSize === 900 && <Image priority src={`/headerCover900.jpg`} layout="fill" objectFit="cover" />}
      {coverSize === 375 && <Image priority src={`/headerCover375.jpg`} layout="fill" objectFit="cover" />}
    </Box> */}
    {
      isMounted && address &&
      <TrialGame />
    }
    <RewardGames timestamp={timestamp} rewardGames={rewardedGames} />
    <Activities activityList={activityList} />

    {!isMiddleSize && <JoinCommunity />}

    <Box className={styles.mainBox}>
      <HotGames hotGames={hotGames} timestamp={timestamp} />
      {!is1200Size && <WeeklyRank weeklyRankList={weeklynews} />}
      <GameStrategy gameStrategy={strategys} />
      <Partner gameList={partnerGames} />
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
  // 获取首页 CMS 配置数据
  let homeCMSConfig, partnerData
  try {
    homeCMSConfig = await getHomeConfigData()
    partnerData = await getAllHotGameList({ gameCount: 30})
  } catch (err) {
    console.log(err)
  }

  let {
    article_collections: workthroughList,
    WeekItems,
    BannerItems,
    activities,
    game_infos,
    tasks
  } = homeCMSConfig?.data?.attributes

  return {
    props: {
      hotGames: game_infos?.data || [],

      strategys: workthroughList?.data || [],

      rewardedGames: tasks?.data || [],

      // TODO: partnerGames
      partnerGames: partnerData?.data || [],

      activityList: activities?.data || [],

      // weekly news
      weeklynews: WeekItems,

      // banner list
      bannerList: BannerItems,

      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default,
      timestamp: new Date().getTime()
    }
  }
}