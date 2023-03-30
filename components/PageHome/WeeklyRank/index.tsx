import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import SectionTitle from "../components/SectionTitle";
import styles from './styles.module.scss';

interface WeeklyRankProps {
  weeklyRankList: Record<string, any>[]
}

const WeeklyRank: React.FC<WeeklyRankProps> = (props) => {
  const { weeklyRankList } = props
  // console.log(weeklyRankList)

  return <Box className={styles.weeklyRank}>
    <Box className={styles.weeklyRankBox}>
      <SectionTitle emphasize="Weekly Ranking" />
      <Slider
        className={styles.sliderBox}
        dots={false}
        speed={500}
        focusOnSelect={true}
        autoplay={true}
        autoplaySpeed={5000}
        pauseOnHover={false}
        infinite={true}
        slidesToShow={2.7}
        slidesToScroll={1}
        // swipeToSlide={true}
        centerMode={true}
        variableWidth={true}
      >
        {
          weeklyRankList?.map((item, index) => {
            const { link, cover } = item
            return <Box className={styles.sliderItem} key={index}>
              <img src={cover?.data?.attributes?.url} />
            </Box>
          })
        }
      </Slider>
    </Box>
  </Box>
}

export default WeeklyRank