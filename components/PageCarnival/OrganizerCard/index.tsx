import { Box } from '@mui/material'
import React from 'react'
import Image from 'next/image';
import styles from './style.module.scss'

interface OrganizerCardProps {
  cardImage: string;
  badge: string;
  twitterLink: string;
  telegramLink: string;
  discordLink: string;
  websiteLink: string
}

const OrganizerCard: React.FC<OrganizerCardProps> = (props) => {
  const { cardImage, badge, twitterLink, telegramLink, discordLink, websiteLink } = props

  return <Box className={styles.organizerCard}>
    <Box className={styles.cardCover}>
      <a href={websiteLink} target="_blank" rel="noreferrer">
        <Image src={cardImage} layout="fill" objectFit='cover' />
      </a>
    </Box>
    <Box className={styles.cardBadge}>
      {badge}
    </Box>
    <Box className={styles.mediaList}>
      <Box className={styles.mediaItem}>
        <a href={twitterLink} target="_blank" rel="noreferrer">
          <Image src="/media_twitter.webp" layout="fill" />
        </a>
      </Box>
      <Box className={styles.mediaItem}>
        <a href={telegramLink} target="_blank" rel="noreferrer">
          <Image src="/media_telegram.webp" layout="fill" />
        </a>
      </Box>
      <Box className={styles.mediaItem}>
        <a href={discordLink} target="_blank" rel="noreferrer">
          <Image src="/media_discord.webp" layout="fill" />
        </a>
      </Box>
    </Box>
  </Box>
}

export default OrganizerCard