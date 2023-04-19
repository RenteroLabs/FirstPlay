import { Box, Dialog, IconButton, Typography, useMediaQuery } from '@mui/material'
import { COIN_ICON, GAME_TASK_MONEY, STAR_LABEL, TASK_COIN } from 'constants/static'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import classname from 'classnames/bind'
import { useIsMounted } from 'hooks/useIsMounted'
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
import QRCodeDownloadModal from '@/components/PageModals/QRCodeDownload'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAccount } from 'wagmi'
import ConnectWallet from '@/components/ConnectWallet'
import { startGameTask } from 'services/home'
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslations } from "next-intl";
import MessageTips from '@/components/MessageTipsBox'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useRequest } from 'ahooks'
import { toast } from 'react-toastify'

import { PhotoProvider, PhotoView } from 'react-photo-view';


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

type ButtonType = "download" | "copy" | 'link'
type PlatformType = 'android' | 'ios' | 'mac' | 'windows'

interface StepButtonProps {
  text: string,
  link: string,
  perform: ButtonType,
  platform?: {
    android?: string,
    ios?: string,
    mac?: string,
    windows?: string
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
      case "link": return <OpenInNewIcon />
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
      perform === 'link' &&
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
  gameId: string,
  taskInfo: Record<string, any>
  timestamp: number
  reloadData: () => any
}

const CarnivalRewardItem: React.FC<RewardItemProps> = (props) => {
  const { index, isClaimed, taskInfo, timestamp, isStarted, reloadData } = props
  const isMobileSize = useMediaQuery("(max-width:600px)")
  const isMounted = useIsMounted()

  const t = useTranslations('Game.GameTask')

  const { address } = useAccount()
  const [showConnectWallet, setShowConnectWallet] = useState<boolean>(false)

  const [showTaskModal, setShowTaskModal] = useState<boolean>(false)
  const [showTaskDrawer, setShowTaskDrawer] = useState<boolean>(false)

  const [showTaskMore, setShowTaskMore] = useState<boolean>(false)

  const [isStartTaskLoading, setStartTaskLoading] = useState<boolean>(false)

  useEffect(() => {
    if (showTaskDrawer && isMobileSize) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [showTaskDrawer])

  const taskSpendTime = useMemo(() => {
    const time = taskInfo?.complete_time || 0
    if (time <= 60 && time >= 0) {
      return `${time} ${t('minutes')}`
    } else {
      return `${(time / 60).toFixed(1)} ${t('hours')}`
    }
  }, [taskInfo])

  const linkToForm = () => {
    if (!isClaimed) {
      setShowTaskModal(true)
    }
  }

  const { run: handleStartTask } = useRequest(startGameTask, {
    manual: true,
    onSuccess: ({ code, message }) => {
      if (code != 0) {
        toast.error(message, {
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
  })

  const handleStartGameTask = async () => {
    // check connect wallet
    if (!address) {
      setShowConnectWallet(true)
      return
    }

    await setStartTaskLoading(true)

    await handleStartTask({
      task_id: taskInfo?.task_id,
      address: address
    })

    await setStartTaskLoading(false)

    // open drawer
    setShowTaskDrawer(true)
  }

  const showTaskSteps = () => {
    setShowTaskDrawer(true)
  }

  return isMounted && isMobileSize ?
    <Box className={styles.mobileCarnivalRewardItem}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <Typography className={styles.spendTime}>{t('mobileCompleteTimeTip')} {taskSpendTime}</Typography>
      <Typography className={styles.taskDesc}>
        <Box className={styles.iconBox}>
          <Image src={STAR_LABEL} layout="fill" />
        </Box>
        {taskInfo?.description}
      </Typography>
      <Box className={styles.taskReward}>
        <Box className={styles.iconBox}>
          <Image src={GAME_TASK_MONEY} layout="fill" />
        </Box>
        {taskInfo?.reward}
      </Box>

      <Box className={styles.rewardInnerDivider}></Box>

      <Box className={styles.rewardTips}>
        <Typography className={styles.rewardNums}>{t('reward')}: {taskInfo?.total_rewards || '-'} &nbsp;&nbsp;|&nbsp;&nbsp;</Typography>
        <Typography className={styles.rewardTime}>
          {taskInfo?.reward_type} &nbsp;
        </Typography>
        {taskInfo?.reward_explain &&
          <MessageTips fullmessage={taskInfo?.reward_explain} />}
      </Box>

      <Box className={styles.actionArea}>
        {
          taskInfo?.task_status && (!address || !isStarted) &&
          <Box
            className={styles.startBtn}
            onClick={async () => {
              await handleStartGameTask()
              reloadData()
            }}
          >{t('startBtnText')} {isStartTaskLoading && <CircularProgress className={styles.btnLoading} />}</Box>
        }

        {
          // 继续任务
          taskInfo?.task_status && address && isStarted && !isClaimed &&
          <Box className={cx({ middleBtn: true })} onClick={showTaskSteps}>
            {t('continueBtnText')}
          </Box>
        }

        {
          // 任务结束
          !taskInfo?.task_status &&
          <Box className={cx({ claimBtn: true, middleBtn: true, claimedBtn: true })} >
            {t('endBtnText')}
          </Box>
        }

        {
          // 任务完成
          taskInfo?.task_status && address && isStarted && isClaimed &&
          <Box className={cx({
            claimBtn: true,
            middleBtn: true,
            claimedBtn: true,
          })}
          >
            {t('completedBtnText')}
          </Box>
        }

        {
          // 验证完成任务
          taskInfo?.form && taskInfo?.task_status && isStarted && !isClaimed &&
          <Box className={cx({ claimBtn: true })}
            onClick={linkToForm}
          >
            {t("verifyBtnText")}
          </Box>
        }

        {
          (!taskInfo?.task_status || (isClaimed && isStarted)) &&
          <Box className={cx({ claimBtn: true })} onClick={showTaskSteps}>
            {t("taskStepBtnText")}
          </Box>
        }
      </Box>

      <VerifyTaskModal
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        verifyForm={taskInfo?.form || []}
        taskId={taskInfo?.task_id}
      />

      <GameTaskDrawer
        showTaskDrawer={showTaskDrawer}
        setShowTaskDrawer={setShowTaskDrawer}
        taskInfo={taskInfo}
        index={index}
        reward={taskInfo?.reward}
        setShowTaskModal={setShowTaskModal}
        timestamp={timestamp}
        isStarted={isStarted}
        isClaimed={isClaimed}
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
        {t('pcCompleteTimeTip', { taskId: index.toString().padStart(2, '0') })} {taskSpendTime}
      </Typography>

      <Box className={styles.rewardBox}>
        <Box className={styles.leftText}>
          <Typography className={styles.taskDesc}>
            <Box className={styles.iconBox}>
              <Image src={STAR_LABEL} layout="fill" />
            </Box>
            {taskInfo?.description}
          </Typography>
          <Typography className={styles.taskRewardDesc}>
            <Box className={styles.iconBox}>
              <Image src={GAME_TASK_MONEY} layout="fill" />
            </Box>
            {taskInfo?.reward}
          </Typography>
          <Box className={styles.rewardTips}>
            <Typography className={styles.rewardNums}>{t('reward')}: {taskInfo?.total_rewards || '-'} &nbsp;&nbsp;|&nbsp;&nbsp;</Typography>
            <Typography className={styles.rewardTime}>
              {taskInfo?.reward_type} &nbsp;
            </Typography>
            {taskInfo?.reward_explain &&
              <MessageTips fullmessage={taskInfo?.reward_explain} />}
          </Box>
        </Box>
        {
          // 无表单链接不显示 Verify 按钮
          taskInfo?.form && isStarted && taskInfo?.task_status &&
          <Box className={cx({
            claimBtn: true,
            claimedBtn: isStarted && isClaimed
          })}
            onClick={linkToForm}
          >
            {(isStarted && isClaimed) ? t('completedBtnText') : t('verifyBtnText')}
          </Box>
        }
        {
          !taskInfo?.task_status &&
          <Box className={cx({ claimBtn: true, claimedBtn: true })} >
            {t('endBtnText')}
          </Box>
        }
        {/* 没有开始，任务还在进行中 */}
        {!isStarted && taskInfo?.task_status && taskInfo?.form &&
          <Box
            className={styles.claimBtn}
            onClick={async () => {
              setShowTaskMore(true)
              await handleStartGameTask()
              reloadData()
            }}>
            {t('startBtnText')} {isStartTaskLoading && <CircularProgress className={styles.btnLoading} />}
          </Box>}
      </Box>

      <Box className={styles.taskDivider}></Box>

      <Box className={styles.stepList}>
        <PhotoProvider maskOpacity={0.5} >
          {
            taskInfo?.steps?.map((item: Record<string, any>, index: number) => {

              return <Box className={styles.stepItem} key={index}>
                <Typography variant='h4'>{t('stepText')}{index + 1}: {item?.StepTitle}</Typography>
                <Box className={styles.stepContent}>
                  <Box className={styles.descBtnBox}>
                    <ReactMarkdown
                      className={styles.stepDesc}
                      linkTarget="_blank"
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // 将 img 元素替换为 PhotoView 组件
                        img: ({ node, ...props }) => {
                          return <PhotoView key={index} src={props?.src} >
                            <img src={props?.src} alt={props?.alt} />
                          </PhotoView>
                        }
                      }}
                    >
                      {item?.StepContent}
                    </ReactMarkdown>
                    <Box className={styles.btnList}>
                      {
                        item?.StepButtonList?.
                          map((btnConfig: Record<string, any>, index: number) => {
                            console.log(btnConfig)
                            const [type, platform]: string[] = btnConfig?.ButtonType?.split('-')

                            let configs: StepButtonProps = {
                              text: btnConfig?.ButtonText,
                              link: btnConfig?.ButtonValue,
                              perform: type.toLowerCase() as ButtonType
                            }

                            if (platform) {
                              const platformType = platform.toLowerCase() as PlatformType
                              configs['platform'] = {
                                [platformType]: btnConfig?.ButtonValue
                              }
                            }

                            return <StepButton
                              {...configs}
                              key={index} />
                          })
                      }
                    </Box>
                  </Box>
                </Box>
              </Box>
            })
          }
        </PhotoProvider>
      </Box>

      <Box className={cx({
        showMoreBtn: true,
        stepDetailMask: !showTaskMore
      })} onClick={() => {
        if (!showTaskMore) {
          setShowTaskMore(true)
        } else {
          setShowTaskMore(false)
        }
      }}>
        <Typography>
          {
            showTaskMore ?
              <>
                {t('seeLessTaskStep')} <KeyboardArrowUpIcon />
              </>
              :
              <>
                {t('seeMoreTaskStep')} <KeyboardArrowDownIcon />
              </>
          }
        </Typography>
      </Box>

      <ConnectWallet showConnect={showConnectWallet} setShowConnect={setShowConnectWallet} />

      <VerifyTaskModal
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        verifyForm={taskInfo?.form || []}
        taskId={taskInfo?.task_id}
      />
    </Box>
}

export default CarnivalRewardItem