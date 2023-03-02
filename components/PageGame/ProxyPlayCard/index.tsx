import { Box, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import StarIcon from '@mui/icons-material/Star';

interface ProxyPlayCardProps {
  index: number
}

const bgColorList = ['#9C9281', '#897BA3', '#8A9C81', '#8E6767', '#93A3B0']

const ProxyPlayCard: React.FC<ProxyPlayCardProps> = (props) => {
  const { index = 1 } = props

  return <Box className={styles.proxyCard} sx={{ backgroundColor: bgColorList[(index % 5) - 1] }}>
    <Box className={styles.userInfo}>
      <Box className={styles.userLogo}>
        <img src="https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/logo/Bless%20Global.jpg" />
      </Box>
      <Box className={styles.nameBox}>
        <Typography variant="h4">Tommyyy</Typography>
        <Typography>Game master, good at games that require high-end operations</Typography>
      </Box>
    </Box>
    <Box className={styles.priceInfo}>
      <Box className={styles.hourPrice}>
        <MonetizationOnRoundedIcon />
        <Typography>20U/hour</Typography>
      </Box>
      <Box className={styles.rankInfo}>
        <StarIcon />
        <Typography >5.00 (3422)</Typography>
      </Box>
    </Box>
  </Box>
}

export default ProxyPlayCard