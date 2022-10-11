import { Box, Typography } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import styles from '../styles/pass.module.scss'
import Image from 'next/image'
import { BADGE_ICON, REWARD_ICON, TIME_ICON } from "constants/static";
import { useState } from "react";
import LinerProgress from "@/components/LinerProgress";
import EastIcon from '@mui/icons-material/East';

const PassNFT: NextPage = () => {
  const [mintCount, setMintCount] = useState<number>(100)

  return <Box className={styles.containBox}>
    <Box className={styles.container}>
      <Box className={styles.nftInfo}>
        <Box className={styles.nftMetadata}>
          <Box className={styles.nftCover}>
            <Image layout="fill" src="https://rentero-resource.s3.ap-east-1.amazonaws.com/e6c9d24egy1h3xgnbyzscj20zk0k0gtn.jpg" objectFit="cover" />
          </Box>
          <Box className={styles.nftIntro}>
            <Typography variant="h2">
              Pass-NFT
              <Box>
                <Image src={BADGE_ICON} layout="fill" />
              </Box>
            </Typography>
            <Typography>What is PassNFT, related introduction. What is PassNFT, related introduction related introductionWhat is PassNFT, related introduction</Typography>
          </Box>
        </Box>
        <Box className={styles.rewardBox}>
          <Typography variant="h3">Earn rewards</Typography>
          <Box className={styles.rewardItem}>
            <Box>
              <Image src={REWARD_ICON} layout="fill" />
            </Box>
            Get the NFT first, then try it out;
          </Box>
          <Box className={styles.rewardItem}>
            <Box><Image src={REWARD_ICON} layout="fill" /></Box>
            Continue to receive airdrop rewards;
          </Box>
          <Box className={styles.rewardItem}>
            <Box><Image src={REWARD_ICON} layout="fill" /></Box>
            You can have more rights after upgrading in the future;
          </Box>
        </Box>
      </Box>
      <Box className={styles.progress}>
        <Typography variant="h3">Stage in progress</Typography>
        <Typography variant="h4"> Rare Pass-NFT</Typography>
        <Typography>Serial number 1-3000. Rare Pass-NFT enjoy creation rights and more token rewards.</Typography>
        <Box className={styles.progressBar}>
          <LinerProgress percent={mintCount / 30} />
          <Box className={styles.mintCount}><span>{mintCount}</span> / 3000</Box>
        </Box>
      </Box>

      <Box className={styles.taskBox}>
        <Box className={styles.taskHeader}>
          <Typography variant="h3">Task</Typography>
          <Typography variant="h4">- Supported by @Quest3</Typography>
          <Box className={styles.taskTime}>
            <Box><Image src={TIME_ICON} layout="fill" /></Box>
            2022-10-14～2022-11-02
          </Box>
        </Box>
        <Box className={styles.taskDetail}>
          <Box className={styles.taskDetailInfo}>
            <Box className={styles.taskList}>
              <Box className={styles.taskItem}>

              </Box>
              <Box className={styles.taskItem}>

              </Box>
            </Box>
            <Box className={styles.taskLink}>
              Do the task and Verify <EastIcon />
            </Box>
            <Typography>*The Pass-NFT will be drawn within 24 hours after the countdown is over.</Typography>
          </Box>
          <Box className={styles.taskIllustration}>
            <Box>
              <Image src="/pass_task.webp" layout="fill" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
}

export default PassNFT



export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}