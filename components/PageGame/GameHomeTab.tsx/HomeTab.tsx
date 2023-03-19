import CarnivalRewardItem from "@/components/PageCarnival/RewardItem";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import styles from './styles.module.scss';
import { useTranslations } from "next-intl";
import WalkthroughCollection from "@/components/WalkthroughCollection";
import { useRequest } from "ahooks";
import { getUserArticleCollection } from "services/cms";
import { isEmpty } from "lodash";
import GameActivityCarousel from "@/components/GameActivityCarousel";

interface HomeTabProps {
  gameTasksInfo: Record<string, any>
  reloadGameTasks: () => any
  gameId: string
}

const HomeTab: React.FC<HomeTabProps> = (props) => {
  const { gameTasksInfo, reloadGameTasks, gameId } = props

  const t = useTranslations('Game')

  const { address } = useAccount()
  const router = useRouter()
  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])
  const [hasCollection, setHasCollection] = useState<boolean>(false)
  const [collectionData, setCollectionData] = useState<Record<string, any>[]>([])
  const [collectionId, setCollectionId] = useState<string>('')

  const gameType = useMemo(() => {
    if (!isEmpty(gameTasksInfo?.tasks)) {
      return 1
    } else if (!isEmpty(gameTasksInfo?.activities)) {
      return 2
    } else {
      return 3
    }
  }, [gameTasksInfo])


  // 获取 ArticleCollect 数据
  const { run: queryArticleCollection } = useRequest(getUserArticleCollection, {
    // manual: true,
    defaultParams: [{ gameId: gameId }],
    refreshDeps: [gameId],
    onSuccess: ({ data }) => {
      console.log(data)
      const firstCollection = data[0]?.attributes || {}

      if (firstCollection?.strategy_articles) {
        setCollectionId(firstCollection?.CollectionId)

        const collectionData = firstCollection?.strategy_articles?.data
        if (collectionData && !isEmpty(collectionData)) {
          setHasCollection(true)
          setCollectionData(collectionData)
        }
      }
    }
  })

  return <Box className={styles.homeTab}>
    <Box className={styles.rewardMainBox}>
      {gameType === 1 &&
        <Box className={styles.carnivalRewrads}>
          <Box className={styles.cardHeader}>
            <Typography>{t('taskTitle')}</Typography>
            <Box className={styles.mediaBox}>
            </Box>
          </Box>
          <Box className={styles.rewardDesc}>
            <Typography>
              {gameTasksInfo?.task_description &&
                gameTasksInfo?.task_description}
            </Typography>
            <Box className={styles.imageBox}>
              <img src="/game_reward_ill.png" />
            </Box>
          </Box>
          {
            gameTasksInfo?.tasks?.map((item: Record<string, any>, index: number) =>
              <CarnivalRewardItem
                key={index}
                index={index + 1}
                medalNum={item?.medal}
                isStarted={item?.user_task_status !== 'not started'}
                isClaimed={item?.user_task_status !== 'uncompleted'}
                reward={item?.description}
                gameId={router.query?.uuid as string}
                strategyLink={gameTasksInfo?.strategy}
                taskInfo={item}
                timestamp={timestamp as unknown as number}
                reloadData={() => {
                  // getCarnivalGameInfo({ address: address || '0x00', game_id: router.query?.uuid as string })
                  reloadGameTasks()
                }}
              />
            )
          }
        </Box>}
      {gameType === 2 &&
        <Box className={styles.activityBox}>
          <Typography variant="h2">Activity</Typography>
          <GameActivityCarousel activityList={gameTasksInfo?.activities} />
        </Box>
      }
    </Box>
    {
      hasCollection &&
      <Box className={styles.workthroughBox}>
        <Typography variant="h3">Walkthrough</Typography>
        <WalkthroughCollection
          collectionData={collectionData}
          collectionId={collectionId} />
      </Box>
    }
  </Box>
}

export default HomeTab