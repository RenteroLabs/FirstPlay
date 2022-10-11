import { Box, Button, MenuItem, Stack, Typography, Slide, useMediaQuery, Drawer } from '@mui/material'
import styles from './styles.module.scss'
import Image from 'next/image'
import ConnectWallet from '../ConnectWallet'
import { useState, useMemo } from 'react'
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { formatAddress } from 'util/format'
import FeaturedVideoOutlinedIcon from '@mui/icons-material/FeaturedVideoOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { SUPPORT_CHAINS } from 'constants/index'
import { CHAIN_ICON_MAP, CONNECTED_WALLET, HEADER_LANGUAGE, HEADER_SHARE } from 'constants/static'
import { useIsMounted } from 'hooks/useIsMounted'
import classNames from 'classnames/bind'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

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
                <Typography>{formatAddress(address, 4)}</Typography>
                <Box sx={{ cursor: 'pointer' }} onClick={() => {
                  disconnect()
                  closeCallback()
                }}>
                  <Image src="/header_exit.png" layout='fill' objectFit='contain' />
                </Box>
              </Box>
              <Box className={styles.divider}></Box>
              <MenuItem className={styles.menuItem} disableRipple>
                <Box>
                  <Image src="/header_menu_wallet.png" layout='fill' objectFit='contain' />
                </Box>
                Items
              </MenuItem>
              <MenuItem className={styles.menuItem} sx={{ marginBottom: '0.5rem' }} disableRipple>
                <Box>
                  <Image src="/header_menu_wallet.png" layout='fill' objectFit='contain' />
                </Box>
                Activity
              </MenuItem>
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
              <Link href="/pass">
                <a target="__blank">
                  <MenuItem className={styles.menuItem} disableRipple>
                    {t('passNFT')}
                  </MenuItem>
                </a>
              </Link>
              <MenuItem className={styles.menuItem} disableRipple>
                {t('games')}
              </MenuItem>
              <MenuItem className={styles.menuItem} disableRipple>
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
      <Box className={styles.headerLogo}>
        <Image src="/headerLogo.png" alt="header logo" layout='fill' objectFit='contain' />
      </Box>
      {!isMobileHeaderNav && <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Stack direction="row" className={styles.headerNavs} >
          <Box>
            <Link href="/pass" >
              <a target="_blank">{t('passNFT')}</a>
            </Link>
          </Box>
          <Box>{t('games')}</Box>
          <Box>{t('strategy')}</Box>
        </Stack>
        <Box className={styles.headerSetting}>
          <Box className={styles.languageNav}>
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
          </Box>

          <Box>
            <Box className={styles.headerNavImage}>
              <Image src={HEADER_SHARE} layout="fill" objectFit='contain' />
            </Box>
            <Box className={styles.socialMediaBox}>

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

      {isMobileHeaderNav && <Box className={styles.mobileMenuIcon} onClick={() => setMobileDrawer(!mobileDrawer)}>
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
        <HeaderUserInfo closeCallback={() => setMobileDrawer(false)} connectWallet={() => setShowConnect(true)} />
      </Box>
    </Drawer>
  </Box>
}

export default Header