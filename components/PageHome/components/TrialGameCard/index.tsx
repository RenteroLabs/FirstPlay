import { Box, Typography } from "@mui/material"
import styles from './styles.module.scss'
import Image from 'next/image'

interface TrialGameCardProp {

}

const TrialGameCard: React.FC<TrialGameCardProp> = (props) => {
  const { } = props

  return <Box className={styles.trialGameCard}>
    <Box className={styles.gameCover}>
      <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xgector4j210i0u0aho.jpg" layout="fill" objectFit="cover" />
    </Box>
    <Box className={styles.gameInfo}>
      <Typography variant="h3">Arcloot</Typography>
      <Typography className={styles.gameReward}>Reward：Buy NFTs after the trial to get Token.</Typography>
      <Typography className={styles.timeleft}>3Day 4Hour 12Min  left</Typography>
    </Box>
    <Box className={styles.btnList}>
      <Box className={styles.guideBtn}>See the guide</Box>
      <Box className={styles.playBtn}>Play</Box>
    </Box>
  </Box>
}

export default TrialGameCard