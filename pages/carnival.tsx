import { Box, Divider, IconButton, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import styles from '../styles/carnival.module.scss'
import Image from "next/image";
import { ReactElement, useContext, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout, WalletConnet } from "./_app";
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
import { sumBy } from 'lodash'

const Carnival_Activity_End_Time = '2022-12-05 24:00:00'

const Carnival: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { gamesInfo, initTaskProgress } = props
  // console.log(gamesInfo, initTaskProgress)
  const isMounted = useIsMounted()
  const is800Size = useMediaQuery("(max-width: 800px)")
  const is600Size = useMediaQuery("(max-width: 600px)")
  const { address } = useAccount()
  const [_, { days }] = useCountDown({
    targetDate: Carnival_Activity_End_Time
  })

  const { setShowConnect } = useContext(WalletConnet)
  const [showMoreRule, setShowMoreRule] = useState<boolean>(false)

  const [taskProgress, setTaskProgress] = useState<Record<string, any>[]>([])

  const { run: getTaskProgress } = useRequest(queryCarnivalProgress, {
    manual: true,
    onSuccess: ({ data }) => {
      setTaskProgress(data?.progresses || [])
    }
  })

  // 初始游戏进度数据
  useEffect(() => {
    setTaskProgress(initTaskProgress)
  }, [initTaskProgress])

  useEffect(() => {
    getTaskProgress({ address: address as string || "0x00" as string })
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
        <Image src="/carnival_bg.jpg" layout="fill" quality={100} />
      </Box>
      <Box className={styles.playGameIcon}>
        <Image src="/play_game.png" layout="fill" quality={100} />
      </Box>
      <Box className={styles.icon1}>
        <Image src="/carnival_icon1.png" layout="fill" quality={100} />
      </Box>
      <Box className={styles.icon2}>
        <Image src="/carnival_icon2.png" layout="fill" quality={100} />
      </Box>
      <Box className={styles.icon3}>
        <Image src="/carnival_icon3.png" layout="fill" quality={100} />
      </Box>
      <Box className={styles.icon4}>
        <Image src="/carnival_icon4.png" layout="fill" quality={100} />
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

        <Typography>2022.11.25 ~ 2022.12.05</Typography>
        <Typography>Play games, win great rewards! {is600Size ? "P" : "With the medals accumulated by completing tasks, you can also p"}articipate in the final draw!</Typography>
      </Box>
    </Box>
    <Box className={styles.container}>
      {/* <Box className={styles.notifyBox}>
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
      </Box> */}

      <Box className={styles.dailyActivity}>
        <Box className={styles.dailyHeader}>
          <Typography variant="h3">Daily surprise draw</Typography>
          <Box className={styles.headerDiscord}>
            <Typography>Enter Discord to draw more surprise rewards</Typography>
            <Box className={styles.discordBtn}>
              <Box>
                <Image src="/discord_footer.png" layout="fill" />
              </Box>
              <Typography>Go and see</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={styles.todayActivity}>
          <Box className={styles.activityLogo}>
            <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/AlongWithTheGods.jpg" layout="fill" />
          </Box>
          <Typography>
            [<span className={styles.highlight}>BigTime</span>]
            Today: &nbsp;
            <span className={styles.highlight}>Draw 10 NFTs from trial users</span>
          </Typography>
        </Box>
      </Box>
      {/* <Box className={styles.winnerList}>
        <Box className={styles.winerLabel}>
          <Typography>Yesterday Winner :</Typography>

        </Box>
      </Box> */}

      <Box className={styles.taskProgress}>
        <Box className={styles.cardHeader}>
          <Typography variant="h3">Task Progress</Typography>
          <Typography>{isMounted && !is600Size && <>Distance draw left</>} <span>{days}</span> day</Typography>
        </Box>
        <Box className={styles.addressSection}>
          {isMounted && <Typography>
            ID: {formatAddress(address, is600Size ? 6 : 8) ||
              <Typography
                className={styles.textConnect}
                onClick={() => setShowConnect(true)}>
                <Link>Connect Wallet First</Link>
              </Typography>}
            {
              address && <Typography className={styles.rewardBox}>
                <Box className={styles.iconBox}><Image src={REWARD_ACTIVE_ICON} layout="fill" /> </Box>
                {taskProgress && (sumBy(taskProgress, 'own_medal') || 0)}
              </Typography>
            }
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
            {
              taskProgress?.map((item: Record<string, any>, index: number) =>
                <GameSallCard
                  key={index}
                  rewardCount={item?.medal || 0}
                  getRewarded={item?.own_medal || 0}
                  gameInfo={item}
                />
              )
            }
            {/* <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={2} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={1} gameInfo={{}} />
            <GameSallCard rewardCount={2} getRewarded={0} gameInfo={{}} /> */}
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
                <Typography>BigTime军械库或熔炉盲盒*1</Typography>
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
                <Typography>BigTime军械库或熔炉盲盒*1</Typography>
              </Box>
            </Box>
            <Box className={styles.rewardBox}>
              <Box className={styles.rewardValue}>
                <Box>
                  <Image src={MONEY_ICON} layout="fill" />
                </Box>
                <Typography>Dark Throne NFT*1</Typography>
              </Box>
            </Box>
            <Box className={styles.rewardBox}>
              <Box className={styles.rewardValue}>
                <Box>
                  <Image src={MONEY_ICON} layout="fill" />
                </Box>
                <Typography>Neo Fantancy NFT*1</Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box className={styles.trialGames}>
        <Box className={styles.cardTitle}>
          <Typography variant="h3">Trial Games</Typography>
          {isMounted && !is800Size && <Typography>Trial time 2022.11.25～12.05,After the end, the lottery will start.</Typography>}
        </Box>

        <Box className={styles.gameList}>
          {/* <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} />
          <CarnivalGameCard isBig={true} /> */}
          {
            gamesInfo?.map((item: Record<string, any>, index: number) => <CarnivalGameCard key={index} isBig={true} gameInfo={item} />)
          }
        </Box>
      </Box>
      <Box className={styles.activityRules}>
        <Typography variant="h3">Activity Rules</Typography>
        <Typography variant="h4">1. Activity Time</Typography>
        <Typography>2022/11/25-2022/12/05 The activity task is open. During this period, please participate in and submit the activity task</Typography>
        <Typography>2022/12/06-2022/12/07 The official will confirm the users who have completed the task</Typography>
        <Typography>2022/12/8 Draw a lottery at the official Discord event</Typography>
        <Typography>2022/12/9 Give out activity rewards (Note: Matr1x Pioneer series NFT rewards will be given out after the game is launched in December)</Typography>
        <Typography variant="h4">2. Activity Rules</Typography>
        <Typography>During the activity period, each user can participate in all activity tasks. After completing the task, they need to claim the task. After claiming, they need to wait for confirmation, which generally takes 24-48 hours. If confirmed, it means that the task has been completed, and the task reward can be obtained</Typography>
        <Typography className={styles.gapLine}></Typography>
        <Typography className={styles.gapLine}></Typography>

        <Typography><b>2.1 Single task reward</b></Typography>
        <Typography className={styles.gapLine}></Typography>

        <Typography>after participating in the task and claiming the task and passing the verification, the task will be regarded as completed, and the task medal will be obtained immediately after passing the verification. The rewards of U, game token and NFT will be given out uniformly on December 9, 2022. The single tasks are as follows:</Typography>
        <Typography className={styles.gapLine}></Typography>

        {
          isMounted && showMoreRule && <>
            <Typography>BigTime Task 1 - Register a game account and submit the application to obtain 20U ruby card permission and 1 activity task medal</Typography>

            <Typography>BigTime task 2 - Players who reach level 10 during the activity will carve up 500U with those who meet the task requirements, with a maximum of 1U per person and 2 activity medals</Typography>
            <Typography>Dark Throne Task 1 - Players play games and pass the third level will carve up 1000U with those who meet the task requirements, with a maximum of 1U per person and an activity medal</Typography>
            <Typography>Dark Throne Task 2 - Players play games and pass the 20th level, and get 2 activity medals</Typography>
            <Typography>NEO FANTANCY Task 1 - Players who register for the game will carve up 500U with those who meet the task requirements, with a maximum of 1U per person. Each user who meets the task requirements can receive a game experience gift pack worth 100U (limited time experience champions, game props) and an activity medal</Typography>
            <Typography>NEO FANTANCY Task 2 - Players with a fighting capacity of 20000 in the game will carve up 100000 FTS with those who meet the task requirements, with a maximum of 200 FTS  and three activity medals for each address</Typography>
            <Typography>NEO FANTANCY Task 3 - Players who buy NFT game will carve up10000ERT with those who meet the task requirements, with a maximum of 100ERT , and 3 activity medals per address</Typography>
            <Typography>Mirror Planet Task 1 - Players who register to log in to the game and carve up 500U with those who meet the task requirements, with a maximum of 1U and an activity medal per person</Typography>
            <Typography>Mirror Planet Task 2 - Players who reach Lv5 during the activity will carve up 500U with those who meet the task requirements,with a maximum of 1U and an activity medal per person</Typography>
            <Typography>Matr1x Task 1 - players who pre register the game will get Pioneer series NFT  (the highest value is 60U) and 1 task medal</Typography>
            <Typography>Bless Global Task 1 - Players who register to log in to the game will get a close beta Pass card  and a task medal</Typography>
            <Typography className={styles.gapLine}></Typography>
            <Typography className={styles.gapLine}></Typography>

            <Typography> <b>2.2 Prize pool lottery</b> </Typography>
            <Typography className={styles.gapLine}></Typography>

            <Typography> Players who complete a task during the opening period of the activity task will receive a single task reward, and will participate in the lottery on December 8, 2022, according to the number of accumulated activity medals, and will be awarded on December 9, 2022</Typography>

            <Typography className={styles.gapLine}></Typography>
            {/* <Typography className={styles.gapLine}></Typography> */}

            <Typography>First prize: 5 candidates, during the activity, 5 players with 12 or more task medals will be selected. The prize will be BigTime Armory or Furnace Blind Box+1 Dark ThroneNFT+1 NEO FANTANCY NFT+1</Typography>
            <Typography>Second prize: 5 candidates. During the activity, 5 players with 9 or more task medals will be selected. The prize will be BigTime Armory or Furnace Blind Box+1</Typography>
            <Typography>Third prize: unlimited. Players with 6 or more  task medals during the activity will carve up 1000U with those who meet the requirements, and 15 of them will be awarded NEO FANTANCY NFT+1</Typography>
            <Typography>Those who have won medals and met the requirements of lottery of 3 prize pools will participate in lottery of 3 prize pools at the same time. If you win more than one award, you will only get high-level awards. For example, when user A has won 13 medals in the activity and won the 1st, 2nd and 3rd prizes in the lottery, the final reward is the 1st prize.</Typography>

            <Typography className={styles.gapLine}></Typography>
            <Typography className={styles.gapLine}></Typography>

            <Typography><b>2.3 Daily surprise task</b></Typography>
            <Typography className={styles.gapLine}></Typography>

            <Typography>During the activity, the content of the surprise task will be announced every day. Users who complete the surprise task on the day will receive rewards in the form of a lottery. The daily surprise task will be announced on the day of the activity, and the winner of the surprise will be announced the next day. The rewards will be given out on December 9, 2022</Typography>
            <Typography className={styles.gapLine}></Typography>

            <Typography variant="h4">3. Matters needing attention</Typography>
            <Typography>Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!Users who participate in the event can get a ruby card worth 20U!</Typography>
            <Typography className={styles.gapLine}></Typography>
            <Typography>1. One blockchain wallet address is considered as one user</Typography>
            <Typography>2. Users with FirstPlay passnft in the address can receive rewards</Typography>
            <Typography>3. The price of the game token and NFT rewarded will fluctuate with the market quotation</Typography>
            <Typography>4. If the event needs to be stopped or adjusted due to force majeure or changes in circumstances (including major disasters, events that need to be stopped or adjusted under the instructions of government agencies, events that suffer from serious network attacks or system failures, etc.), we have the right to terminate the activity without compensation to users</Typography>
            <Typography>5. In the process of participating in activities, we have the right to revoke the user&#39;s qualification to participate in activities and make use of rewards, and to reclaim the rights and interests that the user has already obtained, if the user has cheating and other illegal behaviors</Typography>
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

  </Box >
}

Carnival.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Carnival

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  const { data: { progresses, games } } = await queryCarnivalProgress({ address: '0x00' })
  console.log(progresses, games)
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default,
      gamesInfo: games || [],
      initTaskProgress: progresses || []
      // initTaskProgress,
    }
  }
}