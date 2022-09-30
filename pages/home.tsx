import { NextPage } from "next";
import { Box, Typography } from '@mui/material'
import styles from '../styles/home.module.scss'
import Image from "next/image";
import HotGames from "@/components/PageHome/HotGames";
import ComingGames from "@/components/PageHome/ComingGames";
import Support from "@/components/PageHome/Support";
import GameStrategy from "@/components/PageHome/GameStrategy";
import GudeStep from "@/components/PageHome/GuideStep";
import TrialGame from "@/components/PageHome/TrialingGame";

const FirstPlay: NextPage = () => {

  return <Box>
    <Box className={styles.coverBox}>
      <Image src="/headerCover1.png" alt="cover image" layout="fill" objectFit="cover" />
    </Box>
    {/* <GudeStep /> */}
    <TrialGame />

    <Box className={styles.mainBox}>
      <HotGames />
      <GameStrategy />
      <ComingGames />
      <Support />
    </Box>
    <Box className={styles.contactUs}>
      <Typography variant="h3">Contact Us</Typography>
      <Typography>Please feel free to contact us via <a target="__blank" href="mailto:business@firstplay.io"><span>business@firstplay.io</span></a> for more support.</Typography>
    </Box>
  </Box>
}

export default FirstPlay