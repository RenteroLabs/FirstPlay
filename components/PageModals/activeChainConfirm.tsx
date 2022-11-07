import { Box, Dialog, IconButton, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './styles.module.scss'
import { useContract, useNetwork, useSigner, useSwitchNetwork, useWaitForTransaction } from 'wagmi';
import { MULTI_CHAIN_SWITCH_CHAINID, MULTI_CHAIN_SWITCH_CONTRACT } from 'constants/contract';
import { MULTI_CHAIN_SWITCH } from 'constants/abi';

interface ConfirmModal {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  setTxLoading: (arg0: boolean) => any;
  setTxHash: (arg0: string) => any;
  txHash: string;
  chainId: number;
  chainName: string;
}


const ActicvChainConfirm: React.FC<ConfirmModal> = (props) => {
  const { showModal, setShowModal, chainId, chainName, setTxLoading, setTxHash, txHash } = props

  const handleClose = () => setShowModal(false)

  const { data: signer } = useSigner()
  const { chain } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()

  const MultiChainSwitch = useContract({
    contractInterface: MULTI_CHAIN_SWITCH,
    addressOrName: MULTI_CHAIN_SWITCH_CONTRACT,
    signerOrProvider: signer
  })

  useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      // 刷新页面数据
      // reloadInfo()

      // 成功提示 Toast

    },
    onSettled: () => {
      setTxLoading(false)
      setTxHash("")
    }
  })

  const handleActivateChain = async () => {
    // 判断当时是否在目标链上，否则需要切换链
    if ((MULTI_CHAIN_SWITCH_CHAINID !== chain?.id || MULTI_CHAIN_SWITCH_CHAINID !== pendingChainId) && switchNetwork) {
      switchNetwork(MULTI_CHAIN_SWITCH_CHAINID)
      return
    }

    try {
      // 关闭确认弹窗
      setShowModal(false)
      // 开启 Tx loading 弹窗
      setTxLoading(true)

      const { hash } = await MultiChainSwitch.unlock(chainId)
      setTxHash(hash)
    } catch (err) {
      setTxLoading(false)
      console.log(err)
    }
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