import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import WithdrawBalanceModal from "@/components/PageModals/WithdrawBalance";

interface BalanceTokenItemProps {
  tokenInfo: Record<string, any>
}

const BalanceTokenItem: React.FC<BalanceTokenItemProps> = (props) => {
  const { } = props

  const is600Size = useMediaQuery("(max-width: 600px)")
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleWithdrawBalance = () => {

    setShowModal(true)
  }

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
      <Typography variant="h4">3</Typography>
    </Box>
    <Box className={styles.withdrawBtn} onClick={handleWithdrawBalance}>
      Withdraw
    </Box>

    <WithdrawBalanceModal showModal={showModal} setShowModal={setShowModal} />
  </Box>
}


export default BalanceTokenItem