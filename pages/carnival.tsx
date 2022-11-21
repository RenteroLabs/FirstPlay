import { Box, Divider, IconButton, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import styles from '../styles/carnival.module.scss'
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "./_app";
import { erc721ABI, useAccount, useContractRead } from "wagmi";
import Head from "next/head";
import { useCountDown, useRequest } from "ahooks";
import CarnivalGameCard from "@/components/PageCarnival/GameCard";
import GameSallCard from "@/components/PageCarnival/GameSmallCard";
import { useIsMounted } from "hooks/useIsMounted";
import { formatAddress } from "util/format";
import { MONEY_ICON, REWARD_ACTIVE_ICON } from "constants/static";
import MedalProgress from "@/components/PageCarnival/MedalProgress";
import { queryCarnivalGamesInfo, queryCarnivalProgress } from "services/carnival";
import OrganizerCard from "@/components/PageCarnival/OrganizerCard";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Carnival_Activity_End_Time = '2022-12-05 24:00:00'

const Carnival: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { gamesInfo } = props

  const isMounted = useIsMounted()
  const is800Size = useMediaQuery("(max-width: 800px)")
  const is600Size = useMediaQuery("(max-width: 600px)")
  const { address } = useAccount()
  const [_, { days }] = useCountDown({
    targetDate: Carnival_Activity_End_Time
  })

  const [showMoreRule, setShowMoreRule] = useState<boolean>(false)

  const [taskProgress, setTaskProgress] = useState<Record<string, any>>({})

  const { run: getTaskProgress } = useRequest(queryCarnivalProgress, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setTaskProgress(data)
    }
  })
  useEffect(() => {
    if (address) {
      getTaskProgress({ address })
    }
  }, [address])

  const imageKitLoader = ({ src, width, quality = 100 }: any) => {
    const params = [`w-400`];
    if (quality) {
      params.push(`q-${quality}`);
    }
    const paramsString = params.join(",");
    var urlEndpoint = "https://ik.imagekit.io/jnznr24q9";
    const imagePaths = src.split('/')
    const imageHash = imagePaths[imagePaths.length - 1]
    return `${urlEndpoint}/${imageHash}?tr=${paramsString}`
  }

  return <Box className={styles.containBox}>
    <Head>
      <title>Game Carnival | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.header}>
      <Box className={styles.topBackground}>
        <Image src="/carnival_bg.jpg" layout="fill" />
      </Box>
      <Box className={styles.playGameIcon}>
        <Image src="/play_game.png" layout="fill" />
      </Box>
      <Box className={styles.icon1}>
        <Image src="/carnival_icon1.png" layout="fill" />
      </Box>
      <Box className={styles.icon2}>
        <Image src="/carnival_icon2.png" layout="fill" />
      </Box>
      <Box className={styles.icon3}>
        <Image src="/carnival_icon3.png" layout="fill" />
      </Box>
      <Box className={styles.icon4}>
        <Image src="/carnival_icon4.png" layout="fill" />
      </Box>

      <Box className={styles.headerDesc}>
        <Box className={styles.brandLogos}>
          <Image src="/carnival_brand_logo.png" layout="fill" />
        </Box>
        {
          is600Size ? <Typography variant="h2">First Play Game Carnival is coming! Total prize pool is up to $50,000！</Typography>
            : <>
              <Typography variant="h2">First Play Game Carnival is coming!</Typography>
              <Typography variant="h2">Total prize pool is up to $50,000！</Typography>
            </>
        }

        <Typography>2022.11.21 ~ 2022.12.03</Typography>
        <Typography>Play games, win great rewards! {is600Size ? "P" : "With the medals accumulated by completing tasks, you can also p"}articipate in the final draw!</Typography>
      </Box>
    </Box>
    <Box className={styles.container}>
      <Box className={styles.notifyBox}>
        <Box className={styles.trialNotify}>
          <Box className={styles.messageItem}><span>ID: 2343...8979</span> Tried: XXXX</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: DeHero</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: XXXX</Box>
          <Box className={styles.messageItem}><span>ID: 2343...8979</span> Tried: XXXX</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: BigTime</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: DeHero</Box>
          <Box className={styles.messageItem}><span>ID: 8763...3677</span> Tried: XXXX</Box>
        </Box>
      </Box>

      <Box className={styles.taskProgress}>
        <Box className={styles.cardHeader}>
          <Typography variant="h3">Task Progress</Typography>
          <Typography>{isMounted && !is600Size && <>Distance draw left</>} <span>{days}</span> day</Typography>
        </Box>
        <Box className={styles.addressSection}>
          {isMounted && <Typography>
            ID: {formatAddress(address, is600Size ? 4 : 8) || ""}
            <Typography className={styles.rewardBox}>
              <Box className={styles.iconBox}><Image src={REWARD_ACTIVE_ICON} layout="fill" /> </Box>
              7
            </Typography>
          </Typography>}
          {/* <Link>No PassNFT ?</Link> */}
        </Box>
        {/* {isMounted && is600Size && <Box className={styles.mobileMedals}>
          <Box className={styles.rewardIcon}>
            <Image src={REWARD_ACTIVE_ICON} layout="fill" />
          </Box>
          <Box className={styles.rewardBox}>
            <Typography>Medal:</Typography>
            <MedalProgress totalMedals={15} getMedals={11} />
          </Box>
        </Box>} */}

        <Box className={styles.gamePanel}>
          <Box className={styles.gameList}>
            <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={2} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={1} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} />
          </Box>
        </Box>
        <Box className={styles.rewardDesc}>
          <Typography>Medal rewards: Play the game to accumulate medals, participate in the lottery after the game is over,and have the opportunity to get multiple game NFTs. The more badges you accumulate, the more rewards you have the chance to win~</Typography>
        </Box>
        <Stack className={styles.rewardList}>
          <Box className={styles.rewardItem}>
            <Box className={styles.rewardLevel}>
              <Box className={styles.rewardIcon}>
                <Image src={REWARD_ACTIVE_ICON} layout="fill" />
              </Box>
              <Typography>Reach 6:</Typography>
            </Box>
            <Box className={styles.rewardBox}>
              <Box className={styles.rewardValue}>
                <Box>
                  <Image src={MONEY_ICON} layout="fill" />
                </Box>
                <Typography>Neo Fantancy NFT * 1</Typography>
              </Box>
              <Box className={styles.rewardValue}>
                <Box>
                  <Image src={MONEY_ICON} layout="fill" />
                </Box>
                <Typography>Share 1000U</Typography>
              </Box>
            </Box>
          </Box>
          <Box className={styles.rewardItem}>
            <Box className={styles.rewardLevel}>
              <Box className={styles.rewardIcon}>
                <Image src={REWARD_ACTIVE_ICON} layout="fill" />
              </Box>
              <Typography>Reach 9:</Typography>
            </Box>
            <Box className={styles.rewardBox}>
              <Box className={styles.rewardValue}>
                <Box>
                  <Image src={MONEY_ICON} layout="fill" />
                </Box>
                <Typography>Neo Fantancy NFT * 1</Typography>
              </Box>
            </Box>
          </Box>
          <Box className={styles.rewardItem}>
            <Box className={styles.rewardLevel}>
              <Box className={styles.rewardIcon}>
                <Image src={REWARD_ACTIVE_ICON} layout="fill" />
              </Box>
              <Typography>Reach 12:</Typography>
            </Box>
            <Box className={styles.rewardBox}>
              <Box className={styles.rewardValue}>
                <Box>
                  <Image src={MONEY_ICON} layout="fill" />
                </Box>
                <Typography>Neo Fantancy NFT * 1</Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box className={styles.trialGames}>
        <Box className={styles.cardTitle}>
          <Typography variant="h3">Trial Games</Typography>
          {isMounted && !is800Size && <Typography>Trial time 2022.11.21～12.03,After the end, the lottery will start.</Typography>}
        </Box>

        <Box className={styles.gameList}>
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
        </Box>
      </Box>
      <Box className={styles.activityRules}>
        <Typography variant="h3">Rules of play</Typography>
        <Typography variant="h4">1. Activity Time</Typography>
        <Typography>Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!</Typography>
        <Typography variant="h4">2. Activity Time</Typography>
        <Typography>Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!</Typography>
        {
          isMounted && showMoreRule && <>
            <Typography variant="h4">3. Activity Time</Typography>
            <Typography>Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!</Typography>
            <Typography variant="h4">4. Activity Time</Typography>
            <Typography>Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!</Typography>
          </>
        }
        <Box
          component="span"
          className={styles.showmoreBtn}
          onClick={() => setShowMoreRule(!showMoreRule)}
        >{isMounted && showMoreRule ? <>
          less <KeyboardArrowUpIcon />
        </> : <>more <KeyboardArrowDownIcon /></>} </Box>
      </Box>

      <Box className={styles.organizerBox}>
        <OrganizerCard
          websiteLink="https://firstplay.app"
          cardImage="http://d2yhjjdyh5ugcy.cloudfront.net/carnival_firstplay_card.jpg"
          badge="Organizer"
          twitterLink="https://twitter.com/FirstPlay2022"
          discordLink="https://discord.com/invite/84mhbPXFUu"
          telegramLink="https://t.me/firstplay2022"
        />
        <OrganizerCard
          websiteLink="https://degame.com"
          cardImage="http://d2yhjjdyh5ugcy.cloudfront.net/carnival_degame_card.jpg"
          badge="Co-Organizer"
          twitterLink="https://twitter.com/degame_l2y"
          discordLink="https://discord.gg/xWdNUfw4Ec"
          telegramLink="https://t.me/+24BjBavdif9mZmNl"
        />
      </Box>
    </Box>

  </Box>
}

Carnival.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Carnival

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  // 获取嘉年华所有游戏信息
  const { data } = await queryCarnivalGamesInfo()
  console.log(data)


  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default,
      gamesInfo: data
    }
  }
}