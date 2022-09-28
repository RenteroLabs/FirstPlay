import { NextPage } from "next";
import { Box, Typography } from '@mui/material'
import styles from '../styles/home.module.scss'
import Image from "next/image";
import HotGames from "@/components/PageHome/HotGames";
import ComingGames from "@/components/PageHome/ComingGames";
import Support from "@/components/PageHome/Support";
import GameStrategy from "@/components/PageHome/GameStrategy";
import GudeStep from "@/components/PageHome/GuideStep";

const FirstPlay: NextPage = () => {

  return <Box>
    <Box className={styles.coverBox}>
      <Image src="/headerCover1.png" alt="cover image" layout="fill" objectFit="contain" />
    </Box>
    <GudeStep />

    <Box className={styles.mainBox}>
      <HotGames />
      <GameStrategy />
      <ComingGames />
      <Support />
    </Box>
    <Box className={styles.contactUs}>
      <Typography variant="h3">Contact Us</Typography>
      <Typography>Please feel free to contact us via support@rentero.io  for more support.</Typography>
    </Box>
  </Box>
}

export default FirstPlay