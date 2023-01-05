import { Box, Drawer, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.scss'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DoneIcon from '@mui/icons-material/Done';
import { useIsMounted } from 'hooks/useIsMounted';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { isEmpty } from 'lodash';

const cx = classNames.bind(styles)

interface TaskStepItemProps {
  index: number
  isActive: boolean
  handleActive: (index: number) => any
}

const TaskStepItem: React.FC<TaskStepItemProps> = (props) => {
  const { index, isActive, handleActive } = props

  return <Box
    className={cx({
      taskStepItem: true,
      activeStep: isActive
    })}
    onClick={() => handleActive(index)}
  >
    Step{index}
  </Box>
}

interface StepButtonProps {
  text: string,
  link: string,
  perform: string,
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
    console.log(navigator.userAgent)
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
      case "download": return isIos ?
        <Box className={styles.iconBox}><Image src="/IOS_icon.png" layout='fill' /></Box> :
        <Box className={styles.iconBox}><Image src="/Android.png" layout='fill' /></Box>
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
      (isIos && platform?.ios || !isIos && platform?.android) &&
      <Box
        className={styles.stepBtnItem}
        onClick={handleClick}
      >
        {buttonIcon}
        &nbsp;{text}
      </Box>
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


interface GameTaskDrawerProps {
  showTaskDrawer: boolean
  setShowTaskDrawer: (arg: boolean) => any
  taskInfo: Record<string, any>
  index: number
  reward: string
  timestamp: number
  setShowTaskModal: (arg: boolean) => any
}

const GameTaskDrawer: React.FC<GameTaskDrawerProps> = (props) => {
  const { showTaskDrawer, setShowTaskDrawer, taskInfo, index, reward, setShowTaskModal, timestamp } = props

  const [stepNums, setStepNums] = useState<number>(3)
  const [activeStep, setActiveStep] = useState<number>(1)

  const taskBox = useRef()

  useEffect(() => {
    setStepNums(taskInfo?.steps.length)
  }, [taskInfo])

  return <Drawer
    anchor='bottom'
    open={showTaskDrawer}
    onClose={() => setShowTaskDrawer(false)}
    className={styles.drawerBox}
  >
    <Box className={`${styles.taskBox} taskBoxClass`} ref={taskBox}>
      <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
      <IconButton
        className={styles.closeBtn}
        onClick={() => setShowTaskDrawer(false)}
      >
        <HighlightOffIcon />
      </IconButton>
      <Box className={styles.taskInfoBox}>
        <Box className={styles.taskHeader}>
          <Box className={styles.stepPannel}>
            <Box className={styles.stepBox}>
              {
                taskInfo?.steps.map((_: any, index: number) => {
                  const isLast = taskInfo?.steps && (taskInfo?.steps.length - 1 === index)
                  return <>
                    <TaskStepItem
                      key={index}
                      index={index + 1}
                      isActive={activeStep === (index + 1)}
                      handleActive={setActiveStep}
                    />
                    {!isLast &&
                      <KeyboardArrowRightIcon
                        sx={{ fontSize: 24 }}
                        className={cx({ activeNextIcon: activeStep === (index + 1) })} />}
                  </>
                }
                )
              }
            </Box>
          </Box>
        </Box>

        {!isEmpty(taskInfo?.steps[activeStep - 1]?.buttons || []) &&
          <Box className={styles.btnList}>
            {
              taskInfo?.steps[activeStep - 1]?.buttons.map((item: StepButtonProps, index: number) => <StepButton {...item} key={index} />)
            }
          </Box>}

        <div
          className={styles.stepDesc}
          dangerouslySetInnerHTML={{ __html: taskInfo?.steps[activeStep - 1]?.description }}
        ></div>
        <Box className={styles.imageList}>
          {
            taskInfo?.steps[activeStep - 1]?.images.map((url: string, index: number) => <Box className={styles.imageBox} key={index}>
              <img src={`${url}?timestamp=${timestamp}`} />
            </Box>)
          }
        </Box>
      </Box>

      <Box className={styles.stepBtns}>
        {activeStep !== 1 ?
          <Box
            className={styles.backBtn}
            onClick={() => {
              if (activeStep > 1) {
                setActiveStep(activeStep - 1)
                // @ts-ignore
                taskBox?.current.scrollTo({ top: 0 })
              }
            }}>
            <KeyboardArrowLeftIcon /> Back
          </Box> : <Box></Box>}
        {activeStep !== stepNums ? <Box
          className={styles.nextBtn}
          onClick={() => {
            if (activeStep < stepNums) {
              setActiveStep(activeStep + 1)
              // @ts-ignore
              taskBox?.current.scrollTo({ top: 0 })
            }
          }}
        >
          Next <KeyboardArrowRightIcon />
        </Box> :
          taskInfo?.form && <Box
            className={styles.verifyBtn}
            onClick={() => setShowTaskModal(true)}
          >
            Verify
          </Box>
        }
      </Box>
    </Box>
  </Drawer>
}

export default GameTaskDrawer