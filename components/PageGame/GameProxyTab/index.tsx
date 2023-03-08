import { Box, Typography } from "@mui/material";
import React from "react";
import ProxyPlayCard from "../ProxyPlayCard";
import styles from './styles.module.scss'

interface GameProxyTabProps {
  proxyPlayList: Record<string, any>[]
}

const GameProxyTab: React.FC<GameProxyTabProps> = (props) => {
  const { proxyPlayList } = props

  return <Box className={styles.proxyTabBox}>
    <Box className={styles.proxyCardList}>
      <Typography variant="h3">
        Proxy Play
        <span>Coming Soon!</span>
      </Typography>
      {
        proxyPlayList.map((item, index) =>
          <ProxyPlayCard key={index} index={index + 1} proxyInfo={item} />)
      }
    </Box>
  </Box>
}

export default GameProxyTab