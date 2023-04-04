import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import styles from './styles.module.scss';
import { clone } from 'lodash'

enum CardType {
  PREV = 'prev',
  ACTIVE = 'active',
  NEXT = 'next',
  HIDDEN = 'hidden'
}

interface WeeklyRankProps {
  weeklyRankList: Record<string, any>[]
}

const WeeklyRank: React.FC<WeeklyRankProps> = (props) => {
  const { weeklyRankList } = props

  const [imageList, setImageList] = useState<CardType[]>([])

  useEffect(() => {
    // TODO: 注意：此处数量需为3
    setImageList([CardType.ACTIVE, CardType.PREV, CardType.HIDDEN, CardType.HIDDEN, CardType.HIDDEN, CardType.NEXT])
  }, [weeklyRankList])

  const hanleClickSwiper = (cardType: CardType) => {
    let copyImageList = clone(imageList)
    if (cardType === CardType.PREV) {
      const last = copyImageList.pop()
      copyImageList.unshift(last as CardType)
    } else if (cardType === CardType.NEXT) {
      const first = copyImageList.shift()
      copyImageList.push(first as CardType)
    }
    setImageList(copyImageList)
  }

  // 实现参考于：https://juejin.cn/post/6844903566205779975
  return <Box className={styles.weeklyRank}>
    <Box className={styles.weeklyRankBox}>
      <SectionTitle emphasize="Weekly Ranking" />

      <Box className={styles.carouselBox}>
        {
          imageList.map((item, index) => {
            const { cover } = weeklyRankList[index % 3]
            return <Box
              onClick={() => hanleClickSwiper(item)}
              key={index}
              className={`${styles.sliderItem} ${styles[item]}`} >
              <img src={cover?.data?.attributes?.url} />
              <Box className={styles.mask}></Box>
            </Box>
          })
        }
      </Box>
    </Box>
  </Box>
}

export default WeeklyRank