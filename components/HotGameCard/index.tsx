import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from './styles.module.scss'

interface HotGameCardProps {
  gameInfo: Record<string, any>
  timestamp?: number
}

const HotGameCard: React.FC<HotGameCardProps> = (props) => {
  const { gameInfo, timestamp } = props

  // console.log(gameInfo)

  // TODO: 获取游戏攻略集合数据

  return <Link href={`/game/${gameInfo?.game_id}`} target="_blank" >
    <Box className={styles.cardBox}>
      <Box className={styles.gameBase}>
        <Box className={styles.gameLogo}>
          <img src={`${gameInfo?.image}?timestamp=${timestamp}`} />
        </Box>
        <Box className={styles.gameDetail}>
          <Typography variant="h3">{gameInfo?.name}</Typography>
          <Box className={styles.tagList}>
            {
              gameInfo?.game_types.map((item: string, index: number) =>
                <Box className={styles.tagItem} key={index}>{item}</Box>)
            }
          </Box>
          <Typography>3 Tutorials:</Typography>
        </Box>
      </Box>
      <Box className={styles.gameArticleCollection}>
        Community Alpha Gameplay Guide!Community Alpha Gameplay Guide!
      </Box>
    </Box>
  </Link >
}

export default HotGameCard