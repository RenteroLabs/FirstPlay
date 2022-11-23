import { Box, Typography, useMediaQuery } from '@mui/material'
import { REWARD_ACTIVE_ICON } from 'constants/static'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import classname from 'classnames/bind'
import { useIsMounted } from 'hooks/useIsMounted'
import GiftCodeModal from '../GiftCodeModal'

const cx = classname.bind(styles)

interface RewardItemProps {
  index: number,
  reward: string,
  isClaimed: boolean,
  claimLink: string,
  medalNum: number,
  gameId: string
}

const GiftbagGame = '740a1e44-fd84-433e-98df-be90d650eb51'

const CarnivalRewardItem: React.FC<RewardItemProps> = (props) => {
  const { index, reward, isClaimed, claimLink, medalNum, gameId } = props
  const isMobileSize = useMediaQuery("(max-width:600px)")
  const isMounted = useIsMounted()

  const [showGiftModal, setShowGiftModal] = useState<boolean>(false)

  const [giftCode, setGiftCode] = useState<string>("")

  const linkToForm = () => {
    if (!isClaimed) {
      window.open(claimLink)
    }
  }

  return isMounted && isMobileSize ?
    <Box className={styles.mobileCarnivalRewardItem}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <Typography>{reward}</Typography>
      <Box className={styles.actionArea}>
        <Box
          className={cx({
            claimBtn: true,
            claimedBtn: isClaimed
          })}
          onClick={linkToForm}
        >
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
      {index === 1 &&
        gameId === GiftbagGame &&
        <Box className={styles.giftBtn} onClick={() => setShowGiftModal(true)}>
          Gift Code
        </Box>}
      <Box className={cx({
        claimBtn: true,
        claimedBtn: isClaimed
      })}
        onClick={linkToForm}
      >
        {isClaimed ? "Completed" : 'Claim'}
      </Box>
      <Box className={styles.rewardIcon}>
        <Image src={REWARD_ACTIVE_ICON} layout="fill" />
      </Box>
      <Box component="span">+ {medalNum}</Box>
      <GiftCodeModal
        showGiftModal={showGiftModal}
        setShowGiftModal={setShowGiftModal}
        giftCode={giftCode}
      />
    </Box>
}

export default CarnivalRewardItem