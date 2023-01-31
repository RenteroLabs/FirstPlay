import { Box, Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import styles from '../styles/pass.module.scss'
import Image from 'next/image'
import { BADGE_ICON, PASS_ICON_1, PASS_ICON_2, PASS_ICON_3, PASS_ICON_4, REWARD_ICON, TIME_ICON } from "constants/static";
import { ReactElement, useEffect, useState } from "react";
import LinerProgress from "@/components/LinerProgress";
import EastIcon from '@mui/icons-material/East';
import PassNFTSuccess from "@/components/PageModals/passNFTSuccess";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "./_app";
import TwitterIcon from '@mui/icons-material/Twitter';
import { erc721ABI, useAccount, useContractRead } from "wagmi";
import { PASS_NFT_CONTRACT } from "constants/contract";
import { BigNumber } from 'ethers'
import { getPassNFTByAddress } from "services/web3";
import { useLocalStorageState, useRequest } from "ahooks";
import Head from "next/head";

const PassNFT: NextPageWithLayout = () => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")
  const isSmallMobileSize = useMediaQuery("(max-width: 375px)")

  const [showModal, setShowModal] = useState<boolean>(false)
  const [mintedNumber, setMintedNumber] = useState<number>(0)

  const { address } = useAccount()

  const [showMore] = useLocalStorageState("showMoreTip")

  const { run: queryPassNFTByAddress } = useRequest(getPassNFTByAddress, {
    manual: true,
    onSuccess: (data) => {
      if (data?.totalCount > 0) {
        if (!showMore || showMore === "true") {
          setShowModal(true)
        }
      }
    }
  })

  // 连接或切换钱包地址
  useEffect(() => {
    if (address) {
      queryPassNFTByAddress({
        contractAddresses: [PASS_NFT_CONTRACT],
        withMetadata: false,
        owner: address
      })
    }
  }, [address])

  useContractRead({
    addressOrName: PASS_NFT_CONTRACT,
    contractInterface: erc721ABI,
    functionName: 'totalSupply',
    chainId: 137,
    onSuccess(data) {
      setMintedNumber(BigNumber.from(data).toNumber() || 0)
    }
  })

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
      <title>PassNFT | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.container}>
      <Box className={styles.nftInfo}>
        <Box className={styles.nftMetadata}>
          <Box className={styles.nftCover}>
            <Image loader={imageKitLoader} layout="fill" src="https://rentero-resource.s3.ap-east-1.amazonaws.com/PassNFT.jpg" objectFit="cover" />
          </Box>
          <Box className={styles.nftIntro}>
            <Typography variant="h2">
              OAT-Event
              <Box>
                <Image src={BADGE_ICON} layout="fill" />
              </Box>
            </Typography>
            <Typography>This is FirstPlay&#39;s first event before launch. Participate in event to get OAT rewards,we will airdrop FirstPlay PassNFT to OAT holders, with PassNFT, you can get the following benefits.</Typography>
          </Box>
        </Box>
        <Box className={styles.rewardBox}>
          <Box className={styles.rewardItem}>
            <Box>
              <Image src={REWARD_ICON} layout="fill" />
            </Box>
            <Typography>Get the NFT first, then try it out.</Typography>
          </Box>
          <Box className={styles.rewardItem}>
            <Box><Image src={REWARD_ICON} layout="fill" /></Box>
            <Typography>Continue to receive airdrop rewards.</Typography>
          </Box>
          <Box className={styles.rewardItem}>
            <Box><Image src={REWARD_ICON} layout="fill" /></Box>
            <Typography>You will have more benefits after being upgraded in the future.</Typography>
          </Box>
          <Box className={styles.icon_1}>
            <Image src={PASS_ICON_1} layout="fill" />
          </Box>
          <Box className={styles.icon_2}>
            <Image src={PASS_ICON_2} layout="fill" />
          </Box>
          <Box className={styles.icon_3}>
            <Image src={PASS_ICON_3} layout="fill" />
          </Box>
        </Box>
      </Box>
      {/* <Box className={styles.progress}>
        <Typography variant="h3">
          Stage in progress
          <Box>
            <Image src={PASS_ICON_4} layout="fill" />
          </Box>
        </Typography>
        <Typography variant="h4"> Rare Pass-NFT</Typography>
        <Typography>Serial number 1-3000. Rare Pass-NFT enjoy creation rights and more token rewards.</Typography>
        <Box className={styles.progressBar}>
          <LinerProgress percent={mintedNumber / 30} />
          <Box className={styles.mintCount}><span>{mintedNumber}</span> / 3000</Box>
        </Box>
        <Typography variant="h6">* NFTs are issued in the order of user claims.</Typography>
        <Typography variant="h6">* The distribution progress will be updated between 12:00 and 13:00 every day.</Typography>
      </Box> */}

      <Box className={styles.taskBox}>
        {
          !isMobileSize ?
            <Box className={styles.taskHeader}>
              <Typography variant="h3">OAT Event Task</Typography>
              <Typography variant="h4">- Supported by @Quest3</Typography>
              <Box className={styles.taskTime}>
                <Box><Image src={TIME_ICON} layout="fill" /></Box>
                2022-10-21 ～ 2022-11-04
              </Box>
            </Box>
            :
            <Box className={styles.mobileTaskHeader}>
              2022-10-21 ～ 2022-11-04
              <Box><Image src={TIME_ICON} layout="fill" /></Box>
            </Box>
        }
        <Box className={styles.taskDetail}>
          <Box className={styles.taskDetailInfo}>
            {!isMobileSize ?
              <Box className={styles.taskList}>
                <Box className={styles.taskItem}>
                  <IconButton className={styles.taskMediaIcon} disableRipple>
                    <TwitterIcon />
                  </IconButton>
                  <Typography>Follow On Twitter @FirstPlayApp</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ margin: "0 3rem" }} />
                <Box className={styles.taskItem}>
                  <IconButton className={styles.taskMediaIcon} disableRipple>
                    <svg t="1665632564305" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2401" >
                      <path d="M1049.062 139.672a3 3 0 0 0-1.528-1.4A970.13 970.13 0 0 0 808.162 64.06a3.632 3.632 0 0 0-3.846 1.82 674.922 674.922 0 0 0-29.8 61.2 895.696 895.696 0 0 0-268.852 0 619.082 619.082 0 0 0-30.27-61.2 3.78 3.78 0 0 0-3.848-1.82 967.378 967.378 0 0 0-239.376 74.214 3.424 3.424 0 0 0-1.576 1.352C78.136 367.302 36.372 589.38 56.86 808.708a4.032 4.032 0 0 0 1.53 2.75 975.332 975.332 0 0 0 293.65 148.378 3.8 3.8 0 0 0 4.126-1.352A696.4 696.4 0 0 0 416.24 860.8a3.72 3.72 0 0 0-2.038-5.176 642.346 642.346 0 0 1-91.736-43.706 3.77 3.77 0 0 1-0.37-6.252 502.094 502.094 0 0 0 18.218-14.274 3.638 3.638 0 0 1 3.8-0.512c192.458 87.834 400.82 87.834 591 0a3.624 3.624 0 0 1 3.848 0.466 469.066 469.066 0 0 0 18.264 14.32 3.768 3.768 0 0 1-0.324 6.252 602.814 602.814 0 0 1-91.78 43.66 3.75 3.75 0 0 0-2 5.222 782.11 782.11 0 0 0 60.028 97.63 3.728 3.728 0 0 0 4.126 1.4A972.096 972.096 0 0 0 1221.4 811.458a3.764 3.764 0 0 0 1.53-2.704c24.528-253.566-41.064-473.824-173.868-669.082zM444.982 675.16c-57.944 0-105.688-53.174-105.688-118.478s46.818-118.482 105.688-118.482c59.33 0 106.612 53.64 105.686 118.478 0 65.308-46.82 118.482-105.686 118.482z m390.76 0c-57.942 0-105.686-53.174-105.686-118.478s46.818-118.482 105.686-118.482c59.334 0 106.614 53.64 105.688 118.478 0 65.308-46.354 118.482-105.688 118.482z" p-id="2402" fill="#fff"></path>
                    </svg>
                  </IconButton>
                  <Typography>Join First Play Discord Server</Typography>
                </Box>
              </Box>
              :
              <Box className={styles.mobileDetailInfo}>
                <Typography variant="h3">
                  {isSmallMobileSize ? "OAT Event Task" : "Task"} <Typography variant="h4">- Supported by @Quest3</Typography>
                </Typography>
                <Box className={styles.mobileTaskItem}>
                  <IconButton className={styles.taskMediaIcon} disableRipple>
                    <TwitterIcon />
                  </IconButton>
                  <Typography>Follow On Twitter @FirstPlayApp</Typography>
                </Box>
                <Box className={styles.mobileTaskItem}>
                  <IconButton className={styles.taskMediaIcon} disableRipple>
                    <svg t="1665632564305" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2401" >
                      <path d="M1049.062 139.672a3 3 0 0 0-1.528-1.4A970.13 970.13 0 0 0 808.162 64.06a3.632 3.632 0 0 0-3.846 1.82 674.922 674.922 0 0 0-29.8 61.2 895.696 895.696 0 0 0-268.852 0 619.082 619.082 0 0 0-30.27-61.2 3.78 3.78 0 0 0-3.848-1.82 967.378 967.378 0 0 0-239.376 74.214 3.424 3.424 0 0 0-1.576 1.352C78.136 367.302 36.372 589.38 56.86 808.708a4.032 4.032 0 0 0 1.53 2.75 975.332 975.332 0 0 0 293.65 148.378 3.8 3.8 0 0 0 4.126-1.352A696.4 696.4 0 0 0 416.24 860.8a3.72 3.72 0 0 0-2.038-5.176 642.346 642.346 0 0 1-91.736-43.706 3.77 3.77 0 0 1-0.37-6.252 502.094 502.094 0 0 0 18.218-14.274 3.638 3.638 0 0 1 3.8-0.512c192.458 87.834 400.82 87.834 591 0a3.624 3.624 0 0 1 3.848 0.466 469.066 469.066 0 0 0 18.264 14.32 3.768 3.768 0 0 1-0.324 6.252 602.814 602.814 0 0 1-91.78 43.66 3.75 3.75 0 0 0-2 5.222 782.11 782.11 0 0 0 60.028 97.63 3.728 3.728 0 0 0 4.126 1.4A972.096 972.096 0 0 0 1221.4 811.458a3.764 3.764 0 0 0 1.53-2.704c24.528-253.566-41.064-473.824-173.868-669.082zM444.982 675.16c-57.944 0-105.688-53.174-105.688-118.478s46.818-118.482 105.688-118.482c59.33 0 106.612 53.64 105.686 118.478 0 65.308-46.82 118.482-105.686 118.482z m390.76 0c-57.942 0-105.686-53.174-105.686-118.478s46.818-118.482 105.686-118.482c59.334 0 106.614 53.64 105.688 118.478 0 65.308-46.354 118.482-105.688 118.482z" p-id="2402" fill="#fff"></path>
                    </svg>
                  </IconButton>
                  <Typography>Join First Play Discord Server</Typography>
                </Box>
              </Box>}
            <a href="https://app.quest3.xyz/quest/696517071963877646" target="_blank" rel="noreferrer">
              <Box className={styles.taskLink}>
                Do the task and Verify
                <IconButton disableRipple>
                  <EastIcon />
                </IconButton>
              </Box>
            </a>

            <Typography>* After this event ,our Pass-NFT will be airdropped to the address holding OAT. The Pass-NFT on FirstPlay cannot be transferred, users who hold the Pass-NFT can trial games on FirstPlay for free.</Typography>
          </Box>

          <Box className={styles.taskIllustration}>
            <Box>
              <Image src="/pass_task.webp" layout="fill" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    <PassNFTSuccess showModal={showModal} setShowModal={setShowModal} />
  </Box>
}

PassNFT.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
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