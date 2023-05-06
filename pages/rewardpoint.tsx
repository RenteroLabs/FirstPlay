import React, { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"
import Layout from "@/components/Layout"
import { Box } from "@mui/material"
import Head from "next/head"
import { GetStaticProps, GetStaticPropsContext } from "next"
import Signup from "@/components/PageRewardPoint/Signup"

const RewardPoint: NextPageWithLayout = () => {

  return <div className="container mx-auto bg-bgColor">
    <Head>
      <title>Points | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="h-96 bg-gradient-to-b from-primary from-0% via-primary/80 via-85% to-primary/10 flex justify-center flex-col items-center">
      <h3 className="text-2xl text-white font-Inter-SemiBold font-semibold leading-7">
        $2 Cash Drops !
      </h3>
      <p className="text-base text-white font-Inter-Medium font-medium leading-[1.67rem] max-w-[24rem] text-center">Continuous check-in,invite friends to collect points, get $2 immediately !</p>
    </div>

    <Signup />

  </div>
}

RewardPoint.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default RewardPoint

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}