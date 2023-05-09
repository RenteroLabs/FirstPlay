import React, { ReactElement, useState } from "react"
import { NextPageWithLayout } from "./_app"
import Layout from "@/components/Layout"
import Head from "next/head"
import { GetStaticProps, GetStaticPropsContext } from "next"
import Signup from "@/components/PageRewardPoint/Signup"
import GetRewardList from "@/components/PageRewardPoint/GetRewardList"
import { useAccount } from "wagmi"
import ProgressInfo from "@/components/PageRewardPoint/ProgressInfo"
import { useIsMounted } from "hooks/useIsMounted"
import InviteFriend from "@/components/PageRewardPoint/InviteFriend"

const RewardPoint: NextPageWithLayout = () => {

  const { address } = useAccount()
  const isMounted = useIsMounted()

  return <div className="container mx-auto bg-bgColor pb-8">
    <Head>
      <title>Points | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {/* bg-gradient-to-b from-primary from-0% via-primary/80 via-85% to-primary/10  */}
    <div className="h-[23.33rem]
    flex  flex-col items-center bg-[url('/rewardpoint_bg.png')] bg-cover">
      <img src="/rewardpoint_ill.png" className="w-[10rem] h-[10rem] mt-7 mb-[0.83rem]" />
      <h3 className="text-2xl text-white font-Inter-SemiBold font-semibold leading-7 mb-[0.83rem] ">
        $2 Cash Drops !
      </h3>
      <p className="text-base text-white font-Inter-Medium font-medium leading-[1.67rem] max-w-[24rem] text-center">
        {
          (address && isMounted) ?
            'Collect 10000 points and withdraw 2 USDT immediately!' :
            'Continuous check-in,invite friends to collect points, get $2 immediately!'
        }
      </p>
    </div>

    {
      !address ?
        <>
          <Signup />
          <GetRewardList />
        </> :
        <>
          <ProgressInfo />
          <InviteFriend />
        </>
    }




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