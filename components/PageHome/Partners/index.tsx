import { Box, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import Slider from "react-slick";

interface PartnerProps {
  gameList: Record<string, any>[]
}

const Partner: React.FC<PartnerProps> = (props) => {
  const { gameList } = props

  return <Box className={styles.partner}>
    <Box className={styles.partnerBox}>
      <Typography variant="h3">Partner</Typography>
      <Box className={styles.gameList}>
        <Slider
          className={styles.sliderBox}
          centerMode={true}
          infinite={true}
          autoplay={true}
          swipeToSlide={true}
          slidesToShow={3.6}
          speed={2000}
          autoplaySpeed={2000}
          cssEase="linear"
          variableWidth={true}
        >
          {
            gameList.map((item, index) =>
              <Box className={styles.gameItem} key={index}>
                <img src={item?.attributes?.logo?.data?.attributes?.url} />
                <Typography>{item?.attributes?.GameName}</Typography>
              </Box>)
          }
        </Slider>
      </Box>
    </Box>
  </Box>
}

export default Partner