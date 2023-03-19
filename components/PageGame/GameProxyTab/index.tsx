import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import ProxyPlayCard from "../ProxyPlayCard";
import styles from './styles.module.scss'
import Image from "next/image";
import { isEmpty } from "lodash";

interface GameProxyTabProps {
  proxyPlayList: Record<string, any>[]
}

const GameProxyTab: React.FC<GameProxyTabProps> = (props) => {
  const { proxyPlayList = [] } = props

  const showEmptyTip = useMemo(() => {
    return isEmpty(proxyPlayList)
  }, [proxyPlayList])

  return <Box className={styles.proxyTabBox}>
    <Box className={styles.proxyCardList}>
      {!showEmptyTip && <Typography variant="h3">
        Pro Players
        <span>Coming Soon!</span>
      </Typography>}
      <Box className={styles.cardlist}>
        {
          proxyPlayList.map((item, index) =>
            <ProxyPlayCard key={index} index={index + 1} proxyInfo={item} />)
        }
      </Box>

      {showEmptyTip && <Box className={styles.emptyTip}>
        <Box className={styles.iconBox}>
          <Image src="https://firstplay-crm.s3.ap-east-1.amazonaws.com/icon_203a6d749c.png" layout="fill" />
        </Box>
        <Typography>No player yet, stay tuned</Typography>
      </Box>}
    </Box>
  </Box>
}

export default GameProxyTab