import GameCard from "@/components/GameCard"
import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'

interface ComingGameProps {
  comingGames: Record<string, any>[]
}

const ComingGames: React.FC<ComingGameProps> = (props) => {
  const { comingGames } = props
  return <Box className={styles.comingGames}>
    <Box className={styles.comingGamesBox}>
      <SectionTitle normal="Soon" emphasize="Coming" />
      <Box className={styles.cardList}>
        {/* // TODO: coming soon 模块需做移动端、响应式处理 */}
        {
          comingGames?.map((gameInfo, index) => <GameCard key={index} gameInfo={gameInfo} />)
        }
        {/* <GameCard /> */}
        {/* <GameCard /> */}
        {/* <GameCard /> */}
        {/* <GameCard /> */}
        {/* <GameCard /> */}
      </Box>
    </Box>
  </Box>
}

export default ComingGames