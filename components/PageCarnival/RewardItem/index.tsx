import { Box, Typography, useMediaQuery } from '@mui/material'
import { COIN_ICON, MOBILE_CARNIVAL_REWARD_ITEM, MONEY_ICON, REWARD_ACTIVE_ICON, REWARD_ICON } from 'constants/static'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import classname from 'classnames/bind'
import { useIsMounted } from 'hooks/useIsMounted'
import GiftCodeModal from '../GiftCodeModal'
import { useLocalStorageState, useRequest } from 'ahooks'
import { queryGameGiftCode } from 'services/carnival'
import * as ga from '../../../util/ga'
import { Carnival_Games, GAME_EVENT_NAME, GAME_TASK_MODAL_NAME, Reward_Games } from 'constants/index'
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

const cx = classname.bind(styles)

type ButtonType = "download" | "copy" | 'visit'

interface StepButtonProps {
  text: string,
  link: string,
  perform: ButtonType,
}

const StepButton: React.FC<StepButtonProps> = (props) => {
  const { text, link, perform } = props

  const [isCopyed, setIsCopyed] = useState<boolean>(false)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isCopyed) {
      setTimeout(() => {
        setIsCopyed(false)
      }, 1000)
    }
  }, [isCopyed])

  const handleClick = () => {
    window.open(link)
  }

  const buttonIcon = useMemo(() => {
    switch (perform) {
      case "copy": return <ContentCopyIcon />
      case "download": return <DownloadIcon />
      default: return <OpenInNewIcon />
    }
  }, [perform])

  return isMounted && perform === 'copy' ?
    <CopyToClipboard text={link} onCopy={() => setIsCopyed(true)}>
      <Box className={styles.stepBtnItem}>
        {
          isMounted && isCopyed ?
            <DoneIcon color="success" /> :
            <ContentCopyIcon />
        }
        &nbsp;{text}
      </Box>
    </CopyToClipboard>
    :
    <Box
      className={styles.stepBtnItem}
      onClick={handleClick}
    >
      {buttonIcon}
      &nbsp;{text}
    </Box>
}

interface RewardItemProps {
  index: number,
  reward: string,
  isClaimed: boolean,
  claimLink: string,
  medalNum: number,
  gameId: string,
  strategyLink: string,
  taskInfo: Record<string, any>
}

const GiftbagGame = '740a1e44-fd84-433e-98df-be90d650eb51'
const BlessGlobal = "32605c7c-45d3-49f4-9923-b3a51816d1df"

const CarnivalRewardItem: React.FC<RewardItemProps> = (props) => {
  const { index, reward, isClaimed, claimLink, medalNum, gameId, strategyLink, taskInfo } = props
  const isMobileSize = useMediaQuery("(max-width:600px)")
  const isMounted = useIsMounted()

  console.log(taskInfo)

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
    console.log(localGiftCode, recordTime)
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

  return isMounted && isMobileSize ?
    <Box className={styles.mobileCarnivalRewardItem}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <Typography className={styles.spendTime}>Completed in {taskSpendTime}</Typography>
      <Typography>{reward}</Typography>

      <Box className={styles.taskReward}>
        <img src={COIN_ICON} />
        {taskInfo?.reward}
      </Box>

      <Box className={styles.actionArea}>
        <Box
          className={styles.startBtn}
          onClick={() => setShowTaskDrawer(true)}
        >Start</Box>
        {
          Reward_Games.includes(gameId) ?
            <Box className={cx({
              claimBtn: true,
              claimedBtn: isClaimed
            })}
              onClick={linkToForm}
            >
              {isClaimed ? "Completed" : 'Verify'}
            </Box>
            :
            <Box className={cx({ claimBtn: true, claimedBtn: true })} >
              Ended
            </Box>
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
      />
    </Box>
    :
    <Box className={cx({
      carnivalRewardItem: true,
      carnivalRewardItemLess: !showTaskMore
    })}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <Typography className={styles.spendTime}>Complete task {index.toString().padStart(2, '0')}, it takes about {taskSpendTime}</Typography>

      <Box className={styles.rewardBox}>
        <Typography>{reward}</Typography>
        {
          Reward_Games.includes(gameId) ?
            <Box className={cx({
              claimBtn: true,
              claimedBtn: isClaimed
            })}
              onClick={linkToForm}
            >
              {isClaimed ? "Completed" : 'Verify'}
            </Box> :
            <Box className={cx({ claimBtn: true, claimedBtn: true })} >
              Ended
            </Box>
        }
      </Box>

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
                        <RcImage src={url} key={index} className={styles.imageItem} />
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
      })} onClick={() => setShowTaskMore(!showTaskMore)}>
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