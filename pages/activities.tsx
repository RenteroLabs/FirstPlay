import Layout from "@/components/Layout";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/activities.module.scss'
import { Pagination } from "antd";
import ActivityCard from "@/components/ActivityCard";
import { useRequest, useScroll } from "ahooks";
import { GameActivityCard } from "@/components/GameActivityCarousel";
import { getActivitiesList } from "services/cms";

const pageSize = 8

// Activity 集合页
const Activities: NextPageWithLayout = () => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)

  const [activityList, setActivityList] = useState<Record<string, any>[]>([])

  const [isRequesting, setIsRequesting] = useState<boolean>(false)

  const scroll = useScroll()

  useEffect(() => {
    if (!isMobileSize) return
    // @ts-ignore
    if (scroll?.top + 300 + document.body.offsetHeight > document.body.scrollHeight && currentPage * pageSize < totalCount) {
      if (isRequesting) return
      setIsRequesting(true)

      setCurrentPage(currentPage + 1)
      setTimeout(() => setIsRequesting(false), 500)
    }
  }, [scroll])

  const { run: queryActivityList } = useRequest(getActivitiesList, {
    manual: true,
    onSuccess: ({ data, meta }) => {
      setTotalCount(meta?.pagination?.total)
      if (data) {
        const activityList = data.map((item: Record<string, any>) => item?.attributes)
        if (isMobileSize) {
          setActivityList([...activityList, ...activityList])
        } else {
          setActivityList(activityList)
        }
      }
    }
  })

  useEffect(() => {
    queryActivityList({ pageSize: pageSize, pageNum: currentPage })
  }, [currentPage])

  return <Box className={styles.bounties}>
    <Head>
      <title>Activities | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.bountiesBox}>
      <Typography variant='h2'>Activities {!isMobileSize && `> ALL`}</Typography>
      <Box className={styles.bountiesList}>
        {
          isMobileSize ?
            activityList?.map((item, index) =>
              <GameActivityCard activityInfo={item} key={index} cardType="GameName" />)
            :
            activityList?.map((item, index) =>
              <ActivityCard activityInfo={item} key={index} />)
        }
      </Box>
      {!isMobileSize && <Pagination
        className={styles.paginationBox}
        total={totalCount}
        current={currentPage}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={(page) => setCurrentPage(page)} />}
    </Box>
  </Box>
}

Activities.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Activities

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}