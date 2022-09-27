import GameCard from "@/components/GameCard"
import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'

const HotGames: React.FC = () => {

  return <Box className={styles.hotGames}>
    <Box className={styles.hotGamesBox}>
      <SectionTitle normal="Games" emphasize="Hottest" />
      <Box className={styles.cardList}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </Box>
    </Box>
  </Box>
}

export default HotGames