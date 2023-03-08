import { Box, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import StarIcon from '@mui/icons-material/Star';

interface ProxyPlayCardProps {
  index: number
  proxyInfo: Record<string, any>
}

const bgColorList = ['#9C9281', '#897BA3', '#8A9C81', '#8E6767', '#93A3B0']

const ProxyPlayCard: React.FC<ProxyPlayCardProps> = (props) => {
  const { index = 1, proxyInfo } = props

  return <Box className={styles.proxyCard} sx={{ backgroundColor: bgColorList[(index % 5) - 1] }}>
    <Box className={styles.userInfo}>
      <Box className={styles.userLogo}>
        <img src={proxyInfo?.avatar || "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/logo/Bless%20Global.jpg"} />
      </Box>
      <Box className={styles.nameBox}>
        <Typography variant="h4">{proxyInfo?.nickname}</Typography>
        <Typography>{proxyInfo?.description}</Typography>
      </Box>
    </Box>
    <Box className={styles.priceInfo}>
      <Box className={styles.hourPrice}>
        <MonetizationOnRoundedIcon />
        <Typography>{proxyInfo?.charge}</Typography>
      </Box>
      <Box className={styles.rankInfo}>
        <StarIcon />
        <Typography >{proxyInfo?.score}</Typography>
      </Box>
    </Box>
  </Box>
}

export default ProxyPlayCard