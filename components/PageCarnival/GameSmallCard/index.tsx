import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { REWARD_ACTIVE_ICON, REWARD_INACTIVE_ICON } from 'constants/static'

const cx = classNames.bind(styles)

interface GameSamllCardProps {
  rewardCount: number,
  getRewarded: number,
  gameInfo: Record<string, any>
}

const GameSallCard: React.FC<GameSamllCardProps> = (props) => {
  const { getRewarded, rewardCount } = props

  return <Box className={styles.smallGameCard}>
    <Box className={styles.gameCover}>
      <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/AlongWithTheGods.jpg" layout="fill" objectFit='cover' />
    </Box>
    <Box className={cx({
      cardContent: true,
      defaultNone: getRewarded == 0,
    })}>
      <Typography>BigTime</Typography>
      <Box className={styles.rewardInfo}>
        <Box className={styles.iconBox}>
          <Image src={REWARD_ACTIVE_ICON} layout="fill" />
        </Box>
        {getRewarded > 0 ? <span>{getRewarded}</span> : 0}/{rewardCount}
      </Box>
    </Box>
  </Box>
}

export default GameSallCard