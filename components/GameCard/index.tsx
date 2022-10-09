import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import { CHAIN_ICON_MAP, REWARD_ICON } from "constants/static"
import Image from "next/image"
import styles from './style.module.scss'

interface GameCardProps {
  gameInfo: Record<string, any>
}

const GameCard: React.FC<GameCardProps> = (props) => {
  const { gameInfo } = props
  
  return <Card className={styles.gameCard}>
    <Box className={styles.gameImage}>
      <Image src={gameInfo?.image} layout="fill" objectFit="cover" />
    </Box>

    <CardContent className={styles.gameContent}>
      <Stack>
        <Box className={styles.gameName}>
          <Typography>{gameInfo?.name}</Typography>
          <Box className={styles.chainIcon}>
            <Image src={CHAIN_ICON_MAP[137]} alt="chain icon" layout="fill" objectFit="contain" />
          </Box>
        </Box>
        <Box className={styles.gameTags}>
          {
            gameInfo?.game_types.map((item: string, index: number) =>
              <Typography key={index} component="span" className={styles.gameTag}>{item}</Typography>)
          }
        </Box>
        <Box className={styles.gameRewards}>
          <Box className={styles.rewardIcon}>
            <Image src={REWARD_ICON}  layout="fill" />
          </Box>
          Rewards: {gameInfo?.reward || '-'}
        </Box>
      </Stack>
    </CardContent>
  </Card>
}

export default GameCard