import { Box, Dialog, IconButton, Typography, useMediaQuery } from '@mui/material'
import { COIN_ICON, MOBILE_CARNIVAL_REWARD_ITEM, MONEY_ICON, REWARD_ACTIVE_ICON, REWARD_ICON, STAR_LABEL, TASK_COIN } from 'constants/static'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import classname from 'classnames/bind'
import { useIsMounted } from 'hooks/useIsMounted'
import GiftCodeModal from '../GiftCodeModal'
import { useLocalStorageState, useRequest } from 'ahooks'
import { queryGameGiftCode } from 'services/carnival'
import * as ga from '../../../util/ga'
import { Carnival_Games, GAME_EVENT_NAME, GAME_TASK_MODAL_NAME } from 'constants/index'
import VerifyTaskModal from '../VerifyTaskModal'
import GameTaskDrawer from '@/components/GameTaskDrawer'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DoneIcon from '@mui/icons-material/Done';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RcImage from 'rc-image'
import QRCodeDownloadModal from '@/components/PageModals/QRCodeDownload'
import { FormatColorResetRounded } from '@mui/icons-material'
import QRCode from 'react-qr-code'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAccount } from 'wagmi'
import ConnectWallet from '@/components/ConnectWallet'
import { startGameTask } from 'services/home'

const cx = classname.bind(styles)


interface DownloadButtonProps {
  platform: PlatformType,
  url: string
}

const DownloadButton: React.FC<DownloadButtonProps> = (props) => {
  const { platform, url } = props
  const [showModal, setShowModal] = useState<boolean>(false)

  const [text, buttonIcon] = useMemo(() => {
    let text, buttonIcon
    switch (platform) {
      case 'ios':
        // text = 'IOS'
        text = 'Download'
        buttonIcon = <Image src="/IOS_icon.png" layout='fill' />
        break;
      case 'android':
        text = 'Android'
        buttonIcon = <Image src="/Android.png" layout='fill' />
        break;
      case 'mac':
        text = 'PC'
        buttonIcon = <Image src="/PC.png" layout='fill' />
        break;
      case 'windows':
        text = 'PC'
        buttonIcon = <Image src="/PC.png" layout='fill' />
        break;
      default:
        break;
    }

    return [text, buttonIcon]
  }, [platform])

  const handleClick = () => {
    if (!['ios', 'android'].includes(platform)) {
      window.open(url)
    } else {
      if (!showModal) {
        setShowModal(true)
      }
    }
  }

  return <Box
    className={styles.stepBtnItem}
    onClick={handleClick}
  >
    <Box className={styles.iconBox}>
      {buttonIcon}
    </Box>
    &nbsp;Download

    <QRCodeDownloadModal
      showModal={showModal}
      setShowModal={setShowModal}
      url={url}
    />
  </Box>
}

type ButtonType = "download" | "copy" | 'visit'
type PlatformType = 'android' | 'ios' | 'mac' | 'windows'

interface StepButtonProps {
  text: string,
  link: string,
  perform: ButtonType,
  platform?: {
    android: string,
    ios: string,
    mac: string,
    windows: string
  }
}

const StepButton: React.FC<StepButtonProps> = (props) => {
  const { text, link, perform, platform } = props

  const [isCopyed, setIsCopyed] = useState<boolean>(false)
  const isMounted = useIsMounted()

  const [isIos, setIsIos] = useState<boolean>(false)

  useEffect(() => {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      setIsIos(true)
    } else {
      setIsIos(false)
    }
  }, [navigator.userAgent])

  useEffect(() => {
    if (isCopyed) {
      setTimeout(() => {
        setIsCopyed(false)
      }, 1000)
    }
  }, [isCopyed])

  const handleClick = () => {
    if (perform === 'download') {
      window.open(isIos ? platform?.ios : platform?.android)
    } else {
      window.open(link)
    }
  }

  const buttonIcon = useMemo(() => {
    switch (perform) {
      case "copy": return <ContentCopyIcon />
      case "download": return isIos ? <AppleIcon /> : <AndroidIcon />
      case "visit": return <OpenInNewIcon />
      default: return <OpenInNewIcon />
    }
  }, [perform, isIos])

  return <>
    {
      perform === 'copy' &&
      <CopyToClipboard text={link} onCopy={() => setIsCopyed(true)}>
        <Box className={styles.stepBtnItem}>
          {
            isMounted && isCopyed ?
              <DoneIcon color="success" /> :
              <ContentCopyIcon />
          }
          &nbsp;{isMounted && isCopyed ? <Box component="i" sx={{ opacity: '0.8' }}>Copy !</Box> : text}
        </Box>
      </CopyToClipboard>
    }
    {
      perform === 'download' &&
      Object.entries(platform || {}).map(([key, url], index) => {
        if (url) {
          return <DownloadButton platform={key as PlatformType} url={url} key={index} />
        } else {
          return <></>
        }
      })
    }
    {
      perform === 'visit' &&
      <Box
        className={styles.stepBtnItem}
        onClick={handleClick}
      >
        {buttonIcon}
        &nbsp;{text}
      </Box>
    }
  </>
}

