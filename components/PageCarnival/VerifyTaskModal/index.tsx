import { Dialog, Box, IconButton, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import styles from './style.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import * as ga from '../../../util/ga'
import { GAME_EVENT_NAME } from 'constants/index'
import { useTranslations } from "next-intl";
import VerifyTaskFormModal from '@/components/PageModals/VerifyTaskModal';

interface VerifyTaskProps {
  showTaskModal: boolean
  setShowTaskModal: (arg: boolean) => any
  verifyForm: Record<string, any>[]
  taskId: string
}

export const VerifyTaskModal: React.FC<VerifyTaskProps> = (props) => {
  const { showTaskModal, setShowTaskModal, verifyForm, taskId } = props
  const t = useTranslations('Game.VerifyTaskModal')

  const [showFormModal, setShowFormModal] = useState<boolean>(false)

  const handleVerifyTask = () => {
    setShowTaskModal(false)
    setShowFormModal(true)
  }

  return showFormModal ?
    <VerifyTaskFormModal
      showModal={showFormModal}
      setShowModal={setShowFormModal}
      verifyForm={verifyForm}
      taskId={taskId}
    />
    :
    <Dialog
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