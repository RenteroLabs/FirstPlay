import { Box, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import Image from "next/image";

interface BalanceTokenItemProps {
  tokenInfo: Record<string, any>
}

const BalanceTokenItem: React.FC<BalanceTokenItemProps> = (props) => {
  const { } = props

  return <Box className={styles.tokenItem}>
    <Box className={styles.tokenInfo}>
      <Box className={styles.tokenLogo}>
        <Image src="/usdt_logo.svg" layout="fill" />
      </Box>
      <Typography variant="h4" className={styles.tokenSymbol}>USDT</Typography>
      <Typography variant="subtitle1" className={styles.tokenName}>TetherUS</Typography>
    </Box>
    <Box className={styles.balanceInfo}>
      <Typography variant="subtitle1" className={styles.amountText}>Amount</Typography>
      <Typography variant="h4">3</Typography>
    </Box>
    <Box className={styles.withdrawBtn}>
      Withdraw
    </Box>
  </Box>
}


export default BalanceTokenItem