import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'

const Support: React.FC = () => {

  return <Box className={styles.support}>
    <Box className={styles.supportBox}>
      <SectionTitle emphasize="Supported" normal="by" />

    </Box>
  </Box>
}

export default Support