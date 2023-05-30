import { NextPageWithLayout, unipassInstance } from "./_app";
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Stack, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import Layout from "@/components/Layout";
import Image from 'next/image';
import { GetStaticProps, GetStaticPropsContext } from "next";
import styles from '../styles/profile.module.scss';
import { useAccount, useContract, useContractReads, useEnsName, useSigner } from "wagmi";
import { formatAddress } from "util/format";
import CopyButton from "@/components/CopyButton";
import { useIsMounted } from "hooks/useIsMounted";
import ChainActiveButton from "@/components/ChainActiveButton";
import ActicvChainConfirm from "@/components/PageModals/activeChainConfirm";
import ContractTxLoading from "@/components/PageModals/ContractTxLoading";
import ProfileNFTCard from "@/components/ProfileNFTCard";
import ProfileActivityTable from "@/components/PageProfile/ProfileActivityTabale";
import Head from "next/head";
import ConnectWallet from "@/components/ConnectWallet";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_TRIALING } from "services/documentNode";
import { goerliGraph } from "services/graphql";
import { useRequest } from "ahooks";
import { getPassNFTByAddress } from "services/web3";
import { MARKET_CONTRACT, MULTI_CHAIN_SWITCH_CONTRACT, PASS_NFT_CONTRACT } from "constants/contract";
import { FIRSTPLYA_MARKET_ABI, MULTI_CHAIN_SWITCH } from "constants/abi";
import TrialNFTCardSkeleton from "@/components/TrialNFTCard/TrialNFTCardSkeleton";
import { isEmpty } from "lodash";
import { StringParam, useQueryParam } from "use-query-params";
import { ProfilePackageRes } from "types/graph";
import classNames from "classnames/bind";
import Link from "next/link";

import EastIcon from '@mui/icons-material/East';
import BalanceTokenItem from "@/components/PageProfile/BalanceTokenItem";
import ProfileTrialingTask from "@/components/PageProfile/ProfileTrialingTask";
import { getProfileTrialingTaskList, getUserTokenBalances } from "services/home";
import ProfileBalanceSection from "@/components/PageProfile/ProfileBalanceSection";
import { useTranslations } from "next-intl";
import { getBountiesByTaskIds } from "services/cms";
import MobileOnlyTip from "@/components/PageModals/MobileOnlyModal";
import { BASE_BACKEND_API } from "constants/index";
import { getUserPoint, login2InviteCode, postWithdrawPointsToMoney } from 'services/invitepoint'
import { toast } from "react-toastify";

const cx = classNames.bind(styles)

enum TabItem {
  Trialing,
  Activity,
  Balance,
}

