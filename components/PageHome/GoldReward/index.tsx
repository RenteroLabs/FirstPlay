import React from "react";
import styles from './styles.module.scss'
import { Box, useMediaQuery } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import MobileOnlyTip from "@/components/PageModals/MobileOnlyModal";
import { useAccount } from "wagmi";
import DailyCheckIn from "@/components/PageRewardPoint/DailyCheckIn";

const GoldReward: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false)
  const { address } = useAccount()

  const is600Size = useMediaQuery('(max-width: 600px)')

  const hanleClick = () => {
    if (!is600Size) {
      setShowModal(true)
    } else {
      window.location.href = '/rewardpoint'
    }
  }

  return <Box className={styles.goldReward}>
    <Box className={styles.goldRewardBox}>
      <SectionTitle emphasize="Gold Award Event" moreLink={is600Size ? "/rewardpoint": undefined } />

      {is600Size && address ?
        <DailyCheckIn type="home" />
        :
        <Box className={styles.posterBox} onClick={hanleClick}>
          <h3>$2 Cash Drops!</h3>
          <p>{is600Size ? 'Sign in continuously, invite friends to earn points,And get $2 in cash!' : 'Continuous check-in, invite friends to colledt points, get $2 immediately! Complete tasks on mobile to win cash rewards.'}</p>
        </Box>
      }
    </Box>
    <MobileOnlyTip showModal={showModal} setShowModal={setShowModal} />
  </Box>
};

export default GoldReward;