import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import styles from './style.module.scss'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTranslations } from "next-intl";

interface SectionTitleProps {
  emphasize: string
  subTitle?: string
  sort?: 'first' | 'last'
  moreLink?: string
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { emphasize, moreLink, subTitle } = props

  const t = useTranslations('Index.Section')

  const emphasizeStr = emphasize && <Box className={styles.emphasize}>{emphasize}</Box>

  return <Box className={styles.sectionTitleBox}>
    <Box className={styles.titleBox}>{emphasizeStr}</Box>
    {subTitle && <Box className={styles.subTitle}>{subTitle}</Box>}
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