import { Box, Dialog, IconButton, Stack, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './styles.module.scss'

interface ConfirmModal {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  confirmTrial: () => any;
  trialDay: number
}

/**
 * 试玩确认弹窗
 * @param props 
 * @returns 
 */
const TrialConfirm: React.FC<ConfirmModal> = (props) => {
  const { showModal, setShowModal, confirmTrial, trialDay } = props

  return <Dialog open={showModal} >
    <Box className={styles.trialConfirmModal}>
      <Box className={styles.modalHeader}>
        <IconButton disableRipple >
          <ArrowBackIosNewIcon sx={{ display: 'none' }} />
        </IconButton>
        <Typography>Trial Plan</Typography>
        <IconButton
          disableRipple
          onClick={() => { setShowModal(false) }}
        ><CloseIcon /></IconButton>
      </Box>
      <Box className={styles.modalContent}>
        <Stack>
          <Box className={styles.detailItem}>
            <Box className={styles.trialPeriod}>Trial Period</Box>
            <Box className={styles.trialDays}>{trialDay} Days</Box>
          </Box>
        </Stack>
        <Box className={styles.activeBtn} onClick={() => {
          setShowModal(false)
          confirmTrial()
        }}>Trial</Box>
      </Box>
    </Box>
  </Dialog>
}

export default TrialConfirm