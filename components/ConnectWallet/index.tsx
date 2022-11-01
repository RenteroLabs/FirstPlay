import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Box, CircularProgress, Dialog, DialogTitle, Drawer, IconButton, Typography, useMediaQuery } from '@mui/material'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss'
import { Connector, useConnect } from 'wagmi';

interface ConnectWalletProps {
  showConnect: boolean;
  setShowConnect: (show: boolean) => any;
  callback?: () => any;
  errorCallback?: () => any;
}

const ConnectWallet: React.FC<ConnectWalletProps> = (props) => {
  const { showConnect, setShowConnect, callback = () => { }, errorCallback = () => { } } = props

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    onSuccess() {
      setShowConnect(false)
      callback()
    }
  })

  const [MetaMaskConnector, WalletConnectConnector] = connectors

  const [MetaMaskConnecting, WalletConnectConnecting] = useMemo(() => {
    if (!isLoading) return [false, false]

    return [
      MetaMaskConnector.id === pendingConnector?.id,
      WalletConnectConnector.id === pendingConnector?.id
    ]
  }, [isLoading, pendingConnector])

  const handleConnect = async (selectedConnector: Connector) => {
    if (isLoading && pendingConnector?.id === selectedConnector.id) {
      return
    }
    await connect({ connector: selectedConnector })
  }

  return <Dialog open={showConnect} className={styles.container} >
    <DialogTitle className={styles.dialogTitle} >
      Connect Wallet
      <IconButton
        aria-label="close"
        onClick={() => {
          setShowConnect(false)
          errorCallback()
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <div className={styles.dialogContent}>
      <Box className={styles.walletList}>
        {error &&
          <Alert severity="error" sx={{ display: 'flex', alignItems: 'center' }}>
            {error.message}
          </Alert>}
        <Box className={styles.walletItem} onClick={() => handleConnect(connectors[0])}>
          <span className={styles.itemMetamaskLogo}></span>
          <p>MetaMask</p>
          {MetaMaskConnecting ? <CircularProgress /> : <ArrowRightAltRoundedIcon sx={{ color: '#8E50E4' }} />}
        </Box>

        <Box className={styles.walletItem} onClick={() => handleConnect(WalletConnectConnector)}>
          <span className={styles.itemWalletConnectLogo}></span>
          <p>WalletConnect</p>
          {WalletConnectConnecting ? <CircularProgress /> : <ArrowRightAltRoundedIcon sx={{ color: '#8E50E4' }} />}
        </Box>
      </Box>
    </div>
  </Dialog>
}

export default ConnectWallet