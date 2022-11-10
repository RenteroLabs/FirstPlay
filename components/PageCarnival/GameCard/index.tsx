import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from './style.module.scss'

interface GameCardProps {

}


const CarnivalGameCard: React.FC<GameCardProps> = (props) => {
  const { } = props

  return <Box className={styles.gameCard}>

    <Box className={styles.gameCover}>
      <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/CryptoBlades.jpg" layout="fill" />
      <Box className={styles.gameLogo}>
        <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/AxieInfinity.jpg" layout="fill" />
      </Box>
      <Box className={styles.gameTags}>
        <Box className={styles.gameTag}>APP</Box>
        <Box className={styles.gameTag}>RPG</Box>
      </Box>
    </Box>

    <Box className={styles.gameContent}>
      <Box className={styles.gameTitle}>
        <Typography variant="h3">GameName</Typography>
        <Box></Box>
      </Box>
      <Box className={styles.gameRewardDesc}>
        Users who participate in the event can get a ruby card worth 20U!
      </Box>
    </Box>

    <Box className={styles.trialBtn}>
      Start Trial
    </Box>
  </Box>
}


export default CarnivalGameCard