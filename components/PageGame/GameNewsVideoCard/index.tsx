import { Box, Typography } from "@mui/material";
import { BADGE_ICON } from "constants/static";
import Image from "next/image";
import React from "react";
import styles from './styles.module.scss'

interface GameNewsVideoCardProps {

}

const GameNewsVideoCard: React.FC<GameNewsVideoCardProps> = (props) => {
  const { } = props

  return <Box className={styles.videoCard}>
    <Box className={styles.videoContent}>
      <iframe src="https://www.youtube.com/embed/d1X3ltSsQeQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </Box>
    <Box className={styles.videoInfo}>
      <Box className={styles.videoPoster}>
        <Typography>Dark Throne Offical</Typography>
        <Box className={styles.iconBox}>
          <Image src={BADGE_ICON} layout="fill" />
        </Box>
      </Box>
      <Typography className={styles.videoTitle}>
        Sorceress&lsquo; got this, YOU got this. Have a wonderful week, Heroes!
        Sorceress&lsquo; got this, YOU got this. Have a wonderful week, Heroes!
      </Typography>
    </Box>
  </Box>
}

export default GameNewsVideoCard