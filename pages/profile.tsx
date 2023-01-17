import { NextPageWithLayout } from "./_app";
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BalanceTokenItem from "@/components/PageProfile/BalanceTokenItem";
import ProfileTrialingTask from "@/components/PageProfile/ProfileTrialingTask";

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

  const is680Size = useMediaQuery("(max-width: 680px)")

  const [paramTab, setParamTab] = useQueryParam('tab')

  const [activeTab, setActiveTab] = useState<number>(TabItem.Trialing)

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

  useEffect(() => {
    if (!address) {
      setShowConnect(true)
    } else {
      getTrialingList()

      // 判断用户是否拥有试玩 NFT
      queryPassNFT({
        contractAddresses: [PASS_NFT_CONTRACT],
        withMetadata: false,
        owner: address,
        chainId: process.env.NEXT_PUBLIC_ENV === 'PRO' ? 137 : 5
      })
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

  return <Box className={styles.containerBox}>
    <Head>
      <title>Profile | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.profileHeaderBox}>
      {isMounted && !is680Size &&
        <Box className={styles.profileCover}>
          <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/background/Big%20Time.jpg?timestamp=1673577264450" layout="fill" />
        </Box>}

      <Box className={styles.profileHeader}>
        {
          isMounted && !is680Size &&
          <Box className={styles.profileAvatar}>
            <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/background/Big%20Time.jpg?timestamp=1673577264450" layout="fill" />
          </Box>
        }

        <Box className={styles.headerInfo}>
          {
            isMounted && (is680Size ?
              <Box className={styles.mobileInfo}>
                <Box className={styles.mobileUserInfo}>
                  <Box className={styles.mobileAvatar}>
                    <Image src="https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/background/Big%20Time.jpg?timestamp=1673577264450" layout="fill" />
                  </Box>
                  <Box className={styles.infoBox}>
                    <Box className={styles.addressItem}>
                      {address && isMounted && (ensName || formatAddress(address, 4))}
                      {address && isMounted && <CopyButton targetValue={address || ""} />}
                      {/* {!address && isMounted && <Typography>Not connect wallet yet !</Typography>} */}
                    </Box>
                    {true && <Typography className={styles.passNFTInfo}>
                      Pass-NFT: #00002
                      <Box className={styles.iconBox}>
                        <Image src="/polygon-matic-logo.svg" layout="fill" />
                      </Box>
                    </Typography>}
                  </Box>
                </Box>
                {false && <Box className={styles.unipassLink}>
                  <a href="https://wallet.unipass.id/" target="_blank" rel="noreferrer">
                    Visit UniPass wallet  to your asset after withdraw.Login email: XXXXXXXX
                    <Box className={styles.arrowIcon}><ArrowForwardIcon /></Box>
                  </a>
                </Box>}
              </Box>
              :
              <>
                <Box className={styles.addressItem}>
                  {isMounted && address && (ensName || formatAddress(address, 4))}
                  {isMounted && address && <CopyButton targetValue={address || ""} />}
                  {isMounted && !address && <Typography>Not connect wallet yet !</Typography>}
                </Box>
                <Typography className={styles.passNFTInfo}>
                  Pass-NFT: #00002
                  <Box className={styles.iconBox}>
                    <Image src="/polygon-matic-logo.svg" layout="fill" />
                  </Box>
                </Typography>
                <Box className={styles.unipassLink}>
                  <a href="https://wallet.unipass.id/" target="_blank" rel="noreferrer">
                    Visit UniPass wallet  to your asset after withdraw.Login email: XXXXXXXX
                    <Box className={styles.arrowIcon}><ArrowForwardIcon /></Box>
                  </a>
                </Box>
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
      <Box className={styles.balanceSection}>
        <Typography variant="h3">Reward Balance</Typography>
        <BalanceTokenItem tokenInfo={{}} />
      </Box>

      <Tabs
        className={styles.tabsHeader}
        value={activeTab}
        onChange={(_: any, newItem: number) => {
          setActiveTab(newItem)
          setParamTab(TabItem[newItem])
        }} >
        <Tab label="Trialing" value={TabItem.Trialing} disableRipple />
        <Tab label="Activity" value={TabItem.Activity} disableRipple />
        <Tab label="Balance" value={TabItem.Balance} disableRipple />
      </Tabs>
      <Box className={cx({
        itemBox: true,
        hiddenTab: isMounted && activeTab !== TabItem.Trialing
      })}>

        <ProfileTrialingTask />
        <ProfileTrialingTask />
        <ProfileTrialingTask />
        <ProfileTrialingTask />
        <ProfileTrialingTask />

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
        {
          // 无任何正在试玩游戏，引导去试玩
          isMounted && !loading && isEmpty(trialList) && passTokenId > 0 && <Box className={styles.trialGameBtnBox}>
            <Link href="/" target="__blank">
              <Box className={styles.trialGameBtn}>Trial Games</Box>
            </Link>
            <Typography>No trialing games yet</Typography>
          </Box>
        }
        {
          passTokenId === -1 && <Box className={styles.passNFTTips}>
            <Box className={styles.trialGameBtn}>
              Claim Pass-NFT
            </Box>
            <Typography>Get the NFT first, then trial. </Typography>
            <Typography>Continue to receive airdrop rewards. </Typography>
            <Typography>You will have more benefits after being upgraded in the future.</Typography>
          </Box>
        }
      </Box>

      <Box className={cx({
        activityBox: true,
        hiddenTab: isMounted && activeTab !== TabItem.Activity
      })}>
        <ProfileActivityTable />
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