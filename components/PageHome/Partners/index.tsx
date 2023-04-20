import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import styles from './styles.module.scss'
import Slider from "react-slick";
import { reverse } from "lodash";

interface PartnerProps {
  gameList: Record<string, any>[]
}

const Partner: React.FC<PartnerProps> = (props) => {
  const { gameList } = props

  // 获取含有 Bounty 的游戏作为 Partner 数据
  const partnerList = useMemo(() => {
    let list: Record<string, any> = {}

    gameList.forEach(item => {
      const gameInfo = item?.attributes?.game_info
      list[gameInfo?.data?.attributes?.GameUUID] = gameInfo?.data?.attributes
    })
    return reverse(Object.values(list))
  }, [gameList])

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
            partnerList.map((item, index) =>
              <Box className={styles.gameItem} key={index}>
                <img src={item?.logo?.data?.attributes?.url} />
                <Typography>{item?.GameName}</Typography>
              </Box>)
          }
        </Slider>
      </Box>
    </Box>
  </Box>
}

export default Partner