interface RewardItemProps {
  index: number,
  reward: string,
  isClaimed: boolean,
  isStarted: boolean,
  claimLink: string,
  medalNum: number,
  gameId: string,
  strategyLink: string,
  taskInfo: Record<string, any>
  timestamp: number
  reloadData: () => any
}

const GiftbagGame = '740a1e44-fd84-433e-98df-be90d650eb51'
const BlessGlobal = "32605c7c-45d3-49f4-9923-b3a51816d1df"

const CarnivalRewardItem: React.FC<RewardItemProps> = (props) => {
  const { index, reward, isClaimed, claimLink, medalNum, gameId, strategyLink, taskInfo, timestamp, isStarted, reloadData } = props
  const isMobileSize = useMediaQuery("(max-width:600px)")
  const isMounted = useIsMounted()

  const { address } = useAccount()
  console.log(taskInfo)
  const [showConnectWallet, setShowConnectWallet] = useState<boolean>(false)

  const [showGiftModal, setShowGiftModal] = useState<boolean>(false)
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false)
  const [showTaskDrawer, setShowTaskDrawer] = useState<boolean>(false)

  const [showTaskMore, setShowTaskMore] = useState<boolean>(false)


  useEffect(() => {
    if (showTaskDrawer && isMobileSize) {
      console.log("teset")
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [showTaskDrawer])

  const taskSpendTime = useMemo(() => {
    const time = taskInfo?.complete_time || 0
    if (time <= 60 && time >= 0) {
      return `${time} minutes`
    } else {
      return `${(time / 60).toFixed(1)} hours`
    }
  }, [taskInfo])

  const [giftCode, setGiftCode] = useState<string>("XXXXXXX")

  const linkToForm = () => {
    if (!isClaimed) {
      setShowTaskModal(true)

      ga.event({ action: `${GAME_TASK_MODAL_NAME[gameId]}`, params: { gameId: gameId } })
      // window.open(claimLink)
    }
  }

  const [localGiftCode, setLocalGiftCode] = useLocalStorageState("GIFTCODE")
  const [recordTime, setRecordTime] = useLocalStorageState("RECORD_TIME")


  // const 
  const { run: getGiftCode } = useRequest(queryGameGiftCode, {
    manual: true,
    onSuccess: ({ data }) => {
      setGiftCode(data.key)
      setLocalGiftCode(data?.key)
      setRecordTime(new Date().getTime())
    }
  })

  // 首先判断本地存不存在有效 giftcode
  useEffect(() => {
    if (localGiftCode && recordTime) {
      if (new Date().getTime() - Number(recordTime) < (86400 * 1000)) {
        setGiftCode(localGiftCode as string)
      }
    }
  }, [])

  const handleClickGiftBtn = () => {
    // 判断本地有没有
    if (giftCode === "XXXXXXX") {
      getGiftCode({ game_id: gameId })
    }
    setShowGiftModal(true)
  }

  const handleStartGameTask = async () => {
    // check connect wallet
    if (!address) {
      setShowConnectWallet(true)
      return
    }
    // send reqeust
    await startGameTask({
      task_id: taskInfo?.task_id,
      address: address
    })
    // open drawer
    setShowTaskDrawer(true)
  }

  return isMounted && isMobileSize ?
    <Box className={styles.mobileCarnivalRewardItem}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <Typography className={styles.spendTime}>Completed in {taskSpendTime}</Typography>
      <Typography className={styles.taskDesc}>
        <Box className={styles.iconBox}>
          <Image src={STAR_LABEL} layout="fill" />
        </Box>
        {reward}
      </Typography>
      <Box className={styles.taskReward}>
        {/* <img src={COIN_ICON} /> */}
        <Box className={styles.iconBox}>
          <Image src={TASK_COIN} layout="fill" />
        </Box>
        {taskInfo?.reward}
      </Box>

      <Box className={styles.actionArea}>
        {
          taskInfo?.task_status === 'on' &&
          <Box
            className={styles.startBtn}
            onClick={() => handleStartGameTask()}
          >Start</Box>
        }
        {
          taskInfo?.form && (taskInfo?.task_status === 'on' ?
            <Box className={cx({
              claimBtn: true,
              claimedBtn: isClaimed && isStarted
            })}
              onClick={linkToForm}
            >
              {(isClaimed && isStarted) ? "Completed" : 'Verify'}
            </Box>
            :
            <Box className={cx({ claimBtn: true, claimedBtn: true })} >
              Ended
            </Box>)
        }
        {

        }
      </Box>

      <VerifyTaskModal
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        index={index}
        claimLink={claimLink}
        gameId={gameId}
        strategyLink={strategyLink}
      />

      <GameTaskDrawer
        showTaskDrawer={showTaskDrawer}
        setShowTaskDrawer={setShowTaskDrawer}
        taskInfo={taskInfo}
        index={index}
        reward={reward}
        setShowTaskModal={setShowTaskModal}
        timestamp={timestamp}
      />
      <ConnectWallet showConnect={showConnectWallet} setShowConnect={setShowConnectWallet} />
    </Box>
    :
    <Box className={cx({
      carnivalRewardItem: true,
      carnivalRewardItemLess: !showTaskMore
    })}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <Typography className={styles.spendTime}>
        <AccessTimeIcon /> &nbsp;
        Complete task {index.toString().padStart(2, '0')}, it takes about {taskSpendTime}
      </Typography>

      <Box className={styles.rewardBox}>
        <Box className={styles.leftText}>
          <Typography className={styles.taskDesc}>
            <Box className={styles.iconBox}>
              <Image src={STAR_LABEL} layout="fill" />
            </Box>
            {reward}
          </Typography>
          <Typography className={styles.taskRewardDesc}>
            <Box className={styles.iconBox}>
              <Image src={TASK_COIN} layout="fill" />
            </Box>
            {taskInfo?.reward}
          </Typography>
        </Box>
        {
          // 无表单链接不显示 Verify 按钮
          taskInfo?.form && isStarted && taskInfo?.task_status === 'on' &&
          <Box className={cx({
            claimBtn: true,
            claimedBtn: isStarted && isClaimed
          })}
            onClick={linkToForm}
          >
            {(isStarted && isClaimed) ? "Completed" : 'Verify'}
          </Box>
        }
        {
          taskInfo?.task_status === 'off' &&
          <Box className={cx({ claimBtn: true, claimedBtn: true })} >
            Ended
          </Box>
        }
        {/* 没有开始，任务还在进行中 */}
        {!isStarted && taskInfo?.task_status === 'on' && taskInfo?.form &&
          <Box
            className={styles.claimBtn}
            onClick={async () => {
              setShowTaskMore(true)
              await handleStartGameTask()
              reloadData()
            }}>
            Start
          </Box>}
      </Box>

      <Box className={styles.taskDivider}></Box>

      <Box className={styles.stepList}>
        {
          taskInfo?.steps.map((item: Record<string, any>, index: number) => {

            return <Box className={styles.stepItem} key={index}>
              <Typography variant='h4'>Step{index + 1}:</Typography>
              <Box className={styles.stepContent}>
                <Box className={styles.descBtnBox}>
                  <div
                    className={styles.stepDesc}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                  <Box className={styles.btnList}>
                    {
                      item?.buttons.map((btnConfig: StepButtonProps, index: number) =>
                        <StepButton {...btnConfig} key={index} />
                      )
                    }
                  </Box>
                </Box>
                <Box className={styles.imageList}>
                  <RcImage.PreviewGroup icons={{
                    left: <KeyboardArrowLeftIcon />,
                    right: <KeyboardArrowRightIcon />
                  }}>
                    {
                      item?.images.map((url: string, index: number) =>
                        <RcImage src={`${url}?timestamp=${timestamp}`} key={index} className={styles.imageItem} />
                      )
                    }
                  </RcImage.PreviewGroup>
                </Box>
              </Box>
            </Box>
          })
        }
      </Box>

      <Box className={cx({
        showMoreBtn: true,
        stepDetailMask: !showTaskMore
      })} onClick={() => {
        if (!showTaskMore) {
          // handleStartGameTask()
          setShowTaskMore(true)
        } else {
          setShowTaskMore(false)
        }
      }}>
        <Typography>
          {
            showTaskMore ?
              <>
                See Less <KeyboardArrowUpIcon />
              </>
              :
              <>
                See All <KeyboardArrowDownIcon />
              </>
          }
        </Typography>
      </Box>

      <ConnectWallet showConnect={showConnectWallet} setShowConnect={setShowConnectWallet} />

      <VerifyTaskModal
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        index={index}
        claimLink={claimLink}
        gameId={gameId}
        strategyLink={strategyLink}
      />
    </Box>
}

export default CarnivalRewardItem