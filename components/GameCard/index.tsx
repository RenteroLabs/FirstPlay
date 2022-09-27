import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import { CHAIN_ICON_MAP } from "constants/static"
import Image from "next/image"
import styles from './style.module.scss'

interface GameCardProps {

}

const GameCard: React.FC<GameCardProps> = (props) => {

  return <Card className={styles.gameCard}>
    <Box className={styles.gameImage}>
      <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xgnbyzscj20zk0k0gtn.jpg" alt="game image" layout="fill" objectFit="cover" />
    </Box>

    <CardContent className={styles.gameContent}>
      <Stack>
        <Box className={styles.gameName}>
          <Typography>Metaline</Typography>
          <Box className={styles.chainIcon}>
            <Image src={CHAIN_ICON_MAP[137]} alt="chain icon" layout="fill" objectFit="contain" />
          </Box>
        </Box>
        <Box className={styles.gameTags}>
          <Typography component="span" className={styles.gameTag}>Strategy</Typography>
          <Typography component="span" className={styles.gameTag}>P2E</Typography>
          <Typography component="span" className={styles.gameTag}>RPG</Typography>
        </Box>
        <Box className={styles.gameRewards}>
          Rewards: Buy NFT 20% Discount
        </Box>
      </Stack>
    </CardContent>
  </Card>
}

export default GameCard