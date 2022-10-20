import { Box } from '@mui/material'
import styles from './style.module.scss'

interface SectionTitleProps {
  normal: string
  emphasize?: string
  sort?: 'first' | 'last'
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { emphasize, normal, sort = 'first' } = props

  const normalStr = <Box className={styles.normal}>{normal}</Box>
  const emphasizeStr = emphasize && <Box className={styles.emphasize}>{emphasize}</Box>

  return <Box className={styles.sectionTitleBox}>
    {
      sort === 'first'
        ? <>{emphasizeStr} &nbsp;&nbsp;&nbsp; {normalStr}</>
        : <>{normalStr}&nbsp;&nbsp;&nbsp; {emphasizeStr}</>
    }
  </Box>
}

export default SectionTitle