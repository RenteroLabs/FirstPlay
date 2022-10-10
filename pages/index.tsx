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
import { getHomeInfo } from "services/home";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const FirstPlay: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { hotGames, strategys, comingGames } = props

  const isMiddleSize = useMediaQuery("(max-width: 900px)")
  const isMobileSize = useMediaQuery("(max-width: 450px)")
  const t = useTranslations('Index.Contact')

  const coverSize = useMemo(() => {
    if (isMobileSize) return 375
    if (isMiddleSize) return 900
    return 1920
  }, [isMiddleSize, isMobileSize])

  return <Box>
    <Box className={styles.coverBox}>
      <Image src={`/headerCover${coverSize}.png`} alt="cover image" layout="fill"  objectFit="cover" />
    </Box>
    <GudeStep />
    {/* <TrialGame /> */}

    <Box className={styles.mainBox}>
      <HotGames hotGames={hotGames} />
      <GameStrategy gameStrategy={strategys} />
      {/* <ComingGames comingGames={comingGames} /> */}
      <Support />
    </Box>
    <Box className={styles.contactUs}>
      <Typography variant="h3">{t('title')}</Typography>
      <Typography>
        {t.rich('subTitle', {
          maillink: (children) => <a target="__blank" href="mailto:business@firstplay.io"><span>{children}</span></a>
        })}
        {/* Please feel free to contact us via <a target="__blank" href="mailto:business@firstplay.io"><span>business@firstplay.io</span></a> for more support. */}
        </Typography>
    </Box>
  </Box>
}

export default FirstPlay


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  // 获取首页数据
  const result = await getHomeInfo()
  const { popular_games = [], banners = [], strategies = [], upcoming_games = [] } = result.data || {}

  return {
    props: {
      hotGames: popular_games,
      comingGames: upcoming_games,
      strategys: strategies,

      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}