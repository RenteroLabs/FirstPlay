import React from "react";

import Slider from 'react-slick'
import { Box } from "@mui/material";
import styles from './styles.module.scss'
import Image from "next/image";
import { Typography } from "antd";





interface GameActivityCardProps {

}

const GameActivityCard: React.FC<GameActivityCardProps> = (props) => {
  const { } = props

  return <Box className={styles.activityCard}>
    <Box className={styles.cardImage}>
      <img src="https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/background/Nine-Chronicles.jpg" />
      <Box className={styles.imageMask}>2023.01.24～2023.2.24</Box>

    </Box>
    <Box className={styles.cardContent}>
      <Typography className={styles.activityTitle}>Download,Sign up and Play</Typography>
      <Typography className={styles.activitySubtitle}>Get a genesis NFT WL and share $10,000 after test begin</Typography>
    </Box>
  </Box>
}




interface GameActivityCarouselProps {

}

const GameActivityCarousel: React.FC<GameActivityCarouselProps> = (props) => {

  const { } = props

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
      <GameActivityCard key={1} />
      <GameActivityCard key={2} />
      <GameActivityCard key={3} />
    </Slider>
  </Box>
}

export default GameActivityCarousel