import { Box, Typography } from "@mui/material"
import styles from './styles.module.scss'
import Image from 'next/image'
import { useTranslations } from "next-intl";


interface JoinCommunityProps {

}


const JoinCommunity: React.FC<JoinCommunityProps> = (props) => {
  const { } = props
  const t = useTranslations('Index.Community')

  return <Box className={styles.communityBox}>
    <Typography variant="h2">{t('title')}</Typography>
    <Typography>{t('subTitle')}</Typography>
    <Box
      className={styles.discordBtn}
      onClick={() => {
        window.open('https://t.me/firstplay2022')
      }}>
      <Box className={styles.iconBox}>
        <Image src="/Telegram-Logo-Carnival.png" layout="fill" />
      </Box>
      {t('btnText')}
    </Box>
  </Box>
}

export default JoinCommunity