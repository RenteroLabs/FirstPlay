import { Dialog, Box, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import TrialNFTCard from "../TrialNFTCard";
import ReplayIcon from '@mui/icons-material/Replay';
import { PackageRes } from "types/graph";
import { random } from "lodash";
import { WalletConnectParams, WalletConnet } from "pages/_app";
import { PackageListRefresh, TxLoading, TxLoadingParams, UserInfo, UserInfoParams } from "pages/game/[uuid]";
import { useAccount, useContract, useNetwork, useProvider, useSigner, useSwitchNetwork, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { CHAIN_ID_NAME } from "constants/index";
import { MARKET_CONTRACT } from "constants/contract";
import { FIRSTPLYA_MARKET_ABI } from "constants/abi";
import TrialConfirm from "./trialConfirm";
import TrialSuccessModal from "./TrialSuccess";

interface TemplateModalProps {
  showModal: boolean
  setShowModal: (arg: boolean) => any
  packageList: PackageRes[]
  chainId: number
}

const QuickTrialNFT: React.FC<TemplateModalProps> = (props) => {
  const { showModal, setShowModal, packageList, chainId } = props

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()
  const { chain } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()

  const { showConnect, setShowConnect } = useContext<WalletConnectParams>(WalletConnet)
  const { setTxHash, txHash, setShowTxLoading } = useContext<TxLoadingParams>(TxLoading)
  const { refreshList } = useContext(PackageListRefresh)
  
  const count = useMemo(() => packageList.length, [packageList])

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [showTrialSuccess, setShowTrialSuccess] = useState<boolean>(false)

  const { isActived, ownPassNFt } = useContext<UserInfoParams>(UserInfo)
  const [selectIndex, setSelectIndex] = useState<number>(0)

  const MARKET = useContract({
    addressOrName: MARKET_CONTRACT[chainId] || "",
    contractInterface: FIRSTPLYA_MARKET_ABI,
    signerOrProvider: signer || provider
  })

  const randomIndex = (count: number, selectIndex: number) => {
    let res = selectIndex
    while (res === selectIndex) {
      res = random(0, count - 1, false)
    }
    return res
  }

  useEffect(() => {
    const len = packageList.length
    if (len === 0) {
      // ??????????????? NFT
    } else if (len === 1) {
      setSelectIndex(0)
    } else {
      setSelectIndex(randomIndex(len, selectIndex))
    }
  }, [packageList])

  const handleChangeOne = () => {
    if (count >= 2) {
      setSelectIndex(randomIndex(count, selectIndex))
    }
  }

  // TODO: ?????????????????????????????????????????????
  useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      // ??????????????????
      // setVisibile(false)
      // TODO: ??????????????????
      // reloadInfo()
      setTimeout(() => {
        refreshList()
      }, 5000)

      // ???????????????????????? NFT ??????
      setShowTrialSuccess(true)

      // ??????????????????
      setShowModal(false)
    },
    onSettled: () => {
      setShowTxLoading(false)
      setTxHash("")
    }
  })
  const handleQuickTrialPlay = async () => {
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
    setShowModal(false)
    setShowTxLoading(true)
    try {
      const { hash } = await MARKET.play(packageList[selectIndex]?.id)
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

  return <Box>
    <Dialog open={showModal}>
      <Box className={styles.quickTrialBox}>
        <Box className={styles.modalHeader}>
          <IconButton disableRipple onClick={() => setShowModal(false)}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography> Try an NFT for free </Typography>
          <IconButton disableRipple onClick={() => setShowModal(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={styles.modalContent}>
          <Box className={styles.cardBox}>
            <TrialNFTCard type="@modal" packageInfo={packageList[selectIndex]} chainId={chainId} />
          </Box>
          <Box className={styles.tryAnother} onClick={handleChangeOne}>
            <ReplayIcon />
            <Typography>Change</Typography>
          </Box>
          <Box
            className={styles.btnBox}
            onClick={() => {
              setShowModal(false)
              setShowConfirmModal(true)
            }
            }>Confirm and Trial</Box>
        </Box>
      </Box>
    </Dialog>

    <TrialConfirm
      showModal={showConfirmModal}
      setShowModal={setShowConfirmModal}
      confirmTrial={handleQuickTrialPlay}
      trialDay={packageList[selectIndex]?.playDays} />

    <TrialSuccessModal
      showModal={showTrialSuccess}
      setShowModal={setShowTrialSuccess} />
  </Box>
}

export default QuickTrialNFT