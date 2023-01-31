import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useMemo, useState } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import WithdrawBalanceModal from "@/components/PageModals/WithdrawBalance";
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

interface BalanceTokenItemProps {
  tokenInfo: Record<string, any>
  reload: (arg?: any) => any
}

const BalanceTokenItem: React.FC<BalanceTokenItemProps> = (props) => {
  const { tokenInfo, reload } = props

  const is600Size = useMediaQuery("(max-width: 600px)")
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleWithdrawBalance = () => {
    if (disableBtn) return
    setShowModal(true)
  }

  const disableBtn = useMemo(() => {
    if (tokenInfo?.balance == 0) {
      return true
    }
    if (tokenInfo?.status != 'withdrawable') {
      return true
    }

    return false
  }, [tokenInfo])

  return <Box className={styles.tokenItem}>
    <Box className={styles.tokenInfo}>
      <Box className={styles.tokenLogo}>
        <Image src="/usdt_logo_circle.png" layout="fill" />
      </Box>
      <Typography variant="h4" className={styles.tokenSymbol}>USDT</Typography>
      <Typography variant="subtitle1" className={styles.tokenName}>TetherUS</Typography>
    </Box>
    <Box className={styles.balanceInfo}>
      {!is600Size && <Typography variant="subtitle1" className={styles.amountText}>Amount</Typography>}
      <Typography variant="h4">{tokenInfo?.balance}</Typography>
    </Box>
    <Box
      className={cx({
        withdrawBtn: true,
        disableWithdrawBtn: disableBtn
      })}
      onClick={handleWithdrawBalance}>
      {tokenInfo?.status == 'withdrawing' ? 'Withdrawing' : 'Withdraw'}
    </Box>

    <WithdrawBalanceModal
      showModal={showModal}
      setShowModal={setShowModal}
      tokenInfo={tokenInfo}
      reload={reload}
    />
  </Box>
}


export default BalanceTokenItem