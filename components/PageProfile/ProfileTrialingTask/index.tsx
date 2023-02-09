import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface TrialingTask {
  taskInfo: Record<string, any>
}

const ProfileTrialingTask: React.FC<TrialingTask> = (props) => {
  const { taskInfo } = props
  const t = useTranslations('Profile.Trialing')

  const is600Size = useMediaQuery('(max-width: 600px)')

  return <Link href={`/game/${taskInfo?.game_id}`} target="_blank">
    <Box className={styles.trialingTask}>
      <Box className={styles.taskInfo}>
        <Box className={styles.starLabelIcon}>
          <Image src="/reward_game_card_star_label.png" layout="fill" />
        </Box>

        {
          is600Size ?
            <Box className={styles.mobileGameTask}>
              <Typography variant="h4">{taskInfo?.name}</Typography>
              <Box className={styles.mobileGameLogo}>
                <Image src={taskInfo?.logo} layout="fill" />
              </Box>
            </Box> :
            <Typography variant="h4">{taskInfo?.name}</Typography>
        }

        <Box className={styles.divider}></Box>
        <Typography className={styles.taskName}>
          <span>{t("taskName")}: </span>
          {taskInfo?.task}
        </Typography>
        <Typography className={styles.rewardInfo}>
          <span>{t('rewardName')}: </span>
          {taskInfo?.rewards}
        </Typography>
      </Box>
      <Box className={styles.gameLogo}>
        <Image src={taskInfo?.logo} layout="fill" />
      </Box>
    </Box>
  </Link>
}

export default ProfileTrialingTask