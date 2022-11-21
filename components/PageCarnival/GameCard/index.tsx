import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from './style.module.scss'
import classNames from 'classnames/bind'
import { REWARD_ACTIVE_ICON } from "constants/static";
import * as ga from '../../../util/ga'

const cx = classNames.bind(styles)

interface GameCardProps {

  isBig?: boolean
}

const CarnivalGameCard: React.FC<GameCardProps> = (props) => {
  const { isBig = false } = props

  const sendTrialGameEvent = () => {
    ga.event({ action: "click", params: { event_name: 'chooseGame' } })
  }

  const handleTrialGame = () => {
    // 发送 ga 事件
    sendTrialGameEvent()

    // 跳转至游戏详情页

  }

  return <Box className={cx({
    gameCard: true,
    bigStyle: isBig
  })}>

    <Box className={styles.gameCover}>
      <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/CryptoBlades.jpg" layout="fill" objectFit="cover" />
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
        <Box className={styles.rewardList}>
          <Box className={styles.gameRewards}><Image src={REWARD_ACTIVE_ICON} layout="fill" /></Box>
          <Typography className={styles.rewardNum}>+3</Typography>
        </Box>
      </Box>
      <Box className={styles.gameRewardDesc}>
        Users who participate in the event can get a ruby card worth 20U!
      </Box>
    </Box>

    <Box className={styles.trialBtn} onClick={handleTrialGame}>
      Start Trial
    </Box>
  </Box>
}


export default CarnivalGameCard