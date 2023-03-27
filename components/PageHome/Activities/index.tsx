import GameActivityCarousel from "@/components/GameActivityCarousel";
import { Box } from "@mui/material";
import React from "react";
import SectionTitle from "../components/SectionTitle";
import styles from './styles.module.scss'

interface ActivitiesProps {
  activityList: Record<string, any>[]
}

const Activities: React.FC<ActivitiesProps> = (props) => {
  const { activityList } = props

  return <Box className={styles.activity}>
    <Box className={styles.activityBox}>
      <SectionTitle emphasize="Activities" />
      <Box className={styles.activityList}>
        {/* 移动端 轮播图卡片样式 */}
        <GameActivityCarousel activityList={activityList} />
      </Box>
    </Box>
  </Box>
}


export default Activities