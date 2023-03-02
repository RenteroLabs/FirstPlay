import { Box, Typography } from "@mui/material";
import React from "react";
import ProxyPlayCard from "../ProxyPlayCard";
import styles from './styles.module.scss'

interface GameProxyTabProps {

}

const GameProxyTab: React.FC<GameProxyTabProps> = (props) => {
  const { } = props

  return <Box className={styles.proxyTabBox}>
    <Box className={styles.proxyCardList}>
      <Typography variant="h3">
        Proxy Play
        <span>Coming Soon!</span>
      </Typography>
      <ProxyPlayCard index={1} /> 
      <ProxyPlayCard index={2} /> 
      <ProxyPlayCard index={3} /> 
      <ProxyPlayCard index={4} /> 
    </Box>
  </Box>
}

export default GameProxyTab