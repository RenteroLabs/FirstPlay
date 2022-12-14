import { Box, Divider, Drawer, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import { PackageRes } from 'types/graph';
import { formatAddress } from 'util/format';
import { useCountDown, useRequest } from 'ahooks';
import { refreshNFTMetadata } from 'services/metadata';
import { useAccount, useContract, useContractRead, useNetwork, useProvider, useSigner, useSwitchNetwork, useWaitForTransaction } from 'wagmi';
import { MARKET_CONTRACT } from 'constants/contract';
import { FIRSTPLYA_MARKET_ABI } from 'constants/abi';
import { WalletConnectParams, WalletConnet } from 'pages/_app';
import { PackageListRefresh, TxLoading, TxLoadingParams, UserInfo, UserInfoParams } from 'pages/game/[uuid]';
import classnames from 'classnames/bind';
import TrialSuccessModal from '../PageModals/TrialSuccess';
import { toast } from 'react-toastify';
import TrialConfirm from '../PageModals/trialConfirm';
import { CHAIN_ID_NAME } from 'constants/index';

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

  const isMobileSize = useMediaQuery("(max-width: 900px)")

  const { showConnect, setShowConnect } = useContext<WalletConnectParams>(WalletConnet)
  const { refreshList } = useContext(PackageListRefresh)
  const [showTrialSuccess, setShowTrialSuccess] = useState<boolean>(false)
  const { setTxHash, txHash, showTxLoading, setShowTxLoading } = useContext<TxLoadingParams>(TxLoading)
  const { isActived, ownPassNFt } = useContext<UserInfoParams>(UserInfo)

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

  const { data: signer } = useSigner()
  const provider = useProvider()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()

  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])
  const isTrialing = useMemo(() => {
    if (Number(packageInfo?.expires || 0) > Number(timestamp)) {
      return true
    } else {
      return false
    }
  }, [timestamp, packageInfo])
  const [_, { days, hours, minutes }] = useCountDown({
    targetDate: Number(packageInfo?.expires || 0) * 1000
  })

  // ???????????????????????????????????? 1. ????????? 2. ?????????
  const trialBtnText = useMemo(() => {
    if (!isTrialing) {
      return 'Trial'
    } else {
      return <>Trialing <span>&nbsp;({days}Day {hours}Hour {minutes}Min Left)</span></>
    }
  }, [isTrialing])

  const MARKET = useContract({
    addressOrName: MARKET_CONTRACT[chainId] || "",
    contractInterface: FIRSTPLYA_MARKET_ABI,
    signerOrProvider: signer || provider
  })

  // TODO: ?????????????????????????????????????????????
  useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      // ??????????????????
      // setVisibile(false)
      // ??????????????????
      setTimeout(() => {
        refreshList()
      }, 5000)

      // ???????????????????????? NFT ??????
      setShowTrialSuccess(true)

      // ??????????????????
      setShowDrawer(false)
    },
    onSettled: () => {
      setShowTxLoading(false)
      setTxHash("")
    }
  })


  // ?????? metadata
  const { run: queryRefreshData } = useRequest(refreshNFTMetadata, {
    manual: true,
    onSuccess: (data) => {
      console.log(data)
    }
  })

  // ?????? NFT
  const trialNFT = async () => {
    if (isTrialing) return

    // ??????????????????????????????
    if (!address) {
      setShowConnect(true)
    }

    // ??????????????????????????????????????????????????????????????????
    if (!isActived) {
      if (!ownPassNFt) {
        // ????????? PassNFT
        toast.error("You need to hold a PassNFT in current wallet address firstly!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        return
      } else {
        // ?????? NFT ????????? NFT ?????????
        if (![CHAIN_ID_NAME.Goerli, CHAIN_ID_NAME.Polygon].includes(chainId)) {
          // ????????????????????????
          toast.warn(`You need to active ${CHAIN_ID_NAME[chainId]} chain trial access in profile page!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          return
        }
      }
    }

    // 4. ???????????????????????????
    if ((chainId !== chain?.id || (pendingChainId && chainId !== pendingChainId)) && switchNetwork) {
      switchNetwork(chainId)
      return
    }

    setShowTxLoading(true)
    try {
      const { hash } = await MARKET.play(packageInfo.id)
      setTxHash(hash)
    } catch (err: any) {
      setShowTxLoading(false)
      toast.error(err?.error?.message || err?.message || err.toString(), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const nftDetail = () => {
    return <Box className={styles.nftDetail}>
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
              {/* TODO: ?????????????????? package ?????? NFT ?????? */}
              <Box className={styles.nftCoverType1}>
                {metadata.length == 1 &&
                  <Image width="500" height="500" src={metadata[0].metadata.image} layout="fill" />
                }
              </Box>
            </Box>
            {!isMobileSize && nftDetail()}
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
            {
              isMobileSize && nftDetail()
            }
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
        })} onClick={() => setShowConfirmModal(true)}>{trialBtnText}</Box>
      </Box>
    </Box>
    <TrialConfirm showModal={showConfirmModal} setShowModal={setShowConfirmModal} confirmTrial={trialNFT} trialDay={packageInfo?.playDays} />
    <TrialSuccessModal showModal={showTrialSuccess} setShowModal={setShowTrialSuccess} />
  </Drawer>
}

export default GameNFTDetail

