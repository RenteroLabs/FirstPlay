
import { Dialog, Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import styles from './styles.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'
import Link from 'next/link';

interface TrialSuccessProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any
}

const TrialSuccessModal: React.FC<TrialSuccessProps> = (props) => {
  const { showModal, setShowModal } = props

  return <Dialog
    open={showModal}
  >
    <Box className={styles.trialSuccessBox}>
      <Box className={styles.modalHeader}>
        <IconButton
          disableRipple
          onClick={() => setShowModal(false)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>Trial For Free</Typography>
        <IconButton
          disableRipple
          onClick={() => setShowModal(false)}
        ><CloseIcon /></IconButton>
      </Box>
      <Box className={styles.container}>
        <Box className={styles.successIllustration}>
          <Image src="/trial_NFT_success.png" layout="fill" objectFit='cover' />
        </Box>
        <Typography variant='h3'>Successfully acquired an NFT!  Rewards available after automatic return.</Typography>
        {/* <Typography variant='h4'></Typography> */}
        {/* TODO: 此处需跳转到对应的游戏官网页 */}
        <a href='/' target="_blank" rel="noreferrer" onClick={() => setShowModal(false)}>
          <Box className={styles.playLink}>Play Now</Box>
        </a>
        <Typography className={styles.strategyLink}>
          {/* TODO: 需跳转到当前游戏的攻略页上 */}
          <Link href="/">
            View the Game Strategy
          </Link>
        </Typography>
      </Box>
    </Box>
  </Dialog>
}

export default TrialSuccessModal