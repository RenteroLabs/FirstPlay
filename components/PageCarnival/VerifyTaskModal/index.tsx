import { Dialog, Box, IconButton, Typography, Divider } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import * as ga from '../../../util/ga'
import { GAME_EVENT_NAME } from 'constants/index'
import { useTranslations } from "next-intl";

interface VerifyTaskProps {
  showTaskModal: boolean
  setShowTaskModal: (arg: boolean) => any
  gameId: string
  index: number
  claimLink: string
  strategyLink: string
}

export const VerifyTaskModal: React.FC<VerifyTaskProps> = (props) => {
  const { showTaskModal, setShowTaskModal, gameId, index, claimLink, strategyLink } = props
  const t = useTranslations('Game.VerifyTaskModal')

  const handleVerifyTask = () => {
    ga.event({ action: `${GAME_EVENT_NAME[gameId]}_${index}`, params: { gameId: gameId, task: index } })
    window.open(claimLink)
  }

  const handleStrategyLink = () => {
    window.open(strategyLink)
  }

  return <Dialog
    open={showTaskModal}

  >
    <Box className={styles.taskBox}>
      <Box className={styles.modalHeader}>
        <IconButton
          sx={{ opacity: 0, cursor: "default" }}
          disableRipple
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>{t('modalTitle')}</Typography>
        <IconButton
          disableRipple
          onClick={() => setShowTaskModal(false)}
        ><CloseIcon /></IconButton>
      </Box>
      <Box className={styles.container}>
        <Typography className={styles.verifyDesc}>{t("modalSubtitle")}</Typography>
        <Box className={styles.verifyBtn} onClick={handleVerifyTask}>{t('btnText')}</Box>
      </Box>
    </Box>
  </Dialog>
}

export default VerifyTaskModal