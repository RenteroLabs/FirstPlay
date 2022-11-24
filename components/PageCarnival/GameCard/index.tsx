import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from './style.module.scss'
import classNames from 'classnames/bind'
import { REWARD_ACTIVE_ICON } from "constants/static";
import * as ga from '../../../util/ga'

const cx = classNames.bind(styles)

interface GameCardProps {
  gameInfo: Record<string, any>
  isBig?: boolean
}

const CarnivalGameCard: React.FC<GameCardProps> = (props) => {
  const { isBig = false, gameInfo } = props

  const sendTrialGameEvent = () => {
    ga.event({ action: "click", params: { event_name: 'chooseGame' } })
  }

  const handleTrialGame = () => {
    // 发送 ga 事件
    // sendTrialGameEvent()
    // 跳转至游戏详情页
    window.open(`/game/${gameInfo?.game_id}`)
  }


  return <Box className={cx({
    gameCard: true,
    bigStyle: isBig
  })}>

    <Box className={styles.gameCover}>
      <Image
        src={gameInfo.cover} layout="fill" objectFit="cover" quality={100}
        loader={({ src }) => src} />
      <Box className={styles.gameLogo}>
        <Image src={gameInfo.logo} layout="fill" quality={100} />
      </Box>
      <Box className={styles.gameTags}>
        {
          gameInfo?.types?.map((item: string, index: number) => <Box key={index} className={styles.gameTag} >{item}</Box>)
        }
        {
          gameInfo?.platforms?.map((item: string, index: number) => <Box key={index} className={styles.gameTag} >{item}</Box>)
        }
      </Box>
    </Box>

    <Box className={styles.gameContent}>
      <Box className={styles.gameTitle}>
        <Typography variant="h3">{gameInfo?.name}</Typography>
        <Box className={styles.rewardList}>
          <Box className={styles.gameRewards}><Image src={REWARD_ACTIVE_ICON} layout="fill" /></Box>
          <Typography className={styles.rewardNum}>+{gameInfo?.medal}</Typography>
        </Box>
      </Box>

      <Box className={styles.rewardDescList}>
        {
          gameInfo?.requirements?.map((item: string, index: number) => <Box key={index} className={styles.taskDesc}>
            <Typography>{item}</Typography></Box>)
        }
        {
          gameInfo?.gifts?.map((item: string, index: number) => <Box key={index} className={styles.rewardDesc}><Typography>{item}</Typography></Box>)
        }
      </Box>
    </Box>

    <Box className={styles.trialBtn} onClick={handleTrialGame}>
      Start Trial
    </Box>
  </Box>
}


export default CarnivalGameCard