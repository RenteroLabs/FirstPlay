import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'

interface GameSamllCardProps {
  rewardCount: number,
  getRewarded: number,
  gameInfo: Record<string, any>
}

const GameSallCard: React.FC<GameSamllCardProps> = (props) => {
  const { } = props

  return <Box className={styles.smallGameCard}>
    <Box className={styles.gameCover}>
      <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/AlongWithTheGods.jpg" layout="fill" objectFit='cover' />
    </Box>
    <Box className={styles.cardContent}>
      <Typography>BigTime</Typography>
      <Box></Box>
    </Box>
  </Box>
}

export default GameSallCard