
import { Box } from '@mui/material'
import { PropsWithChildren } from "react";
import styles from './style.module.scss'

import Header from "../Header";

const LayoutWithoutFooter: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <Box sx={{ overflow: 'hidden'}}>
      <Header />
      <Box className={styles.containBox}>
        {children}
      </Box>
    </Box>
  )
}

export default LayoutWithoutFooter