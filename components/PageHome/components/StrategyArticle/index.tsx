import { Box, Card, CardMedia, Typography } from "@mui/material"
import styles from './style.module.scss'
import EastIcon from '@mui/icons-material/East';
import { BADGE_ICON } from "constants/static";
import Image from 'next/image'

interface StrategyArticleProp {
  articleInfo: Record<string, any>
}

const cardBgColor = ['#F0E3CC', '#C6F2F2', '#E5E5F3', '#EBEADE']

const StrategyArticle: React.FC<StrategyArticleProp> = (props) => {
  const { articleInfo } = props

  // console.log(articleInfo)
  const imageKitLoader = ({ src, width, quality = 100 }: any) => {
    const params = [`w-300`];
    if (quality) {
      params.push(`q-${quality}`);
    }
    const paramsString = params.join(",");
    var urlEndpoint = "https://ik.imagekit.io/jnznr24q9";
    const imagePaths = src.split('/')
    const imageHash = imagePaths[imagePaths.length - 1]
    return `${urlEndpoint}/${imageHash}?tr=${paramsString}`
  }

  return <Card className={styles.articleCard}>
    < a href={articleInfo.link} target="_blank" rel="noreferrer" >
      <Box className={styles.gameCover}>
        <Box className={styles.imaegBox} >
          <Image loader={imageKitLoader} src={articleInfo.image} layout="fill" objectFit="cover" />
        </Box>
      </Box>
      <Box className={styles.articleInfo} >
        <Typography variant="h4">
          {articleInfo.game_name}
        </Typography>
        <Typography variant="h3">{articleInfo.title}</Typography>
        <Typography>{articleInfo?.description}</Typography>
      </Box>
    </a >
  </Card >
}

export default StrategyArticle