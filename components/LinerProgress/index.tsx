import { Box } from "@mui/material"
import styles from './styles.module.scss'

interface LinerProgressProps {
  percent: number
}

const LinerProgress: React.FC<LinerProgressProps> = (props) => {
  const { percent } = props

  return <Box className={styles.progressBox}>
    <Box className={styles.progressLine} sx={{ width: `${percent}%` }}></Box>
  </Box>
}

export default LinerProgress