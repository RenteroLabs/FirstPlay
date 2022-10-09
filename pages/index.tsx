import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Box, Typography } from '@mui/material'
import styles from '../styles/home.module.scss'
import Image from "next/image";
import HotGames from "@/components/PageHome/HotGames";
import ComingGames from "@/components/PageHome/ComingGames";
import Support from "@/components/PageHome/Support";
import GameStrategy from "@/components/PageHome/GameStrategy";
import GudeStep from "@/components/PageHome/GuideStep";
import TrialGame from "@/components/PageHome/TrialingGame";
import { getHomeInfo } from "services/home";

const FirstPlay: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { hotGames, strategys, comingGames } = props
  
  return <Box>
    <Box className={styles.coverBox}>
      <Image src="/headerCover1.png" alt="cover image" layout="fill" objectFit="cover" />
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
      <Typography variant="h3">Contact Us</Typography>
      <Typography>Please feel free to contact us via <a target="__blank" href="mailto:business@firstplay.io"><span>business@firstplay.io</span></a> for more support.</Typography>
    </Box>
  </Box>
}

export default FirstPlay

export const getStaticProps: GetStaticProps = async (context) => {
  // 获取首页数据
  const result = await getHomeInfo()
  const { popular_games = [], banners = [], strategies = [], upcoming_games = [] } = result.data || {}

  return {
    props: {
      hotGames: popular_games,
      comingGames: upcoming_games,
      strategys: strategies
    }
  }
}