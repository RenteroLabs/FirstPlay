import { Box, Card, CardContent, Typography } from "@mui/material"
import Link from "next/link"
import styles from './styles.module.scss'
import Image from 'next/image'

interface RewardGameCardProps {
  gameInfo: Record<string, any>
  timestamp: number
}

// 有奖励活动的游戏卡片
const RewardGameCard: React.FC<RewardGameCardProps> = (props) => {
  const { gameInfo, timestamp } = props
  // console.log(gameInfo)

  return <Link href={`/game/${gameInfo?.game_id}`}>
    <Card className={styles.gameCard}>
      <Box className={styles.gameImage}>
        <Image
          priority
          src={gameInfo?.image}
          layout="fill"
          objectFit="cover"
          loader={({ src }) => `${src}?timestamp=${timestamp}`}
        />
        <Box className={styles.cardTag}>{gameInfo?.game_status[0]}</Box>
      </Box>
      <CardContent className={styles.gameContent}>
        <Box className={styles.cardTitle}>
          <Typography>{gameInfo?.name}</Typography>
          <Box className={styles.tagList}>
            {
              gameInfo?.game_types.map((item: string, index: number) => <Box className={styles.tagItem} key={index}>{item}</Box>)
            }
          </Box>
        </Box>
        <Box className={styles.rewardItem}>
          <Box className={styles.iconBox}>
            <Image src="/reward_game_card_star_label.png" layout="fill" />
          </Box>
          Reward: {gameInfo?.rewards}
        </Box>
      </CardContent>
    </Card>
  </Link>
}

export default RewardGameCard