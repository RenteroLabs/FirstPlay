import CarnivalRewardItem from "@/components/PageCarnival/RewardItem";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import styles from './styles.module.scss';
import { useTranslations } from "next-intl";
import WalkthroughCollection from "@/components/WalkthroughCollection";
import { useRequest } from "ahooks";
import { getActivitiesByGame, getUserArticleCollection } from "services/cms";
import { isEmpty } from "lodash";
import GameActivityCarousel from "@/components/GameActivityCarousel";
import { getTaskStatus } from "services/home"

interface HomeTabProps {
  gameBounties: Record<string, any>[]
  gameBase: Record<string, any>
  gameId: string
}

const HomeTab: React.FC<HomeTabProps> = (props) => {
  const { gameBounties, gameId, gameBase } = props

  // console.log(gameBounties)
  const t = useTranslations('Game')

  const [taskType, setTaskType] = useState<'Ongoing' | 'Ended'>('Ongoing')

  const { address } = useAccount()
  const router = useRouter()
  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])
  const [hasCollection, setHasCollection] = useState<boolean>(false)
  const [collectionData, setCollectionData] = useState<Record<string, any>[]>([])
  const [collectionId, setCollectionId] = useState<string>('')
  const [collectionTitle, setCollectionTitle] = useState<string>('')

  const [activityList, setActivityList] = useState<Record<string, any>[]>([])
  const [useTaskStatusList, setUserTaskStatusList] = useState<Record<string, any>>({})

  const gameType = useMemo(() => {
    // TODO:
    if (!isEmpty(gameBounties)) {
      return 1
    }
  }, [gameBounties])

  useEffect(() => {
    if (router.query.taskType) {
      // @ts-ignore
      setTaskType(router.query.taskType)
    }
  }, [router.query.taskType])


  // 获取 ArticleCollect 数据
  const { run: queryArticleCollection } = useRequest(getUserArticleCollection, {
    // manual: true,
    defaultParams: [{ gameId: gameId }],
    refreshDeps: [gameId],
    onSuccess: ({ data }) => {
      const firstCollection = data[0]?.attributes || {}

      if (firstCollection?.strategy_articles) {
        setCollectionId(firstCollection?.CollectionId)
        setCollectionTitle(firstCollection?.CollectionTitle)

        const collectionData = firstCollection?.strategy_articles?.data
        if (collectionData && !isEmpty(collectionData)) {
          setHasCollection(true)
          setCollectionData(collectionData)
        }
      }
    }
  })

  // 获取 Activity 数据
  const { run: queryActicleByGame } = useRequest(getActivitiesByGame, {
    defaultParams: [{ gameId: gameId, status: true }],
    refreshDeps: [gameId],
    onSuccess: ({ data }) => {
      // console.log(data)
      setActivityList(data)
    }
  })


  // 获取用户 task 进度数据
  const { run: queryTaskStatus, refresh } = useRequest(getTaskStatus, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      let statusList: Record<string, any> = {}
      data.forEach((item: Record<string, any>) => {
        statusList[item.task_id] = item
      })
      setUserTaskStatusList(statusList)
    }
  })


  useEffect(() => {
    queryTaskStatus({
      // @ts-ignore
      address: address,
      task_ids: gameBounties?.map((item: Record<string, any>) => item?.attributes?.task_id) || []
    })
  }, [address, gameBounties])

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
              {gameBase?.task_description &&
                gameBase?.task_description}
            </Typography>
            <Box className={styles.imageBox}>
              <img src="/game_reward_ill.png" />
            </Box>
          </Box>
          {
            gameBounties?.map((item: Record<string, any>, index: number) => {
              const userTaskStatus = useTaskStatusList[item?.attributes?.task_id]
              // 仅显示进行中或已结束的状态
              return <CarnivalRewardItem
                key={index}
                index={index + 1}
                isStarted={userTaskStatus?.user_task_status !== 'not started'}
                isClaimed={userTaskStatus?.user_task_status !== 'uncompleted'}
                reward={item?.reward}
                gameId={router.query?.uuid as string}
                taskInfo={{ ...item?.attributes, ...userTaskStatus }}
                timestamp={timestamp as unknown as number}
                reloadData={() => {
                  refresh()
                }}
              />
            })
          }
        </Box>}
      {!isEmpty(activityList) &&
        <Box className={styles.activityBox}>
          <Typography variant="h2">{t("Tabs.activity")}</Typography>
          <GameActivityCarousel activityList={activityList.map((item: Record<string, any>) => item?.attributes)} />
        </Box>
      }
    </Box>
    {
      hasCollection &&
      <Box className={styles.workthroughBox}>
        <Typography variant="h3">{t("Tabs.walkthrough")}</Typography>
        <WalkthroughCollection
          collectionTitle={collectionTitle}
          collectionData={collectionData}
          collectionId={collectionId} />
      </Box>
    }
  </Box>
}

export default HomeTab