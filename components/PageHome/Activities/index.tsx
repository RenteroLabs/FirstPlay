import ActivityCard from "@/components/ActivityCard";
import GameActivityCarousel from "@/components/GameActivityCarousel";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import SectionTitle from "../components/SectionTitle";
import styles from './styles.module.scss'

interface ActivitiesProps {
  activityList: Record<string, any>[]
}

const Activities: React.FC<ActivitiesProps> = (props) => {
  const { activityList } = props

  const isMobileSize = useMediaQuery("(max-width: 600px)")

  return <Box className={styles.activity}>
    <Box className={styles.activityBox}>
      <SectionTitle emphasize="Activities" moreLink="/activities" />
      {/* 移动端 轮播图卡片样式 */}
      {
        isMobileSize
          ? <Box sx={{ marginTop: '1rem' }}><GameActivityCarousel activityList={activityList} /></Box>
          : <Box className={styles.activityList}>
            {activityList?.map((item, index) => <ActivityCard activityInfo={item} key={index} />)}
          </Box>
      }
    </Box>
  </Box>
}


export default Activities