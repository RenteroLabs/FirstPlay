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
import DailyCheckIn from "@/components/PageRewardPoint/DailyCheckIn"
import InviteConnectModal from "@/components/PageRewardPoint/InviteConnectSuccessModal"
import PointTaskList from "@/components/PageRewardPoint/PointTaskList"

const RewardPoint: NextPageWithLayout = () => {
  const { address } = useAccount()
  const isMounted = useIsMounted()

  const [ownInviteCode, setOwnInviteCode] = useState<string>()
  const [bindTwitterName, setBindTwitterName] = useState<string>()

  const [userPoint, setUserPoint] = useState<number>(0)
  const [invitor, setInvitor] = useState<string>()

  const [inviteCode, setInviteCode] = useState<string>()


  const [showModal, setShowModal] = useState<boolean>(false)

  // 获取用户邀请码信息
  const { run: queryLoginInviteCode } = useRequest(login2InviteCode, {
    manual: true,
    onSuccess: ({ data }) => {
      // console.log(data)
      setOwnInviteCode(data?.invite_code)
      setBindTwitterName(data?.twitter_name)
    }
  })

  // 获取当前钱包地址用户积分
  const { run: queryUserPoint } = useRequest(getUserPoint, {
    manual: true,
    onSuccess: ({ data }) => {
      // console.log(data)
      setUserPoint(data?.point || 0)
    }
  })

  // 获取邀请码信息
  const { run: queryInvitorInfo } = useRequest(getInvitorInfo, {
    manual: true,
    onSuccess: ({ data }) => {
      setInvitor(data?.invitor)
    }
  })

  useEffect(() => {
    const queryString = window.location.search
    const params = new URLSearchParams(queryString);
    const inviteCode = params.get('inviter')
    console.log(inviteCode)
    setInviteCode(inviteCode as string)

    if (address) {

      let loginParams: Record<string, any> = {
        address
      }
      if (inviteCode) {
        loginParams['inviteCode'] = inviteCode
      }
      // @ts-ignore
      queryLoginInviteCode(loginParams)

      queryUserPoint(address)

    }
  }, [address])

  useEffect(() => {
    if (inviteCode) {
      queryInvitorInfo(inviteCode)
    }
  }, [inviteCode])

  return <div className="container mx-auto bg-bgColor pb-4">
    <Head>
      <title>Points | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:title"
        content="Join me and invite friends to win cash!"
      />
      {/* <meta
        property="og:description"
        content=""
      /> */}
      <meta
        property="og:image"
        content="https://firstplay-crm.s3.ap-east-1.amazonaws.com/point_media_share_e07462344e.jpg?updated_at=2023-05-12T05:27:53.379Z"
      />
      {isMounted && <meta
        property="og:url"
        content={`/rewardpoint?inviter=${ownInviteCode}`}
      />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    {/* 用户未登录且 URL 参数包含邀请码 */}
    {
      (isMounted && !address && inviteCode) ?
        <InviteeCard invitor={invitor as string} /> :
        <TopBanner />
    }

    {/* 是否连接钱包 */}
    {
      (!address && isMounted) ?
        <>
          <Signup signType={inviteCode ? "Invitee" : 'Default'} />
          <GetRewardList />
        </> :
        <>
          <ProgressInfo userPoint={userPoint} />
          {/* <DailyCheckIn /> */}
          <InviteFriend ownCode={ownInviteCode} />
          <PointTaskList bindTwitterName={bindTwitterName as string} />
        </>
    }
    {/* <InviteConnectModal showModal={showModal} setShowModal={setShowModal} /> */}
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