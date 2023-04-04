import Layout from "@/components/Layout";
import { Box } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/walkthroughs.module.scss'

// 攻略集合页
const Walkthroughs: NextPageWithLayout = () => {

  return <Box>
    <Head>
      <title>Walkthrought | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </Box>
}

Walkthroughs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Walkthroughs

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}