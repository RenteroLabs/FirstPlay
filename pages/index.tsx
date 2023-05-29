import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { Box, Typography, useMediaQuery } from '@mui/material'
import styles from '../styles/home.module.scss'
import HotGames from "@/components/PageHome/HotGames";
import Support from "@/components/PageHome/Support";
import GameStrategy from "@/components/PageHome/GameStrategy";
import TrialGame from "@/components/PageHome/TrialingGame";
import { useTranslations } from "next-intl";
import { ReactElement, useMemo } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import JoinCommunity from "@/components/PageHome/JoinCommunity";
import RewardGames from "@/components/PageHome/RewardGames";
import { useAccount } from "wagmi";
import { useIsMounted } from "hooks/useIsMounted";
import Partner from "@/components/PageHome/Partners";
import Activities from "@/components/PageHome/Activities"
import TopBanner from "@/components/PageHome/TopBanner";
import { getAllPartnerGames, getHomeConfigData } from "services/cms";
import WeeklyRank from "@/components/PageHome/WeeklyRank";
import GoldReward from "@/components/PageHome/GoldReward";

const FirstPlay: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { hotGames, strategys, timestamp, rewardedGames, partnerGames, activityList, weeklynews, bannerList } = props

  const { address } = useAccount()
  const isMounted = useIsMounted()

  const is1200Size = useMediaQuery("(max-width: 1200px)")
  const is1120Size = useMediaQuery("(max-width: 1120px)")
  const isMiddleSize = useMediaQuery("(max-width: 900px)")
  const t = useTranslations('Index.Contact')

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

    {
      isMounted && address &&
      <TrialGame />
    }
    {
    // !is1120Size && 
    <GoldReward />}
    <RewardGames rewardGames={rewardedGames} />
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
    partnerData = await getAllPartnerGames()
  } catch (err) {
    console.log(err)
  }

  let {
    article_collections,
    WeekItems,
    BannerItems,
    activities,
    game_infos,
    tasks
  } = homeCMSConfig?.data?.attributes

  return {
    props: {
      hotGames: game_infos?.data || [],

      strategys: article_collections?.data || [],

      rewardedGames: tasks?.data || [],

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