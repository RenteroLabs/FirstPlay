import { Box, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import GameNewsVideoCard from "../GameNewsVideoCard";
import styles from './styles.module.scss'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { useMemo } from "react";

interface GameNewsTabProps {
  twitterHandler: string
  videoList: Record<string, any>[]
}

const GameNewsTab: React.FC<GameNewsTabProps> = (props) => {
  const { twitterHandler, videoList } = props

  const twitterName = useMemo(() => {
    return new URL(twitterHandler).pathname.slice(1)
  }, [twitterHandler])

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
      <TwitterTimelineEmbed
        noFooter={true}
        noHeader={true}
        tweetLimit={10}
        sourceType="profile"
        screenName={twitterName}
      />
    </Box>
  </Box>
}

export default GameNewsTab