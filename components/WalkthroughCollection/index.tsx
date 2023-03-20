import { Box, IconButton } from "@mui/material";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import styles from './styles.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GameArticleItem from "../PageGame/PageGameArticleItem";
import { useTranslations } from "next-intl";

interface WalkthroughCollectionProps {
  collectionData: Record<string, any>[]
  collectionId: string
}

const DEFAUTL_SHOW_COUNT: number = 5

const WalkthroughCollection: React.FC<WalkthroughCollectionProps> = (props) => {
  const { collectionData, collectionId } = props
  const t = useTranslations('Game.Tabs')

  const [showAllArticle, setShowAllArticle] = useState<boolean>(false)

  const artilceCount = useMemo(() => {
    return collectionData.length
  }, [collectionData])

  return <Box className={styles.collectionBox}>
    <Box className={styles.collectionHeader}>
      <Box className={styles.userInfo}>
        <Box className={styles.userLogo}>
          <Image src="/favicon.ico" layout="fill" />
        </Box>
        <Box className={styles.userName}>FirstPlay</Box>
      </Box>
      <Box className={styles.shareIcon}>
        {/* 暂时将 Collection 的分享按钮隐藏 */}
        {/* <IconButton disableRipple >
          <svg t="1677486737514" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6523" width="16" height="16"><path d="M889.9 97.3H663.3c-10.4 0-19.3 3.7-26.7 11.1-7.4 7.4-11.1 16.3-11.1 26.8 0 10.4 3.6 19.3 11.1 26.7 7.3 7.4 16.3 11.1 26.7 11.1h135.4L485.3 486.2c-7.2 7-11.1 16.6-10.9 26.7 0 10.7 3.6 19.7 10.7 26.9 7.2 7.3 16.2 10.9 27 10.9 10.6 0 19.6-3.7 26.9-11l313.1-313.3v135.4c0 10.5 3.6 19.4 11.1 26.8 7.4 7.4 16.3 11.1 26.7 11.1 10.4 0 19.3-3.7 26.7-11.1 7.4-7.4 11.1-16.3 11.1-26.8V135.2c0-10.4-3.7-19.4-11.1-26.8-6.9-7.2-16.6-11.3-26.7-11.1z m-419.2 2.1c-50.5 5-99.7 19.3-145 42.3-91.2 45.9-162.3 123.7-199.9 218.6-19.2 48.6-29 100.3-28.9 152.5 0 56.4 10.9 110.3 32.7 161.7 20.3 48.6 49.9 92.7 88.8 132.1 39.5 39 83.6 68.5 132.2 88.8 51.1 21.8 106.1 32.9 161.7 32.8 52.7 0 103.6-9.7 152.6-29 46.8-18.5 89.9-45.4 127.2-79.3 37.6-34.3 68.6-75.1 91.5-120.6 22.9-45.3 37.2-94.5 42.2-145 1-11.3-2.2-21-9.6-29.3-7.1-8.1-17.4-12.6-28.2-12.3-9.6 0-18 3.2-25.2 9.7-7.3 6.5-11.3 14.6-12.3 24.2-4 41.4-15.6 81.7-34.4 118.8-18.7 37.3-44.2 70.7-75.2 98.6-30.2 28-65.5 50-103.8 65-39.8 15.6-82.1 23.6-124.8 23.6-45.4 0.1-90.4-8.9-132.2-26.6-39.7-16.7-75.8-41.1-108.3-72.9-31.9-32.4-56.2-68.4-72.9-108.2-17.7-41.8-26.7-86.7-26.5-132.1 0-43 7.9-84.7 23.6-124.9 14.9-38.4 36.9-73.6 64.9-103.9 56.2-62.4 133.8-101.4 217.4-109.4 9.7-1.1 17.7-5.1 24.2-12.4 6.5-7.2 9.8-15.6 9.8-25.2 0-7.5-1.4-13.9-4.3-19.2-2.9-5.3-6.7-9.2-11.3-11.9-4.2-2.3-8.8-4.1-13.5-5.3-4.1-1-8.3-1.5-12.5-1.5v0.3z" p-id="6524" fill="#222222"></path></svg>
        </IconButton> */}
      </Box>
    </Box>
    <Box className={styles.articleList}>
      {
        collectionData.slice(0, showAllArticle ? artilceCount : DEFAUTL_SHOW_COUNT).map((item, index) =>
          <GameArticleItem
            collectionId={collectionId}
            sort={index + 1}
            article={item}
            activeItem={true}
            activeColor={false}
            key={index} />
        )
      }
    </Box>

    {/* 如果文章数量少于 5 篇，不显示展开按钮 */}
    {
      artilceCount > DEFAUTL_SHOW_COUNT &&
      <Box className={styles.btnBox}>
        <Box className={styles.clickBtn} onClick={() => setShowAllArticle(!showAllArticle)}>
          {
            showAllArticle ? t("lessArticle") : t('moreArticle')
          }
          ({artilceCount})
          {
            showAllArticle ? <ExpandLessIcon /> : <ExpandMoreIcon />
          }
        </Box>
      </Box>
    }
  </Box>
}

export default WalkthroughCollection