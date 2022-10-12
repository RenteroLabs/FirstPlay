import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import StrategyArticle from "../components/StrategyArticle"
import styles from './style.module.scss'

interface GameStrategyProps {
  gameStrategy: Record<string, any>[]
}

const GameStrategy: React.FC<GameStrategyProps> = (props) => {
  const { gameStrategy } = props

  return <Box className={styles.gameStrategy}>
    <Box className={styles.gameStrategyBox}>
      <SectionTitle normal="Games" emphasize="Tutorial" sort="last" />
      <Box className={styles.cardList}>
        {
          gameStrategy.map((item, index) =>
            <StrategyArticle key={index} articleInfo={{ ...item, key: index }} />)
        }
      </Box>
    </Box>
  </Box>
}

export default GameStrategy