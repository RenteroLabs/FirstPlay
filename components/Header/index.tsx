import { Box, Button, MenuItem, Stack, Typography, Slide, useMediaQuery, Drawer } from '@mui/material'
import styles from './styles.module.scss'
import Image from 'next/image'
import ConnectWallet from '../ConnectWallet'
// import ConnectWallet from '../NewConnectWallet'
import { useState, useMemo } from 'react'
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { formatAddress } from 'util/format'
import FeaturedVideoOutlinedIcon from '@mui/icons-material/FeaturedVideoOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { SUPPORT_CHAINS } from 'constants/index'
import { CHAIN_ICON_MAP, CONNECTED_WALLET, FIRSTPLAY_LOGO, HEADER_LANGUAGE, HEADER_NAV_ACTIVITY, HEADER_NAV_ITEM, HEADER_SHARE } from 'constants/static'
import { useIsMounted } from 'hooks/useIsMounted'
import classNames from 'classnames/bind'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import DnsIcon from '@mui/icons-material/Dns';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CopyButton from '../CopyButton'

const cx = classNames.bind(styles)

interface HeaderUserInfoProps {
  closeCallback: () => any
  connectWallet?: () => any
}
const HeaderUserInfo: React.FC<HeaderUserInfoProps> = (props) => {
  const { closeCallback, connectWallet } = props

  const t = useTranslations('Index.Header')
  const isMobileHeaderNav = useMediaQuery('(max-width: 920px)')

  const [showChangeNetwork, setShowChangeNetwork] = useState<boolean>(false)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect()

  const chooseSwitchNetwork = (id: number | undefined) => {
    if ((chain?.id !== id || pendingChainId !== id) && switchNetwork) {
      switchNetwork(id)
    }
    setShowChangeNetwork(false)
  }

  return <Box className={cx({ walletMenuBox: true })} >
    {
      showChangeNetwork ?
        <Box>
          <Box className={styles.networkHeader}>
            <ArrowBackIosNewOutlinedIcon
              sx={{ cursor: 'pointer', color: 'black' }}
              onClick={() => setShowChangeNetwork(false)} />
            <Typography >Switch Network</Typography>
          </Box>
          <Box className={styles.divider}></Box>
          {
            SUPPORT_CHAINS.map(item => {
              return <MenuItem
                key={item.id}
                onClick={() => chooseSwitchNetwork(item.id)}
                className={styles.menuItem}
              >
                <Box>
                  <Image src={CHAIN_ICON_MAP[item.id]} layout='fill' objectFit='contain' />
                </Box>
                <span>{item.name}</span>
              </MenuItem>
            })
          }
        </Box> :
        <Box>
          {
            address &&
            <>
              <Box className={styles.addressItem} >
                <Box className={styles.addressBox}>
                  <Typography>{formatAddress(address, 4)}</Typography>
                  <CopyButton targetValue={address} />
                </Box>
                <Box className={styles.exitIcon} onClick={() => {
                  disconnect()
                  closeCallback()
                }}>
                  <Image src="/header_exit.png" layout='fill' objectFit='contain' />
                </Box>
              </Box>
              <Box className={styles.divider}></Box>
              <Link href={{ pathname: '/profile', query: { tab: 'Trialing' } }}>
                <MenuItem
                  className={cx({ menuItem: true, })}
                  onClick={closeCallback}
                  disableRipple>
                  <Box>
                    <Image src={HEADER_NAV_ITEM} layout="fill" />
                  </Box>
                  Trialing
                </MenuItem>
              </Link>
              <Link href={{ pathname: '/profile', query: { tab: 'Activity' } }} >
                <MenuItem
                  className={cx({ menuItem: true, })}
                  onClick={closeCallback}
                  sx={{ marginBottom: '0.5rem' }}
                  disableRipple>
                  <Box>
                    <Image src={HEADER_NAV_ACTIVITY} layout="fill" />
                  </Box>
                  Activity
                </MenuItem>
              </Link>
              <Box className={styles.divider}></Box>
              {chain && address &&
                <MenuItem
                  className={styles.menuItem}
                  onClick={() => {
                    setShowChangeNetwork(true)
                  }}>
                  <Box>
                    <Image src={CHAIN_ICON_MAP[chain?.id]} layout='fill' objectFit='contain' />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexGrow: '1', alignItems: 'center', justifyContent: 'space-between' }}>
                    {chain?.name}
                    <ArrowForwardIosOutlinedIcon />
                  </Box>
                </MenuItem>}
            </>
          }
          {
            isMobileHeaderNav &&
            <>
              {address && <Box className={styles.divider} />}

              <Link href="/carnival">
                {/* <a target="__blank"> */}
                <MenuItem className={styles.menuItem} onClick={closeCallback} disableRipple>
                  {t('passNFT')}
                </MenuItem>
                {/* </a> */}
              </Link>

              <MenuItem className={cx({
                menuItem: true,
                disabled: true,
              })} disableRipple>
                {t('games')}
              </MenuItem>
              <MenuItem className={cx({
                menuItem: true,
                disabled: true,
              })} disableRipple>
                {t('strategy')}
              </MenuItem>
            </>
          }

          {!address && <Box
            className={styles.userInfoConnect}
            onClick={() => { if (connectWallet) connectWallet() }}
          >{t("connectWallet")}</Box>}
        </Box>
    }
  </Box>
}

