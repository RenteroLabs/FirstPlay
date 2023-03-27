import { Box, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import Image from "next/image";

interface ActivityCardProps {
  activityInfo: Record<string, any>
}

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
  const { activityInfo } = props

  return <a href={activityInfo?.link} target="_blank" rel="noreferrer"  >
    <Box className={styles.activityBox}>
      <Box className={styles.imageBox}>
        <Image src={activityInfo?.image} layout="fill" />
      </Box>
      <Box className={styles.activityInfo}>
        <Typography variant="h3">{activityInfo?.name}</Typography>
        <Typography>{activityInfo?.description}</Typography>
        <Box className={styles.activityTimeRange}>{activityInfo?.time_range}</Box>
      </Box>
    </Box>
  </a>
}

export default ActivityCard