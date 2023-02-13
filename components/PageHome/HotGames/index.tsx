import GameCard from "@/components/GameCard"
import { Box, useMediaQuery } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslations } from "next-intl";

interface HotGamesProps {
  hotGames: Record<string, any>[]
  timestamp: number
}

const HotGames: React.FC<HotGamesProps> = (props) => {
  const { hotGames, timestamp } = props
  const t = useTranslations('Index.Section')

  const is600Size = useMediaQuery("(max-width: 600px)")

  const [showMore, setShowMore] = useState<boolean>(false)

  return <Box className={styles.hotGames}>
    <Box className={styles.hotGamesBox}>
      <SectionTitle emphasize={t('hotgameSectionTitle')} />
      <Box className={styles.cardList}>
        {
          ((is600Size && !showMore) ? hotGames.slice(0, 6) : hotGames).map((item, index) => <GameCard gameInfo={item} key={index} timestamp={timestamp} />)
        }
        {
          // hotGames.map((item, index) => <GameCard gameInfo={item} key={index} timestamp={timestamp} />)
        }
      </Box>
    </Box>

    {is600Size && <Box className={styles.showMoreBtn} onClick={() => setShowMore(!showMore)}>
      {
        showMore ?
          <> {t('showLessBtn')} <KeyboardArrowUpIcon /> </> :
          <> {t("showMoreBtn")} <KeyboardArrowDownIcon /> </>
      }
    </Box>}
  </Box>
}

export default HotGames