import { Box } from "@mui/material";
import React from "react";
import styles from './styles.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

interface GameArticleItemProps {
  sort: number
  article: Record<string, any>
  collectionId: string,
  activeItem: boolean,
  activeColor: boolean
}

const GameArticleItem: React.FC<GameArticleItemProps> = (props) => {
  const { sort, article, collectionId, activeItem = true, activeColor = true } = props

  return <a target="_blank" rel="noreferrer" href={`/strategy/article?articleId=${article?.id}&collectionId=${collectionId}`} >
    <Box className={styles.articleItem}>
      <Box className={cx({
        itemSort: true,
        itemSortActive: activeItem
      })}>
        {sort}
      </Box>
      <Box className={cx({
        articleTitle: true,
        artiveArticleColor: activeColor && activeItem
      })}>
        {article?.attributes?.ArticleTitle}
      </Box>
    </Box>
  </a>
}

export default GameArticleItem