import { Dialog, Box, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import styles from './styles.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'react-qr-code'

interface TemplateModalProps {
  showModal: boolean;
  setShowModal: (arg: boolean) => any;
  url: string
}

const QRCodeDownloadModal: React.FC<TemplateModalProps> = (props) => {
  const { showModal, setShowModal, url } = props

  return <Dialog open={showModal} onClose={() => setShowModal(false)}>
    <Box className={styles.qrcodeBox}>
      <Box className={styles.modalHeader}>
        <IconButton
          disableRipple
          sx={{ opacity: 0, cursor: 'default' }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>Download</Typography>
        <IconButton
          disableRipple
          onClick={() => setShowModal(false)}
        ><CloseIcon /></IconButton>
      </Box>
      <Box className={styles.container}>
        <QRCode value={url} className={styles.qrcode} />
        <Typography>Scan to download</Typography>
      </Box>
    </Box>
  </Dialog>
}

export default QRCodeDownloadModal