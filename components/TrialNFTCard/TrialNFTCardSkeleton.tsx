import { Box, Skeleton } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'


const TrialNFTCardSkeleton: React.FC = () => {

  return <Box className={styles.skeletonBox}>
    <Box className={styles.coverBox}>
      <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" sx={{ paddingBottom: '100%' }} />
    </Box>
    <Box className={styles.nftInfo}>
      <Skeleton animation="wave" height="2.5rem" width="50%" />
      <Box className={styles.trialInfo}>
        <Skeleton animation="wave" />
      </Box>
    </Box>
  </Box>
}

export default TrialNFTCardSkeleton