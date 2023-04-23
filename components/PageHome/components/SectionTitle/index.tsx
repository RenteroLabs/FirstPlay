import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import styles from './style.module.scss'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTranslations } from "next-intl";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ReactNode } from 'react';

interface SectionTitleProps {
  emphasize: string
  subTitle?: string | ReactNode
  sort?: 'first' | 'last'
  moreLink?: string
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { emphasize, moreLink, subTitle } = props

  const t = useTranslations('Index.Section')

  const emphasizeStr = emphasize && <Box className={styles.emphasize}>{emphasize}</Box>

  return <Box className={styles.sectionTitleBox}>
    <Box className={styles.titleBox}>{emphasizeStr}</Box>
    {subTitle &&
      <Box className={styles.subTitle}>
        <a href={moreLink} target="_blank" rel="noreferrer">
          {subTitle}
        </a>
      </Box>}
    {
      moreLink &&
      <a href={moreLink} target="_blank" rel="noreferrer">
        <Box className={styles.moreLink}>
          <Typography>{t('moreLink')} </Typography>
          <KeyboardArrowRightIcon fontSize="medium" />
        </Box>
      </a>
    }
  </Box>
}

export default SectionTitle