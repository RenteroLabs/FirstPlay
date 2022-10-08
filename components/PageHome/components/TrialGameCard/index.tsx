import { Box, Typography, useMediaQuery } from "@mui/material"
import styles from './styles.module.scss'
import Image from 'next/image'

interface TrialGameCardProp {

}

const TrialGameCard: React.FC<TrialGameCardProp> = (props) => {
  const { } = props
  const isMobileLayout = useMediaQuery("(max-width: 900px)")

  const mobileTrialGameCard = <Box className={styles.mobileTrialGameCard}>
    <Typography className={styles.timeleft}>
      <Box >
        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAmCAAAAACJo2ZPAAAAAXNSR0IArs4c6QAAAYVJREFUOMtj+IIGXl29+gpdjAGJ/Wl/vZuuEhDoutbt+4hV0Yt2QyUkYNj2AkPRx5nGSmjAeMYHVEVPIpSwgLAnyIou2ilhBbbnEYquGijhAPpXYYqeOyvhBI7PoYpikQRtLn6ZiqIqBqJoLbLYiv///3ugqFoNUvTBHlnoAFBRAooiu/dARXOU8CtSmgVU5E1IkecXhjtKhBQp3WaYTVjRTIYMworSGIIJKwpksCWsyJpBA1XgCFDRAkdUMXUGQ1SBh/9B4PGKHCOkWGZwQ1V04z8U/Ls8PQwq5sIQjebIb/8RABo8UQzl6InDt+PID6iiTxCRMoatWBKRRsyMy/+Aik5DuJsZ3mlhT23GOYvmmoJZmm8ZvqQpEQApwFRwnJCiY6CUmY5fTRo4+V5Vw6dG7SokI8zHp2guLN9V4VZTAc+cHxNxqUn4iMjmnxuxq2n4hFKqLNPBVKKzFL18eliF5knVyodYSrprjUjZ1L7hKvbi8MuXC9Prs0JDsuqnn8dZZuIEANXlKdBzPJxwAAAAAElFTkSuQmCC" alt="time left" layout="fill" />
      </Box>
      3Day 4Hour 12Min  left</Typography>
    <Box className={styles.gameInfo}>
      <Box className={styles.gameCover}>
        <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xgector4j210i0u0aho.jpg" layout="fill" objectFit="cover" />
      </Box>
      <Box className={styles.infoDetail}>
        <Typography variant="h3">Arcloot</Typography>
        <Typography className={styles.gameReward}>Reward：Buy NFTs after the trial to get Token.</Typography>
      </Box>
    </Box>
    <Box className={styles.btnList}>
      <Box className={styles.guideBtn}>See the guide</Box>
      <Box className={styles.playBtn}>Play</Box>
    </Box>
  </Box>

  const trialGameCard = < Box className={styles.trialGameCard} >
    <Box className={styles.gameCover}>
      <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xgector4j210i0u0aho.jpg" layout="fill" objectFit="cover" />
    </Box><Box className={styles.gameInfo}>
      <Typography variant="h3">Arcloot</Typography>
      <Typography className={styles.gameReward}>Reward：Buy NFTs after the trial to get Token.</Typography>
      <Typography className={styles.timeleft}>
        <Box >
          <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAmCAAAAACJo2ZPAAAAAXNSR0IArs4c6QAAAYVJREFUOMtj+IIGXl29+gpdjAGJ/Wl/vZuuEhDoutbt+4hV0Yt2QyUkYNj2AkPRx5nGSmjAeMYHVEVPIpSwgLAnyIou2ilhBbbnEYquGijhAPpXYYqeOyvhBI7PoYpikQRtLn6ZiqIqBqJoLbLYiv///3ugqFoNUvTBHlnoAFBRAooiu/dARXOU8CtSmgVU5E1IkecXhjtKhBQp3WaYTVjRTIYMworSGIIJKwpksCWsyJpBA1XgCFDRAkdUMXUGQ1SBh/9B4PGKHCOkWGZwQ1V04z8U/Ls8PQwq5sIQjebIb/8RABo8UQzl6InDt+PID6iiTxCRMoatWBKRRsyMy/+Aik5DuJsZ3mlhT23GOYvmmoJZmm8ZvqQpEQApwFRwnJCiY6CUmY5fTRo4+V5Vw6dG7SokI8zHp2guLN9V4VZTAc+cHxNxqUn4iMjmnxuxq2n4hFKqLNPBVKKzFL18eliF5knVyodYSrprjUjZ1L7hKvbi8MuXC9Prs0JDsuqnn8dZZuIEANXlKdBzPJxwAAAAAElFTkSuQmCC" alt="time left" layout="fill" />
        </Box>
        3Day 4Hour 12Min  left</Typography>
    </Box><Box className={styles.btnList}>
      <Box className={styles.guideBtn}>See the guide</Box>
      <Box className={styles.playBtn}>Play</Box>
    </Box>
  </Box >

  return isMobileLayout ? mobileTrialGameCard : trialGameCard
}

export default TrialGameCard