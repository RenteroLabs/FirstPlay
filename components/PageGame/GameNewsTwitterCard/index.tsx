import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from './styles.module.scss'
import InsertLinkIcon from '@mui/icons-material/InsertLink';

interface GameNewsTwitterCardProps {

}

const GameNewsTwitterCard: React.FC<GameNewsTwitterCardProps> = (props) => {
  const { } = props

  return <Box className={styles.twitterNewsBox}>
    <Box className={styles.cardHeader}>
      <Box className={styles.newsAuthor}>
        <Box className={styles.iconBox}>
          <img src="https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/logo/StepN.jpg" />
        </Box>
        <Typography>Dark Throne</Typography>
      </Box>
      <Box className={styles.twitterLink}>
        <InsertLinkIcon className={styles.linkIcon} />
        Twitter
      </Box>
    </Box>
    <Box className={styles.cardContent}>
      Someone tell us what&lsquo;s happening We promise this chaos is under control. Check out fun new additions and experience all the greatness of our latest update now.
    </Box>
  </Box>
}

export default GameNewsTwitterCard