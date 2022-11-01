import { NextPageWithLayout } from "./_app";
import React, { ReactElement, useEffect, useState } from 'react';
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import Layout from "@/components/Layout";
import Image from 'next/image';
import { GetStaticProps, GetStaticPropsContext } from "next";
import styles from '../styles/profile.module.scss';
import { useAccount } from "wagmi";
import { formatAddress } from "util/format";
import CopyButton from "@/components/CopyButton";
import { useIsMounted } from "hooks/useIsMounted";
import ChainActiveButton from "@/components/ChainActiveButton";
import ActicvChainConfirm from "@/components/PageModals/activeChainConfirm";
import ContractTxLoading from "@/components/PageModals/ContractTxLoading";
import ProfileNFTCard from "@/components/ProfileNFTCard";
import ProfileActivityTable from "@/components/PageProfile/ProfileActivityTabale";
import Head from "next/head";

enum TabItem {
  Items,
  Activity
}

const Profile: NextPageWithLayout = () => {
  const { address } = useAccount()
  const isMounted = useIsMounted()

  const [activeTab, setActiveTab] = useState<number>(TabItem.Items)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [showTxLoading, setShowTxLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")

  const [activeChainInfo, setActiveChainInfo] = useState<{ chainId?: number, chainName?: string }>({})

  useEffect(() => {
    // 获取用户激活链数据
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
            {address && isMounted && formatAddress(address, 8)}
            {address && isMounted && <CopyButton targetValue={address || ""} />}
          </Box>
          <Box className={styles.chainsActiveItem}>
            <Typography className={styles.chainsActiveDesc}>Trial qualification:</Typography>
            <Stack direction="row" spacing="0.83rem" >
              <ChainActiveButton
                chainId={137}
                isActived={true}
                setShowModal={setShowModal}
                setActiveChainInfo={setActiveChainInfo}
              />
              <ChainActiveButton chainId={56} isActived={false} setShowModal={setShowModal} setActiveChainInfo={setActiveChainInfo} />
              <ChainActiveButton chainId={1} isActived={false} setShowModal={setShowModal} setActiveChainInfo={setActiveChainInfo} />
            </Stack>
          </Box>
          <Box className={styles.integralItem}>
            <Typography className={styles.integralDesc}>Integration:</Typography>
            <Typography><span>90</span> FP</Typography>
          </Box>
        </Box>
        <Box className={styles.passNFTBox}>
          <Image loader={imageKitLoader} layout="fill" src="https://rentero-resource.s3.ap-east-1.amazonaws.com/PassNFT.jpg" objectFit="cover" />
          <Box className={styles.imageMask}> </Box>
          <Box className={styles.imageTokenId}>ID: XXX</Box>
        </Box>
      </Box>

    </Box>
    <Box className={styles.profileContent}>
      <Tabs
        className={styles.tabsHeader}
        value={activeTab}
        onChange={(_: any, newItem: number) => setActiveTab(newItem)} >
        <Tab label="Items" value={TabItem.Items} disableRipple />
        <Tab label="Activity" value={TabItem.Activity} disableRipple />
      </Tabs>
      {
        activeTab === TabItem.Items &&
        <Box className={styles.itemBox}>
          {/* <Box className={styles.trialGameBtn}>Trial Games</Box> */}
          <ProfileNFTCard />
          <ProfileNFTCard />
          <ProfileNFTCard />
          <ProfileNFTCard />
          <ProfileNFTCard />
          <ProfileNFTCard />
        </Box>
      }
      {
        activeTab === TabItem.Activity &&
        <Box className={styles.activityBox}>
          <ProfileActivityTable />
        </Box>
      }
    </Box>

    <ActicvChainConfirm
      showModal={showModal}
      setShowModal={setShowModal}
      setTxLoading={setShowTxLoading}
      setTxHash={setTxHash}
      chainId={activeChainInfo.chainId || 0}
      chainName={activeChainInfo.chainName || ""}
    />

    <ContractTxLoading showModal={showTxLoading} txHash={txHash} />
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