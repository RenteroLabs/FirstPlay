import { Box, Drawer, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import GameNFTDetail from '../GameNFTDetail'
import styles from './style.module.scss'
import Image from 'next/image'
import classNames from 'classnames/bind'
import { TIME_ICON } from 'constants/static'
import { PackageRes } from 'types/graph'
import { formatLeftTime } from 'util/format'
import { useCountDown, useRequest } from 'ahooks'
import { getNFTsMetadata } from 'services/metadata'

const cx = classNames.bind(styles)

interface ProfileNFTCardProps {
  nftInfo: PackageRes
}

const ProfileNFTCard: React.FC<ProfileNFTCardProps> = (props) => {
  const { nftInfo } = props

  // const [showDrawer, setShowDrawer] = useState<boolean>(false)
  // TODO: 当前处理的都是 单 NFT package
  const [metadata, setMetadata] = useState<Record<string, any>[]>([])

  const [_, { days: LEFT_DAY, hours: LEFT_HOUR, minutes: LEFT_MIN }] = useCountDown({
    targetDate: Number(nftInfo.expires) * 1000
  })

  const { loading } = useRequest(getNFTsMetadata, {
    defaultParams: [{
      chain: "goerli",
      nfts: nftInfo?.nfts?.map(({ nftAddress, tokenId }) => ({ contract: nftAddress, token_id: tokenId }))
    }],
    ready: Boolean(nftInfo?.nfts),
    onSuccess: (({ data }) => {
      setMetadata(data)
    })
  })

  return <Box className={styles.nftBox}>
    <Box className={styles.coverBox}>
      <Box className={styles.coverType1}>
        {metadata.length == 1 &&
          <Image width="300" height="300" src={metadata[0].metadata.image} layout="fill" />
        }
      </Box>
    </Box>
    <Box className={cx({ nftInfo: true })}>
      <Typography className={styles.nftName}>{metadata[0]?.metadata?.name}</Typography>
      <Typography variant='h3' className={styles.nftIds}>#{metadata[0]?.token_id}</Typography>
      <Box className={styles.trialInfo}>
        <Typography className={styles.leftDay}>{LEFT_DAY}Day {LEFT_HOUR}Hour {LEFT_MIN}Min  Left</Typography>
        <Box sx={{ flexShrink: 0 }}>
          <Image src={TIME_ICON} width="16" height="16" />
        </Box>
      </Box>
      <Box
        className={styles.trialBtn}
        onClick={() => { }}
      >
        Trial Game
      </Box>
    </Box>

    {/* <GameNFTDetail showDrawer={showDrawer} setShowDrawer={setShowDrawer} /> */}
  </Box>
}

export default ProfileNFTCard