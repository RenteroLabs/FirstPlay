import { Box, Typography } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import StrategyArticle from "../components/StrategyArticle"
import styles from './style.module.scss'
import { useTranslations } from "next-intl";
import WalkthroughCollection from "@/components/WalkthroughCollection";

interface GameStrategyProps {
  gameStrategy: Record<string, any>[]
}

const GameStrategy: React.FC<GameStrategyProps> = (props) => {
  const { gameStrategy } = props
  const t = useTranslations('Index.Section')

  // console.log(gameStrategy)

  return <Box className={styles.gameStrategy}>
    <Box className={styles.gameStrategyBox}>
      <SectionTitle emphasize={t('strategySectionTitle')} />
      <Box className={styles.cardList}>
        {
          gameStrategy.map((item, index) => {
            const { attributes } = item
            return <WalkthroughCollection
              key={index}
              collectionId={attributes?.CollectionId}
              collectionData={attributes?.strategy_articles?.data}
            />
          })
        }
      </Box>
    </Box>
  </Box>
}

export default GameStrategy