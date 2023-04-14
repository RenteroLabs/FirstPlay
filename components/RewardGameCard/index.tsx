import { Box, Card, CardContent, Typography } from "@mui/material"
import Link from "next/link"
import styles from './styles.module.scss'
import Image from 'next/image'
import { GAME_TASK_MONEY, STAR_LABEL } from "constants/static"
import { useCountDown } from "ahooks"
import { useMemo } from "react"

interface RewardGameCardProps {
  gameInfo: Record<string, any>
  timestamp?: number
  taskStatus: Record<string, any>
  type?: 'Ongoing' | 'Ended'
}

// 有奖励活动的游戏卡片
const RewardGameCard: React.FC<RewardGameCardProps> = (props) => {
  const { gameInfo, timestamp, type = 'Ongoing', taskStatus } = props

  const [_, { days, hours, minutes }] = useCountDown({
    targetDate: gameInfo?.expired_at || new Date()
  })

  const gameBase = useMemo(() => {
    return gameInfo?.game_info?.data?.attributes || {}
  }, [gameInfo])

  return <Link href={`/game/${gameBase?.GameUUID}?taskType=${type}`}>
    <Card className={styles.gameCard}>
      <Box className={styles.gameImage}>
        <Image
          priority
          src={gameBase?.cover?.data?.attributes?.url}
          layout="fill"
          objectFit="cover"
          loader={({ src }) => `${src}?timestamp=${timestamp}`}
        />
        {/* <Box className={styles.cardTag}>{gameInfo?.game_status[0]}</Box> */}
      </Box>
      <CardContent className={styles.gameContent}>
        <Box className={styles.cardTitle}>
          <Typography>{gameBase?.GameName}</Typography>
          <Box className={styles.taskItem}>
            <Box className={styles.iconBox}>
              <Image src={STAR_LABEL} layout="fill" />
            </Box>
            <span>{gameInfo?.description}</span>
          </Box>
          <Box className={styles.rewardItem}>
            <Box className={styles.iconBox}>
              <Image src={GAME_TASK_MONEY} layout="fill" />
            </Box>
            <span>{gameInfo?.reward}</span>
          </Box>
        </Box>
        <Box className={styles.taskProgress}>
          <Box className={styles.progressInfo}>
            Progress: <span>{taskStatus[gameInfo?.task_id]}</span> / {gameInfo?.total_rewards == 0 ? '∞' : gameInfo?.total_rewards}
          </Box>
          <Box className={styles.endTime}>
            {
              gameInfo?.expired_at ? `Ends in ${days}D:${hours}H:${minutes}M` : "FCFS"
            }
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Link>
}

export default RewardGameCard