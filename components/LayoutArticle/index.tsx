
import { Box, useMediaQuery } from '@mui/material'
import { PropsWithChildren } from "react";
import styles from './styles.module.scss'

import Header from "../Header";

const LayoutArticle: React.FC<PropsWithChildren> = ({ children }) => {

  const isMobileSize = useMediaQuery("(max-width: 600px)")

  return (
    <Box sx={{ overflow: 'hidden' }}>
      { !isMobileSize && <Header />}
      <Box className={styles.containBox}>
        {children}
      </Box>
    </Box>
  )
}

export default LayoutArticle