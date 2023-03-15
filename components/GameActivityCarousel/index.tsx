import React from "react";

import Slider from 'react-slick'
import { Box } from "@mui/material";
import styles from './styles.module.scss'
import Image from "next/image";
import { Typography } from "antd";

interface GameActivityCardProps {
  activityInfo: Record<string, any>
}

const GameActivityCard: React.FC<GameActivityCardProps> = (props) => {
  const { activityInfo } = props

  return <a href={activityInfo?.link} target="_blank" rel="noreferrer" ><Box className={styles.activityCard}>
    <Box className={styles.cardImage}>
      <img src={activityInfo?.image} />
      <Box className={styles.imageMask}>{activityInfo?.time_range}</Box>
    </Box>
    <Box className={styles.cardContent}>
      <Typography className={styles.activityTitle}>{activityInfo?.title}</Typography>
      <Typography className={styles.activitySubtitle}>{activityInfo?.description}</Typography>
    </Box>
  </Box>
  </a>
}


interface GameActivityCarouselProps {
  activityList: Record<string, any>[]
}

const GameActivityCarousel: React.FC<GameActivityCarouselProps> = (props) => {
  const { activityList } = props

  return <Box className={styles.activityBox}>
    <Slider
      className={styles.sliderBox}
      dots={true}
      speed={500}
      autoplay={true}
      infinite={true}
      slidesToShow={1}
      slidesToScroll={1}
      appendDots={(dots) => (
        <div > <ul > {dots} </ul> </div>
      )}
      customPaging={i => (
        <span className={styles.dotItem}></span>
      )}
    >
      {
        activityList?.map((item, index) => <GameActivityCard key={index} activityInfo={item} />)
      }
    </Slider>
  </Box>
}

export default GameActivityCarousel