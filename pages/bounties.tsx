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
import { getBountiesList } from "services/cms";
import { getTaskStatus } from "services/home";

enum TabEnum {
  ONGOING = 'ongoing',
  ENDED = 'ended'
}

interface BountiesListPorps {
  bountiesList: Record<string, any>[]
  taskStatus: Record<string, any>
  type: 'Ongoing' | 'Ended'
}
const BountiesList: React.FC<BountiesListPorps> = (props) => {
  const { bountiesList, type, taskStatus } = props

  return <Box className={styles.bountiesList}>
    {
      bountiesList?.map((item, index) =>
        <RewardGameCard
          key={item?.id || index}
          gameInfo={item?.attributes || {}}
          taskStatus={taskStatus}
          type={type} />)
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

  const [taskStatusRecord, setTaskStatusRecord] = useState<Record<string, any>>({})

  const [isRequesting, setIsRequesting] = useState<boolean>(false)

  const scroll = useScroll()

  useEffect(() => {
    // if (!isMobileSize) return

    if (activeKey === TabEnum.ONGOING) {
      // @ts-ignore
      if (scroll?.top + 500 + document.body.offsetHeight > document.body.scrollHeight
        && currentPageGoing * pageSize < totalGoing) {

        if (isRequesting) return
        setIsRequesting(true)
        setTimeout(() => setIsRequesting(false), 500)

        setCurrentPageGoing(currentPageGoing + 1)

        queryBountiesList({
          pageSize: pageSize,
          pageNum: currentPageGoing + 1,
          status: true
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
          pageSize: pageSize,
          pageNum: currentPageEnd + 1,
          status: false
        })
      }
    }
  }, [scroll])

  const { run: queryBountiesList, runAsync } = useRequest(getBountiesList, {
    manual: true,
    onSuccess: async ({ data, meta }, [{ status }]) => {
      if (data) {

        if (status) {
          setOngoingList([...ongoingList, ...data])
          setTotalGoing(meta?.pagination?.total || 0)
        } else {
          setEndList([...endList, ...data])
          setTotalEnd(meta?.pagination?.total || 0)
        }

        // 查询 task 任务进度数据
        await queryTaskStatus({
          address: '',
          task_ids: data.map((item: Record<string, any>) => item?.attributes?.task_id)
        })
      }
    }
  })

  const { run: queryTaskStatus } = useRequest(getTaskStatus, {
    manual: true,
    onSuccess: ({ data }) => {
      let statusList: Record<string, any> = {}
      data.forEach((item: Record<string, any>) => {
        statusList[item.task_id] = item.issued_rewards
      })
      setTaskStatusRecord({ ...taskStatusRecord, ...statusList })
    }
  })

  useEffect(() => {
    // 初始化请求列表数据
    (async () => {
      await runAsync({ pageSize: pageSize, pageNum: currentPageGoing, status: true })
      await runAsync({ pageSize: pageSize, pageNum: currentPageEnd, status: false })
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
            children: <BountiesList
              bountiesList={ongoingList}
              taskStatus={taskStatusRecord}
              key={TabEnum.ONGOING}
              type="Ongoing"
            />
          }, {
            label: `Ended(${totalEnd})`,
            key: TabEnum.ENDED,
            children: <BountiesList
              bountiesList={endList}
              taskStatus={taskStatusRecord}
              key={TabEnum.ENDED}
              type="Ended"
            />
          }
        ]}
      />

      {/* {!isMobileSize && <Pagination
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
      />} */}
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