import { Box, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'

interface GameHeaderProps {

}

const GameDashboardHeader: React.FC<GameHeaderProps> = (props) => {
  const { } = props

  return <Box className={styles.headerBox}>
    <Box className={styles.header}>
      <Box className={styles.gameBox}>
        <Typography>Big Time</Typography>

      </Box>
      <Box className={styles.navList}>
        <Box className={styles.navItem}>
          Assets
        </Box>
      </Box>
    </Box>
  </Box>
}


export default GameDashboardHeader