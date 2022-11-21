import { Box, Typography, useMediaQuery } from '@mui/material'
import { REWARD_ACTIVE_ICON } from 'constants/static'
import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'
import classname from 'classnames/bind'
import { useIsMounted } from 'hooks/useIsMounted'

const cx = classname.bind(styles)

interface RewardItemProps {
  index: number,
  reward: string,
  isClaimed: boolean,
  claimLink: string,
  medalNum: number
}

const CarnivalRewardItem: React.FC<RewardItemProps> = (props) => {
  const { index, reward, isClaimed, claimLink, medalNum } = props
  const isMobileSize = useMediaQuery("(max-width:600px)")
  const isMounted = useIsMounted()


  return isMounted && isMobileSize ?
    <Box className={styles.mobileCarnivalRewardItem}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <Typography>{reward}</Typography>
      <Box className={styles.actionArea}>
        <Box className={cx({
          claimBtn: true,
          claimedBtn: isClaimed
        })}>
          {isClaimed ? "Completed" : 'Claim'}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box className={styles.rewardIcon}>
            <Image src={REWARD_ACTIVE_ICON} layout="fill" />
          </Box>
          <Box component="span">+ {medalNum}</Box>
        </Box>
      </Box>
    </Box>
    :
    <Box className={styles.carnivalRewardItem}>
      <Box className={styles.rewardIndex}>{index.toString().padStart(2, '0')}</Box>
      <Typography>{reward}</Typography>
      <Box className={cx({
        claimBtn: true,
        claimedBtn: isClaimed
      })}>
        {isClaimed ? "Completed" : 'Claim'}
      </Box>
      <Box className={styles.rewardIcon}>
        <Image src={REWARD_ACTIVE_ICON} layout="fill" />
      </Box>
      <Box component="span">+ {medalNum}</Box>
    </Box>
}

export default CarnivalRewardItem