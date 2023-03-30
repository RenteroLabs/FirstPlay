import Layout from "@/components/Layout";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/bounties.module.scss'
import { Pagination, Tabs } from 'antd';
import RewardGameCard from "@/components/RewardGameCard";
import { useRequest, useScroll } from "ahooks";
import { getBountiesList } from "services/home";

enum TabEnum {
  ONGOING = 'ongoing',
  ENDED = 'ended'
}

interface BountiesListPorps {
  bountiesList: Record<string, any>[]
}
const BountiesList: React.FC<BountiesListPorps> = (props) => {
  const { bountiesList } = props

  return <Box className={styles.bountiesList}>
    {
      bountiesList?.map((item, index) => <RewardGameCard key={index} gameInfo={item} />)
    }
  </Box>
}


const pageSize = 9
// Bounty 集合页
const Bounties: NextPageWithLayout = () => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")
  const [activeKey, setActiveKey] = useState<string>(TabEnum.ONGOING)

  const [currentPageGoing, setCurrentPageGoing] = useState<number>(1)
  const [currentPageEnd, setCurrentPageEnd] = useState<number>(1)

  const [totalGoing, setTotalGoing] = useState<number>(0)
  const [totalEnd, setTotalEnd] = useState<number>(0)

  const [ongoingList, setOngoingList] = useState<Record<string, any>[]>([])
  const [endList, setEndList] = useState<Record<string, any>[]>([])

  const [isRequesting, setIsRequesting] = useState<boolean>(false)

  const scroll = useScroll()

  useEffect(() => {
    if (!isMobileSize) return

    if (activeKey === TabEnum.ONGOING) {
      // @ts-ignore
      if (scroll?.top + 500 + document.body.offsetHeight > document.body.scrollHeight
        && currentPageGoing * pageSize < totalGoing) {

        if (isRequesting) return
        setIsRequesting(true)
        setTimeout(() => setIsRequesting(false), 500)

        setCurrentPageGoing(currentPageGoing + 1)

        queryBountiesList({
          limit: pageSize,
          offset: pageSize * (currentPageGoing),
          status: "on"
        })
      }
    } else {
      // @ts-ignore
      if (scroll?.top + 500 + document.body.offsetHeight > document.body.scrollHeight
        && currentPageEnd * pageSize < totalEnd) {

        if (isRequesting) return
        setIsRequesting(true)
        setTimeout(() => setIsRequesting(false), 500)

        setCurrentPageEnd(currentPageEnd + 1)

        queryBountiesList({
          limit: pageSize,
          offset: pageSize * (currentPageEnd),
          status: "off"
        })
      }
    }
  }, [scroll])


  const { run: queryBountiesList, runAsync } = useRequest(getBountiesList, {
    manual: true,
    onSuccess: ({ data }, [{ status }]) => {
      if (data) {
        const { total_count, bounties } = data
        if (status === 'on') {
          setOngoingList(isMobileSize ? [...ongoingList, ...bounties] : bounties)
          setTotalGoing(total_count)
        } else {
          setEndList(isMobileSize ? [...endList, ...bounties] : bounties)
          setTotalEnd(total_count)
        }
      }
    }
  })

  useEffect(() => {
    // 初始化请求列表数据
    (async () => {
      await runAsync({ limit: pageSize, offset: pageSize * (currentPageGoing - 1), status: 'on' })
      await runAsync({ limit: pageSize, offset: pageSize * (currentPageEnd - 1), status: 'off' })
    })()
  }, [])

  return <Box className={styles.bounties}>
    <Head>
      <title>Bounties | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.bountiesBox}>
      <Typography variant="h2">Bounties</Typography>
      <Tabs
        accessKey={activeKey}
        onChange={(activeKey) => setActiveKey(activeKey)}
        items={[
          {
            label: `Ongoing(${totalGoing})`,
            key: TabEnum.ONGOING,
            children: <BountiesList bountiesList={ongoingList} key={TabEnum.ONGOING} />
          }, {
            label: `Ended(${totalEnd})`,
            key: TabEnum.ENDED,
            children: <BountiesList bountiesList={endList} key={TabEnum.ENDED} />
          }
        ]}
      />

      {!isMobileSize && <Pagination
        className={styles.paginationBox}
        total={activeKey === TabEnum.ONGOING ? totalGoing : totalEnd}
        current={activeKey === TabEnum.ONGOING ? currentPageGoing : currentPageEnd}
        onChange={(page) => {
          if (activeKey === TabEnum.ONGOING) {
            setCurrentPageGoing(page)
          } else {
            setCurrentPageEnd(page)
          }

          queryBountiesList({
            limit: pageSize,
            offset: pageSize * (page - 1),
            status: activeKey === TabEnum.ONGOING ? "on" : "off"
          })
        }}
      />}
    </Box>
  </Box>
}

Bounties.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Bounties

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}