import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import styles from './style.module.scss'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTranslations } from "next-intl";

interface SectionTitleProps {
  normal: string
  emphasize?: string
  sort?: 'first' | 'last'
  moreLink?: string
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { emphasize, normal, sort = 'first', moreLink } = props

  const t = useTranslations('Index.Section')

  const normalStr = <Box className={styles.normal}>{normal}</Box>
  const emphasizeStr = emphasize && <Box className={styles.emphasize}>{emphasize}</Box>

  return <Box className={styles.sectionTitleBox}>
    {
      sort === 'first'
        ? <Box className={styles.titleBox}>{emphasizeStr} &nbsp;&nbsp;&nbsp; {normalStr}</Box>
        : <Box className={styles.titleBox}>{normalStr}&nbsp;&nbsp;&nbsp; {emphasizeStr}</Box>
    }
    {
      moreLink && <Box className={styles.moreLink}>
        <Link href={moreLink}>
          <Typography>{t('moreLink')}</Typography>
        </Link>
        <ArrowRightIcon fontSize="large" />
      </Box>
    }
  </Box>
}

export default SectionTitle