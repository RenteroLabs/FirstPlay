import { Box, Drawer, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cx = classNames.bind(styles)

interface TaskStepItemProps {
  index: number
  isActive: boolean
}

const TaskStepItem: React.FC<TaskStepItemProps> = (props) => {
  const { index, isActive } = props

  return <Box className={cx({
    taskStepItem: true,
    activeStep: isActive
  })}>
    Step{index}
  </Box>
}

interface StepButtonProps {
  text: string,
  link: string,
  perform: string,
}

const StepButton: React.FC<StepButtonProps> = (props) => {
  const { text, link, perform } = props

  const handleClick = () => {

    window.open(link)
  }

  return <Box
    className={styles.stepBtnItem}
    onClick={handleClick}
  >
    <OpenInNewIcon />
    &nbsp;{text}
  </Box>
}


interface GameTaskDrawerProps {
  showTaskDrawer: boolean
  setShowTaskDrawer: (arg: boolean) => any
  taskInfo: Record<string, any>
  index: number
  reward: string
  setShowTaskModal: (arg: boolean) => any
}

const GameTaskDrawer: React.FC<GameTaskDrawerProps> = (props) => {

  const { showTaskDrawer, setShowTaskDrawer, taskInfo, index, reward, setShowTaskModal } = props

  const [stepNums, setStepNums] = useState<number>(3)
  const [activeStep, setActiveStep] = useState<number>(1)

  useEffect(() => {
    setStepNums(taskInfo?.steps.length)
  }, [taskInfo])

  return <Drawer
    anchor='bottom'
    open={showTaskDrawer}
    onClose={() => setShowTaskDrawer(false)}
  >
    <Box className={styles.taskBox}>

      <Box className={styles.taskInfoBox}>
        <Box className={styles.itemLabel}>{index.toString().padStart(2, '0')}</Box>
        <Box className={styles.taskHeader}>
          <Typography>{reward}</Typography>
          <Box className={styles.stepPannel}>
            <Box
              className={cx({
                stepBack: true,
                disableBtn: activeStep <= 1
              })}
              onClick={() => {
                if (activeStep > 1) {
                  setActiveStep(activeStep - 1)
                }
              }}
            ><KeyboardArrowLeftIcon /> </Box>
            <Box className={styles.stepBox}>
              {
                taskInfo?.steps.map((_: any, index: number) =>
                  <TaskStepItem key={index} index={index + 1} isActive={activeStep === (index + 1)} />)
              }
            </Box>
            <Box
              className={cx({
                stepNext: true,
                disableBtn: activeStep >= stepNums
              })}
              onClick={() => {
                if (activeStep < stepNums) {
                  setActiveStep(activeStep + 1)
                }
              }}
            ><KeyboardArrowRightIcon /></Box>
          </Box>
        </Box>

        <Box className={styles.btnList}>
          {
            taskInfo?.steps[activeStep - 1]?.buttons.map((item: StepButtonProps, index: number) => <StepButton {...item} key={index} />)
          }
        </Box>
        <Box className={styles.stepDesc}>{taskInfo?.steps[activeStep - 1]?.description}</Box>
        <Box className={styles.imageList}>
          {
            taskInfo?.steps[activeStep - 1]?.images.map((url: string, index: number) => <Box className={styles.imageBox} key={index}>
              <img src={url} />
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
              }
            }}>
            <KeyboardArrowLeftIcon /> Back
          </Box> : <Box></Box>}
        {activeStep !== stepNums ? <Box
          className={styles.nextBtn}
          onClick={() => {
            if (activeStep < stepNums) {
              setActiveStep(activeStep + 1)
            }
          }}
        >
          Next <KeyboardArrowRightIcon />
        </Box> :
          <Box
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