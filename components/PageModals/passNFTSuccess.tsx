import { Dialog, Box, Typography, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from './styles.module.scss'
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useAccount } from "wagmi";
import Link from "next/link";

interface PassNFTSuccessProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any
}

const PassNFTSuccess: React.FC<PassNFTSuccessProps> = (props) => {

  const { showModal, setShowModal } = props
  const { address } = useAccount()

  //  TODO: 进入页面和钱包切换时判断当前用户是否已拥有 NFT
  useEffect(() => {

    // TODO: 判断用户是否已勾选不再弹窗提醒


  }, [address])

  return <Dialog
    open={showModal}
  >
    <Box className={styles.passSuccessBox}>
      <Box className={styles.successIllustration}>
        <Image src="/pass_success.jpg" layout="fill" />
      </Box>
      <Typography variant="h3">Already claimed the Pass-NFT</Typography>
      <Typography variant="h4">Hot games are coming soon</Typography>
      <Link href="/">
        <Box className={styles.successBtn}>Back to home page</Box>
      </Link>
      <FormControlLabel
        control={<Checkbox size="small" />}
        label={<span className={styles.reopenTips}>Do not remind again</span>}
        className={styles.reopenTips} />
      <IconButton
        disableRipple
        className={styles.closeIcon}
        onClick={() => setShowModal(false)}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </Dialog>
}

export default PassNFTSuccess