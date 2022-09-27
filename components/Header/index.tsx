import { Box, Stack } from '@mui/material'
import styles from './styles.module.scss'
import Image from 'next/image'

const Header: React.FC = () => {

  return <Box className={styles.header}>
    <Box className={styles.headerBox}>
      <Box className={styles.headerLogo}>
        <Image src="/headerLogo.png" alt="header logo" layout='fill' objectFit='contain' />
      </Box>
      <Box>
        <Stack direction="row" className={styles.headerNavs} spacing="4.17rem">
          <Box>Games</Box>
          <Box>Strategy</Box>
          <Box>
            Guild
          </Box>
          <Box>Contact</Box>
        </Stack>
      </Box>
    </Box>
  </Box>
}

export default Header