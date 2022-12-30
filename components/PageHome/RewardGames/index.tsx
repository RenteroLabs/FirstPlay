import RewardGameCard from "@/components/RewardGameCard"
import { Box } from "@mui/material"
import Link from "next/link"
import SectionTitle from "../components/SectionTitle"
import styles from './styles.module.scss'

interface RewardGamesProps {
  rewardGames: Record<string, any>[]
  timestamp: number
}

const RewardGames: React.FC<RewardGamesProps> = (props) => {
  const { rewardGames, timestamp } = props

  return <Box className={styles.rewardGames}>
    <Box className={styles.rewardGamesBox}>
      <SectionTitle normal="" emphasize="Rewarded Games" />
      <Box className={styles.cardList}>
        {
          rewardGames.map((item, index) => <RewardGameCard gameInfo={item} key={index} timestamp={timestamp} />)
        }
      </Box>
    </Box>
  </Box>
}

export default RewardGames