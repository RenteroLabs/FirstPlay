import { Dialog, Box, Typography, IconButton } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close';

interface WithdrawBalanceProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
}

const WithdrawBalanceModal: React.FC<WithdrawBalanceProps> = (props) => {
  const { showModal, setShowModal } = props
  return <Dialog
    className={styles.withdrawBalanceBox}
    open={showModal}
    onClose={() => setShowModal(false)}>
    <Box className={styles.withdrawModal}>
      <IconButton disableRipple onClick={() => setShowModal(false)} className={styles.closeBtn}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h3">Withdraw all balance</Typography>

      <Box className={styles.balanceItem}>
        <Box className={styles.itemKey}>Token/Amount</Box>
        <Box className={styles.itemValue}>3 USDT</Box>
      </Box>
      <Box className={styles.networkItem}>
        <Box className={styles.itemKey}>Network</Box>
        <Box className={styles.itemValue}>BNB Smart Chain (BEP20)</Box>
      </Box>
      <Typography>Withdrawal application will be processed between 14:00 and 15:00 UTC every day. You can check the balance in the wallet later.</Typography>

      <Box className={styles.withdrawBtn}>
        Confirm and withdraw
      </Box>
    </Box>
  </Dialog>
}

export default WithdrawBalanceModal