import React, { ReactElement, useEffect, useState } from "react"
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
import InviteeCard from "@/components/PageRewardPoint/InviteeCard"
import TopBanner from "@/components/PageRewardPoint/TopBanner"
import { useQueryParam } from "use-query-params";
import { useRequest } from "ahooks"
import { login2InviteCode, getUserPoint, getInvitorInfo } from "services/invitepoint"

const RewardPoint: NextPageWithLayout = () => {
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const [ownInviteCode, setOwnInviteCode] = useState<string>()
  const [userPoint, setUserPoint] = useState<number>(0)
  const [invitor, setInvitor] = useState<string>()

  const [inviteCode] = useQueryParam<string>('inviter')

  // 获取用户邀请码信息
  const { run: queryLoginInviteCode } = useRequest(login2InviteCode, {
    manual: true,
    onSuccess: ({ data }) => {
      // console.log(data)
      setOwnInviteCode(data?.invite_code)
    }
  })

  // 获取当前钱包地址用户积分
  const { run: queryUserPoint } = useRequest(getUserPoint, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      // TODO: update userPoint
    }
  })

  // 获取邀请码信息
  useRequest(getInvitorInfo, {
    defaultParams: [inviteCode],
    refreshDeps: [inviteCode],
    onSuccess: ({ data }) => {
      console.log(data)
      setInvitor(data?.invitor)
    }
  })

  useEffect(() => {
    if (address) {
      queryLoginInviteCode({
        address,
        inviteCode: inviteCode
      })
      queryUserPoint(address)
    }
  }, [address])


  return <div className="container mx-auto bg-bgColor pb-8">
    <Head>
      <title>Points | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* 用户未登录且 URL 参数包含邀请码 */}
    {
      (!address && inviteCode) ?
        <InviteeCard invitor={invitor as string} /> :
        <TopBanner />
    }

    {/* 是否连接钱包 */}
    {
      !address ?
        <>
          <Signup signType={inviteCode ? "Invitee" : 'Default'} />
          <GetRewardList />
        </> :
        <>
          <ProgressInfo userPoint={userPoint} />
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