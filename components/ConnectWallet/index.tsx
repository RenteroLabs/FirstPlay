import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Box, CircularProgress, Dialog, DialogTitle, Drawer, IconButton, Typography, useMediaQuery } from '@mui/material'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss'
import { Connector, useAccount, useConnect } from 'wagmi';
import detectEthereumProvider from '@metamask/detect-provider'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useIsMounted } from 'hooks/useIsMounted';
import { MetamaskDeeplink } from 'constants/index';

interface ConnectWalletProps {
  showConnect: boolean;
  setShowConnect: (show: boolean) => any;
  callback?: () => any;
  errorCallback?: () => any;
}

type WalletType = "" | "walletConnect" | "metaMask" | "Unipass"

const ConnectWallet: React.FC<ConnectWalletProps> = (props) => {
  const { showConnect, setShowConnect, callback = () => { }, errorCallback = () => { } } = props

  const { address } = useAccount()
  const [isEthEnv, setIsEthEnv] = useState<boolean>(false)
  const [lastConnectWalletType, setLastConnectWalletType] = useState<WalletType>('')

  const is800Size = useMediaQuery("(max-width: 800px)")
  const isMounted = useIsMounted()

  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider()
      setIsEthEnv(Boolean(provider))
    })()
  }, [])

  useEffect(() => {
    const walletType = window.localStorage.getItem("wagmi.wallet")
    console.log(walletType?.split("\""))
    setLastConnectWalletType(walletType?.split("\"")[1] as WalletType)
  }, [address])

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    onSuccess() {
      setShowConnect(false)
      callback()
    }
  })

  const [MetaMaskConnector, WalletConnectConnector, UnipassConnector] = connectors

  const [MetaMaskConnecting, WalletConnectConnecting, UnipassConnecting] = useMemo(() => {
    if (!isLoading) return [false, false]

    return [
      MetaMaskConnector.id === pendingConnector?.id,
      WalletConnectConnector.id === pendingConnector?.id,
      UnipassConnector.id === pendingConnector?.id
    ]
  }, [isLoading, pendingConnector])

  const handleConnect = async (selectedConnector: Connector) => {
    if (isLoading && pendingConnector?.id === selectedConnector.id) {
      return
    }
    await connect({ connector: selectedConnector })
  }

  const handleLinkMetamask = () => {
    window.open("/strategy/Get-Started-With-Metamask-Quickly", "__blank")
  }

  const WalletIntro = <Box className={styles.walletIntro}>
    <Typography variant='h4'>Don&#39;t have a wallet yet?</Typography>
    <Typography className={styles.subtitle}>Connecting wallet is like“logging in” to Web3. You can visit every website without  creating new accounts and passwords.</Typography>

    <Box className={styles.downItem}>
      <img src='/unipass_logo.svg' />
      <Typography>Unipass</Typography>
      <a href='https://wallet.unipass.id/register' target="_blank" rel="noreferrer">
        <Box className={styles.getBtn}>Get</Box>
      </a>
      <Box className={styles.beginnerBadge}>For beginners</Box>
    </Box>

    <Typography className={styles.unipassGuide}>Quick login with email in 3 minutes on the web.</Typography>

    <Box className={styles.downItem}>
      <img src='/metamask_logo.svg' />
      <Typography>MetaMask</Typography>
      <a href='https://metamask.io/download/' target="_blank" rel="noreferrer">
        <Box className={styles.getBtn}>Get</Box>
      </a>
    </Box>
    <a
      className={styles.metamaskGuide}
      href="/strategy/Get-Started-With-Metamask-Quickly"
      target="_blank">How to use MetaMask? Step by step</a>
  </Box>

  const mobileConnectDrawer = <Drawer
    anchor='right'
    open={showConnect}
    onClose={() => setShowConnect(false)}
    className={styles.mobileConnect}
  >
    <Box className={styles.drawerBox}>
      <Box className={styles.drawerHeader}>
        <Box onClick={() => setShowConnect(false)}>
          <ArrowBackIosIcon />
        </Box>
        <Typography variant='h4'>Connect Wallet</Typography>
        <Box></Box>
      </Box>
      <Box className={styles.mobileWalletList}>
        <Box
          className={styles.mobileWalletItem}
          onClick={() => handleConnect(UnipassConnector)}>
          <Box className={styles.unipassLogo}>
            <img src='/unipass_logo.svg' />
          </Box>
          <Typography>Unipass</Typography>
          {lastConnectWalletType === "Unipass" &&
            <Box className={styles.recentBadge}>Recent</Box>}
        </Box>
        <Box
          className={styles.mobileWalletItem}
          onClick={() => {
            if (isEthEnv) {
              handleConnect(MetaMaskConnector)
            } else {
              // window.open(MetamaskDeeplink)
              window.location.href = MetamaskDeeplink
            }
          }}
        >
          <Box className={styles.metamaskLogo}>
            <img src='/metamask_logo.svg' />
          </Box>
          <Typography>MetaMask</Typography>
          {
            lastConnectWalletType === "metaMask" &&
            <Box className={styles.recentBadge}>Recent</Box>
          }
        </Box>
        <Box
          className={styles.mobileWalletItem}
          onClick={() => handleConnect(WalletConnectConnector)}>
          <Box className={styles.walletConnectLogo}>
            <img src='/walletconnect_logo.svg' />
          </Box>
          <Typography>WalletConnect</Typography>
          {
            lastConnectWalletType === "walletConnect" &&
            <Box className={styles.recentBadge}>Recent</Box>
          }
        </Box>
      </Box>
      {WalletIntro}
    </Box>
  </Drawer>

  // return mobileConnectDrawer
  return (isMounted && is800Size) ?
    mobileConnectDrawer :
    <Dialog open={showConnect} className={styles.container} >
      <IconButton
        className={styles.closeBtn}
        aria-label="close"
        onClick={() => {
          setShowConnect(false)
          errorCallback()
        }}
      >
        <CloseIcon />
      </IconButton>
      <div className={styles.dialogContent}>
        <Box className={styles.walletList}>
          <Typography variant='h4'>Connect Wallet</Typography>
          {error &&
            <Alert severity="error" sx={{ display: 'flex', alignItems: 'center' }}>
              {error.message}
            </Alert>}

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(UnipassConnector)}>
            <span className={styles.itemUnipassLogo}>
              <img src='/unipass_logo.svg' />
            </span>
            <p>Unipass</p>
            {UnipassConnecting && <CircularProgress />}
            {!UnipassConnecting &&
              lastConnectWalletType === "Unipass" &&
              <Box className={styles.lastConnectType}>Recent</Box>}
          </Box>

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(!isEthEnv ? WalletConnectConnector : MetaMaskConnector)}
          >
            <span className={styles.itemMetamaskLogo}>
              <img src='/metamask_logo.svg' />
            </span>
            <p>MetaMask</p>
            {MetaMaskConnecting && <CircularProgress />}
            {!MetaMaskConnecting &&
              lastConnectWalletType === "metaMask" &&
              <Box className={styles.lastConnectType}>Recent</Box>}
          </Box>

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(WalletConnectConnector)}>
            <span className={styles.itemWalletConnectLogo}></span>
            <p>WalletConnect</p>
            {WalletConnectConnecting && <CircularProgress />}
            {!WalletConnectConnecting &&
              lastConnectWalletType === "walletConnect" &&
              <Box className={styles.lastConnectType}>Recent</Box>}
          </Box>

        </Box>
        {WalletIntro}
      </div>
    </Dialog>
}

export default ConnectWallet