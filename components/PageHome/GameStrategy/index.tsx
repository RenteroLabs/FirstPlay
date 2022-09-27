import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'

const GameStrategy: React.FC = () => {

  return <Box className={styles.gameStrategy}>
    <Box className={styles.gameStrategyBox}>
      <SectionTitle normal="Games" emphasize="Strategy" sort="last" />
      <Box className={styles.cardList}>
      </Box>
    </Box>
  </Box>
}

export default GameStrategy