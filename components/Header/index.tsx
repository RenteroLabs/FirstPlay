import { Box, Button, MenuItem, Stack, Typography } from '@mui/material'
import styles from './styles.module.scss'
import Image from 'next/image'
import ConnectWallet from '../ConnectWallet'
import { useRef, useState, useMemo } from 'react'
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { formatAddress } from 'util/format'
import FeaturedVideoOutlinedIcon from '@mui/icons-material/FeaturedVideoOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { SUPPORT_CHAINS } from 'constants/index'
import { CHAIN_ICON_MAP } from 'constants/static'

const Header: React.FC = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false)

  const [walletMenu, setWalletMenu] = useState<boolean>(false)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect()

  const [showChangeNetwork, setShowChangeNetwork] = useState<boolean>(false)

  const handleConnectWallet = () => {
    // setWalletMenu(!walletMenu)
    // if (!address) {
    //   setShowConnect(true)
    // }
  }

  const chooseSwitchNetwork = (id: number | undefined) => {
    if ((chain?.id !== id || pendingChainId !== id) && switchNetwork) {
      switchNetwork(id)
    }
    setShowChangeNetwork(false)
  }

  return <Box className={styles.header}>
    <Box className={styles.headerBox}>
      <Box className={styles.headerLogo}>
        <Image src="/headerLogo.png" alt="header logo" layout='fill' objectFit='contain' />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Stack direction="row" className={styles.headerNavs} spacing="4.17rem">
          <Box>Games</Box>
          <Box>Strategy</Box>
          <Box>
            Guild
          </Box>
          <Box>Contact</Box>
        </Stack>
        <Box className={styles.headerSetting}>
          <Box>
            <Box className={styles.headerNavImage}> <Image src="/header_language.png" layout="fill" objectFit='contain' /> </Box>
          </Box>

          <Box>
            <Box className={styles.headerNavImage}>
              <Image src="/header_share.png" layout="fill" objectFit='contain' />
            </Box>
          </Box>

          {
            !address ?
              <Button variant="contained" onClick={() => setShowConnect(true)}>
                Connect Wallet
              </Button>
              : <Box
                className={styles.walletNav}
                onMouseEnter={() => {
                  if (address) {
                    setWalletMenu(true)
                  }
                }}>
                <Box className={styles.headerNavImage} >
                  <Image src="/header_wallet.png" layout="fill" objectFit='contain' />
                  {walletMenu &&
                    <Box className={styles.walletMenuBox} >
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
                            <Box className={styles.addressItem} >
                              <Typography>{formatAddress(address, 4)}</Typography>
                              <Box sx={{ cursor: 'pointer' }} onClick={() => {
                                disconnect()
                                setWalletMenu(false)
                              }}>
                                <Image src="/header_exit.png" layout='fill' objectFit='contain' />
                              </Box>
                            </Box>
                            <Box className={styles.divider}></Box>
                            <MenuItem
                              className={styles.menuItem}
                              disableRipple>
                              <Box>
                                <Image src="/header_menu_wallet.png" layout='fill' objectFit='contain' />
                              </Box>
                              Items
                            </MenuItem>
                            <MenuItem
                              className={styles.menuItem}
                              sx={{ marginBottom: '0.5rem' }}
                              disableRipple>
                              <Box>
                                <Image src="/header_menu_wallet.png" layout='fill' objectFit='contain' />
                              </Box>
                              Activity
                            </MenuItem>
                            <Box className={styles.divider}></Box>
                            {chain &&
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
                          </Box>
                      }
                    </Box>}
                </Box>
              </Box>
          }

        </Box>
      </Box>
    </Box>

    <ConnectWallet showConnect={showConnect} setShowConnect={setShowConnect} />
  </Box>
}

export default Header