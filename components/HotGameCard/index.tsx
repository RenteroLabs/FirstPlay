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
    cacheKey: gameInfo?.game_id,
    staleTime: 1000 * 60 * 60 * 12, // 缓存 12 小时
    onSuccess: ({ data = [] }) => {
      setCollectionData(data[0]?.attributes || {})
    }
  })

  useEffect(() => {
    run({ gameId: gameInfo?.GameUUID })
  }, [gameInfo])

  return <Link href={`/game/${gameInfo?.GameUUID}`} target="_blank" >
    <Box className={styles.cardBox}>
      <Box className={styles.gameBase}>
        <Box className={styles.gameLogo}>
          <img src={`${gameInfo?.logo?.data?.attributes?.url}?timestamp=${timestamp}`} />
        </Box>
        <Box className={styles.gameDetail}>
          <Typography variant="h3">{gameInfo?.GameName}</Typography>
          <Box className={styles.tagList}>
            {
              gameInfo?.types?.map((item: string, index: number) =>
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