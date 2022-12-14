import RewardGameCard from "@/components/RewardGameCard"
import { Box, useMediaQuery } from "@mui/material"
import Link from "next/link"
import SectionTitle from "../components/SectionTitle"
import styles from './styles.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react"

interface RewardGamesProps {
  rewardGames: Record<string, any>[]
  timestamp: number
}

const RewardGames: React.FC<RewardGamesProps> = (props) => {
  const { rewardGames, timestamp } = props

  const is600Size = useMediaQuery("(max-width: 600px)")

  const [showMore, setShowMore] = useState<boolean>(false)

  return <Box className={styles.rewardGames}>
    <Box className={styles.rewardGamesBox}>
      <SectionTitle normal="" emphasize="Rewarded Games" />
      <Box className={styles.cardList}>
        {
          ((is600Size && !showMore) ? rewardGames.slice(0, 3) : rewardGames).map((item, index) => <RewardGameCard gameInfo={item} key={index} timestamp={timestamp} />)
        }
        {
          // rewardGames.map((item, index) => <RewardGameCard gameInfo={item} key={index} timestamp={timestamp} />)
        }
      </Box>
    </Box>

    {is600Size && <Box className={styles.showMoreBtn} onClick={() => setShowMore(!showMore)}>
      {
        showMore ?
          <> Less <KeyboardArrowUpIcon /> </> :
          <> More <KeyboardArrowDownIcon /> </>
      }
    </Box>}
  </Box>
}

export default RewardGames