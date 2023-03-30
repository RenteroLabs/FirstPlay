import { Box, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUserArticleCollection } from "services/cms";
import styles from './styles.module.scss'

interface HotGameCardProps {
  gameInfo: Record<string, any>
  timestamp?: number
}

const HotGameCard: React.FC<HotGameCardProps> = (props) => {
  const { gameInfo, timestamp } = props

  const [collectionData, setCollectionData] = useState<Record<string, any>>()

  const { run } = useRequest(getUserArticleCollection, {
    manual: true,
    onSuccess: ({ data = [] }) => {
      setCollectionData(data[0]?.attributes || {})
    }
  })

  useEffect(() => {
    run({ gameId: gameInfo?.game_id })
  }, [gameInfo])

  return <Link href={`/game/${gameInfo?.game_id}`} target="_blank" >
    <Box className={styles.cardBox}>
      <Box className={styles.gameBase}>
        <Box className={styles.gameLogo}>
          <img src={`${gameInfo?.logo}?timestamp=${timestamp}`} />
        </Box>
        <Box className={styles.gameDetail}>
          <Typography variant="h3">{gameInfo?.name}</Typography>
          <Box className={styles.tagList}>
            {
              gameInfo?.game_types?.map((item: string, index: number) =>
                <Box className={styles.tagItem} key={index}>{item}</Box>)
            }
          </Box>
          <Typography>{collectionData?.strategy_articles?.data?.length || 0} Tutorials:</Typography>
        </Box>
      </Box>
      <Box className={styles.gameArticleCollection}>
        {collectionData?.CollectionTitle || 'No Collection Title Yet ~'}
      </Box>
    </Box>
  </Link >
}

export default HotGameCard