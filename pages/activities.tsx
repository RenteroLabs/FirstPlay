import Layout from "@/components/Layout";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/activities.module.scss'
import { Pagination } from "antd";
import ActivityCard from "@/components/ActivityCard";
import { useRequest } from "ahooks";
import { getActivityList } from "services/home";

const pageSize = 10

// Activity 集合页
const Activities: NextPageWithLayout = () => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)

  const [activityList, setActivityList] = useState<Record<string, any>[]>([])

  const { run: queryActivityList } = useRequest(getActivityList, {
    manual: true,
    onSuccess: ({ data }) => {
      if (data) {
        const { activities, total_count } = data
        setActivityList(activities)
        setTotalCount(total_count)
      }
    }
  })

  useEffect(() => {
    queryActivityList({ limit: pageSize, offset: pageSize * (currentPage - 1) })
  }, [currentPage])

  return <Box className={styles.bounties}>
    <Head>
      <title>Activities | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.bountiesBox}>
      <Typography variant='h2'>Hot Games {!isMobileSize && `> ALL`}</Typography>
      <Box className={styles.bountiesList}>
        {
          activityList?.map((item, index) =>
            <ActivityCard activityInfo={item} key={index} />)
        }
      </Box>
      <Pagination
        className={styles.paginationBox}
        total={totalCount}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)} />
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