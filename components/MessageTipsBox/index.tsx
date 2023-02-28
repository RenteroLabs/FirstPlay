import { Box, Drawer, IconButton, Tooltip, useMediaQuery, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from './styles.module.scss'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useIsMounted } from "hooks/useIsMounted";
import CloseIcon from '@mui/icons-material/Close';

interface MessageTipsProps {
  fullmessage: string
}

const MessageTips: React.FC<MessageTipsProps> = (props) => {
  const { fullmessage } = props
  const is600Width = useMediaQuery("(max-width: 600px)")
  const isMounted = useIsMounted()

  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  return <Box className={styles.tipBox}>
    {
      isMounted && is600Width ?
        <HelpOutlineIcon onClick={() => setShowDrawer(true)} />
        :
        <Tooltip title={fullmessage} placement="top">
          <HelpOutlineIcon />
        </Tooltip>
    }

    <Drawer
      open={showDrawer}
      anchor="bottom"
      onClose={() => setShowDrawer(false)}
      className={styles.tipDrawer}
    >
      <Box className={styles.drawerBox}>
        <IconButton
          className={styles.closeBtn}
          disableRipple
          onClick={() => { setShowDrawer(false) }}
        ><CloseIcon />
        </IconButton>
        <Typography>{fullmessage}</Typography>
      </Box>
    </Drawer>
  </Box>
}

export default MessageTips