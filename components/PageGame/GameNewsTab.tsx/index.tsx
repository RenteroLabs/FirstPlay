import { Box, Typography } from "@mui/material";
import React from "react";
import GameNewsVideoCard from "../GameNewsVideoCard";
import styles from './styles.module.scss'

interface GameNewsTabProps {

}

const GameNewsTab: React.FC<GameNewsTabProps> = (props) => {
  const { } = props

  return <Box className={styles.newsTabBox}>
    <Box className={styles.videoBox}>
      <Typography variant="h3">Videos</Typography>
      <GameNewsVideoCard />
      <GameNewsVideoCard />
      <GameNewsVideoCard />
    </Box>
    <Box className={styles.newsBox}>
      <Typography variant="h3">News</Typography>
      <div dangerouslySetInnerHTML={{
        __html: `<div><a class="twitter-timeline" 
        href="https://twitter.com/FirstPlayApp?ref_src=twsrc%5Etfw"
        data-tweet-limit="10"
        >Tweets by TwitterDev</a>           
        <script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
        `
      }}>
      </div>
    </Box>
  </Box>
}

export default GameNewsTab