import { Box, Divider, Typography } from '@mui/material'
import { BNB_ICON, ETHEREUM_ICON } from 'constants/static'
import React, { useState } from 'react'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add';
import styles from './styles.module.scss'

import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

interface ChainActiveButtonProps {
  chainId: number,
  isActived: boolean,
  setShowModal: (arg: boolean) => any;
  setActiveChainInfo: (args: { chainId?: number, chainName?: string }) => any;
}

const CHINA_ID_MAP: Record<number, { name: string, icon: string }> = {
  1: {
    name: "ETH",
    icon: ETHEREUM_ICON,
  },
  5: {
    name: "Goerli",
    icon: ETHEREUM_ICON,
  },
  56: {
    name: "BSC",
    icon: BNB_ICON,
  },
  97: {
    name: "BSC-Test",
    icon: BNB_ICON,
  },
  137: {
    name: 'Polygon',
    icon: "/polygon-matic-logo.svg",
  },
  80001: {
    name: 'Mumbai',
    icon: "/polygon-matic-logo.svg",
  }
}

const ChainActiveButton: React.FC<ChainActiveButtonProps> = (props) => {
  const { chainId, isActived, setShowModal, setActiveChainInfo } = props

  return <Box
    className={cx({
      defaultBtn: true,
      activedBtn: isActived
    })}
    onClick={() => {
      if (!isActived) {
        setActiveChainInfo({
          chainName: CHINA_ID_MAP[chainId]?.name,
          chainId: chainId
        })
        setShowModal(true)
      }
    }}
  >
    <Box className={styles.chainIcon}>
      <Image src={CHINA_ID_MAP[chainId]?.icon} layout="fill" objectFit="cover" />
    </Box>
    <p className={styles.chainName}>{CHINA_ID_MAP[chainId]?.name}</p>
    {
      !isActived && <>
        <Divider orientation="vertical" sx={{ m: "0 0.6rem 0 0.8rem" }} />
        <AddIcon className={styles.activeIcon} />
      </>
    }
  </Box>
}

export default ChainActiveButton