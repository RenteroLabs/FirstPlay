import GameCard from "@/components/GameCard"
import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'

const ComingGames: React.FC = (props) => {

  return <Box className={styles.comingGames}>
    <Box className={styles.comingGamesBox}>
      <SectionTitle normal="Soon" emphasize="Coming" />
      <Box className={styles.cardList}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </Box>
    </Box>
  </Box>
}

export default ComingGames