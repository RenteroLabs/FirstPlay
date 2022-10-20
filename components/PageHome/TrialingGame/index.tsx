import { Box, Typography } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import TrialGameCard from "../components/TrialGameCard"
import styles from './style.module.scss'

interface TrialGameProps {

}

const TrialGame: React.FC<TrialGameProps> = (props) => {

  return <Box className={styles.trialgame}>
    <Box className={styles.trialgameBox}>
      <SectionTitle normal="Trialing Games" sort="last"/>
      <Typography className={styles.subtitle}>The game you are currently playing, you will get corresponding rewards after completing the trial.</Typography>
      <Box className={styles.cardList}>
        <TrialGameCard />
        <TrialGameCard />
        <TrialGameCard />
      </Box>
    </Box>
  </Box>
}

export default TrialGame