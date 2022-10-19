import { Box, Drawer, Typography } from '@mui/material'
import React, { useState } from 'react'
import GameNFTDetail from '../GameNFTDetail'
import styles from './style.module.scss'
import Image from 'next/image'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface TrialNFTCardProps {
  type?: '@normal' | '@modal'
}

const TrialNFTCard: React.FC<TrialNFTCardProps> = (props) => {
  const { type = '@normal' } = props

  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  return <Box className={styles.nftBox}>
    <Box className={styles.coverBox}>
      <Box className={styles.coverType1}>
        <Image src="https://tva1.sinaimg.cn/large/008vxvgGly1h79l9fwr1pj30cs0cuaax.jpg" layout="fill" />
      </Box>
    </Box>
    <Box className={cx({
      nftInfo: true,
      modalSizeCardInfo: type === '@modal'
    })}>
      <Typography className={styles.nftName}>NFT Name</Typography>
      <Box className={styles.trialInfo}>
        <Typography>Trial Period</Typography>
        <Typography className={styles.trialDay}>5 Days</Typography>
      </Box>
      {type === '@normal' && <Box
        className={styles.trialBtn}
        onClick={() => setShowDrawer(true)}
      >
        Trial
      </Box>}
    </Box>

    <GameNFTDetail showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
  </Box>
}

export default TrialNFTCard