const Profile: NextPageWithLayout = () => {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address: address, chainId: 1 })

  const isMounted = useIsMounted()
  const router = useRouter()

  const t = useTranslations('Profile')

  const is600Size = useMediaQuery("(max-width: 600px)")
  const is680Size = useMediaQuery("(max-width: 680px)")
  const is1120Size = useMediaQuery("(max-width: 1120px)")

  const [paramTab, setParamTab] = useQueryParam('tab')

  const [activeTab, setActiveTab] = useState<number>(TabItem.Trialing)

  const [twitterName, setTwitterName] = useState<string>()
  const [userPointInfo, setUserPointInfo] = useState<Record<string, any>>()

  useEffect(() => {
    if (router.query?.tab == 'Activity') {
      setActiveTab(TabItem.Activity)
    }
  }, [router])

  const [passTokenId, setPassTokenId] = useState<string | number>(0)

  const [showConnect, setShowConnect] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showTxLoading, setShowTxLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")

  const [activeChainInfo, setActiveChainInfo] = useState<{ chainId?: number, chainName?: string }>({})

  const [trialList, setTrialList] = useState<ProfilePackageRes[]>([])


  const [unipassMail, setUnipassMail] = useState<string>()
  const [tokenBalances, setTokenBalances] = useState<Record<string, any>[]>([])


  const [showMobileOnlyTip, setShowMobileOnlyTip] = useState<boolean>(false)

  const [authWindow, setAuthWindow] = useState<any>()

  // 正在试玩游戏任务列表
  const [trialingTaskList, setTrialingTaskList] = useState<Record<string, any>[]>([])
  const [bountyInfos, setBountyInfos] = useState<Record<string, any>>({})

  const timestamp = useMemo(() => (Number(new Date) / 1000).toFixed(), [])

  const { run: queryPassNFT } = useRequest(getPassNFTByAddress, {
    manual: true,
    onSuccess: ({ ownedNfts, totalCount }) => {
      if (totalCount > 0) {
        setPassTokenId(parseInt(ownedNfts[0]?.id?.tokenId, 16))
      } else {
        setPassTokenId(-1)
      }
    }
  })

  // 获取 Profile 页中正在试玩游戏任务列表
  const { run: queryProfileTrialingTaskList, loading: trialingTaskListLoading } = useRequest(getProfileTrialingTaskList, {
    manual: true,
    onSuccess: ({ data }) => {
      setTrialingTaskList(data)

      const task_ids = data?.map((item: Record<string, any>) => item?.task_id) || []
      queryBountyInfos({ taskIds: task_ids })
    }
  })

  // 获取游戏 task 基本信息
  const { run: queryBountyInfos, loading: bountyInfosLoading } = useRequest(getBountiesByTaskIds, {
    manual: true,
    onSuccess: ({ data }) => {
      let bountyInfos: Record<string, any> = {}
      data.forEach((item: Record<string, any>) => {
        bountyInfos[item?.attributes?.task_id] = item?.attributes
      })
      setBountyInfos(bountyInfos)
    }
  })

  // 获取用户 Token 余额列表
  const { run: queryUserTokenBalances, refresh } = useRequest(getUserTokenBalances, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setTokenBalances(data)
    }
  })

  const [getTrialingList, { loading }] = useLazyQuery(GET_USER_TRIALING, {
    variables: {
      expires: timestamp,
      player: address
    },
    client: goerliGraph,
    onCompleted(data) {
      setTrialList(data?.packages || [])
    }
  })

  const { run: queryLogin } = useRequest(login2InviteCode, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setTwitterName(data?.twitter_name)
    }
  })

  // 获取用户积分数据
  const { run: queryUserPoint, refresh: refreshUserPoints } = useRequest(getUserPoint, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setUserPointInfo(data)
    }
  })

  const { run: switchPointsToMoney, loading: switchPointLoading } = useRequest(postWithdrawPointsToMoney, {
    manual: true,
    onSuccess: ({ data, code, message }) => {
      if (code != 0) {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          // theme: "colored",
        });
      } else {
        refreshUserPoints()
      }
    }
  })

  const handleSwitchPoints = () => {
    if (userPointInfo?.status === 'withdrawable') {
      switchPointsToMoney(address as string)
    }
  }

  useEffect(() => {
    if (!address) {
      setShowConnect(true)
    } else {
      getTrialingList()

      queryProfileTrialingTaskList(address)

      queryUserTokenBalances(address)

      // 获取用户 login 信息
      queryLogin({ address })

      // 获取用户积分数据
      queryUserPoint(address)

      // 判断用户是否拥有试玩 NFT
      queryPassNFT({
        contractAddresses: [PASS_NFT_CONTRACT],
        withMetadata: false,
        owner: address,
        chainId: process.env.NEXT_PUBLIC_ENV === 'PRO' ? 137 : 5
      })

      // 判断是否由 Unipass 登录，获取邮箱信息
      const connectType = window.localStorage.getItem("wagmi.wallet")
      if (connectType === '"Unipass"') {
        // @ts-ignore
        const { email } = unipassInstance.getAccount()
        setUnipassMail(email)
      } else {
        setUnipassMail("")
      }
    }
  }, [address])

  // 获取各链试玩权限激活状态
  const { data: activeRes } = useContractReads({
    contracts: [
      {
        addressOrName: MARKET_CONTRACT[5],
        contractInterface: FIRSTPLYA_MARKET_ABI,
        functionName: "playerWhitelist",
        chainId: 5,
        args: [address]
      },
      {
        addressOrName: MARKET_CONTRACT[97],
        contractInterface: FIRSTPLYA_MARKET_ABI,
        functionName: "playerWhitelist",
        chainId: 97,
        args: [address]
      },
    ]
  })

  const handleAuthTwitter = () => {
    const authWin = window.open(`${BASE_BACKEND_API}/api/twitter-oauth?address=${address}`, "Auth", 'left=300,top=200,width=600,height=600')

    setAuthWindow(authWin)
  }

  // 监听 Auth window，当窗口关闭时，重新请求 login 数据
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined
    if (authWindow) {
      timer = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(timer)
          // @ts-ignore
          queryLogin({ address })
        }
      }, 500)
    }

    return () => clearInterval(timer)
  }, [authWindow])

  return <Box className={styles.containerBox}>
    <Head>
      <title>Profile | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.profileHeaderBox}>
      <Box className={styles.profileHeader}>

        <Box className={styles.headerInfo}>
          {
            isMounted && (is680Size ?
              <Box className={styles.mobileInfo}>
                <Box className={styles.mobileUserInfo}>
                  <Box className={styles.mobileAvatar}>
                    <Image src="/profile_avatar.png" layout="fill" />
                  </Box>
                  <Box className={styles.infoBox}>
                    <Box className={styles.addressItem}>
                      {address && isMounted && (ensName || formatAddress(address, 4))}
                      {address && isMounted && <CopyButton targetValue={address || ""} />}
                    </Box>
                  </Box>
                </Box>
                {
                  unipassMail &&
                  <Box className={styles.unipassLink}>
                    <a href="https://wallet.unipass.id/" target="_blank" rel="noreferrer">
                      {t('unipassLinkDesc')}: {unipassMail}
                    </a>
                  </Box>}
                {
                  twitterName ?
                    <div className="mt-[0.83rem] mx-auto h-[2.17rem] rounded-3xl border-[#1D9BF0] border-[1px] inline-flex items-center text-base font-Inter-Medium font-medium text-[#1D9BF0] leading-[1.17rem] px-[0.83rem] cursor-pointer" onClick={() => { window.open('https://twitter.com') }}>
                      <svg className="mr-[0.33rem]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3865" width="18" height="18">
                        <path d="M905.088 226.864v-0.512c8.928-3.488 15.968-10.88 23.056-16.352 32-24.656 52.816-57.12 68.16-98.624l-26.128 14.304c-26.896 13.648-72.528 33.264-107.648 36.272-41.376-37.696-84.672-67.344-166.048-65.92l-25.632 3.072c-16.592 3.632-32.4 8.128-46.656 14.304-59.584 25.856-100.208 74.096-118.896 141.024-7.44 26.624-10.464 71.12-1.024 98.624-33.616-0.048-66.16-5.344-94.304-12.272-110.928-27.28-180.016-64.144-256.72-124.144-22.528-17.616-44.624-37.584-62.528-59.776-5.776-7.152-14.88-13.424-18.96-21.984a20.352 20.352 0 0 1-1.024-0.512c-8.912 16.512-17.28 34.4-22.544 54.672-20.8 79.904 12.08 147.008 47.152 190.592 10.624 13.216 27.856 21.408 38.432 33.728h1.024c-7.952 2.944-21.776-1.136-28.704-2.56-16.384-3.376-30.352-6.48-44.08-12.256l-21.52-10.224c-0.336 88.272 44.256 145.648 98.912 179.856 17.824 11.152 42.752 26.176 68.672 27.584-13.872 11.712-73.2 6.336-93.792 4.096 25.744 66.272 65.296 110.4 133.248 134.368 17.536 6.192 38.928 11.664 62.528 11.248-12.528 14.88-39.264 27.008-56.896 37.296-36.352 21.264-78.56 35.056-126.08 45.488-19.056 4.16-39.312 3.312-59.968 6.624-22.832 3.68-46.72-1.936-67.136-2.56l18.448 11.248a493.248 493.248 0 0 0 59.456 30.656c38.064 16.656 78.624 29.216 123.52 40.368 90.528 22.464 218.24 12.368 297.264-12.256 220.064-68.592 359.072-228.688 411.552-464.48 9.024-40.56 10.336-86.624 9.744-134.896l32.8-26.064c27.088-21.696 52.48-51.936 71.232-81.76v-0.512c-35.712 11.2-73.312 31.76-118.912 32.24z" fill="#1D9BF0" p-id="3866"></path>
                      </svg>
                      @{twitterName}
                    </div>
                    :
                    <div className="mt-[0.83rem] mx-auto h-[2.17rem] rounded-3xl border-[#1D9BF0] border-[1px] inline-flex items-center text-base font-Inter-Medium font-medium text-[#1D9BF0] leading-[1.17rem] px-[0.83rem] cursor-pointer" onClick={handleAuthTwitter}>
                      <svg className="mr-[0.33rem]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3865" width="18" height="18">
                        <path d="M905.088 226.864v-0.512c8.928-3.488 15.968-10.88 23.056-16.352 32-24.656 52.816-57.12 68.16-98.624l-26.128 14.304c-26.896 13.648-72.528 33.264-107.648 36.272-41.376-37.696-84.672-67.344-166.048-65.92l-25.632 3.072c-16.592 3.632-32.4 8.128-46.656 14.304-59.584 25.856-100.208 74.096-118.896 141.024-7.44 26.624-10.464 71.12-1.024 98.624-33.616-0.048-66.16-5.344-94.304-12.272-110.928-27.28-180.016-64.144-256.72-124.144-22.528-17.616-44.624-37.584-62.528-59.776-5.776-7.152-14.88-13.424-18.96-21.984a20.352 20.352 0 0 1-1.024-0.512c-8.912 16.512-17.28 34.4-22.544 54.672-20.8 79.904 12.08 147.008 47.152 190.592 10.624 13.216 27.856 21.408 38.432 33.728h1.024c-7.952 2.944-21.776-1.136-28.704-2.56-16.384-3.376-30.352-6.48-44.08-12.256l-21.52-10.224c-0.336 88.272 44.256 145.648 98.912 179.856 17.824 11.152 42.752 26.176 68.672 27.584-13.872 11.712-73.2 6.336-93.792 4.096 25.744 66.272 65.296 110.4 133.248 134.368 17.536 6.192 38.928 11.664 62.528 11.248-12.528 14.88-39.264 27.008-56.896 37.296-36.352 21.264-78.56 35.056-126.08 45.488-19.056 4.16-39.312 3.312-59.968 6.624-22.832 3.68-46.72-1.936-67.136-2.56l18.448 11.248a493.248 493.248 0 0 0 59.456 30.656c38.064 16.656 78.624 29.216 123.52 40.368 90.528 22.464 218.24 12.368 297.264-12.256 220.064-68.592 359.072-228.688 411.552-464.48 9.024-40.56 10.336-86.624 9.744-134.896l32.8-26.064c27.088-21.696 52.48-51.936 71.232-81.76v-0.512c-35.712 11.2-73.312 31.76-118.912 32.24z" fill="#1D9BF0" p-id="3866"></path>
                      </svg>
                      Connect
                    </div>
                }
              </Box>
              :
              <>
                <Box className={styles.profileAvatar}>
                  <Image src="/profile_avatar.png" layout="fill" />
                </Box>
                <Box className={styles.addressItem}>
                  {isMounted && address && (ensName || formatAddress(address, 6))}
                  {isMounted && address && <CopyButton targetValue={address || ""} />}
                  {isMounted && !address && <Typography>{t('notConnectWalletTip')}</Typography>}
                </Box>
                {/* {Number(passTokenId) > 0 && <Typography className={styles.passNFTInfo}>
                  Pass-NFT: #{String(passTokenId).padStart(5, "0")}
                  <Box className={styles.iconBox}>
                    <Image src="/polygon-matic-logo.svg" layout="fill" />
                  </Box>
                </Typography>} */}
                {
                  unipassMail &&
                  <Box className={styles.unipassLink}>
                    <a href="https://wallet.unipass.id/" target="_blank" rel="noreferrer">
                      {t('unipassLinkDesc')}: {unipassMail}
                    </a>
                  </Box>
                }
                {
                  twitterName ?
                    <div className="mt-4 h-[2.5rem] rounded-3xl border-[#1D9BF0] border-[1px] flex items-center text-base font-Inter-Medium font-medium text-[#1D9BF0] leading-[1.17rem] px-[0.83rem] cursor-pointer" onClick={() => { window.open('https://twitter.com') }}>
                      <svg className="mr-[0.33rem]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3865" width="18" height="18">
                        <path d="M905.088 226.864v-0.512c8.928-3.488 15.968-10.88 23.056-16.352 32-24.656 52.816-57.12 68.16-98.624l-26.128 14.304c-26.896 13.648-72.528 33.264-107.648 36.272-41.376-37.696-84.672-67.344-166.048-65.92l-25.632 3.072c-16.592 3.632-32.4 8.128-46.656 14.304-59.584 25.856-100.208 74.096-118.896 141.024-7.44 26.624-10.464 71.12-1.024 98.624-33.616-0.048-66.16-5.344-94.304-12.272-110.928-27.28-180.016-64.144-256.72-124.144-22.528-17.616-44.624-37.584-62.528-59.776-5.776-7.152-14.88-13.424-18.96-21.984a20.352 20.352 0 0 1-1.024-0.512c-8.912 16.512-17.28 34.4-22.544 54.672-20.8 79.904 12.08 147.008 47.152 190.592 10.624 13.216 27.856 21.408 38.432 33.728h1.024c-7.952 2.944-21.776-1.136-28.704-2.56-16.384-3.376-30.352-6.48-44.08-12.256l-21.52-10.224c-0.336 88.272 44.256 145.648 98.912 179.856 17.824 11.152 42.752 26.176 68.672 27.584-13.872 11.712-73.2 6.336-93.792 4.096 25.744 66.272 65.296 110.4 133.248 134.368 17.536 6.192 38.928 11.664 62.528 11.248-12.528 14.88-39.264 27.008-56.896 37.296-36.352 21.264-78.56 35.056-126.08 45.488-19.056 4.16-39.312 3.312-59.968 6.624-22.832 3.68-46.72-1.936-67.136-2.56l18.448 11.248a493.248 493.248 0 0 0 59.456 30.656c38.064 16.656 78.624 29.216 123.52 40.368 90.528 22.464 218.24 12.368 297.264-12.256 220.064-68.592 359.072-228.688 411.552-464.48 9.024-40.56 10.336-86.624 9.744-134.896l32.8-26.064c27.088-21.696 52.48-51.936 71.232-81.76v-0.512c-35.712 11.2-73.312 31.76-118.912 32.24z" fill="#1D9BF0" p-id="3866"></path>
                      </svg>
                      @{twitterName}
                    </div>
                    :
                    <div className="mt-4 h-10  rounded-3xl border-[#1D9BF0] border-[1px] flex items-center text-base font-Inter-Medium font-medium text-[#1D9BF0] leading-[1.17rem] px-[0.83rem] cursor-pointer" onClick={handleAuthTwitter}>
                      <svg className="mr-[0.33rem]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3865" width="18" height="18">
                        <path d="M905.088 226.864v-0.512c8.928-3.488 15.968-10.88 23.056-16.352 32-24.656 52.816-57.12 68.16-98.624l-26.128 14.304c-26.896 13.648-72.528 33.264-107.648 36.272-41.376-37.696-84.672-67.344-166.048-65.92l-25.632 3.072c-16.592 3.632-32.4 8.128-46.656 14.304-59.584 25.856-100.208 74.096-118.896 141.024-7.44 26.624-10.464 71.12-1.024 98.624-33.616-0.048-66.16-5.344-94.304-12.272-110.928-27.28-180.016-64.144-256.72-124.144-22.528-17.616-44.624-37.584-62.528-59.776-5.776-7.152-14.88-13.424-18.96-21.984a20.352 20.352 0 0 1-1.024-0.512c-8.912 16.512-17.28 34.4-22.544 54.672-20.8 79.904 12.08 147.008 47.152 190.592 10.624 13.216 27.856 21.408 38.432 33.728h1.024c-7.952 2.944-21.776-1.136-28.704-2.56-16.384-3.376-30.352-6.48-44.08-12.256l-21.52-10.224c-0.336 88.272 44.256 145.648 98.912 179.856 17.824 11.152 42.752 26.176 68.672 27.584-13.872 11.712-73.2 6.336-93.792 4.096 25.744 66.272 65.296 110.4 133.248 134.368 17.536 6.192 38.928 11.664 62.528 11.248-12.528 14.88-39.264 27.008-56.896 37.296-36.352 21.264-78.56 35.056-126.08 45.488-19.056 4.16-39.312 3.312-59.968 6.624-22.832 3.68-46.72-1.936-67.136-2.56l18.448 11.248a493.248 493.248 0 0 0 59.456 30.656c38.064 16.656 78.624 29.216 123.52 40.368 90.528 22.464 218.24 12.368 297.264-12.256 220.064-68.592 359.072-228.688 411.552-464.48 9.024-40.56 10.336-86.624 9.744-134.896l32.8-26.064c27.088-21.696 52.48-51.936 71.232-81.76v-0.512c-35.712 11.2-73.312 31.76-118.912 32.24z" fill="#1D9BF0" p-id="3866"></path>
                      </svg>
                      Connect
                    </div>
                }
              </>
            )}


          {/* {passTokenId !== -1 && <Box className={styles.chainsActiveItem}>
            <Typography className={styles.chainsActiveDesc}>Trial qualification:</Typography>
            <Stack direction="row" className={styles.activeBtnList} >
              <ChainActiveButton
                chainId={137}
                isActived={true}
                setShowModal={setShowModal}
                setActiveChainInfo={setActiveChainInfo}
              />
              <ChainActiveButton chainId={5} isActived={activeRes?.[0] as unknown as boolean} setShowModal={setShowModal} setActiveChainInfo={setActiveChainInfo} />
              <ChainActiveButton chainId={97} isActived={activeRes?.[1] as unknown as boolean} setShowModal={setShowModal} setActiveChainInfo={setActiveChainInfo} />
            </Stack>
          </Box>} */}
        </Box>
      </Box>
    </Box>
    <Box className={styles.profileContent}>
      {!is1120Size &&
        <Box className={styles.pointreward} onClick={() => setShowMobileOnlyTip(true)}>
          <h3>$2 Cash Drops!</h3>
          <p>Continuous check-in, invite friends to colledt points, get $2 immediately! Complete tasks on mobile to win cash rewards.</p>
        </Box>}
      <MobileOnlyTip showModal={showMobileOnlyTip} setShowModal={setShowMobileOnlyTip} />

      {is600Size &&
        <Box className={styles.pointSection}>
          <Typography variant="h3">Integration</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box className={styles.pointLabel}>
              {userPointInfo?.point || 0} Golds
            </Box>
            <Box onClick={handleSwitchPoints} className={`${styles.exchangeBtn} ${userPointInfo?.status !== 'withdrawable' && styles.exchangeBtn_disable}`} >
              {userPointInfo?.status == 'withdrawing' ? 'Withdrawing' : 'Exchange'}
              {switchPointLoading &&
                <CircularProgress sx={{ circle: { stroke: 'rgb(33, 150, 243)' } }} style={{ width: '20px !important', height: "20px !important" }} className="w-5 h-5 ml-2" />}
            </Box>
          </Box>
          <Typography>Reaching 10,000 can be exchanged for USDT</Typography>
        </Box>}

      <Box className={styles.balanceSection}>
        <Typography variant="h3">{t('rewardBalance')}</Typography>
        {
          tokenBalances.map((item: Record<string, any>, index: number) =>
            <BalanceTokenItem key={index} tokenInfo={item} reload={refresh} />
          )
        }
        {/* <BalanceTokenItem key={2} tokenInfo={tokenBalances[0]} reload={refresh} /> */}
        <Typography variant="h5">
          * {t('WithdrawModal.shortWithdrawTip')}
        </Typography>
      </Box>

      <Tabs
        className={styles.tabsHeader}
        value={activeTab}
        onChange={(_: any, newItem: number) => {
          setActiveTab(newItem)
          setParamTab(TabItem[newItem])
        }} >
        <Tab label={t('trialingTabName')} value={TabItem.Trialing} disableRipple />
        <Tab label={t('activityTabName')} value={TabItem.Activity} disableRipple />
        <Tab label={t('balanceTabName')} value={TabItem.Balance} disableRipple />
      </Tabs>
      <Box className={cx({
        itemBox: true,
        hiddenTab: isMounted && activeTab !== TabItem.Trialing
      })}>
        {
          trialingTaskList && trialingTaskList?.map((item, index) => {
            const bountyInfo = bountyInfos[item.task_id]
            return <ProfileTrialingTask key={index} taskInfo={item} bountyInfo={bountyInfo} />
          })
        }

        {/* 无任何正在试玩的任务 */}
        {!(trialingTaskListLoading || bountyInfosLoading) &&
          isEmpty(trialingTaskList) &&
          <Box className={styles.emptyTrialingTask}>
            <Box className={styles.emptyIllustration}>
              <Image src="/empty_trialing.png" layout="fill" />
            </Box>
            <Typography>{t('Trialing.emptyTip')}</Typography>
          </Box>}

        {/* 
        {
          isMounted && !loading && trialList.map((item, index) =>
            <ProfileNFTCard key={index} nftInfo={item} />)
        }
        {
          isMounted && loading && <>
            <TrialNFTCardSkeleton />
            <TrialNFTCardSkeleton />
            <TrialNFTCardSkeleton />
            <TrialNFTCardSkeleton />
          </>
        } */}

        {/* {
          // 无任何正在试玩游戏，引导去试玩
          isMounted && !loading && isEmpty(trialList) && passTokenId > 0 &&
          <Box className={styles.trialGameBtnBox}>
            <Link href="/" target="__blank">
              <Box className={styles.trialGameBtn}>Trial Games</Box>
            </Link>
            <Typography>No trialing games yet</Typography>
          </Box>
        } */}

        {/* 无 PassNFT，无试玩资格 */}
        {/* {
          passTokenId === -1 && <Box className={styles.passNFTTips}>
            <Box className={styles.trialGameBtn}>
              Claim Pass-NFT
            </Box>
            <Typography>Get the NFT first, then trial. </Typography>
            <Typography>Continue to receive airdrop rewards. </Typography>
            <Typography>You will have more benefits after being upgraded in the future.</Typography>
          </Box>
        } */}
      </Box>

      <Box className={cx({
        activityBox: true,
        hiddenTab: isMounted && activeTab !== TabItem.Activity
      })}>
        <ProfileActivityTable />
      </Box>

      <Box className={cx({
        balanceBox: true,
        hiddenTab: isMounted && activeTab !== TabItem.Balance
      })}>
        <ProfileBalanceSection />
      </Box>
    </Box>

    <ActicvChainConfirm
      showModal={showModal}
      setShowModal={setShowModal}
      setTxLoading={setShowTxLoading}
      setTxHash={setTxHash}
      txHash={txHash}
      chainId={activeChainInfo.chainId || 0}
      chainName={activeChainInfo.chainName || ""}
    />

    <ContractTxLoading showModal={showTxLoading} txHash={txHash} />

    <ConnectWallet
      showConnect={showConnect}
      setShowConnect={setShowConnect}
      errorCallback={() => { router.push('/') }}
    />
  </Box>
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Profile


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}