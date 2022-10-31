import { Box, Drawer, Typography } from '@mui/material'
import React, { useState } from 'react'
import GameNFTDetail from '../GameNFTDetail'
import styles from './style.module.scss'
import Image from 'next/image'
import classNames from 'classnames/bind'
import { TIME_ICON } from 'constants/static'

const cx = classNames.bind(styles)

interface ProfileNFTCardProps {
}

const ProfileNFTCard: React.FC<ProfileNFTCardProps> = (props) => {
  const { } = props

  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  return <Box className={styles.nftBox}>
    <Box className={styles.coverBox}>
      <Box className={styles.coverType1}>
        <Image src="https://tva1.sinaimg.cn/large/008vxvgGly1h79l9fwr1pj30cs0cuaax.jpg" layout="fill" />
      </Box>
    </Box>
    <Box className={cx({ nftInfo: true })}>
      <Typography className={styles.nftName}>NFT Name</Typography>
      <Typography variant='h3' className={styles.nftIds}>#1002</Typography>
      <Box className={styles.trialInfo}>
        <Typography className={styles.leftDay}>3Day 4Hour 12Min  Left</Typography>
        <Box >
          <Image src={TIME_ICON} width="16" height="16" />
        </Box>
      </Box>
      <Box
        className={styles.trialBtn}
        onClick={() => setShowDrawer(true)}
      >
        Trial Game
      </Box>
    </Box>

    <GameNFTDetail showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
  </Box>
}

export default ProfileNFTCard