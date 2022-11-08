import { NextPageWithLayout } from "./_app";
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import Layout from "@/components/Layout";
import Image from 'next/image';
import { GetStaticProps, GetStaticPropsContext } from "next";
import styles from '../styles/profile.module.scss';
import { useAccount, useContract, useEnsName, useSigner } from "wagmi";
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
import { MULTI_CHAIN_SWITCH_CONTRACT, PASS_NFT_CONTRACT } from "constants/contract";
import { MULTI_CHAIN_SWITCH } from "constants/abi";
import TrialNFTCardSkeleton from "@/components/TrialNFTCard/TrialNFTCardSkeleton";
import { isEmpty } from "lodash";
import { StringParam, useQueryParam } from "use-query-params";
import { ProfilePackageRes } from "types/graph";
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

enum TabItem {
  Trialing,
  Activity,
}

const Profile: NextPageWithLayout = () => {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address: address, chainId: 1 })
  const { data: signer } = useSigner()

  const isMounted = useIsMounted()
  const router = useRouter()

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
    // 正常情况用户连接钱包后进入 Profile 页
    // 需处理用户进入后断开钱包情况
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

  useEffect(() => {
    // TODO: 获取用户激活链数据
    // 读取 market 合约的 playerWhitelist 方法

  }, [])



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
      <Box className={styles.profileHeader}>
        <Box className={styles.headerInfo}>
          <Box className={styles.addressItem}>
            {address && isMounted && (ensName || formatAddress(address, 8))}
            {address && isMounted && <CopyButton targetValue={address || ""} />}
            {!address && isMounted && <Typography>Not connect wallet yet !</Typography>}
          </Box>
          {passTokenId !== -1 && <Box className={styles.chainsActiveItem}>
            <Typography className={styles.chainsActiveDesc}>Trial qualification:</Typography>
            <Stack direction="row" className={styles.activeBtnList} >
              <ChainActiveButton
                chainId={137}
                isActived={true}
                setShowModal={setShowModal}
                setActiveChainInfo={setActiveChainInfo}
              />
              <ChainActiveButton chainId={5} isActived={false} setShowModal={setShowModal} setActiveChainInfo={setActiveChainInfo} />
              <ChainActiveButton chainId={97} isActived={false} setShowModal={setShowModal} setActiveChainInfo={setActiveChainInfo} />
            </Stack>
          </Box>}
          {/* <Box className={styles.integralItem}> */}
          {/* <Typography className={styles.integralDesc}>Pointers:</Typography> */}
          {/* <Typography><span>90</span> FP</Typography> */}
          {/* </Box>  */}
        </Box>
        {![0, -1].includes(passTokenId as number) &&
          <Box className={styles.passNFTBox}>
            <Image loader={imageKitLoader} layout="fill" src="https://d2yhjjdyh5ugcy.cloudfront.net/PASS_NFT.jpg" objectFit="cover" />
            <Box className={styles.imageMask}> </Box>
            <Box className={styles.imageTokenId}>ID: {passTokenId.toString().padStart(5, '0')}</Box>
          </Box>
        }
      </Box>
    </Box>
    <Box className={styles.profileContent}>
      <Tabs
        className={styles.tabsHeader}
        value={activeTab}
        onChange={(_: any, newItem: number) => {
          setActiveTab(newItem)
          setParamTab(newItem === 0 ? 'Trialing' : "Activity")
        }} >
        <Tab label="Trialing" value={TabItem.Trialing} disableRipple />
        <Tab label="Activity" value={TabItem.Activity} disableRipple />
      </Tabs>
      <Box className={cx({
        itemBox: true,
        hiddenTab: activeTab !== TabItem.Trialing
      })}>
        {
          trialList.map((item, index) =>
            <ProfileNFTCard key={index} nftInfo={item} />)
        }
        {
          loading && <>
            <TrialNFTCardSkeleton />
            <TrialNFTCardSkeleton />
            <TrialNFTCardSkeleton />
            <TrialNFTCardSkeleton />
          </>
        }
        {
          // 无任何正在试玩游戏，引导去试玩
          !loading && isEmpty(trialList) && passTokenId > 0 && <Box className={styles.trialGameBtnBox}>
            <a href="/" target="__blank">
              <Box className={styles.trialGameBtn}>Trial Games</Box>
            </a>
            <Typography>No trialing gmaes yet</Typography>
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
        hiddenTab: activeTab !== TabItem.Activity
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
      errorCallback={() => {
        router.push('/')
      }}
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