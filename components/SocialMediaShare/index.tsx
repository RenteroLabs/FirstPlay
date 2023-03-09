import { Box, Drawer, useMediaQuery, Typography, IconButton } from "@mui/material";
import { useIsMounted } from "hooks/useIsMounted";
import React, { useMemo } from "react";
import styles from './styles.module.scss';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkIcon from '@mui/icons-material/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

interface SocialMediaShareProps {
  shareType: 'Article' | 'Game'
  showShareModal: boolean
  setShowShareModal: (arg: boolean) => any
  gameName?: string
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = (props) => {
  const { showShareModal, setShowShareModal, gameName } = props

  const router = useRouter()
  // console.log(router)
  const currentPath = useMemo(() => {
    // console.log(typeof window)
    // if (typeof window != undefined) {
    //   return window.location.href
    // }
    // return window && window.location.href
    return window.location.href
  }, [])

  const isMounted = useIsMounted()
  const is600Size = useMediaQuery("(max-width: 600px)")

  const handleCopyLink = () => {
    toast.success("Copy Success!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const handleShareTwitter = () => {

  }

  const [twitterLink, telegramLink] = useMemo(() => {
    const text = `I\'m trialing ${gameName}, come and build web3 with me!`

    const twitterShare = `https://twitter.com/share?text=${text}&url=${currentPath}`
    const telegramShare = `https://telegram.me/share/url?url=${currentPath}&text=${text}`
    return [twitterShare, telegramShare]
  }, [currentPath, gameName])


  return isMounted && is600Size ?
    <Drawer
      className={styles.drawerBox}
      anchor="bottom"
      open={showShareModal}
      onClose={() => setShowShareModal(false)}
    >
      <Box className={styles.mobileDrawerBox}>
        <Typography variant="h3">Share</Typography>

        <Box className={styles.shareList}>
          <a target="_blank" href={twitterLink} rel="noreferrer">
            <Box className={styles.shareItem}>
              <Box className={styles.shareMediaLogo} sx={{ backgroundColor: "rgba(74, 153, 233, 0.1)" }}>
                <IconButton >
                  <TwitterIcon sx={{ color: '#4A99E9', fontSize: '2.2rem' }} />
                </IconButton>
              </Box>
              <Typography className={styles.shareMediaName}>Twitter</Typography>
            </Box>
          </a>

          <a target="_blank" href={telegramLink} rel="noreferrer">
            <Box className={styles.shareItem} >
              <Box className={styles.shareMediaLogo} sx={{ backgroundColor: "rgba(143, 157, 248, 0.1)" }}>
                <IconButton >
                  <TelegramIcon sx={{ color: '#8F9DF8', fontSize: '2.2rem' }} />
                </IconButton>
              </Box>
              <Typography className={styles.shareMediaName}>Telegram</Typography>
            </Box>
          </a>
          <CopyToClipboard text={window.location.href}>
            <Box className={styles.shareItem} onClick={handleCopyLink}>
              <Box className={styles.shareMediaLogo} sx={{ backgroundColor: "rgba(34, 34, 34, 0.05)" }}>
                <IconButton>
                  <LinkIcon sx={{ color: 'black', fontSize: '2.2rem', transform: 'rotate(-45deg)' }} />
                </IconButton>
              </Box>
              <Typography className={styles.shareMediaName}>Copy Link</Typography>
            </Box>
          </CopyToClipboard>
        </Box>
      </Box>
    </Drawer>
    :
    <Box></Box>
}

export default SocialMediaShare