import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import StrategyArticle from "../components/StrategyArticle"
import styles from './style.module.scss'

const articles = [
  {
    gameName: 'Legends of Aria',
    gameTitle: 'How to Improve Hero Skills to Improve Hero',
    gameCover: '',
    gameLink: ''
  }, {
    gameName: 'Legends of Aria',
    gameTitle: 'How to Improve Hero Skills to Improve Hero',
    gameCover: '',
    gameLink: ''
  }, {
    gameName: 'Legends of Aria',
    gameTitle: 'How to Improve Hero Skills to Improve Hero',
    gameCover: '',
    gameLink: ''
  }, {
    gameName: 'Legends of Aria',
    gameTitle: 'How to Improve Hero Skills to Improve Hero',
    gameCover: '',
    gameLink: ''
  }
]
const GameStrategy: React.FC = () => {

  return <Box className={styles.gameStrategy}>
    <Box className={styles.gameStrategyBox}>
      <SectionTitle normal="Games" emphasize="Strategy" sort="last" />
      <Box className={styles.cardList}>
        {
          articles.map((item, index) => <StrategyArticle key={index} articleInfo={{ ...item, key: index }} />)
        }
      </Box>
    </Box>
  </Box>
}

export default GameStrategy