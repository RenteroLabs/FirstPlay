import { Box, Dialog, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './styles.module.scss'

interface ConfirmModal {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  setTxLoading: (arg0: boolean) => any;
  setTxHash: (arg0: string) => any;
  chainId: number;
  chainName: string;
}

const ActicvChainConfirm: React.FC<ConfirmModal> = (props) => {
  const { showModal, setShowModal, chainId, chainName, setTxLoading, setTxHash } = props

  const handleClose = () => setShowModal(false)

  const handleActivateChain = () => {
    // 判断当时是否在目标链上，否则需要切换链

    // 合约方法调用

    // 关闭确认弹窗
    setShowModal(false)
    // 开启 Tx loading 弹窗
    setTxLoading(true)

    setTimeout(() => {
      // setTxLoading(false)
      setTxHash('llll')
    }, 5000)
  }

  return <Dialog open={showModal} onClose={handleClose}>
    <Box className={styles.activeChainConfirm}>
      <Box className={styles.modalHeader}>
        <IconButton disableRipple >
          <ArrowBackIosNewIcon sx={{ display: 'none' }} />
        </IconButton>
        <Typography>Activate Chain</Typography>
        <IconButton
          disableRipple
          onClick={() => { setShowModal(false) }}
        ><CloseIcon /></IconButton>
      </Box>
      <Box className={styles.modalContent}>
        <Typography>Are you sure to activate the trial access of the {chainName} chain?</Typography>
        <Box className={styles.activeBtn} onClick={handleActivateChain}>Confirm and Activate</Box>
      </Box>
    </Box>
  </Dialog>
}

export default ActicvChainConfirm