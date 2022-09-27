
import { Box } from '@mui/material'
import { PropsWithChildren } from "react";
import styles from './styles.module.scss'

import Header from "../Header";
import Footer from '../Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <Box sx={{ overflow: 'hidden'}}>
      <Header />
      <Box className={styles.containBox}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout