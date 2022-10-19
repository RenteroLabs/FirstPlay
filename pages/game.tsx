 
import { Box, Typography } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/game.module.scss'
import Layout from '@/components/Layout'
import { NextPageWithLayout } from './_app'
import GameInfo from '@/components/GameInfo'
import { REWARD_ICON } from 'constants/static'
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import TrialNFTCard from '@/components/TrialNFTCard'
import TrialNFTCardSkeleton from '@/components/TrialNFTCard/TrialNFTCardSkeleton'
import TrialSuccessModal from '@/components/PageModals/TrialSuccess'
import QuickTrialNFT from '@/components/PageModals/quickTrialNFT'


// 游戏详情页
const Game: NextPageWithLayout = () => {

  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showQuickTrialModal, setShowQuickTrialModal] = useState<boolean>(false)

  useEffect(() => {
    // 根据路由参数，获取当前游戏信息

  }, [router])

  return <Box className={styles.gameBox}>
    <Box className={styles.topCover}>
      <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xhds6ikrj20zo0ibtcv.jpg" layout='fill' objectFit='cover' />
    </Box>
    <Box className={styles.gameInfoBox}>
      <GameInfo />
    </Box>
    <Box className={styles.rewardBox}>
      <Typography variant='h4'>Rewards</Typography>
      <Box className={styles.rewardItem}>
        <Box className={styles.rewardName}>
          <Box className={styles.rewardIcon}>
            <Image src={REWARD_ICON} layout="fill" />
          </Box>
          <Typography>Continue to rent after the trial to get rewards during the trial.</Typography>
        </Box>
        <Box className={styles.rewardValue}>
          <Typography>200U / 3D</Typography>
        </Box>
      </Box>
    </Box>
    <Box className={styles.btnBox}>
      <Box className={styles.trialBtn} onClick={() => setShowQuickTrialModal(true)}> Start Free Trial </Box>
      <Box className={styles.downIcon} onClick={() => {
        // window.body.screenTop(300)
        // document.body.scrollTop = 500
        // console.log("ddd")
      }}>
        <KeyboardDoubleArrowDownOutlinedIcon />
      </Box>
    </Box>
    <Box className={styles.cardBox}>
      <Box className={styles.cardContent}>
        <Typography variant='h3'>All Items</Typography>
        <Typography variant='h4'>Choose your own favorite NFT to trial.</Typography>

        <Box className={styles.cardList}>
          <TrialNFTCard />
          <TrialNFTCard />
          <TrialNFTCard />
          <TrialNFTCard />
          <TrialNFTCard />
          <TrialNFTCard />
          <TrialNFTCard />
          <TrialNFTCard />
          <TrialNFTCardSkeleton />
          <TrialNFTCardSkeleton />
          <TrialNFTCardSkeleton />
          <TrialNFTCardSkeleton />
        </Box>
      </Box>
    </Box>
    <QuickTrialNFT showModal={showQuickTrialModal} setShowModal={setShowQuickTrialModal} />
    {/* <TrialSuccessModal showModal={showSuccessModal} setShowModal={setShowSuccessModal} /> */}
  </Box>
}

Game.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}


export default Game


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}