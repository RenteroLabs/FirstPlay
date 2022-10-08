import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import styles from './styles.module.scss'
import Image from "next/image"

const Footer: React.FC = () => {
  const isMobileLayout = useMediaQuery('(max-width: 900px)')

  return <Box className={styles.footer}>
    <Box className={styles.footerBox}>
      {isMobileLayout && <Box className={styles.mobileBrands}>
        <Typography variant="h3">
          {/* <Image src="/headerLogo.png" layout="fill" objectFit="contain" /> */}
          FirstPlay
        </Typography>
        <Typography variant="body1" component="p">
          Rentero is an open-source NFTs rental protocol
          built to maximize the utility of NFTs</Typography>
      </Box>}
      <Stack className={styles.brands}>
        <Typography variant="h3">
          {/* <Image src="/headerLogo.png" layout="fill" objectFit="contain" /> */}
          FirstPlay
        </Typography>
        <Typography variant="body1">Easy Fun and Earn</Typography>
        <Typography variant="subtitle2">Copyright 2022 Rentero.io All rights reserved.</Typography>
      </Stack>
      <Box className={styles.linkList}>
        <Stack className={styles.platform}>
          <Typography variant="h4">Platform</Typography>
          <Typography variant="body1">Games</Typography>
          <Typography variant="body1">Startegy</Typography>
          <Typography variant="body1">Contact</Typography>
        </Stack>
        <Stack className={styles.support}>
          <Typography variant="h4">Support</Typography>
          <Typography variant="body1">Whitepaper</Typography>
          <Typography variant="body1">Litebook</Typography>
          <Typography variant="body1">SDK</Typography>
        </Stack>
      </Box>
      <Stack direction="row" className={styles.medias}>
        <a href="https://twitter.com/FirstPlay2022" target="_blank" rel="noreferrer">
          <Box>
            <Image src="/twitter_footer.png" alt="twitter" layout="fill" objectFit="contain" />
          </Box>
        </a>
        <a href="https://discord.com/invite/84mhbPXFUu" target="_blank" rel="noreferrer">
          <Box>
            <Image src="/discord_footer.png" alt="twitter" layout="fill" objectFit="contain" />
          </Box>
        </a>
        <a href="https://t.me/firstplay2022" target="_blank" rel="noreferrer">
          <Box>
            <Image src="/telegram_footer.png" alt="twitter" layout="fill" objectFit="contain" />
          </Box>
        </a>
      </Stack>
      {isMobileLayout &&
        <Typography className={styles.mobileCopyright}>Copyright 2021-2022 Rentero.io All rights
          reserved.</Typography>}
    </Box>
  </Box>
}

export default Footer