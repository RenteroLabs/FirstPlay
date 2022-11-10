import { Box, Divider, IconButton, Link, Typography, useMediaQuery } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import styles from '../styles/carnival.module.scss'
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "./_app";
import { erc721ABI, useAccount, useContractRead } from "wagmi";
import Head from "next/head";
import { useCountDown } from "ahooks";
import CarnivalGameCard from "@/components/PageCarnival/GameCard";

const Carnival_Activity_End_Time = '2022-12-03 24:00:00'

const Carnival: NextPageWithLayout = () => {

  const { address } = useAccount()
  const [_, { days }] = useCountDown({
    targetDate: Carnival_Activity_End_Time
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
      <title>Game Carnival | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.header}>

    </Box>
    <Box className={styles.contianer}>
      <Box className={styles.trialNotify}></Box>
      <Box className={styles.taskProgress}>
        <Box className={styles.cardHeader}>
          <Typography variant="h3">Task Progress</Typography>
          <Typography>Distance draw left <span>{days}</span> day</Typography>
        </Box>
        <Box className={styles.addressSection}>
          <Typography>ID: {address}</Typography>
          <Link>No PassNFT ?</Link>
        </Box>
      </Box>

      <Box className={styles.trialGames}>
        <Box className={styles.cardTitle}>
          <Typography variant="h3">Trial Games</Typography>
          <Typography>Trial time 2022.11.21～12.03,After the end, the lottery will start.</Typography>
        </Box>

        <Box className={styles.gameList}>
          <CarnivalGameCard />
          <CarnivalGameCard />
          <CarnivalGameCard />
          <CarnivalGameCard />
          <CarnivalGameCard />
          <CarnivalGameCard />
        </Box>
      </Box>
      <Box className={styles.activityRules}></Box>
    </Box>

  </Box>
}

Carnival.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Carnival


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}