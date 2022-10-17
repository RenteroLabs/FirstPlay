import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'

interface TrialNFTCardProps {

}

const TrialNFTCard: React.FC<TrialNFTCardProps> = (props) => {
  const { } = props

  return <Box className={styles.nftBox}>
    <Box className={styles.coverBox}>

    </Box>
    <Box className={styles.nftInfo}>
      <Typography className={styles.nftName}>NFT Name</Typography>
      <Box className={styles.trialInfo}>
        <Typography>Trial Period</Typography>
        <Typography className={styles.trialDay}>5 Days</Typography>
      </Box>
      <Box className={styles.trialBtn}>
        Trial
      </Box>
    </Box>
  </Box>
}

export default TrialNFTCard