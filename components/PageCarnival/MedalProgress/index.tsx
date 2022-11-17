import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './styles.module.scss'

interface MedalProgressProps {
  totalMedals: number,
  getMedals: number,
}

const MedalProgress: React.FC<MedalProgressProps> = (props) => {
  const { totalMedals, getMedals} = props

  return <Box className={styles.progressBox}>
    <Box className={styles.linerProgress}>
      <Box className={styles.activeLiner} sx={{ width: `${Number((getMedals * 100) / totalMedals).toFixed(1)}%`}}></Box>
    </Box>
    <Typography><span>{getMedals}</span> / {totalMedals}</Typography>
  </Box>
}

export default MedalProgress