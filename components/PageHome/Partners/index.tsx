import { Box, Typography } from "@mui/material";
import React from "react";
import SectionTitle from "../components/SectionTitle";
import styles from './styles.module.scss'
import Slider from "react-slick";

interface PartnerProps {
  gameList: Record<string, any>[]
}

const Partner: React.FC<PartnerProps> = (props) => {
  const { gameList } = props
  console.log(gameList)

  return <Box className={styles.partner}>
    <Box className={styles.partnerBox}>
      <Typography variant="h3">Partner</Typography>
      <Box className={styles.gameList}>
        <Slider
          className={styles.sliderBox}
          centerMode={true}
          infinite={true}
          autoplay={true}
          slidesToShow={3.6}
          speed={500}
        >
          {
            gameList.map((item, index) =>
              <Box className={styles.gameItem} key={index}>
                <img src={item?.logo} />
                <Typography>{item?.name}</Typography>
              </Box>)
          }
        </Slider>
      </Box>
    </Box>
  </Box>
}

export default Partner