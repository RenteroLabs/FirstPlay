import { Box } from '@mui/material'
import styles from './style.module.scss'

interface SectionTitleProps {
  emphasize: string
  normal: string
  sort?: 'first' | 'last'
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { emphasize, normal, sort = 'first' } = props

  const emphasizeStr = <Box className={styles.emphasize}>{emphasize}</Box>
  const normalStr = <Box className={styles.normal}>{normal}</Box>

  return <Box className={styles.sectionTitleBox}>
    {
      sort === 'first'
        ? <>{emphasizeStr} &nbsp;&nbsp;&nbsp; {normalStr}</>
        : <>{normalStr}&nbsp;&nbsp;&nbsp; {emphasizeStr}</>
    }
  </Box>
}

export default SectionTitle