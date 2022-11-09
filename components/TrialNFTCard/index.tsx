import { Box, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import GameNFTDetail from '../GameNFTDetail'
import styles from './style.module.scss'
import Image from 'next/image'
import classNames from 'classnames/bind'
import { PackageRes } from 'types/graph'
import { useRequest } from 'ahooks'
import { getNFTsMetadata } from 'services/metadata'

const cx = classNames.bind(styles)

interface TrialNFTCardProps {
  packageInfo: PackageRes
  chainId: number
  type?: '@normal' | '@modal'
}

/**
 * 试玩游戏 NFT 卡片
 * @param props 
 * @returns 
 */
const TrialNFTCard: React.FC<TrialNFTCardProps> = (props) => {
  const { type = '@normal', packageInfo, chainId } = props

  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<Record<string, any>[]>([])

  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])
  const isTrialing = useMemo(() => {
    if (Number(packageInfo?.expires || 0) > Number(timestamp)) {
      return true
    } else {
      return false
    }
  }, [timestamp, packageInfo])

  const { run: queryNFTMeta, loading } = useRequest(getNFTsMetadata, {
    manual: true,
    ready: Boolean(packageInfo?.nfts),
    onSuccess: (({ data }) => {
      console.log(data)
      setMetadata(data)
    })
  })

  useEffect(() => {
    queryNFTMeta({
      chainId: chainId,
      nfts: packageInfo?.nfts?.map(({ nftAddress, tokenId }) => ({ contract: nftAddress, token_id: tokenId }))
    })
  }, [packageInfo])

  return <Box className={styles.nftBox}>
    <Box className={styles.coverBox}>
      <Box className={styles.coverType1}>
        {metadata.length == 1 &&
          <Image width="300" height="300" src={metadata[0].metadata.image} layout="fill" />
        }
      </Box>
      {isTrialing && <Box className={styles.imageMask}>
        <Image src="/Trialed.png" width="200" height="200" alt='Trialing' />
      </Box>}
    </Box>
    <Box className={cx({
      nftInfo: true,
      modalSizeCardInfo: type === '@modal'
    })}>
      <Typography className={styles.nftName}>{metadata[0]?.metadata.name} #{metadata[0]?.token_id}</Typography>
      <Box className={styles.trialInfo}>
        <Typography>Trial Period</Typography>
        <Typography className={styles.trialDay}>{packageInfo?.playDays} Days</Typography>
      </Box>
      {type === '@normal' && <Box
        className={styles.trialBtn}
        onClick={() => setShowDrawer(true)}
      >
        {isTrialing ? "Detail" : "Trial"}
      </Box>}
    </Box>

    <GameNFTDetail
      showDrawer={showDrawer}
      setShowDrawer={setShowDrawer}
      metadata={metadata}
      chainId={chainId}
      packageInfo={packageInfo}
    />
  </Box>
}

export default TrialNFTCard