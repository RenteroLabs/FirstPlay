import ConnectWallet from "@/components/ConnectWallet";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import styles from './styles.module.scss'

interface GameHeaderProps {

}

const GameDashboardHeader: React.FC<GameHeaderProps> = (props) => {
  const { } = props

  const { address } = useAccount()
  const [showConnect, setShowConnect] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (!address) {
      setShowConnect(true)
    }
  }, [address])

  return <Box className={styles.headerBox}>
    <Box className={styles.header}>
      <Box className={styles.gameBox}>
        <Typography>Big Time</Typography>
        <Box className={styles.brandBox}>
          <Image src="/game_brand.png" layout="fill" />
        </Box>
      </Box>
      <Box className={styles.navList}>
        <Box className={styles.navItem}>
          Assets
        </Box>
      </Box>
    </Box>


    <ConnectWallet
      showConnect={showConnect}
      setShowConnect={setShowConnect}
      errorCallback={() => { router.push('/') }}
    />
  </Box>
}


export default GameDashboardHeader