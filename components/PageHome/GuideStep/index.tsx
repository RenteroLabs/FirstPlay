import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'

const GudeStep: React.FC = () => {

  return <Box className={styles.guidestep}>
    <Box className={styles.guidestepBox}>
      <SectionTitle emphasize="4 Steps" normal="Easy To Firstplay" />

    </Box>
  </Box>
}

export default GudeStep