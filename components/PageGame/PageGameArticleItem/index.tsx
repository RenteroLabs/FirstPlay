import { Box } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'

interface GameArticleItemProps {
  sort: number
  article: Record<string, any>
}

const GameArticleItem: React.FC<GameArticleItemProps> = (props) => {
  const { sort, article } = props


  // TODO: link to strategy article detail page 
  return <Box className={styles.articleItem}>
    <Box className={styles.itemSort}>
      {sort}
    </Box>
    <Box className={styles.articleTitle}>
      {article?.attributes?.ArticleTitle}
    </Box>
  </Box>
}

export default GameArticleItem