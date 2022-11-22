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
  const { getRewarded, rewardCount, gameInfo } = props

  return <Box className={cx({
    smallGameCard: true,
    activeCard: getRewarded != 0
  })}>
    <Box className={styles.gameCover}>
      <Image src={gameInfo.image} layout="fill" objectFit='cover' quality={100} />
    </Box>

    <Box className={cx({ cardContent: true, })}>
      <Typography variant='h3'>{gameInfo?.name}</Typography>
      <Box className={styles.rewardInfo}>
        <Box className={styles.iconBox}>
          <Image src={REWARD_ACTIVE_ICON} layout="fill" />
        </Box>
        {getRewarded > 0 ? <span>{getRewarded}</span> : 0}/{rewardCount}
      </Box>
      <Box className={styles.rewardDesc}>
        {
          gameInfo?.rewards?.map((item: string, index: number) =>
            <Typography key={index}>Reward{index + 1}: {item}</Typography>
          )
        }
        {/* <Typography>Reward 1 : Share 500U </Typography> */}
        {/* <Typography>Reward 2 : Share 500U </Typography> */}
      </Box>
    </Box>
  </Box>
}

export default GameSallCard