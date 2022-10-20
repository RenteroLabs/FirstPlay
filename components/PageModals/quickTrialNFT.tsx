import { Dialog, Box, Typography, IconButton } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import TrialNFTCard from "../TrialNFTCard";
import ReplayIcon from '@mui/icons-material/Replay';

interface TemplateModalProps {
  showModal: boolean
  setShowModal: (arg: boolean) => any
}

const QuickTrialNFT: React.FC<TemplateModalProps> = (props) => {
  const { showModal, setShowModal } = props


  return <Dialog open={showModal}>
    <Box className={styles.quickTrialBox}>
      <Box className={styles.modalHeader}>
        <IconButton disableRipple onClick={() => setShowModal(false)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography> Try an NFT for free </Typography>
        <IconButton disableRipple onClick={() => setShowModal(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={styles.modalContent}>
        <Box className={styles.cardBox}>
          <TrialNFTCard type="@modal" />
        </Box>
        <Box className={styles.tryAnother}>
          <ReplayIcon />
          <Typography>Change</Typography>
        </Box>
        <Box className={styles.btnBox}>Confirm and Trial</Box>

      </Box>

    </Box>
  </Dialog>
}

export default QuickTrialNFT