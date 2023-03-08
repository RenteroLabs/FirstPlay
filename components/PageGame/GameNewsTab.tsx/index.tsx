import { Box, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import GameNewsVideoCard from "../GameNewsVideoCard";
import styles from './styles.module.scss'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

interface GameNewsTabProps {
  twitterHandler: string
  videoList: Record<string, any>[]
}

const GameNewsTab: React.FC<GameNewsTabProps> = (props) => {
  const { twitterHandler, videoList } = props

  return <Box className={styles.newsTabBox}>
    {
      !isEmpty(videoList) &&
      <Box className={styles.videoBox}>
        <Typography variant="h3">Videos</Typography>
        {
          videoList.map((item, index) =>
            <GameNewsVideoCard key={index} videoInfo={item} />
          )
        }
      </Box>
    }

    <Box className={styles.newsBox}>
      <Typography variant="h3">News</Typography>
      {/* <div dangerouslySetInnerHTML={{
        __html: `
        <a class="twitter-timeline" href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw">Tweets by TwitterDev</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
        `
      }}>
      </div> */}
      <TwitterTimelineEmbed
        tweetLimit={10}
        sourceType="profile"
        screenName={twitterHandler}
      />
    </Box>
  </Box>
}

export default GameNewsTab