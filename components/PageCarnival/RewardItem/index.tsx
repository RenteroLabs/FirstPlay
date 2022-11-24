import { Box, Typography, useMediaQuery } from '@mui/material'
import { REWARD_ACTIVE_ICON } from 'constants/static'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import classname from 'classnames/bind'
import { useIsMounted } from 'hooks/useIsMounted'
import GiftCodeModal from '../GiftCodeModal'
import { useLocalStorageState, useRequest } from 'ahooks'
import { queryGameGiftCode } from 'services/carnival'

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

  const [giftCode, setGiftCode] = useState<string>("XXXXXXX")

  const linkToForm = () => {
    if (!isClaimed) {
      window.open(claimLink)
    }
  }

  const [localGiftCode, setLocalGiftCode] = useLocalStorageState("GIFTCODE")
  const [recordTime, setRecordTime] = useLocalStorageState("RECORD_TIME")


  // const 
  const { run: getGiftCode } = useRequest(queryGameGiftCode, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data, data.key, new Date().getTime())
      setGiftCode(data.key)
      setLocalGiftCode(data?.key)
      setRecordTime(new Date().getTime())
    }
  })

  // 首先判断本地存不存在有效 giftcode
  useEffect(() => {
    console.log(localGiftCode, recordTime)
    if (localGiftCode && recordTime) {
      if (new Date().getTime() - Number(recordTime) < (86400 * 1000)) {
        setGiftCode(localGiftCode as string)
      }
    }
  }, [])

  const handleClickGiftBtn = () => {
    // 判断本地有没有
    if (giftCode === "XXXXXXX") {
      getGiftCode({ game_id: gameId}) 
    }
    setShowGiftModal(true)
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
        {index === 1 &&
          gameId === GiftbagGame &&
          <Box className={styles.giftBtn} onClick={handleClickGiftBtn}>
            Gift Code
          </Box>}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box className={styles.rewardIcon}>
            <Image src={REWARD_ACTIVE_ICON} layout="fill" />
          </Box>
          <Box component="span">+ {medalNum}</Box>
        </Box>
      </Box>
      <GiftCodeModal
        showGiftModal={showGiftModal}
        setShowGiftModal={setShowGiftModal}
        giftCode={giftCode}
      />
    </Box>
    :
    <Box className={styles.carnivalRewardItem}>
      <Box className={styles.rewardIndex}>{index.toString().padStart(2, '0')}</Box>
      <Typography>{reward}</Typography>
      {index === 1 &&
        gameId === GiftbagGame &&
        <Box className={styles.giftBtn} onClick={handleClickGiftBtn}>
          <Box>
            <Image src="/gift_code.png" layout="fill" />
          </Box>
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