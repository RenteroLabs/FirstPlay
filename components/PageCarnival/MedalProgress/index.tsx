import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './styles.module.scss'

interface MedalProgressProps {
  totalMedals: number,
  getMedals: number,
  percent: number,
}

const MedalProgress: React.FC<MedalProgressProps> = (props) => {
  const { totalMedals, getMedals, percent = 50} = props

  return <Box className={styles.progressBox}>
    <Box className={styles.linerProgress}>
      <Box className={styles.activeLiner} sx={{ width: `${percent}%`}}></Box>
    </Box>
    <Typography><span>3</span> / 23</Typography>
  </Box>
}

export default MedalProgress