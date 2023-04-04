import React, { useMemo } from "react";
import Slider from 'react-slick'
import { Box, useMediaQuery } from "@mui/material";
import styles from './styles.module.scss'
import Image from "next/image";
import { Typography } from "antd";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface GameActivityCardProps {
  activityInfo: Record<string, any>
  cardType?: 'GameName' | 'GameTitle'
}

export const GameActivityCard: React.FC<GameActivityCardProps> = (props) => {
  const { activityInfo, cardType = 'GameTitle' } = props
  // console.log(activityInfo)
  return <a href={activityInfo?.link} target="_blank" rel="noreferrer" ><Box className={styles.activityCard}>
    <Box className={styles.cardImage}>
      <img src={activityInfo?.image} />
      <Box className={styles.imageMask}>{activityInfo?.time_range}</Box>
    </Box>
    <Box className={styles.cardContent}>
      <Typography className={styles.activityTitle}>
        {cardType === 'GameName' ? activityInfo?.name : activityInfo?.title}
      </Typography>
      <Typography className={styles.activitySubtitle}>
        {cardType === 'GameName' ? activityInfo?.title : activityInfo?.description}
      </Typography>
    </Box>
  </Box>
  </a>
}


interface GameActivityCarouselProps {
  activityList: Record<string, any>[]
}

const GameActivityCarousel: React.FC<GameActivityCarouselProps> = (props) => {
  const { activityList } = props
  const isMobileSize = useMediaQuery("(max-width: 600px)")

  return <Box className={styles.activityBox}>
    {/* 在 pc 状态如果少于 2 张卡片，直接显示两张卡片 */}
    {
      !isMobileSize && activityList.length <= 2 ?
        <Box className={styles.singleCardBox}>
          {activityList?.map((item, index) =>
            <GameActivityCard key={index} activityInfo={item} />)}
        </Box>
        :
        <Slider
          className={styles.sliderBox}
          dots={activityList.length > 2 || isMobileSize}
          speed={500}
          autoplay={true}
          infinite={true}
          slidesToShow={!isMobileSize && activityList.length > 2 ? 2 : 1}
          slidesToScroll={!isMobileSize && activityList.length > 2 ? 2 : 1}
          centerPadding="2.67rem"
          appendDots={(dots) => (
            <div > <ul > {dots} </ul> </div>
          )}
          customPaging={i => (
            <span className={styles.dotItem}></span>
          )}
          prevArrow={<Box><NavigateBeforeIcon /></Box>}
          nextArrow={<Box><NavigateNextIcon /></Box>}
        >
          {
            activityList?.map((item, index) => <GameActivityCard key={index} activityInfo={item} />)
          }
        </Slider>
    }
  </Box>
}

export default GameActivityCarousel