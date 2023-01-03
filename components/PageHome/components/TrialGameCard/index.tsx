import { Box, Typography, useMediaQuery } from "@mui/material"
import styles from './styles.module.scss'
import Image from 'next/image'

interface TrialGameCardProp {
  trialTask: Record<string, any>
}

const TrialGameCard: React.FC<TrialGameCardProp> = (props) => {
  const { trialTask } = props
  const isMobileLayout = useMediaQuery("(max-width: 900px)")

  // TODO: 移动端正在试玩游戏点击跳转
  const mobileTrialGameCard = <Box className={styles.mobileTrialGameCard}>
    <Box className={styles.cardHeader}>
      <Typography variant="h3">{trialTask?.name}</Typography>
      <Box className={styles.gameCover}>
        <Image src={trialTask?.logo} layout="fill" objectFit="cover" />
      </Box>
    </Box>
    <Box className={styles.gameInfo}>
      <Typography className={styles.gameTask}>{trialTask?.task}</Typography>
      <Typography className={styles.gameReward}>Reward：{trialTask?.reward}</Typography>
    </Box>
  </Box>

  const trialGameCard = < Box className={styles.trialGameCard} >
    <Box className={styles.gameCover}>
      <Image src={trialTask?.logo} layout="fill" objectFit="cover" />
    </Box>
    <Box className={styles.gameInfo}>
      <Typography variant="h3">{trialTask?.name}</Typography>
      <Box className={styles.gameTask}>
        {trialTask?.task}
        <Box className={styles.playBtn}>Continue</Box>

      </Box>
      <Typography className={styles.gameReward}>
        <Box className={styles.iconBox}>
          <Image src="/reward_game_card_star_label.png" layout="fill" />
        </Box>
        Reward：{trialTask?.reward}
      </Typography>
    </Box>
  </Box >

  return isMobileLayout ? mobileTrialGameCard : trialGameCard
}

export default TrialGameCard