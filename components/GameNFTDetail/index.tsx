import { Box, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext, useMemo } from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import { PackageRes } from 'types/graph';
import { formatAddress } from 'util/format';
import { useCountDown, useRequest } from 'ahooks';
import { refreshNFTMetadata } from 'services/metadata';
import { useAccount, useContract, useNetwork, useProvider, useSigner, useWaitForTransaction } from 'wagmi';
import { FIRSTPLAY_MARKET_CONTRACT, MARKET_CONTRACT } from 'constants/contract';
import { FIRSTPLYA_MARKET_ABI } from 'constants/abi';
import { WalletConnectParams, WalletConnet } from 'pages/_app';
import { TxLoading, TxLoadingParams } from 'pages/game/[uuid]';
import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

interface GameNFTDetailProps {
  showDrawer: boolean
  setShowDrawer: (arg: boolean) => any
  metadata: Record<string, any>[]
  packageInfo: PackageRes
  chainId: number
}

const GameNFTDetail: React.FC<GameNFTDetailProps> = (props) => {
  const { showDrawer, setShowDrawer, metadata, packageInfo, chainId } = props

  const { showConnect, setShowConnect } = useContext<WalletConnectParams>(WalletConnet)
  const { setTxHash, txHash, showTxLoading, setShowTxLoading } = useContext<TxLoadingParams>(TxLoading)

  const { data: signer } = useSigner()
  const provider = useProvider()
  const { address } = useAccount()
  const { chain } = useNetwork()

  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])
  const isTrialing = useMemo(() => {
    if (Number(packageInfo?.expires || 0) > Number(timestamp)) {
      return true
    } else {
      return false
    }
  }, [timestamp, packageInfo])
  const [_, { days, hours, minutes}] = useCountDown({
    targetDate: Number(packageInfo?.expires || 0) * 1000 
  })

  // 根据状态判断返回不同文案 1. 上架中 2. 试玩中
  const trialBtnText = useMemo(() => {
    if (!isTrialing) {
      return 'Trial'
    } else {
      return <>Trialing <span>&nbsp;({days}Day {hours}Hour {minutes}Min Left)</span></>
    }
  }, [isTrialing])

  // console.log(metadata)

  const MARKET = useContract({
    addressOrName: MARKET_CONTRACT[chainId] || "",
    contractInterface: FIRSTPLYA_MARKET_ABI,
    signerOrProvider: signer || provider
  })

  // TODO: 此处待可以试玩后，完善相关逻辑
  useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      // 关闭租借弹窗
      // setVisibile(false)
      // 刷新页面数据
      // reloadInfo()
    },
    onSettled: () => {
      // setButtonLoading(false)
      setShowTxLoading(false)
      setTxHash("")
    }
  })




  // 刷新 metadata
  const { run: queryRefreshData } = useRequest(refreshNFTMetadata, {
    manual: true,
    onSuccess: (data) => {
      console.log(data)
    }
  })


  // 试玩 NFT
  const trialNFT = async () => {
    if (isTrialing) return

    // 1. 判断用户是否连接钱包
    if (!address) {
      setShowConnect(true)
    }
    // 2. TODO:判断是否在正确链上
    if (chainId !== chain?.id) {

    }

    setShowTxLoading(true)
    try {
      const { hash } = await MARKET.play(packageInfo.id)
      setTxHash(hash)
    } catch (err) {

      setShowTxLoading(false)
    }

  }



  return <Drawer
    anchor="bottom"
    open={showDrawer}
    onClose={() => setShowDrawer(false)}
  >
    <Box className={styles.drawerBox}>
      <Box className={styles.contentBox}>
        <Box className={styles.infoBox}>
          <Box className={styles.infoLeft}>
            <Box className={styles.nftCover}>
              {/* TODO: 判断当前试玩 package 包含 NFT 数量 */}
              <Box className={styles.nftCoverType1}>
                {metadata.length == 1 &&
                  <Image width="500" height="500" src={metadata[0].metadata.image} layout="fill" />
                }
              </Box>
            </Box>
            <Box className={styles.nftDetail}>
              <Typography variant='h3'>Details</Typography>
              <Stack>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Blockchain</Box>
                  <Box className={styles.detailValue}>Polygon</Box>
                </Box>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Contract Address</Box>
                  <Box className={styles.detailValue}>{formatAddress(packageInfo?.nfts[0].nftAddress || "", 3)}</Box>
                </Box>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Token ID</Box>
                  <Box className={styles.detailValue}>{packageInfo?.nfts[0].tokenId}</Box>
                </Box>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Token Standard</Box>
                  <Box className={styles.detailValue}>ERC-721</Box>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box className={styles.infoRight}>
            <Box className={styles.nftInfo}>
              <Typography variant='h4'>{metadata[0]?.metadata.name}</Typography>
              <Typography variant='h3'>#{metadata[0]?.token_id}</Typography>
              <Divider />
              <Box className={styles.trialInfo}>
                <Box className={styles.trialKey}>Trial Period</Box>
                <Box className={styles.trialValue}>{packageInfo?.playDays} Days</Box>
              </Box>
            </Box>
            <Box className={styles.metaList}>
              <Typography variant='h3'>Status</Typography>
              <Stack className={styles.statusList}>
                {/* <Typography variant='h4'>#2049</Typography> */}
                {
                  metadata[0]?.metadata.attributes.map((item: any, index: number) =>
                    <Box className={styles.statusItem} key={index}>
                      <Box className={styles.statusKey}>{item?.trait_type}</Box>
                      <Box className={styles.statusValue}>{item?.value}</Box>
                    </Box>
                  )
                }
              </Stack>
            </Box>
          </Box>
        </Box>

      </Box>
      <IconButton className={styles.drawerCloseIcon} onClick={() => setShowDrawer(false)}>
        <CloseIcon />
      </IconButton>
      <Box className={styles.btnBox}>
        <Box className={cx({
          "trialBtn": true,
          "trialingBtn": isTrialing
        })} onClick={trialNFT}>{trialBtnText}</Box>
      </Box>
    </Box>
  </Drawer>
}

export default GameNFTDetail

