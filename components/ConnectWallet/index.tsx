import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Box, CircularProgress, Dialog, Drawer, IconButton, Typography, useMediaQuery } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss'
import { Connector, useAccount, useConnect } from 'wagmi';
import detectEthereumProvider from '@metamask/detect-provider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useIsMounted } from 'hooks/useIsMounted';
import { MetamaskDeeplink } from 'constants/index';
import { useTranslations } from "next-intl";

interface ConnectWalletProps {
  showConnect: boolean;
  setShowConnect: (show: boolean) => any;
  callback?: () => any;
  errorCallback?: () => any;
}

type WalletType = "" | "walletConnect" | "metaMask" | "Unipass" | 'web3auth'

const ConnectWallet: React.FC<ConnectWalletProps> = (props) => {
  const { showConnect, setShowConnect, callback = () => { }, errorCallback = () => { } } = props

  const t = useTranslations('Index.WalletConnect')

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
    setLastConnectWalletType(walletType?.split("\"")[1] as WalletType)
  }, [address])

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    onSuccess() {
      setShowConnect(false)
      callback()
    }
  })

  const [
    MetaMaskConnector,
    WalletConnectConnector,
    UnipassConnector,
    GoogleConnector,
    FacebookConnector,
    TwitterConnector
  ] = connectors

  const [
    MetaMaskConnecting,
    WalletConnectConnecting,
    UnipassConnecting,
    GoogleConnecting,
    FacebookConnecting,
    TwitterConnecting
  ] = useMemo(() => {
    if (!isLoading) return [false, false, false, false, false, false]

    return [
      MetaMaskConnector.id === pendingConnector?.id,
      WalletConnectConnector.id === pendingConnector?.id,
      UnipassConnector.id === pendingConnector?.id,
      // @ts-ignore
      pendingConnector?.loginParams?.loginProvider === 'google',
      // @ts-ignore
      pendingConnector?.loginParams?.loginProvider === 'facebook',
      // @ts-ignore
      pendingConnector?.loginParams?.loginProvider === 'twitter',
    ]
  }, [isLoading, pendingConnector])

  const handleConnect = async (selectedConnector: Connector) => {
    if (isLoading && pendingConnector?.id === selectedConnector.id) {
      return
    }
    await connect({ connector: selectedConnector })
  }

  const WalletIntro = <Box className={styles.walletIntro}>
    <Typography variant='h4'>{t('notOwnWallet')}</Typography>
    <Typography className={styles.subtitle}>{t("walletIntro")}</Typography>

    {/* <a href='https://wallet.unipass.id/register' target="_blank" rel="noreferrer"> */}
    <Box className={styles.downItem} onClick={() => handleConnect(UnipassConnector)}>
      <img src='/unipass_logo.svg' />
      <Typography>Unipass</Typography>
      <Box className={styles.getBtn}>{t("linkText")}</Box>
      <Box className={styles.beginnerBadge}>{t("forBeginner")}</Box>
    </Box>
    {/* </a> */}

    <Typography className={styles.unipassGuide}>{t("registerByMail")}</Typography>

    <a href='https://metamask.io/download/' target="_blank" rel="noreferrer">
      <Box className={styles.downItem}>
        <img src='/metamask_logo.svg' />
        <Typography>MetaMask</Typography>
        <Box className={styles.getBtn}>{t("linkText")}</Box>
      </Box>
    </a>

    <a
      className={styles.metamaskGuide}
      href="/strategy/article?articleId=161&collectionId=068c8c3a-72ff-4cea-8af3-954d201f0887"
      target="_blank">{t("metamaskGuide")}</a>
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
        <Typography variant='h4'>{t('title')}</Typography>
        <Box></Box>
      </Box>

      <Typography className={styles.walletSubtitle}>Sign up with social :</Typography>
      <Box className={styles.mobileWalletList}>
        <Box
          className={styles.mobileWalletItem}
          onClick={() => handleConnect(GoogleConnector)}
        >
          {GoogleConnecting ?
            <CircularProgress /> :
            <Box className={styles.googleConnectLogo} />}
          <Typography>Google</Typography>
        </Box>
        <Box
          className={styles.mobileWalletItem}
          onClick={() => handleConnect(FacebookConnector)}
        >
          {FacebookConnecting ?
            <CircularProgress /> :
            <Box className={styles.facebookConnectLogo} />}
          <Typography>Facebook</Typography>
        </Box>
        <Box
          className={styles.mobileWalletItem}
          onClick={() => handleConnect(TwitterConnector)}
        >
          {
            TwitterConnecting ?
              <CircularProgress /> :
              <Box className={styles.twitterConnectLogo} />
          }
          <Typography>Twitter</Typography>
        </Box>
      </Box>

      <Typography className={styles.walletSubtitle}>Connect Wallet:</Typography>
      <Box className={styles.mobileWalletList} sx={{ paddingBottom: '3.33rem' }}>
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
          {WalletConnectConnecting ?
            <CircularProgress /> :
            <Box className={styles.walletConnectLogo}>
              <img src='/walletconnect_logo.svg' />
            </Box>}
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
        {WalletIntro}

        <Box className={styles.walletList}>
          <Typography variant='h4'>{t('title')}</Typography>
          {error &&
            <Alert severity="error" sx={{ display: 'flex', alignItems: 'center' }}>
              {error.message}
            </Alert>}

          <Typography className={styles.walletSubtitle}>Connect with social :</Typography>
          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(GoogleConnector)}>
            {GoogleConnecting ?
              <CircularProgress /> :
              <span className={styles.itemGoogleConnectLogo}></span>
            }
            <p>Google</p>
          </Box>

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(FacebookConnector)}>
            {FacebookConnecting ?
              <CircularProgress /> :
              <span className={styles.itemFacebookConnectLogo}></span>
            }
            <p>Facebook</p>
          </Box>

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(TwitterConnector)}>
            {TwitterConnecting ?
              <CircularProgress /> :
              <span className={styles.itemTwitterConnectLogo}></span>
            }
            <p>Twitter</p>
          </Box>

          <Typography className={styles.walletSubtitle}>Connect Wallet: </Typography>

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(!isEthEnv ? WalletConnectConnector : MetaMaskConnector)}
          >
            {MetaMaskConnecting ?
              <CircularProgress /> :
              <span className={styles.itemMetamaskLogo}>
                <img src='/metamask_logo.svg' />
              </span>}
            <p>MetaMask</p>
            {!MetaMaskConnecting &&
              lastConnectWalletType === "metaMask" &&
              <Box className={styles.lastConnectType}>Recent</Box>}
          </Box>

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(WalletConnectConnector)}>
            {WalletConnectConnecting ?
              <CircularProgress /> :
              <span className={styles.itemWalletConnectLogo}></span>
            }
            <p>WalletConnect</p>
            {!WalletConnectConnecting &&
              lastConnectWalletType === "walletConnect" &&
              <Box className={styles.lastConnectType}>Recent</Box>}
          </Box>

          <Box
            className={styles.walletItem}
            onClick={() => handleConnect(UnipassConnector)}>
            {UnipassConnecting ?
              <CircularProgress /> :
              <span className={styles.itemUnipassLogo}>
                <img src='/unipass_logo.svg' />
              </span>
            }
            <p>Unipass</p>
            {!UnipassConnecting &&
              lastConnectWalletType === "Unipass" &&
              <Box className={styles.lastConnectType}>Recent</Box>}
          </Box>
        </Box>
      </div>
    </Dialog>
}

export default ConnectWallet