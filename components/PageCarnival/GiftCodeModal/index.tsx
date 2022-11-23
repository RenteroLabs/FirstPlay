
import { Box, Dialog, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

interface GiftCodeProps {
  showGiftModal: boolean;
  setShowGiftModal: (arg: boolean) => any;
  giftCode: string
}

const GiftCodeModal: React.FC<GiftCodeProps> = (props) => {
  const { setShowGiftModal, showGiftModal } = props

  return <Dialog
    open={showGiftModal}
  >
    <Box className={styles.giftBox}>
      <Box className={styles.modalHeader}>
        <IconButton
          disableRipple
          onClick={() => setShowGiftModal(false)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>Gift Code</Typography>
        <IconButton
          disableRipple
          onClick={() => setShowGiftModal(false)}
        ><CloseIcon /></IconButton>
      </Box>
      <Box className={styles.container}>
      </Box>
    </Box>
  </Dialog>
}

export default GiftCodeModal