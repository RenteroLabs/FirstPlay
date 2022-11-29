import GameCard from "@/components/GameCard"
import { Box } from "@mui/material"
import Link from "next/link"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'

interface HotGamesProps {
  hotGames: Record<string, any>[]
  timestamp: number
}

const HotGames: React.FC<HotGamesProps> = (props) => {
  const { hotGames, timestamp } = props
  
  return <Box className={styles.hotGames}>
    <Box className={styles.hotGamesBox}>
      <SectionTitle normal="Games" emphasize="Hot" />
      <Box className={styles.cardList}>
        {
         hotGames.map((item, index) => <GameCard gameInfo={item} key={index} timestamp={timestamp} />)
        }
      </Box>
    </Box>
  </Box>
}

export default HotGames