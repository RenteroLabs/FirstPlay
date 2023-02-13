import { Box, Typography } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import StrategyArticle from "../components/StrategyArticle"
import styles from './style.module.scss'
import { useTranslations } from "next-intl";

interface GameStrategyProps {
  gameStrategy: Record<string, any>[]
}

const GameStrategy: React.FC<GameStrategyProps> = (props) => {
  const { gameStrategy } = props
  const t = useTranslations('Index.Section')
  
  return <Box className={styles.gameStrategy}>
    <Box className={styles.gameStrategyBox}>
      <SectionTitle emphasize={t('strategySectionTitle')} />
      <Box className={styles.cardList}>
        {
          gameStrategy.map((item, index) => {
            return <>
              <StrategyArticle key={index} articleInfo={{ ...item, key: index }} />
              {index !== gameStrategy.length - 1 && <Typography className={styles.divider}></Typography>}
            </>
          })
        }
      </Box>
    </Box>
  </Box>
}

export default GameStrategy