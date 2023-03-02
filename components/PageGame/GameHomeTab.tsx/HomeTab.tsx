import CarnivalRewardItem from "@/components/PageCarnival/RewardItem";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import styles from './styles.module.scss'
import { useTranslations } from "next-intl";
import WalkthroughCollection from "@/components/WalkthroughCollection";

interface HomeTabProps {
  gameTasksInfo: Record<string, any>
  reloadGameTasks: () => any
}

const HomeTab: React.FC<HomeTabProps> = (props) => {
  const { gameTasksInfo, reloadGameTasks } = props

  const t = useTranslations('Game')

  const { address } = useAccount()
  const router = useRouter()
  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])

  return <Box className={styles.homeTab}>
    <Box className={styles.rewardMainBox}>
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
      </Box>
    </Box>
    <Box className={styles.workthroughBox}>
      <Typography variant="h3">Walkthrough</Typography>
      <WalkthroughCollection />
    </Box>
  </Box>
}

export default HomeTab