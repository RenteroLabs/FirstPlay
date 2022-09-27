import { Box, Stack, Typography } from "@mui/material"
import styles from './styles.module.scss'
import Image from "next/image"


const Footer: React.FC = () => {

  return <Box className={styles.footer}>
    <Box className={styles.footerBox}>
      <Stack className={styles.brands}>
        <Typography variant="h3">
          {/* <Image src="/headerLogo.png" layout="fill" objectFit="contain" /> */}
          FirstPlay
        </Typography>
        <Typography variant="body1">Easy Fun and Earn</Typography>
        <Typography variant="subtitle2">Copyright 2022 Rentero.io All rights reserved.</Typography>
      </Stack>
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
      <Stack direction="row" className={styles.medias}>
        <Box> <Image src="/twitter_footer.png" alt="twitter" layout="fill" objectFit="contain" /> </Box>
        <Box> <Image src="/discord_footer.png" alt="twitter" layout="fill" objectFit="contain" /> </Box>
        <Box> <Image src="/telegram_footer.png" alt="twitter" layout="fill" objectFit="contain" /> </Box>
      </Stack>
    </Box>
  </Box>
}

export default Footer