import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import styles from './styles.module.scss'
import Image from "next/image"
import { useTranslations } from "next-intl"

const Footer: React.FC = () => {
  const isMobileLayout = useMediaQuery('(max-width: 900px)')

  const t = useTranslations('Index.Footer')

  return <Box className={styles.footer}>
    <Box className={styles.footerBox}>
      {isMobileLayout && <Box className={styles.mobileBrands}>
        <Typography variant="h3">
          {/* <Image src="/headerLogo.png" layout="fill" objectFit="contain" /> */}
          FirstPlay
        </Typography>
        <Typography variant="body1" component="p">
          First Play Be the first to play and earn.</Typography>
      </Box>}
      <Stack className={styles.brands}>
        <Typography variant="h3">
          {/* <Image src="/headerLogo.png" layout="fill" objectFit="contain" /> */}
          FirstPlay
        </Typography>
        <Typography variant="body1">{t('solgan')}</Typography>
        <Typography variant="subtitle2">{t('copyright')}</Typography>
      </Stack>
      <Box className={styles.linkList}>
        <Stack className={styles.platform}>
          <Typography variant="h4">{t('platform')}</Typography>
          <Typography variant="body1">{t('passNFT')}</Typography>
          <Typography variant="body1">{t('games')}</Typography>
          <Typography variant="body1">{t('strategy')}</Typography>
        </Stack>
        <Stack className={styles.medias}>
          <Typography variant="h4">{t('social')}</Typography>
          <a href="https://twitter.com/FirstPlay2022" target="_blank" rel="noreferrer">
            <Typography variant="body1">{t('twitter')}</Typography>
          </a>
          <a href="https://discord.com/invite/84mhbPXFUu" target="_blank" rel="noreferrer">
            <Typography variant="body1">{t('discord')}</Typography>
          </a>
          <a href="https://t.me/firstplay2022" target="_blank" rel="noreferrer">
            <Typography variant="body1">{t('telegram')}</Typography>
          </a>
        </Stack>
        <Stack className={styles.support}>
          <Typography variant="h4">{t('support')}</Typography>
          <Typography variant="body1">{t('whitepaper')}</Typography>
          <Typography variant="body1">{t('litebook')}</Typography>
          <Typography variant="body1">{t('SDK')}</Typography>
        </Stack>
      </Box>
      {isMobileLayout &&
        <Typography className={styles.mobileCopyright}>{t('copyright')}</Typography>}
    </Box>
  </Box>
}

export default Footer