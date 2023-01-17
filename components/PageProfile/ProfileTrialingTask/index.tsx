import { Box, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import Image from "next/image";

interface TrialingTask {

}

const ProfileTrialingTask: React.FC<TrialingTask> = (props) => {
  const { } = props

  return <Box className={styles.trialingTask}>
    <Box className={styles.taskInfo}>
      <Box className={styles.starLabelIcon}>
        <Image src="/reward_game_card_star_label.png" layout="fill" />
      </Box>
      <Typography variant="h4">Dark Throne</Typography>

      <Box className={styles.divider}></Box>
      <Typography className={styles.taskName}>
        <span>Task: </span>
        Clear the first 10 stages with a aa aaa new accountadsfd
      </Typography>
      <Typography className={styles.rewardInfo}>
        <span>Rewards: </span>
        Get an NFT worth $1~$60
      </Typography>
    </Box>
    <Box className={styles.gameLogo}>
      <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Gods-Unchained.jpg" layout="fill" />
    </Box>
  </Box>
}

export default ProfileTrialingTask