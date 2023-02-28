import { Box } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'

interface GameArticleItemProps {
  sort: number

}

const GameArticleItem: React.FC<GameArticleItemProps> = (props) => {
  const { sort } = props

  return <Box className={styles.articleItem}>
    <Box className={styles.itemSort}>
      {sort}
    </Box>
    <Box className={styles.articleTitle}>
      How to start Dark Throne? How to start Dark Throne? How to start Dark ThroneHow to start Dark Throne??
    </Box>
  </Box>
}

export default GameArticleItem