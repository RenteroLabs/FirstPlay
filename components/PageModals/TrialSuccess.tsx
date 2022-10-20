
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
          <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3yrt5tycej20nw0kxdh5.jpg" layout="fill" />
        </Box>
        <Typography variant='h3'>Successfully acquired an NFT!</Typography>
        <Typography variant='h4'> Rewards available after automatic return.</Typography>
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