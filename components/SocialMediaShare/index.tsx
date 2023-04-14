import { Box, Drawer, useMediaQuery, Typography, IconButton } from "@mui/material";
import { useIsMounted } from "hooks/useIsMounted";
import React, { useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkIcon from '@mui/icons-material/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { Dropdown, MenuProps } from "antd";

interface SocialMediaShareProps {
  trigger: React.ReactElement
  shareType: 'Article' | 'Game'
  gameName?: string
  articleName?: string
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = (props) => {
  const { trigger, gameName, shareType, articleName } = props

  const [showShareModal, setShowShareModal] = useState<boolean>(false)
  const [currentPath, setCurrentPath] = useState<string>()

  const router = useRouter()

  useEffect(() => {
    setCurrentPath(window.location.href)
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

  const [twitterLink, telegramLink] = useMemo(() => {
    let text = ''

    switch (shareType) {
      case 'Game':
        text = `I\'m playing the game ${gameName} and get rewards, Discover the latest web3 gaming events at First Play.`;
        break;
      case 'Article':
        text = `I\'m learning the gameplay of ${gameName}. Discover the latest web3 gaming events at First Play.`;
        break;
      default:
        text = `I\'m playing the game ${gameName} and get rewards, Discover the latest web3 gaming events at First Play.`;
        break;
    }

    const twitterShare = `https://twitter.com/share?text=${text}&url=${currentPath}`
    const telegramShare = `https://telegram.me/share/url?url=${currentPath}&text=${text}`

    return [twitterShare, telegramShare]
  }, [currentPath, gameName, shareType, articleName])


  const pcShareDropdown: MenuProps['items'] = [
    {
      key: '1',
      label: (<a target="_blank" href={twitterLink} rel="noreferrer">
        <Box className={styles.shareItemPC}>
          <Box className={styles.shareMediaLogo} sx={{ backgroundColor: "rgba(74, 153, 233, 0.1)" }}>
            <IconButton >
              <TwitterIcon sx={{ color: '#4A99E9', fontSize: '1.8rem' }} />
            </IconButton>
          </Box>
          <Typography className={styles.shareMediaName}>Twitter</Typography>
        </Box>
      </a>)
    },
    {
      key: '2',
      label: (
        <a target="_blank" href={telegramLink} rel="noreferrer">
          <Box className={styles.shareItemPC} >
            <Box className={styles.shareMediaLogo} sx={{ backgroundColor: "rgba(143, 157, 248, 0.1)" }}>
              <IconButton >
                <TelegramIcon sx={{ color: '#8F9DF8', fontSize: '1.8rem' }} />
              </IconButton>
            </Box>
            <Typography className={styles.shareMediaName}>Telegram</Typography>
          </Box>
        </a>
      )
    },
    {
      key: '3',
      label: (
        <CopyToClipboard text={currentPath as string}>
          <Box className={styles.shareItemPC} onClick={handleCopyLink}>
            <Box className={styles.shareMediaLogo} sx={{ backgroundColor: "rgba(34, 34, 34, 0.05)" }}>
              <IconButton>
                <LinkIcon sx={{ color: 'black', fontSize: '1.8rem', transform: 'rotate(-45deg)' }} />
              </IconButton>
            </Box>
            <Typography className={styles.shareMediaName}>Copy Link</Typography>
          </Box>
        </CopyToClipboard>
      )
    }
  ]

  return isMounted ? <Box >
    {
      is600Size ?
        <Box onClick={() => setShowShareModal(!showShareModal)}>{trigger}</Box>
        :
        <Dropdown menu={{ items: pcShareDropdown }} placement="bottomRight" >
          {trigger}
        </Dropdown>
    }

    {/* mobile component */}
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
          <CopyToClipboard text={currentPath as string}>
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
  </Box> : <Box></Box>
}

export default SocialMediaShare