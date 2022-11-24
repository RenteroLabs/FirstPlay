import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import { CHAIN_ICON_MAP, HOT_GAME_ICON, REWARD_ICON } from "constants/static"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from './style.module.scss'

interface GameCardProps {
  gameInfo: Record<string, any>
}

const Carnival_Games = [
  'a10fe616-6da7-4f88-bb5b-8e27b3adedad',

  '740a1e44-fd84-433e-98df-be90d650eb51',

  '8489b4b1-ed82-451d-96b6-46fe199b2fe8',

  '11ec241d-c889-4f54-8656-b5f7b1598300',

  'd56f4b3a-d7b7-4abf-935f-574546d4e958',

  '32605c7c-45d3-49f4-9923-b3a51816d1df'
]

const GameCard: React.FC<GameCardProps> = (props) => {
  const { gameInfo } = props
  // console.log(gameInfo)
  const router = useRouter()

  const imageKitLoader = ({ src, width, quality = 100 }: any) => {
    const params = [`w-320`];
    if (quality) {
      params.push(`q-${quality}`);
    }
    const paramsString = params.join(",");
    var urlEndpoint = "https://ik.imagekit.io/jnznr24q9";
    const imagePaths = src.split('/')
    const imageHash = imagePaths[imagePaths.length - 1]
    return `${urlEndpoint}/${imageHash}?tr=${paramsString}`
  }

  // TODO: prefetch 预先请求页面
  // const linkToGameDetail = () => {
  //   router.push({
  //     pathname: '/game/[uuid]',
  //     query: { uuid: gameInfo.game_id }
  //   })
  // }

  return <Link href={`/game/${gameInfo?.game_id}`}>
    <Card className={styles.gameCard}>
      <Box className={styles.gameImage}>
        <Image
          priority
          src={gameInfo?.image}
          layout="fill"
          objectFit="cover"
          loader={({ src }) => src} />
        {
          gameInfo &&
          Carnival_Games.includes(gameInfo?.game_id) &&
          <Box className={styles.carnivalTag}>
            <Image src="/carnival_game_tag.png" layout="fill" />
          </Box>
        }

      </Box>

      <CardContent className={styles.gameContent}>
        <Stack>
          <Box className={styles.gameName}>
            <Typography>{gameInfo?.name}</Typography>
            <Box className={styles.chainIcon}>
              <Image src={CHAIN_ICON_MAP[gameInfo?.game_chains[0]?.chain_id || 1]} alt="chain icon" layout="fill" objectFit="contain" />
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
              <Image src={REWARD_ICON} layout="fill" />
            </Box>
            <Typography>Rewards: {gameInfo?.rewards || '-'}</Typography>
          </Box>
        </Stack>
      </CardContent>
      {/* <Box className={styles.gameHot}>
      <Box>
        <Image src={HOT_GAME_ICON} layout="fill" />
      </Box>
      {gameInfo?.view}
    </Box> */}
      <Box className={styles.topMask}>

      </Box>
    </Card>
  </Link>
}

export default GameCard