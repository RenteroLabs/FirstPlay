import { Box, Dialog, IconButton, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './styles.module.scss'
import { useContract, useNetwork, useSigner, useSwitchNetwork, useWaitForTransaction } from 'wagmi';
import { MULTI_CHAIN_SWITCH_CHAINID, MULTI_CHAIN_SWITCH_CONTRACT } from 'constants/contract';
import { MULTI_CHAIN_SWITCH } from 'constants/abi';
import { toast } from 'react-toastify';

interface ConfirmModal {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  setTxLoading: (arg0: boolean) => any;
  setTxHash: (arg0: string) => any;
  txHash: string;
  chainId: number;
  chainName: string;
}

/**
 * 激活链试玩权限弹窗
 * @param props 
 * @returns 
 */
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
      // 成功提示 Toast
      toast.success(`Congratulation! You've activated trial qualification on ${chainName}.\nStatus will be synced within 2 to 3 minutes`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      })
    },
    onSettled: () => {
      setTxLoading(false)
      setTxHash("")
    }
  })

  const handleActivateChain = async () => {
    // 判断当时是否在目标链上，否则需要切换链
    if ((MULTI_CHAIN_SWITCH_CHAINID !== chain?.id || (pendingChainId && MULTI_CHAIN_SWITCH_CHAINID !== pendingChainId))
      && switchNetwork) {
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

    } catch (err: any) {
      setTxLoading(false)
      toast.error(err?.error?.message || err?.message || err.toString(), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
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