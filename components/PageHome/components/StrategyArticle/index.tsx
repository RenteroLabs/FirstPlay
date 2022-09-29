import { Box, Card, CardMedia, Typography } from "@mui/material"
import styles from './style.module.scss'
import EastIcon from '@mui/icons-material/East';

interface StrategyArticleProp {
  articleInfo: Record<string, any>
}

const cardBgColor = ['#F1E4ED', '#E9E1E0', '#E5E5F3', '#F4F4F9']

const StrategyArticle: React.FC<StrategyArticleProp> = (props) => {
  const { articleInfo } = props

  console.log(cardBgColor[articleInfo.key])
  return <Card className={styles.articleCard}>
    <Box className={styles.articleInfo} sx={{ backgroundColor: cardBgColor[articleInfo.key] }}>
      <Typography variant="h4">{articleInfo.gameName}</Typography>
      <Typography variant="h3">{articleInfo.gameTitle}</Typography>
      <Box className={styles.linkBtn}>Strategy <EastIcon /></Box>
    </Box>
    <Box className={styles.gameCover}>
      <CardMedia
        component="img"
        alt="article cover image"
        image="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xgnbyzscj20zk0k0gtn.jpg"
      />
    </Box>

  </Card>
}

export default StrategyArticle