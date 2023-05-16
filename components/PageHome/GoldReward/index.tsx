import React from "react";
import styles from './styles.module.scss'
import { Box } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import MobileOnlyTip from "@/components/PageModals/MobileOnlyModal";

const GoldReward: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false)

  return <Box className={styles.goldReward}>
    <Box className={styles.goldRewardBox}>
      <SectionTitle emphasize="Gold Award Event" />
      <Box className={styles.posterBox} onClick={() => setShowModal(true)}>
        <h3>$2 Cash Drops!</h3>
        <p>Continuous check-in, invite friends to colledt points, get $2 immediately! Complete tasks on mobile to win cash rewards.</p>
      </Box>
    </Box>
    <MobileOnlyTip showModal={showModal} setShowModal={setShowModal} />
  </Box>
};

export default GoldReward;