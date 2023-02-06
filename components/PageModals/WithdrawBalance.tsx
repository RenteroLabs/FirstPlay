import { Dialog, Box, Typography, IconButton } from "@mui/material";
import React, { useMemo, useState } from "react";
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useConnectedType } from "hooks/useConnectedType";
import { useAccount, useSignMessage } from "wagmi";
import CircularProgress from '@mui/material/CircularProgress';
import { unipassInstance } from "pages/_app";
import { useRequest } from "ahooks";
import { withdrawTokenBalance } from "services/home";

interface WithdrawBalanceProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  tokenInfo: Record<string, any>
  reload: (arg?: any) => any
}

const WithdrawBalanceModal: React.FC<WithdrawBalanceProps> = (props) => {
  const { showModal, setShowModal, tokenInfo, reload } = props

  const connectedType = useConnectedType()
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false)
  const { address } = useAccount()

  const [formatMessage, timestamp] = useMemo(() => {
    if (showModal) {
      const timestamp = (new Date().getTime() / 1000).toFixed(0)
      const message = `${address?.toLocaleLowerCase().slice(2)}${tokenInfo?.token_symbol.toLocaleLowerCase()}${timestamp}`
      // const message = '68b826b34afb960632a56d770ff89439c00b185eusdt1674895640'
      return [message, timestamp]
    }
    return []
  }, [showModal])

  const { run: postWithdrawBalance, loading: postWithdrawLoading } = useRequest(withdrawTokenBalance, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      // 重新请求数据
      if (reload) {
        reload()
      }
      // 关闭弹窗
      setShowModal(false)
    }
  })

  // wagmi 签名信息
  const { signMessage } = useSignMessage({
    message: formatMessage,
    onSuccess: (data) => {
      console.log(data)
      postWithdrawBalance({
        address: address as string,
        signature: data as string,
        timestamp: Number(timestamp),
        token: tokenInfo?.token_symbol,
      })
    },
    onSettled: () => {
      setWithdrawLoading(false)
    }
  })

  // unipass 签名信息
  const handleUnipassSign = async () => {
    try {
      const signdata = await unipassInstance.signMessage(formatMessage as string)
      // const signdata = await unipassInstance.signMessage("123" as string)
      console.log(signdata)
      postWithdrawBalance({
        address: address as string,
        signature: signdata as string,
        timestamp: Number(timestamp),
        token: tokenInfo?.token_symbol,
        wallet: 'unipass',
      })
    } catch (err) {
      console.error(err)
    }

    setWithdrawLoading(false)
  }

  const handleWithdrawToken = async () => {
    if (withdrawLoading) return
    setWithdrawLoading(true)

    if (connectedType === '"Unipass"') {
      handleUnipassSign()
    } else {
      // wagmi sign message
      signMessage()
    }
  }

  return <Dialog
    className={styles.withdrawBalanceBox}
    open={showModal}
  >
    <Box className={styles.withdrawModal}>
      <IconButton disableRipple onClick={() => setShowModal(false)} className={styles.closeBtn}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h3">Withdraw all balance</Typography>

      <Box className={styles.balanceItem}>
        <Box className={styles.itemKey}>Token/Amount</Box>
        <Box className={styles.itemValue}>{tokenInfo?.balance} {tokenInfo?.token_symbol}</Box>
      </Box>
      <Box className={styles.networkItem}>
        <Box className={styles.itemKey}>Network</Box>
        <Box className={styles.itemValue}>BNB Smart Chain (BEP20)</Box>
      </Box>
      <Typography>
        Withdrawal application will be processed before 12 noon every Tuesday and Friday（UTC +8）. You can check the balance in the wallet later.
      </Typography>

      <Box
        className={`${styles.withdrawBtn} ${(withdrawLoading || postWithdrawLoading) && styles.loadingBtn}`}
        onClick={handleWithdrawToken}>
        Confirm and withdraw
        {(withdrawLoading || postWithdrawLoading) && <CircularProgress />}
      </Box>
    </Box>
  </Dialog>
}

export default WithdrawBalanceModal