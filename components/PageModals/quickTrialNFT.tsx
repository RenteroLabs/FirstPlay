import { Dialog, Box, Typography, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import TrialNFTCard from "../TrialNFTCard";
import ReplayIcon from '@mui/icons-material/Replay';
import { PackageRes } from "types/graph";
import { random } from "lodash";

interface TemplateModalProps {
  showModal: boolean
  setShowModal: (arg: boolean) => any
  packageList: PackageRes[]
  chainId: number
}

const QuickTrialNFT: React.FC<TemplateModalProps> = (props) => {
  const { showModal, setShowModal, packageList, chainId } = props

  const count = useMemo(() => packageList.length, [packageList])

  const [selectIndex, setSelectIndex] = useState<number>(0)

  const randomIndex = (count: number, selectIndex: number) => {
    let res = selectIndex
    while (res === selectIndex) {
      res = random(0, count - 1, false)
    }
    return res
  }

  useEffect(() => {
    const len = packageList.length
    if (len === 0) {
      // 暂无可试玩 NFT
    } else if (len === 1) {
      setSelectIndex(0)
    } else {
      setSelectIndex(randomIndex(len, selectIndex))
    }
  }, [packageList])

  const handleChangeOne = () => {
    if (count >= 2) {
      setSelectIndex(randomIndex(count, selectIndex))
    }
  }


  // TODO:
  const handleQuickTrialPlay = async () => {

  }

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
          <TrialNFTCard type="@modal" packageInfo={packageList[selectIndex]} chainId={chainId} />
        </Box>
        <Box className={styles.tryAnother} onClick={handleChangeOne}>
          <ReplayIcon />
          <Typography>Change</Typography>
        </Box>
        <Box className={styles.btnBox} onClick={handleQuickTrialPlay}>Confirm and Trial</Box>
      </Box>
    </Box>
  </Dialog>
}

export default QuickTrialNFT