import { Box, Stack, Typography } from "@mui/material";
import Image from 'next/image'
import styles from './style.module.scss'
import classname from 'classnames/bind'
import DoneIcon from '@mui/icons-material/Done';

const cx = classname.bind(styles)

interface UserStepProps {
  stepIndex: number
  stepTitle: string
  stepDesc: string
  stepStatus: 'Done' | 'Pendding' | 'Waitting'
}

const UserStep: React.FC<UserStepProps> = (props) => {
  const { stepIndex, stepTitle, stepDesc, stepStatus } = props

  const setpButton = () => {
    let text
    let btnStyle
    switch (stepIndex) {
      case 1:
        if (stepStatus === 'Done') {
          text = <DoneIcon sx={{ color: 'white' }} />
          btnStyle = styles.doneBtn
        } else {
          text = "Connect"
          btnStyle = styles.activeBtn
        }
        break;
      case 2:
        if (stepStatus === 'Done') {
          text = <DoneIcon sx={{ color: 'white' }} />
          btnStyle = styles.doneBtn
        } else if (stepStatus === 'Pendding') {
          text = "Mint"
          btnStyle = styles.activeBtn
        } else {
          text = "Mint"
          btnStyle = styles.waittingBtn
        }
        break;
      case 3:
        if (stepStatus === 'Done') {
          text = <DoneIcon sx={{ color: 'white' }} />
          btnStyle = styles.doneBtn
        } else if (stepStatus === 'Pendding') {
          text = "Trial"
          btnStyle = styles.activeBtn
        } else {
          text = "Trial"
          btnStyle = styles.waittingBtn
        }
        break;
      case 4:
        if (stepStatus === 'Done') {
          text = <DoneIcon sx={{ color: 'white' }} />
          btnStyle = styles.doneBtn
        } else if (stepStatus === 'Pendding') {
          text = "Claim"
          btnStyle = styles.activeBtn
        } else {
          text = "Claim"
          btnStyle = styles.waittingBtn
        }
        break;
    }
    return <Box className={btnStyle}>{text}</Box>
  }
  return <Box className={styles.userStep}>
    <Stack className={styles.userStepBox}>
      <Box className={styles.stepIcon}>
        <Image src={`/step${stepIndex}.png`} layout="fill" objectFit="contain" />
      </Box>
      <Box className={styles.stepProgress}>
        <Image src={`/step_progress_${stepStatus === 'Done' ? 'colorful' : 'gray'}.png`} layout="fill" objectFit="contain" />
      </Box>
      <Typography variant="h3">{stepTitle}</Typography>
      <Typography className={cx({ notActiveDesc: stepStatus === 'Waitting' })}>{stepDesc}</Typography>
      <Box className={styles.buttonBox}>
        {setpButton()}
      </Box>
    </Stack>
  </Box>
}

export default UserStep