const Header: React.FC = () => {

  const { locale, asPath } = useRouter()
  const [showConnect, setShowConnect] = useState<boolean>(false)
  const [walletMenu, setWalletMenu] = useState<boolean>(false)
  const isMounted = useIsMounted()
  const isMobileHeaderNav = useMediaQuery('(max-width: 920px)')
  const [mobileDrawer, setMobileDrawer] = useState<boolean>(false)

  const t = useTranslations("Index.Header")

  const { address } = useAccount()

  return <Box className={styles.header}>
    <Box className={styles.headerBox}>
      <Link href="/">
        <Box className={styles.headerLogo}>
          <Image src={FIRSTPLAY_LOGO} alt="header logo" layout='fill' objectFit='contain' />
        </Box>
      </Link>

      {!isMobileHeaderNav && isMounted &&
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Stack direction="row" className={styles.headerNavs} >
            <Box>
              <Link href="/carnival" >
                {/* <a target="_blank"> */}
                {t('passNFT')}
                {/* </a> */}
              </Link>
            </Box>
            <Box className={styles.disabled}>{t('games')}</Box>
            <Box className={styles.disabled}>{t('strategy')}</Box>
          </Stack>
          <Box className={styles.headerSetting}>
            {/* <Box className={styles.languageNav}>
              <Box className={styles.headerNavImage}>
                <Image src={HEADER_LANGUAGE} layout="fill" objectFit='contain' />
              </Box>
              <Box className={styles.languageBox}>
                <Box>
                  <Link href={asPath} locale="en-US">
                    English
                  </Link>
                </Box>
                <Box>
                  <Link href={asPath} locale="zh-CN">
                    简体中文
                  </Link>
                </Box>
              </Box>
            </Box> */}

            <Box className={styles.shareNav}>
              <Box className={styles.headerNavImage}>
                <Image src={HEADER_SHARE} layout="fill" objectFit='contain' />
              </Box>
              <Box className={styles.socialMediaBox}>
                <a href="https://twitter.com/FirstPlay2022" target="_blank" rel="noreferrer">
                  <Box className={styles.mediaItem}>
                    <Box><Image src="/media_twitter.webp" layout='fill' /></Box>
                    Twitter
                  </Box>
                </a>
                <a href="https://discord.com/invite/84mhbPXFUu" target="_blank" rel="noreferrer">
                  <Box className={styles.mediaItem}>
                    <Box><Image src="/media_discord.webp" layout='fill' /></Box>
                    Discord
                  </Box>
                </a>
                <a href="https://t.me/firstplay2022" target="_blank" rel="noreferrer">
                  <Box className={styles.mediaItem}>
                    <Box><Image src="/media_telegram.webp" layout='fill' /></Box>
                    Telegram
                  </Box>
                </a>
              </Box>
            </Box>

            {
              address && isMounted ?
                <Box
                  className={styles.walletNav}
                  onMouseEnter={() => { if (address) { setWalletMenu(true) } }}
                  onMouseLeave={() => setWalletMenu(false)}
                >
                  <Box className={styles.headerNavImage} >
                    <Image src={CONNECTED_WALLET} layout="fill" objectFit='contain' />
                    {walletMenu && <HeaderUserInfo closeCallback={() => setWalletMenu(false)} />}
                  </Box>
                </Box>
                :
                <Box className={styles.connectBtn} onClick={() => setShowConnect(true)}>
                  {t("connectWallet")}
                </Box>
            }

          </Box>
        </Box>}

      {isMobileHeaderNav && isMounted &&
        <Box className={styles.mobileMenuIcon} onClick={() => setMobileDrawer(!mobileDrawer)}>
          {mobileDrawer ? <CloseIcon /> : <MenuIcon />}
        </Box>}
    </Box>

    <ConnectWallet showConnect={showConnect} setShowConnect={setShowConnect} />

    <Drawer
      anchor='right'
      open={mobileDrawer && isMobileHeaderNav}
      onClose={() => setMobileDrawer(false)}
    >
      <Box className={styles.drawer}>
        <HeaderUserInfo
          closeCallback={() => setMobileDrawer(false)}
          connectWallet={() => setShowConnect(true)} />
      </Box>
    </Drawer>
  </Box>
}

export default Header